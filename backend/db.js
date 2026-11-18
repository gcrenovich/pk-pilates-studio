/**
 * PK - Estudio de Pilates & Contrología Corporal
 * Capa de Persistencia y Base de Datos (Backend)
 * Configurado con los Profesionales, Horarios y Aranceles Oficiales
 * Desarrollado por Antigravity (Lead Architect) & Cline (Software Engineer)
 */

const fs = require('fs');
const path = require('path');

let pgPool = null;
if (process.env.DATABASE_URL) {
  try {
    const { Pool } = require('pg');
    pgPool = new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: process.env.DATABASE_URL.includes('localhost') ? false : { rejectUnauthorized: false }
    });
  } catch (err) {
    console.warn('PostgreSQL client no disponible en este entorno:', err.message);
  }
}

const DATA_DIR = path.join(__dirname, '..', 'data');
const DB_FILE = path.join(DATA_DIR, 'database.json');

// Datos Oficiales Reales del Estudio
const REAL_SEED_DATA = {
  configuracion: {
    nombreEstudio: 'PK Estudio de Pilates & Contrología Corporal',
    servicioPrincipal: 'Pilates Kinésico',
    eslogan: 'Tu bienestar, en manos de profesionales de la salud.',
    camasDefault: 6,
    adminPin: '2026',
    telefonoGeneral: '5493884123456',
    beneficios: [
      'Mejorar la movilidad y flexibilidad articular.',
      'Fortalecer la musculatura profunda y postural.',
      'Mejorar la alineación de columna y postura.',
      'Prevenir lesiones y dolores crónicos.',
      'Promover el bienestar físico y calidad de vida.'
    ]
  },
  profesionales: [
    {
      id: 1,
      nombre: 'Lic. Gustavo Moyano',
      titulo: 'Lic. en Kinesiología y Fisioterapia',
      especialidad: 'Pilates Kinésico & Rehabilitación Funcional',
      matricula: 'MP 3.840',
      banco: 'Banco Macro / Billetera Digital',
      alias: 'gustavo.moyano.pk',
      cbu: '2850590940090418135201',
      titular: 'Gustavo Moyano',
      cuit: '20-31849204-7',
      telefono: '5493884123456',
      activo: true,
      diasAtencion: 'Lunes a Viernes',
      turnosDetalle: 'Mañana (08:00 a 09:00 hs) y Siesta (15:00, 16:00 y 17:00 hs)'
    },
    {
      id: 2,
      nombre: 'Lic. Agustina Maidana',
      titulo: 'Lic. en Kinesiología y Fisioterapia',
      especialidad: 'Pilates Kinésico & Reeducación Postural',
      matricula: 'MP 4.120',
      banco: 'Mercado Pago (CVU)',
      alias: 'agustina.maidana.pk',
      cbu: '0000003100084729184512',
      titular: 'Agustina Maidana',
      cuit: '27-36940182-4',
      telefono: '5493885987654',
      activo: true,
      diasAtencion: 'Martes y Jueves',
      turnosDetalle: 'Tarde/Noche (18:00, 19:00 y 20:00 hs)'
    }
  ],
  turnos: [
    // Lic. Gustavo Moyano (Lunes a Viernes)
    // Lunes
    { id: 101, dia: 'Lunes', hora: '08:00 - 09:00', profesorId: 1, tipo: 'Pilates Kinésico (Mañana)', cupoMax: 4, inscriptos: ['Estela Benítez', 'Claudia Ruiz'] },
    { id: 102, dia: 'Lunes', hora: '15:00 - 16:00', profesorId: 1, tipo: 'Pilates Kinésico (Siesta)', cupoMax: 4, inscriptos: ['Marcos Juárez', 'Ana Castro'] },
    { id: 103, dia: 'Lunes', hora: '16:00 - 17:00', profesorId: 1, tipo: 'Pilates Kinésico (Siesta)', cupoMax: 4, inscriptos: ['Rodrigo Morales', 'Camila Ortiz', 'Lucas Díaz'] },
    { id: 104, dia: 'Lunes', hora: '17:00 - 18:00', profesorId: 1, tipo: 'Pilates Kinésico (Siesta)', cupoMax: 4, inscriptos: ['Valeria Gómez'] },

    // Martes (Gustavo siesta + Agustina tarde/noche)
    { id: 105, dia: 'Martes', hora: '08:00 - 09:00', profesorId: 1, tipo: 'Pilates Kinésico (Mañana)', cupoMax: 4, inscriptos: ['Estela Benítez'] },
    { id: 106, dia: 'Martes', hora: '15:00 - 16:00', profesorId: 1, tipo: 'Pilates Kinésico (Siesta)', cupoMax: 4, inscriptos: ['Carla Rossi'] },
    { id: 107, dia: 'Martes', hora: '16:00 - 17:00', profesorId: 1, tipo: 'Pilates Kinésico (Siesta)', cupoMax: 4, inscriptos: ['Sebastián Ríos'] },
    { id: 108, dia: 'Martes', hora: '17:00 - 18:00', profesorId: 1, tipo: 'Pilates Kinésico (Siesta)', cupoMax: 4, inscriptos: ['Julieta Silva', 'Paula Bravo'] },
    // Agustina Maidana - Martes
    { id: 109, dia: 'Martes', hora: '18:00 - 19:00', profesorId: 2, tipo: 'Pilates Kinésico (Tarde/Noche)', cupoMax: 4, inscriptos: ['Mónica Tapia', 'Patricia Sosa'] },
    { id: 110, dia: 'Martes', hora: '19:00 - 20:00', profesorId: 2, tipo: 'Pilates Kinésico (Tarde/Noche)', cupoMax: 4, inscriptos: ['Mariano Vega', 'Lorena Castillo', 'Fabiana Paz', 'Nicolás Albarracín'] }, // Lleno
    { id: 111, dia: 'Martes', hora: '20:00 - 21:00', profesorId: 2, tipo: 'Pilates Kinésico (Noche)', cupoMax: 4, inscriptos: ['Gonzalo Torres'] },

    // Miércoles (Gustavo)
    { id: 112, dia: 'Miércoles', hora: '08:00 - 09:00', profesorId: 1, tipo: 'Pilates Kinésico (Mañana)', cupoMax: 4, inscriptos: ['Claudia Ruiz'] },
    { id: 113, dia: 'Miércoles', hora: '15:00 - 16:00', profesorId: 1, tipo: 'Pilates Kinésico (Siesta)', cupoMax: 4, inscriptos: ['Marcos Juárez'] },
    { id: 114, dia: 'Miércoles', hora: '16:00 - 17:00', profesorId: 1, tipo: 'Pilates Kinésico (Siesta)', cupoMax: 4, inscriptos: ['Camila Ortiz'] },
    { id: 115, dia: 'Miércoles', hora: '17:00 - 18:00', profesorId: 1, tipo: 'Pilates Kinésico (Siesta)', cupoMax: 4, inscriptos: ['Valeria Gómez', 'Agustina Peña'] },

    // Jueves (Gustavo siesta + Agustina tarde/noche)
    { id: 116, dia: 'Jueves', hora: '08:00 - 09:00', profesorId: 1, tipo: 'Pilates Kinésico (Mañana)', cupoMax: 4, inscriptos: ['Estela Benítez'] },
    { id: 117, dia: 'Jueves', hora: '15:00 - 16:00', profesorId: 1, tipo: 'Pilates Kinésico (Siesta)', cupoMax: 4, inscriptos: ['Carla Rossi'] },
    { id: 118, dia: 'Jueves', hora: '16:00 - 17:00', profesorId: 1, tipo: 'Pilates Kinésico (Siesta)', cupoMax: 4, inscriptos: ['Sebastián Ríos', 'Federico Lamas'] },
    { id: 119, dia: 'Jueves', hora: '17:00 - 18:00', profesorId: 1, tipo: 'Pilates Kinésico (Siesta)', cupoMax: 4, inscriptos: ['Julieta Silva'] },
    // Agustina Maidana - Jueves
    { id: 120, dia: 'Jueves', hora: '18:00 - 19:00', profesorId: 2, tipo: 'Pilates Kinésico (Tarde/Noche)', cupoMax: 4, inscriptos: ['Mónica Tapia'] },
    { id: 121, dia: 'Jueves', hora: '19:00 - 20:00', profesorId: 2, tipo: 'Pilates Kinésico (Tarde/Noche)', cupoMax: 4, inscriptos: ['Mariano Vega', 'Lorena Castillo'] },
    { id: 122, dia: 'Jueves', hora: '20:00 - 21:00', profesorId: 2, tipo: 'Pilates Kinésico (Noche)', cupoMax: 4, inscriptos: ['Gonzalo Torres', 'Martín Gil'] },

    // Viernes (Gustavo)
    { id: 123, dia: 'Viernes', hora: '08:00 - 09:00', profesorId: 1, tipo: 'Pilates Kinésico (Mañana)', cupoMax: 4, inscriptos: ['Claudia Ruiz', 'Lucas Díaz'] },
    { id: 124, dia: 'Viernes', hora: '15:00 - 16:00', profesorId: 1, tipo: 'Pilates Kinésico (Siesta)', cupoMax: 4, inscriptos: ['Ana Castro'] },
    { id: 125, dia: 'Viernes', hora: '16:00 - 17:00', profesorId: 1, tipo: 'Pilates Kinésico (Siesta)', cupoMax: 4, inscriptos: ['Rodrigo Morales'] },
    { id: 126, dia: 'Viernes', hora: '17:00 - 18:00', profesorId: 1, tipo: 'Pilates Kinésico (Siesta)', cupoMax: 4, inscriptos: [] }
  ],
  alumnos: [
    {
      id: 201,
      nombre: 'Estela Benítez',
      dni: '28.452.190',
      telefono: '5493884891234',
      habilitado: true,
      patologias: 'Cervicobraquialgia crónica',
      grupoEtario: 'adulto',
      plan: 'Particular (2 clases semanales)',
      montoMensual: 50000,
      obraSocial: 'Particular',
      carnetObraSocial: '',
      estado: 'al_dia',
      ultimoPago: '2026-11-04',
      vencimiento: '2026-12-04',
      kinesiologo: 'Lic. Gustavo Moyano',
      deuda: 0,
      observaciones: 'Evaluación postural inicial completa. Buena evolución.'
    },
    {
      id: 202,
      nombre: 'Mariano Vega',
      dni: '32.145.890',
      telefono: '5493885123987',
      habilitado: true,
      patologias: 'Hernia discal lumbar L5-S1',
      grupoEtario: 'adulto',
      plan: 'Obra Social Instituto de Seguro (2 clases semanales)',
      montoMensual: 35000,
      obraSocial: 'Obra Social Instituto de Seguro',
      carnetObraSocial: '84920',
      estado: 'al_dia',
      ultimoPago: '2026-11-02',
      vencimiento: '2026-12-02',
      kinesiologo: 'Lic. Agustina Maidana',
      deuda: 0,
      observaciones: 'Evitar flexiones bruscas de tronco. Refuerzo de core.'
    },
    {
      id: 203,
      nombre: 'Claudia Ruiz',
      dni: '35.678.912',
      telefono: '5493884321765',
      habilitado: true,
      patologias: 'Rehabilitación postural global / escoliosis',
      grupoEtario: 'adulto',
      plan: 'Obra Social Instituto de Seguro (2 clases semanales)',
      montoMensual: 35000,
      obraSocial: 'Obra Social Instituto de Seguro',
      carnetObraSocial: '12450',
      estado: 'por_vencer',
      ultimoPago: '2026-10-20',
      vencimiento: '2026-11-20',
      kinesiologo: 'Lic. Gustavo Moyano',
      deuda: 0,
      observaciones: 'Asimetría escapular. Trabajo de elongación axial.'
    },
    {
      id: 204,
      nombre: 'Lorena Castillo',
      dni: '29.876.543',
      telefono: '5493885678432',
      habilitado: true,
      patologias: 'Tendinopatía de manguito rotador',
      grupoEtario: 'adulto',
      plan: 'Particular (2 clases semanales)',
      montoMensual: 50000,
      obraSocial: 'Particular',
      carnetObraSocial: '',
      estado: 'atrasado',
      ultimoPago: '2026-09-30',
      vencimiento: '2026-10-30',
      kinesiologo: 'Lic. Agustina Maidana',
      deuda: 50000,
      observaciones: 'Ejercicios de estabilización glenohumeral con resortes livianos.'
    },
    {
      id: 205,
      nombre: 'Marcos Juárez',
      dni: '31.220.456',
      telefono: '5493884112233',
      habilitado: true,
      patologias: 'Lumbalgia mecánica postural',
      grupoEtario: 'adulto',
      plan: 'Particular (2 clases semanales)',
      montoMensual: 50000,
      obraSocial: 'Particular',
      carnetObraSocial: '',
      estado: 'al_dia',
      ultimoPago: '2026-11-05',
      vencimiento: '2026-12-05',
      kinesiologo: 'Lic. Gustavo Moyano',
      deuda: 0,
      observaciones: 'Fortalecimiento de multífidos y transverso abdominal.'
    },
    {
      id: 206,
      nombre: 'Ana Castro',
      dni: '24.331.876',
      telefono: '5493884445566',
      habilitado: true,
      patologias: 'Artrosis de cadera bilateral',
      grupoEtario: 'adulto_mayor',
      plan: 'Particular (2 clases semanales)',
      montoMensual: 50000,
      obraSocial: 'Particular',
      carnetObraSocial: '',
      estado: 'al_dia',
      ultimoPago: '2026-11-01',
      vencimiento: '2026-12-01',
      kinesiologo: 'Lic. Gustavo Moyano',
      deuda: 0,
      observaciones: 'Movilidad suave sin impacto. Excelente apego al tratamiento.'
    },
    {
      id: 207,
      nombre: 'Rodrigo Morales',
      dni: '36.901.234',
      telefono: '5493885778899',
      habilitado: true,
      patologias: 'Rectificación cervical y bruxismo',
      grupoEtario: 'adulto',
      plan: 'Particular (2 clases semanales)',
      montoMensual: 50000,
      obraSocial: 'Particular',
      carnetObraSocial: '',
      estado: 'al_dia',
      ultimoPago: '2026-11-10',
      vencimiento: '2026-12-10',
      kinesiologo: 'Lic. Gustavo Moyano',
      deuda: 0,
      observaciones: 'Relajación miofascial suboccipital y movilidad torácica.'
    },
    {
      id: 208,
      nombre: 'Camila Ortiz',
      dni: '38.412.309',
      telefono: '5493885123456',
      habilitado: true,
      patologias: 'Escoliosis dorsal idiopática',
      grupoEtario: 'adulto',
      plan: 'Obra Social Instituto de Seguro (2 clases semanales)',
      montoMensual: 35000,
      obraSocial: 'Obra Social Instituto de Seguro',
      carnetObraSocial: '45129',
      estado: 'al_dia',
      ultimoPago: '2026-11-06',
      vencimiento: '2026-12-06',
      kinesiologo: 'Lic. Gustavo Moyano',
      deuda: 0,
      observaciones: 'Trabajo correctivo con resortes asimétricos.'
    },
    {
      id: 209,
      nombre: 'Lucas Díaz',
      dni: '33.789.654',
      telefono: '5493884998877',
      habilitado: true,
      patologias: 'Post-rehabilitación LCA rodilla derecha',
      grupoEtario: 'adulto',
      plan: 'Particular (2 clases semanales)',
      montoMensual: 50000,
      obraSocial: 'Particular',
      carnetObraSocial: '',
      estado: 'al_dia',
      ultimoPago: '2026-11-03',
      vencimiento: '2026-12-03',
      kinesiologo: 'Lic. Gustavo Moyano',
      deuda: 0,
      observaciones: 'Propiocepción y cadena cerrada en reformer.'
    },
    {
      id: 210,
      nombre: 'Valeria Gómez',
      dni: '34.567.890',
      telefono: '5493885332211',
      habilitado: true,
      patologias: 'Cervicalgia tensional y cefaleas',
      grupoEtario: 'adulto',
      plan: 'Particular (2 clases semanales)',
      montoMensual: 50000,
      obraSocial: 'Particular',
      carnetObraSocial: '',
      estado: 'al_dia',
      ultimoPago: '2026-11-07',
      vencimiento: '2026-12-07',
      kinesiologo: 'Lic. Gustavo Moyano',
      deuda: 0,
      observaciones: 'Ejercicios de respiración y relajación escapular.'
    },
    {
      id: 211,
      nombre: 'Carla Rossi',
      dni: '30.123.456',
      telefono: '5493884776655',
      habilitado: true,
      patologias: 'Reeducación postural integral',
      grupoEtario: 'adulto',
      plan: 'Particular (2 clases semanales)',
      montoMensual: 50000,
      obraSocial: 'Particular',
      carnetObraSocial: '',
      estado: 'al_dia',
      ultimoPago: '2026-11-08',
      vencimiento: '2026-12-08',
      kinesiologo: 'Lic. Gustavo Moyano',
      deuda: 0,
      observaciones: 'Tonificación general y contrología.'
    },
    {
      id: 212,
      nombre: 'Sebastián Ríos',
      dni: '31.987.654',
      telefono: '5493885223344',
      habilitado: true,
      patologias: 'Protrusión discal L4-L5',
      grupoEtario: 'adulto',
      plan: 'Particular (2 clases semanales)',
      montoMensual: 50000,
      obraSocial: 'Particular',
      carnetObraSocial: '',
      estado: 'al_dia',
      ultimoPago: '2026-11-09',
      vencimiento: '2026-12-09',
      kinesiologo: 'Lic. Gustavo Moyano',
      deuda: 0,
      observaciones: 'Control pélvico neutral. Asiste regularmente.'
    },
    {
      id: 213,
      nombre: 'Julieta Silva',
      dni: '39.012.345',
      telefono: '5493885667788',
      habilitado: true,
      patologias: 'Tendinopatía rotuliana',
      grupoEtario: 'adulto',
      plan: 'Particular (2 clases semanales)',
      montoMensual: 50000,
      obraSocial: 'Particular',
      carnetObraSocial: '',
      estado: 'al_dia',
      ultimoPago: '2026-11-04',
      vencimiento: '2026-12-04',
      kinesiologo: 'Lic. Gustavo Moyano',
      deuda: 0,
      observaciones: 'Fortalecimiento de cuádriceps excéntrico.'
    },
    {
      id: 214,
      nombre: 'Mónica Tapia',
      dni: '27.890.123',
      telefono: '5493885446688',
      habilitado: true,
      patologias: 'Discopatía cervical C5-C6',
      grupoEtario: 'adulto',
      plan: 'Obra Social Instituto de Seguro (2 clases semanales)',
      montoMensual: 35000,
      obraSocial: 'Obra Social Instituto de Seguro',
      carnetObraSocial: '78901',
      estado: 'al_dia',
      ultimoPago: '2026-11-02',
      vencimiento: '2026-12-02',
      kinesiologo: 'Lic. Agustina Maidana',
      deuda: 0,
      observaciones: 'Control de cintura escapular y corrección postural.'
    },
    {
      id: 215,
      nombre: 'Gonzalo Torres',
      dni: '28.901.234',
      telefono: '5493885664466',
      habilitado: true,
      patologias: 'Lumbalgia crónica postural',
      grupoEtario: 'adulto',
      plan: 'Particular (2 clases semanales)',
      montoMensual: 50000,
      obraSocial: 'Particular',
      carnetObraSocial: '',
      estado: 'al_dia',
      ultimoPago: '2026-11-05',
      vencimiento: '2026-12-05',
      kinesiologo: 'Lic. Agustina Maidana',
      deuda: 0,
      observaciones: 'Elongación de isquiotibiales y psoas.'
    },
    {
      id: 216,
      nombre: 'Roberto Fernández',
      dni: '25.678.910',
      telefono: '5493884667788',
      habilitado: false,
      patologias: 'Gonalgia bilateral leve',
      grupoEtario: 'adulto_mayor',
      plan: 'Particular (2 clases semanales)',
      montoMensual: 50000,
      obraSocial: 'Particular',
      carnetObraSocial: '',
      estado: 'atrasado',
      ultimoPago: '2026-08-15',
      vencimiento: '2026-09-15',
      kinesiologo: 'Lic. Gustavo Moyano',
      deuda: 50000,
      observaciones: 'Pausado temporalmente por viaje. Inhabilitado para turnos hasta reactivación.'
    },
    {
      id: 217,
      nombre: 'Marta Solís',
      dni: '23.456.789',
      telefono: '5493884223399',
      habilitado: false,
      patologias: 'Osteopenia y lumbalgia',
      grupoEtario: 'adulto_mayor',
      plan: 'Obra Social Instituto de Seguro (2 clases semanales)',
      montoMensual: 35000,
      obraSocial: 'Obra Social Instituto de Seguro',
      carnetObraSocial: '91234',
      estado: 'por_vencer',
      ultimoPago: '2026-10-18',
      vencimiento: '2026-11-18',
      kinesiologo: 'Lic. Agustina Maidana',
      deuda: 0,
      observaciones: 'En reposo médico preventivo. Retoma el próximo mes.'
    }
  ],
  promociones: [
    {
      id: 301,
      titulo: '🌟 Particular - Pilates Kinésico',
      descripcion: '2 clases semanales personalizadas en camillas Reformer a cargo de Licenciados en Kinesiología y Fisioterapia.',
      precio: 50000,
      ahorro: 'Arancel Oficial',
      tag: 'Plan Particular',
      activa: true
    },
    {
      id: 302,
      titulo: '🩺 Obra Social Instituto de Seguro (ISJ)',
      descripcion: 'Arancel preferencial de $35.000 mensuales presentando carnet correspondiente. Incluye 2 clases semanales con kinesiólogo.',
      precio: 35000,
      ahorro: 'Ahorro $15.000 con Carnet',
      tag: 'Convenio Obra Social',
      activa: true
    }
  ],
  historialPagos: []
};

