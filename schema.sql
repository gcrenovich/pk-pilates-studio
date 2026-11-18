-- ====================================================================
-- PILATES KINÉSICO
-- Esquema de Base de Datos Relacional (PostgreSQL / Supabase / Neon)
-- Diseñado por: Antigravity (Systems Engineer) & Cline (Software Engineer)
-- ====================================================================

-- 1. Tabla: Profesionales / Kinesiólogos
CREATE TABLE IF NOT EXISTS profesionales (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(120) NOT NULL,
    especialidad VARCHAR(150) NOT NULL,
    banco VARCHAR(80) NOT NULL,
    alias VARCHAR(60) NOT NULL UNIQUE,
    cbu VARCHAR(22) NOT NULL,
    titular VARCHAR(120) NOT NULL,
    cuit VARCHAR(20) NOT NULL,
    telefono VARCHAR(30) NOT NULL,
    email VARCHAR(120),
    activo BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. Tabla: Alumnos / Pacientes
CREATE TABLE IF NOT EXISTS alumnos (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(120) NOT NULL,
    telefono VARCHAR(30) NOT NULL,
    email VARCHAR(120),
    patologias_lesiones TEXT,
    plan VARCHAR(80) NOT NULL,
    grupo_etario VARCHAR(20) NOT NULL DEFAULT 'adulto' CHECK (grupo_etario IN ('adulto', 'adulto_mayor')),
    monto_mensual NUMERIC(12, 2) NOT NULL DEFAULT 28000.00,
    estado VARCHAR(20) NOT NULL DEFAULT 'al_dia' CHECK (estado IN ('al_dia', 'por_vencer', 'atrasado')),
    ultimo_pago DATE NOT NULL DEFAULT CURRENT_DATE,
    vencimiento DATE NOT NULL,
    kinesiologo_id INT REFERENCES profesionales(id) ON DELETE SET NULL,
    deuda NUMERIC(12, 2) NOT NULL DEFAULT 0.00,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 3. Tabla: Horarios y Clases (Turnos)
CREATE TABLE IF NOT EXISTS turnos (
    id SERIAL PRIMARY KEY,
    dia VARCHAR(20) NOT NULL CHECK (dia IN ('Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado')),
    hora_inicio TIME NOT NULL,
    hora_fin TIME NOT NULL,
    profesor_id INT NOT NULL REFERENCES profesionales(id) ON DELETE CASCADE,
    tipo VARCHAR(100) NOT NULL, -- 'Pilates Reformer', 'Kinesioterapia', 'Contrología Mat'
    cupo_max INT NOT NULL DEFAULT 6 CHECK (cupo_max > 0),
    activo BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 4. Tabla: Reservas de Turnos
CREATE TABLE IF NOT EXISTS reservas (
    id SERIAL PRIMARY KEY,
    turno_id INT NOT NULL REFERENCES turnos(id) ON DELETE CASCADE,
    alumno_id INT NOT NULL REFERENCES alumnos(id) ON DELETE CASCADE,
    fecha_reserva DATE NOT NULL DEFAULT CURRENT_DATE,
    estado VARCHAR(20) NOT NULL DEFAULT 'confirmada' CHECK (estado IN ('confirmada', 'asistio', 'cancelada')),
    metodo_pago VARCHAR(50) DEFAULT 'transferencia',
    comprobante_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT uq_reserva_dia UNIQUE (turno_id, alumno_id, fecha_reserva)
);

-- 5. Tabla: Promociones y Tarifas
CREATE TABLE IF NOT EXISTS promociones (
    id SERIAL PRIMARY KEY,
    titulo VARCHAR(120) NOT NULL,
    descripcion TEXT NOT NULL,
    precio NUMERIC(12, 2) NOT NULL,
    ahorro VARCHAR(60),
    tag VARCHAR(40) DEFAULT 'Destacado',
    activa BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 6. Tabla: Historial de Pagos y Comprobantes
CREATE TABLE IF NOT EXISTS pagos_historial (
    id SERIAL PRIMARY KEY,
    alumno_id INT NOT NULL REFERENCES alumnos(id) ON DELETE CASCADE,
    monto NUMERIC(12, 2) NOT NULL,
    fecha_pago TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    metodo VARCHAR(50) NOT NULL DEFAULT 'transferencia',
    comprobante_url TEXT,
    validado_por_profesor BOOLEAN DEFAULT FALSE,
    notas TEXT
);

-- Índices de Rendimiento
CREATE INDEX IF NOT EXISTS idx_alumnos_estado ON alumnos(estado);
CREATE INDEX IF NOT EXISTS idx_turnos_dia_profesor ON turnos(dia, profesor_id);
CREATE INDEX IF NOT EXISTS idx_reservas_fecha ON reservas(fecha_reserva);

-- Vista: Disponibilidad de Cupos en Tiempo Real
CREATE OR REPLACE VIEW vista_turnos_disponibles AS
SELECT 
    t.id AS turno_id,
    t.dia,
    t.hora_inicio,
    t.hora_fin,
    t.tipo,
    t.cupo_max,
    p.id AS profesor_id,
    p.nombre AS profesor_nombre,
    p.especialidad AS profesor_especialidad,
    COUNT(r.id) AS alumnos_inscriptos,
    (t.cupo_max - COUNT(r.id)) AS cupos_libres,
    CASE 
        WHEN (t.cupo_max - COUNT(r.id)) <= 0 THEN 'completo'
        WHEN (t.cupo_max - COUNT(r.id)) = 1 THEN 'ultimo_lugar'
        ELSE 'disponible'
    END AS estado_cupo
FROM turnos t
JOIN profesionales p ON t.profesor_id = p.id
LEFT JOIN reservas r ON t.id = r.turno_id AND r.fecha_reserva = CURRENT_DATE AND r.estado = 'confirmada'
WHERE t.activo = TRUE
GROUP BY t.id, t.dia, t.hora_inicio, t.hora_fin, t.tipo, t.cupo_max, p.id, p.nombre, p.especialidad;
