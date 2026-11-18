# PILATES KINÉSICO
> **Plataforma Web Responsive, Sistema de Gestión de Camas Reformer & Turnero WhatsApp**  
> *Desarrollado en conjunto por Antigravity (Systems Engineer) & Cline (Software Engineer)*

---

## 🎨 Identidad & Propuesta de Valor
- **Nombre Oficial**: **PILATES KINÉSICO**
- **Dirección / Profesionales**: Clases a cargo exclusivo de Licenciados en Kinesiología y Fisioterapia, profesionales de la salud especializados en el movimiento y la rehabilitación en camillas Reformer.
- **Paleta de Marca**:
  - Violeta PK: `#7A1E7B`
  - Turquesa PK: `#00A8B5`
  - Azul Marino: `#0F172A`

---

## 👨‍⚕️ Equipo de Kinesiólogos y Horarios Oficiales

### Lic. Gustavo Moyano
- **Especialidad**: Licenciado en Kinesiología y Fisioterapia.
- **Días y Horarios**:
  - **Lunes a viernes**:
    - Turno mañana: `08:00` y `09:00` hs.
    - Turno siesta: `15:00`, `16:00` y `17:00` hs.
- **Alias de Cobro**: `gustavo.pilates.kine`

### Lic. Agustina Maidana
- **Especialidad**: Licenciada en Kinesiología y Fisioterapia.
- **Días y Horarios**:
  - **Martes y jueves**:
    - Turno tarde: `18:00`, `19:00` y `20:00` hs.
- **Alias de Cobro**: `agustina.kine.pilates`

---

## 💰 Aranceles Mensuales
- 🔹 **Abono Particular**: **$50.000 mensuales** (Incluye 2 clases semanales en camillas Reformer).
- 🔹 **Obra Social Instituto de Seguro**: Presentando el carnet correspondiente, se abona un adicional de **$35.000 mensuales** (Incluye 2 clases semanales).

---

## 🛠️ Módulos de Gestión Implementados
1. **Padrón Central de Alumnos & Control de Habilitaciones**:
   - Registro de alumnos habilitados y en pausa/inhabilitados.
   - Buscador en tiempo real por Nombre, DNI, WhatsApp, Patología, Obra Social o Kinesiólogo.
   - Filtros instantáneos: Todos, Habilitados, Inhabilitados, Al Día, Por Vencer y Con Deuda.
   - Asignación directa a camas reformer con 1 clic desde el padrón y desde la ventana del turno.
   - Ficha médica con patologías, notas kinésicas, grupo etario (Adulto / Senior 60+) y estado financiero.
2. **Grilla Semanal de Clases & Camas Reformer (Estilo SigueFit)**:
   - Vista de 5 columnas semanales con scroll horizontal suave en celulares y expansión en pantallas grandes.
   - Selector por día individual y filtro por profesional.
   - Ventana emergente al tocar cada turno mostrando los alumnos asignados cama por cama (Cama 1 a Cama N).
   - Ajuste dinámico de camas reformer con algoritmo de consenso para reducción sin pérdida de alumnos.
3. **ABM de Profesores & Cuentas de Cobro**:
   - Gestión integral de 12 campos (matrículas, teléfonos, días, turnos, datos bancarios, Alias, CBU, CVU).
   - Reasignación automática de turnos en caso de baja para garantizar continuidad de alumnos.
4. **Seguridad & Acceso Protegido por PIN**:
   - Panel de control ABM protegido bajo clave (PIN por defecto `2026`).
   - Bloqueo de sesión con 1 clic desde la barra superior.
5. **Chatbot Inteligente de WhatsApp & Turnero Web**:
   - Inscripción de alumnos por formulario interactivo, selector de kinesiólogo y checkboxes de horarios semanales.

---

## 🚀 Despliegue en Hosting Gratuito

Consulta la guía detallada paso a paso en [DEPLOYMENT_GUIDE.md](file:///c:/Users/AnalistaIT/.gemini/antigravity/scratch/pk-pilates-studio/DEPLOYMENT_GUIDE.md) para subir la plataforma a **Render.com** (100% gratuito con HTTPS), **Railway** o **Vercel** en menos de 3 minutos.

---

## 💻 Ejecución Local

```bash
npm start
```
- Acceso en computadora: `http://localhost:3000`
- Acceso desde celular (mismo WiFi): `http://<IP_LOCAL>:3000`
- Modo Local PWA: Abrir directamente [`index.html`](file:///c:/Users/AnalistaIT/.gemini/antigravity/scratch/pk-pilates-studio/index.html) en el navegador.