class Database {
  constructor() {
    this.ensureDirectory();
    this.data = this.read();
    this.postgresInitialized = false;
  }

  async initPostgres() {
    if (!pgPool) return;
    try {
      // 1. Crear tabla para almacenamiento de estado y auditoría si no existe
      await pgPool.query(`
        CREATE TABLE IF NOT EXISTS pk_app_state (
          key VARCHAR(50) PRIMARY KEY,
          data JSONB NOT NULL,
          updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        );
      `);

      // 2. Intentar cargar el último estado guardado
      const res = await pgPool.query(`SELECT data FROM pk_app_state WHERE key = 'app_data' LIMIT 1;`);
      if (res.rows.length > 0 && res.rows[0].data) {
        this.data = res.rows[0].data;
        this.postgresInitialized = true;
        console.log(`✅ [PostgreSQL] Estado cargado exitosamente (${this.data.alumnos?.length || 0} alumnos, ${this.data.turnos?.length || 0} turnos).`);
        try {
          fs.writeFileSync(DB_FILE, JSON.stringify(this.data, null, 2), 'utf-8');
        } catch (e) { }
      } else {
        // Primera ejecución con la base de datos vacía: sembrar datos iniciales
        await pgPool.query(`
          INSERT INTO pk_app_state (key, data, updated_at)
          VALUES ('app_data', $1, CURRENT_TIMESTAMP)
          ON CONFLICT (key) DO UPDATE SET data = EXCLUDED.data, updated_at = CURRENT_TIMESTAMP;
        `, [JSON.stringify(this.data)]);
        this.postgresInitialized = true;
        console.log('✅ [PostgreSQL] Datos iniciales sincronizados en la nube.');
      }
    } catch (err) {
      console.error('⚠️ [PostgreSQL] Error de inicialización/sincronización:', err.message);
    }
  }

