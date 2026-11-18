# System Patterns & Architecture

## Arquitectura de Capas
1. **Frontend / Presentación (Mobile-First)**:
   - Diseño adaptable con breakpoints móviles (360px - 768px) y de escritorio (1024px+).
   - Componentes modulares con Tailwind CSS y paleta de marca PK.
2. **Capa de Negocio y Estado (State Store)**:
   - `Store` reactivo con persistencia local (`localStorage`) que contiene:
     - `turnos`: Lista de clases con horarios, profesor asignado, cupo máximo y alumnos inscritos.
     - `alumnos`: Lista de clientes con estados de cuota (`al_dia`, `por_vencer`, `atrasado`), plan y fecha.
     - `promociones`: Promociones activas/inactivas con descuentos o combos.
     - `profesionales`: Datos de kinesiólogos y sus cuentas bancarias/digitales (Alias, CBU, CVU, banco).
3. **Capa de Comunicación (WhatsApp Engine)**:
   - Generador dinámico de deep-links de WhatsApp (`wa.me`) con templates de mensajes para confirmación de turnos, envío de comprobantes y recordatorio de pago a morosos.
   - Simulador interactivo de bot conversacional.
4. **Capa de Backend (Fase 2)**:
   - Migración a API REST / Serverless con Supabase/PostgreSQL y webhook de WhatsApp Cloud API.