  ensureDirectory() {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    if (!fs.existsSync(DB_FILE)) {
      fs.writeFileSync(DB_FILE, JSON.stringify(REAL_SEED_DATA, null, 2), 'utf-8');
    }
  }

  read() {
    try {
      const content = fs.readFileSync(DB_FILE, 'utf-8');
      const parsed = JSON.parse(content);
      if (Array.isArray(parsed.alumnos)) {
        parsed.alumnos.forEach(a => {
          if (a.habilitado === undefined) a.habilitado = true;
          if (a.dni === undefined) a.dni = '';
          if (a.carnetObraSocial === undefined) a.carnetObraSocial = '';
          if (a.grupoEtario === undefined) a.grupoEtario = 'adulto';
          if (a.observaciones === undefined) a.observaciones = '';
        });
      }
      return parsed;
    } catch (e) {
      return JSON.parse(JSON.stringify(REAL_SEED_DATA));
    }
  }

  save() {
    try {
      fs.writeFileSync(DB_FILE, JSON.stringify(this.data, null, 2), 'utf-8');
    } catch (e) {
      console.error('Error guardando DB en disco:', e);
    }

    // Sincronización en tiempo real con PostgreSQL
    if (pgPool) {
      pgPool.query(`
        INSERT INTO pk_app_state (key, data, updated_at)
        VALUES ('app_data', $1, CURRENT_TIMESTAMP)
        ON CONFLICT (key) DO UPDATE SET data = EXCLUDED.data, updated_at = CURRENT_TIMESTAMP;
      `, [JSON.stringify(this.data)]).catch(err => {
        console.error('⚠️ [PostgreSQL] Error al persistir datos:', err.message);
      });
    }

    return true;
  }

  // Configuración
  getConfiguracion() {
    return this.data.configuracion;
  }

  actualizarConfiguracion(conf) {
    Object.assign(this.data.configuracion, conf);
    if (conf.camasDefault) {
      const camas = parseInt(conf.camasDefault);
      this.data.configuracion.camasDefault = camas;
      if (conf.actualizarCuposTurnos) {
        this.data.turnos.forEach(t => { t.cupoMax = camas; });
      }
    }
    if (conf.adminPin) {
      this.data.configuracion.adminPin = String(conf.adminPin);
    }
    this.save();
    return this.data.configuracion;
  }

  // Profesores
  getProfesionales() {
    return this.data.profesionales;
  }

  getProfesionalById(id) {
    return this.data.profesionales.find(p => p.id === parseInt(id));
  }

  crearProfesional(profe) {
    profe.id = Date.now();
    profe.activo = true;
    this.data.profesionales.push(profe);
    this.save();
    return profe;
  }

  actualizarProfesional(id, datos) {
    const profe = this.data.profesionales.find(p => p.id === parseInt(id));
    if (profe) {
      Object.assign(profe, datos);
      this.save();
      return profe;
    }
    return null;
  }

  eliminarProfesional(id) {
    const idNum = parseInt(id);
    this.data.profesionales = this.data.profesionales.filter(p => p.id !== idNum);
    this.data.turnos.forEach(t => {
      if (t.profesorId === idNum) t.profesorId = this.data.profesionales[0]?.id || 1;
    });
    this.save();
    return true;
  }

  // Auditoría Automática de Vencimientos y Liberación de Camas Reformer
  evaluarVencimientosYLiberarCupos() {
    const hoyStr = new Date().toISOString().split('T')[0];
    const hoy = new Date(hoyStr);
    let huboCambios = false;
    const liberaciones = [];

    if (!Array.isArray(this.data.alumnos) || !Array.isArray(this.data.turnos)) {
      return { liberaciones, count: 0 };
    }

    this.data.alumnos.forEach(alumno => {
      if (!alumno.vencimiento) return;
      const fVenc = new Date(alumno.vencimiento);
      const diffMs = fVenc - hoy;
      const diffDias = Math.ceil(diffMs / (1000 * 60 * 60 * 24));

      // 1. Caso Vencido / Deuda: Si venció o está marcado con deuda o atrasado
      const estaVencido = diffDias < 0;
      const tieneDeuda = (alumno.deuda && alumno.deuda > 0);
      const estaAtrasado = alumno.estado === 'atrasado';

      if (estaVencido || tieneDeuda || estaAtrasado) {
        // Pausar e inhabilitar automáticamente
        if (alumno.habilitado !== false) {
          alumno.habilitado = false;
          huboCambios = true;
        }
        if (alumno.estado !== 'atrasado') {
          alumno.estado = 'atrasado';
          huboCambios = true;
        }
        if (!alumno.deuda || alumno.deuda <= 0) {
          alumno.deuda = alumno.montoMensual || 50000;
          huboCambios = true;
        }

        // LIBERACIÓN AUTOMÁTICA DE CAMA:
        // Se desinscribe de los turnos para que otros alumnos puedan ver y reservar el cupo
        const nombreBuscado = (alumno.nombre || '').trim().toLowerCase();
        if (nombreBuscado) {
          this.data.turnos.forEach(t => {
            if (Array.isArray(t.inscriptos)) {
              const cantAntes = t.inscriptos.length;
              t.inscriptos = t.inscriptos.filter(nom => nom.trim().toLowerCase() !== nombreBuscado);
              if (t.inscriptos.length < cantAntes) {
                huboCambios = true;
                liberaciones.push({
                  alumnoId: alumno.id,
                  alumnoNombre: alumno.nombre,
                  turnoId: t.id,
                  dia: t.dia,
                  hora: t.hora
                });
                console.log(`[Auto-Pausa] Cama liberada en ${t.dia} ${t.hora} por vencimiento de ${alumno.nombre}`);
              }
            }
          });
        }
      } else if (diffDias <= 5) {
        if (alumno.estado !== 'por_vencer' && alumno.estado !== 'atrasado') {
          alumno.estado = 'por_vencer';
          huboCambios = true;
        }
      } else {
        if (alumno.estado === 'por_vencer') {
          alumno.estado = 'al_dia';
          huboCambios = true;
        }
      }
    });

    if (huboCambios) {
      this.save();
    }

    return { liberaciones, count: liberaciones.length };
  }

  // Alumnos
  getAlumnos() {
    this.evaluarVencimientosYLiberarCupos();
    return this.data.alumnos;
  }

  crearAlumno(nuevo) {
    nuevo.id = Date.now();
    nuevo.habilitado = (nuevo.habilitado !== false && nuevo.habilitado !== 'false');
    nuevo.dni = nuevo.dni ? String(nuevo.dni).trim() : '';
    nuevo.carnetObraSocial = nuevo.carnetObraSocial ? String(nuevo.carnetObraSocial).trim() : '';
    nuevo.grupoEtario = nuevo.grupoEtario || 'adulto';
    nuevo.observaciones = nuevo.observaciones ? String(nuevo.observaciones).trim() : '';
    nuevo.kinesiologo = nuevo.kinesiologo || 'Lic. Gustavo Moyano';
    nuevo.montoMensual = parseInt(nuevo.montoMensual) || (nuevo.obraSocial?.includes('Seguro') ? 35000 : 50000);
    nuevo.estado = nuevo.estado || 'al_dia';
    nuevo.deuda = nuevo.estado === 'atrasado' ? nuevo.montoMensual : 0;
    nuevo.ultimoPago = nuevo.ultimoPago || new Date().toISOString().split('T')[0];
    const venc = new Date();
    venc.setDate(venc.getDate() + 30);
    nuevo.vencimiento = nuevo.vencimiento || venc.toISOString().split('T')[0];
    this.data.alumnos.push(nuevo);
    this.save();
    return nuevo;
  }

  actualizarAlumno(id, datos) {
    const alumno = this.data.alumnos.find(a => a.id === parseInt(id));
    if (alumno) {
      if (datos.habilitado !== undefined) {
        datos.habilitado = (datos.habilitado === true || datos.habilitado === 'true');
      }
      Object.assign(alumno, datos);
      if (alumno.montoMensual) alumno.montoMensual = parseInt(alumno.montoMensual);
      if (alumno.estado === 'atrasado') {
        alumno.deuda = alumno.montoMensual;
      } else if (alumno.estado === 'al_dia') {
        alumno.deuda = 0;
      }
      this.save();
      return alumno;
    }
    return null;
  }

  toggleHabilitacionAlumno(id) {
    const alumno = this.data.alumnos.find(a => a.id === parseInt(id));
    if (alumno) {
      alumno.habilitado = !alumno.habilitado;
      // Si se pasa manualmente a En Pausa / Inhabilitado, liberar sus camas
      if (!alumno.habilitado) {
        const nombreBuscado = (alumno.nombre || '').trim().toLowerCase();
        if (nombreBuscado) {
          this.data.turnos.forEach(t => {
            if (Array.isArray(t.inscriptos)) {
              t.inscriptos = t.inscriptos.filter(nom => nom.trim().toLowerCase() !== nombreBuscado);
            }
          });
        }
      }
      this.save();
      return alumno;
    }
    return null;
  }

  eliminarAlumno(id) {
    const idNum = parseInt(id);
    const alumno = this.data.alumnos.find(a => a.id === idNum);
    if (!alumno) return false;

    this.data.turnos.forEach(t => {
      t.inscriptos = t.inscriptos.filter(n => n.toLowerCase() !== alumno.nombre.toLowerCase());
    });
    this.data.alumnos = this.data.alumnos.filter(a => a.id !== idNum);
    this.save();
    return true;
  }

  registrarPago(alumnoId) {
    const alumno = this.data.alumnos.find(a => a.id === parseInt(alumnoId));
    if (alumno) {
      alumno.estado = 'al_dia';
      alumno.habilitado = true; // REHABILITADO AUTOMÁTICAMENTE AL ABONAR
      alumno.deuda = 0;
      alumno.ultimoPago = new Date().toISOString().split('T')[0];
      const proximo = new Date();
      proximo.setDate(proximo.getDate() + 30);
      alumno.vencimiento = proximo.toISOString().split('T')[0];
      this.save();
      return alumno;
    }
    return null;
  }

  // Turnos & Camas
  getTurnos() {
    this.evaluarVencimientosYLiberarCupos();
    return this.data.turnos;
  }

  crearTurno(nuevoTurno) {
    nuevoTurno.id = Date.now();
    nuevoTurno.profesorId = parseInt(nuevoTurno.profesorId);
    nuevoTurno.cupoMax = parseInt(nuevoTurno.cupoMax) || this.data.configuracion.camasDefault;
    nuevoTurno.inscriptos = nuevoTurno.inscriptos || [];
    this.data.turnos.push(nuevoTurno);
    this.save();
    return nuevoTurno;
  }

  actualizarTurno(id, datos) {
    const turno = this.data.turnos.find(t => t.id === parseInt(id));
    if (turno) {
      Object.assign(turno, datos);
      if (turno.profesorId) turno.profesorId = parseInt(turno.profesorId);
      if (turno.cupoMax) turno.cupoMax = parseInt(turno.cupoMax);
      this.save();
      return turno;
    }
    return null;
  }

  eliminarTurno(id) {
    const idNum = parseInt(id);
    this.data.turnos = this.data.turnos.filter(t => t.id !== idNum);
    this.save();
    return true;
  }

  reservarCupo(turnoId, nombreAlumno, telefono, metodoPago, obraSocial) {
    this.evaluarVencimientosYLiberarCupos();
    const turno = this.data.turnos.find(t => t.id === parseInt(turnoId));
    if (!turno) return { ok: false, msg: 'Turno no encontrado' };
    if (turno.inscriptos.length >= turno.cupoMax) {
      return { ok: false, msg: 'Todas las camas de este horario se encuentran ocupadas.' };
    }
    if (turno.inscriptos.includes(nombreAlumno)) {
      return { ok: false, msg: 'Ya tienes reservada una cama en este turno.' };
    }

    // Validar si el alumno ya existe en el padrón y está en pausa o atrasado
    let alumno = this.data.alumnos.find(a => a.nombre.toLowerCase() === nombreAlumno.toLowerCase());
    if (alumno && (alumno.habilitado === false || alumno.estado === 'atrasado')) {
      return {
        ok: false,
        msg: `El alumno "${alumno.nombre}" se encuentra en pausa o con cuota vencida. Debe regularizar su estado para poder reservar una cama Reformer.`
      };
    }

    turno.inscriptos.push(nombreAlumno);

    let alumno = this.data.alumnos.find(a => a.nombre.toLowerCase() === nombreAlumno.toLowerCase());
    if (!alumno) {
      const profe = this.data.profesionales.find(p => p.id === turno.profesorId);
      const hoy = new Date();
      const venc = new Date(hoy.getTime() + 30 * 24 * 60 * 60 * 1000);
      const esObraSocial = obraSocial && obraSocial.toLowerCase().includes('seguro');
      const monto = esObraSocial ? 35000 : 50000;

      alumno = {
        id: Date.now(),
        nombre: nombreAlumno,
        dni: '',
        telefono: telefono || '',
        habilitado: true,
        patologias: 'Inscripción online automática',
        grupoEtario: 'adulto',
        plan: esObraSocial ? 'Obra Social Instituto de Seguro (2 clases)' : 'Particular (2 clases)',
        montoMensual: monto,
        obraSocial: obraSocial || 'Particular',
        carnetObraSocial: '',
        estado: 'al_dia',
        ultimoPago: hoy.toISOString().split('T')[0],
        vencimiento: venc.toISOString().split('T')[0],
        kinesiologo: profe ? profe.nombre : 'Lic. Gustavo Moyano',
        deuda: 0,
        observaciones: 'Inscripto vía web / turnero'
      };
      this.data.alumnos.push(alumno);
    }

    this.save();
    return { ok: true, turno, alumno };
  }

  liberarCupo(turnoId, nombreAlumno) {
    const turno = this.data.turnos.find(t => t.id === parseInt(turnoId));
    if (turno) {
      turno.inscriptos = turno.inscriptos.filter(n => n !== nombreAlumno);
      this.save();
      return true;
    }
    return false;
  }

  // Promociones
  getPromociones() {
    return this.data.promociones;
  }

  togglePromocion(promoId) {
    const p = this.data.promociones.find(item => item.id === parseInt(promoId));
    if (p) {
      p.activa = !p.activa;
      this.save();
      return p;
    }
    return null;
  }

  crearPromocion(nueva) {
    nueva.id = Date.now();
    nueva.precio = parseInt(nueva.precio) || 50000;
    nueva.activa = true;
    this.data.promociones.push(nueva);
    this.save();
    return nueva;
  }
  reubicarCupo(origenId, destinoId, nombreAlumno) {
    const origen = this.data.turnos.find(t => t.id === parseInt(origenId));
    const destino = this.data.turnos.find(t => t.id === parseInt(destinoId));
    if (!origen || !destino) return { ok: false, msg: 'Turnos no encontrados' };
    if (destino.inscriptos.length >= destino.cupoMax) return { ok: false, msg: 'El turno destino no tiene camas disponibles' };
    origen.inscriptos = origen.inscriptos.filter(n => n.toLowerCase() !== nombreAlumno.toLowerCase());
    if (!destino.inscriptos.some(n => n.toLowerCase() === nombreAlumno.toLowerCase())) {
      destino.inscriptos.push(nombreAlumno);
    }
    this.save();
    return { ok: true, origen, destino };
  }

  // Backup & Respaldo Permanente
  obtenerRespaldoCompleto() {
    return this.data;
  }

  importarRespaldo(backupData) {
    if (!backupData) return false;
    if (backupData.configuracion) Object.assign(this.data.configuracion, backupData.configuracion);
    if (Array.isArray(backupData.profesionales) && backupData.profesionales.length > 0) {
      this.data.profesionales = backupData.profesionales;
    }
    if (Array.isArray(backupData.turnos) && backupData.turnos.length > 0) {
      this.data.turnos = backupData.turnos;
    }
    if (Array.isArray(backupData.alumnos) && backupData.alumnos.length > 0) {
      this.data.alumnos = backupData.alumnos;
    }
    if (Array.isArray(backupData.promociones) && backupData.promociones.length > 0) {
      this.data.promociones = backupData.promociones;
    }
    this.save();
    return true;
  }
}

module.exports = new Database();
