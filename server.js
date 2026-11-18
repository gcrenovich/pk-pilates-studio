// Servidor HTTP & API REST para PILATES KINÉSICO (Zero Dependencies)
// Desarrollado por Antigravity (Systems Engineer) & Cline (Software Engineer)

const http = require('http');
const fs = require('fs');
const path = require('path');

const db = require('./backend/db');
const whatsappService = require('./backend/whatsappService');

const PORT = process.env.PORT || 3000;
const PUBLIC_DIR = __dirname;

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon'
};

// Helper para leer body JSON
function getRequestBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', chunk => { body += chunk.toString(); });
    req.on('end', () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch (err) {
        resolve({});
      }
    });
    req.on('error', err => reject(err));
  });
}

// Helper para responder JSON
function sendJSON(res, statusCode, data) {
  res.writeHead(statusCode, {
    'Content-Type': 'application/json; charset=utf-8',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type'
  });
  res.end(JSON.stringify(data));
}

const server = http.createServer(async (req, res) => {
  // Manejo de preflight CORS
  if (req.method === 'OPTIONS') {
    res.writeHead(204, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type'
    });
    return res.end();
  }

  const parsedUrl = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
  const pathname = parsedUrl.pathname;
  const method = req.method;

  // ==========================================
  // RUTAS DE LA API REST (/api/...)
  // ==========================================

  // 1. Estado y Configuración
  if (pathname === '/api/status' && method === 'GET') {
    return sendJSON(res, 200, {
      status: 'online',
      estudio: db.getConfiguracion(),
      turnosCount: db.getTurnos().length,
      alumnosCount: db.getAlumnos().length,
      profesionalesCount: db.getProfesionales().length
    });
  }

  if (pathname === '/api/configuracion' && method === 'GET') {
    return sendJSON(res, 200, db.getConfiguracion());
  }

  if (pathname === '/api/configuracion' && method === 'PUT') {
    const body = await getRequestBody(req);
    const updated = db.actualizarConfiguracion(body);
    return sendJSON(res, 200, updated);
  }

  // 2. ABM PROFESORES / LICENCIADOS
  if (pathname === '/api/profesionales' && method === 'GET') {
    return sendJSON(res, 200, db.getProfesionales());
  }

  if (pathname === '/api/profesionales' && method === 'POST') {
    const body = await getRequestBody(req);
    if (!body.nombre) return sendJSON(res, 400, { error: 'El nombre es obligatorio' });
    const nuevo = db.crearProfesional(body);
    return sendJSON(res, 201, nuevo);
  }

  if (pathname.startsWith('/api/profesionales/') && method === 'PUT') {
    const id = pathname.split('/')[3];
    const body = await getRequestBody(req);
    const updated = db.actualizarProfesional(id, body);
    if (!updated) return sendJSON(res, 404, { error: 'Profesional no encontrado' });
    return sendJSON(res, 200, updated);
  }

  if (pathname.startsWith('/api/profesionales/') && method === 'DELETE') {
    const id = pathname.split('/')[3];
    const ok = db.eliminarProfesional(id);
    return sendJSON(res, 200, { ok });
  }

  // 3. ABM ALUMNOS
  if (pathname === '/api/alumnos' && method === 'GET') {
    return sendJSON(res, 200, db.getAlumnos());
  }

  if (pathname === '/api/alumnos' && method === 'POST') {
    const body = await getRequestBody(req);
    if (!body.nombre) return sendJSON(res, 400, { error: 'El nombre es obligatorio' });
    const nuevo = db.crearAlumno(body);
    return sendJSON(res, 201, nuevo);
  }

  if (pathname.startsWith('/api/alumnos/') && method === 'PUT') {
    const id = pathname.split('/')[3];
    const body = await getRequestBody(req);
    const updated = db.actualizarAlumno(id, body);
    if (!updated) return sendJSON(res, 404, { error: 'Alumno no encontrado' });
    return sendJSON(res, 200, updated);
  }

  if (pathname.startsWith('/api/alumnos/') && method === 'DELETE') {
    const id = pathname.split('/')[3];
    const ok = db.eliminarAlumno(id);
    return sendJSON(res, 200, { ok });
  }

  if (pathname.startsWith('/api/alumnos/') && pathname.endsWith('/pago') && method === 'POST') {
    const id = pathname.split('/')[3];
    const updated = db.registrarPago(id);
    if (!updated) return sendJSON(res, 404, { error: 'Alumno no encontrado' });
    return sendJSON(res, 200, updated);
  }

  if (pathname.startsWith('/api/alumnos/') && pathname.endsWith('/toggle-habilitar') && method === 'POST') {
    const id = pathname.split('/')[3];
    const updated = db.toggleHabilitacionAlumno(id);
    if (!updated) return sendJSON(res, 404, { error: 'Alumno no encontrado' });
    return sendJSON(res, 200, updated);
  }

  // 4. ABM TURNOS, HORARIOS Y CAMAS REFORMER
  if (pathname === '/api/turnos' && method === 'GET') {
    return sendJSON(res, 200, db.getTurnos());
  }

  if (pathname === '/api/turnos' && method === 'POST') {
    const body = await getRequestBody(req);
    if (!body.dia || !body.hora) return sendJSON(res, 400, { error: 'Día y horario son obligatorios' });
    const nuevo = db.crearTurno(body);
    return sendJSON(res, 201, nuevo);
  }

  if (pathname.startsWith('/api/turnos/') && method === 'PUT') {
    const id = pathname.split('/')[3];
    const body = await getRequestBody(req);
    const updated = db.actualizarTurno(id, body);
    if (!updated) return sendJSON(res, 404, { error: 'Turno no encontrado' });
    return sendJSON(res, 200, updated);
  }

  if (pathname.startsWith('/api/turnos/') && method === 'DELETE') {
    const id = pathname.split('/')[3];
    const ok = db.eliminarTurno(id);
    return sendJSON(res, 200, { ok });
  }

  if (pathname.startsWith('/api/turnos/') && pathname.endsWith('/reservar') && method === 'POST') {
    const id = pathname.split('/')[3];
    const body = await getRequestBody(req);
    const resReserva = db.reservarCupo(id, body.nombre, body.telefono, body.metodoPago, body.lesion, body.grupoEtario);
    return sendJSON(res, resReserva.ok ? 200 : 400, resReserva);
  }

  if (pathname.startsWith('/api/turnos/') && pathname.endsWith('/liberar') && method === 'POST') {
    const id = pathname.split('/')[3];
    const body = await getRequestBody(req);
    const ok = db.liberarCupo(id, body.nombreAlumno);
    return sendJSON(res, 200, { ok });
  }

  if (pathname === '/api/turnos/reubicar' && method === 'POST') {
    const body = await getRequestBody(req);
    const resReubicar = db.reubicarCupo(body.origenId, body.destinoId, body.nombreAlumno);
    return sendJSON(res, resReubicar.ok ? 200 : 400, resReubicar);
  }

  // 5. PROMOCIONES
  if (pathname === '/api/promociones' && method === 'GET') {
    return sendJSON(res, 200, db.getPromociones());
  }

  if (pathname === '/api/promociones' && method === 'POST') {
    const body = await getRequestBody(req);
    const nueva = db.crearPromocion(body);
    return sendJSON(res, 201, nueva);
  }

  if (pathname.startsWith('/api/promociones/') && pathname.endsWith('/toggle') && method === 'PUT') {
    const id = pathname.split('/')[3];
    const toggled = db.togglePromocion(id);
    return sendJSON(res, 200, toggled);
  }

  if (pathname.startsWith('/api/promociones/') && method === 'DELETE') {
    const id = pathname.split('/')[3];
    const ok = db.eliminarPromocion(id);
    return sendJSON(res, 200, { ok });
  }

  // 6. WHATSAPP WEBHOOK
  if (pathname === '/api/webhook/whatsapp' && method === 'GET') {
    const mode = parsedUrl.searchParams.get('hub.mode');
    const token = parsedUrl.searchParams.get('hub.verify_token');
    const challenge = parsedUrl.searchParams.get('hub.challenge');
    const result = whatsappService.verify(mode, token, challenge);
    if (result.ok) {
      res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
      return res.end(result.challenge);
    }
    return sendJSON(res, 403, result);
  }

  if (pathname === '/api/webhook/whatsapp' && method === 'POST') {
    const body = await getRequestBody(req);
    const result = whatsappService.processWebhook(body);
    return sendJSON(res, 200, result);
  }

  if (pathname === '/api/webhook/whatsapp/logs' && method === 'GET') {
    return sendJSON(res, 200, whatsappService.getLogs());
  }

  // 6. COPIA DE SEGURIDAD & RESPALDO PERMANENTE (JSON BACKUP / RESTORE)
  if (pathname === '/api/backup' && method === 'GET') {
    return sendJSON(res, 200, db.obtenerRespaldoCompleto());
  }

  if (pathname === '/api/backup' && method === 'POST') {
    const body = await getRequestBody(req);
    const ok = db.importarRespaldo(body);
    return sendJSON(res, 200, { ok, data: db.obtenerRespaldoCompleto() });
  }

  // ==========================================
  // SERVIR ARCHIVOS ESTÁTICOS DE FRONTEND
  // ==========================================
  let reqUrl = pathname;
  if (reqUrl === '/') reqUrl = '/index.html';

  const filePath = path.join(PUBLIC_DIR, decodeURIComponent(reqUrl));

  if (!filePath.startsWith(PUBLIC_DIR)) {
    res.writeHead(403, { 'Content-Type': 'text/plain; charset=utf-8' });
    return res.end('Acceso denegado');
  }

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      return res.end('Archivo no encontrado');
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    res.writeHead(200, {
      'Content-Type': contentType,
      'Access-Control-Allow-Origin': '*'
    });

    const readStream = fs.createReadStream(filePath);
    readStream.pipe(res);
  });
});

async function startServer() {
  if (db.initPostgres) {
    try {
      await db.initPostgres();
    } catch (err) {
      console.warn('Advertencia inicializando base de datos:', err.message);
    }
  }

  server.listen(PORT, '0.0.0.0', () => {
    console.log(`====================================================`);
    console.log(`🧘 PILATES KINÉSICO`);
    console.log(`🌐 Servidor iniciado con éxito (API REST + WhatsApp Webhook):`);
    console.log(`👉 En esta computadora:  http://localhost:${PORT}`);
    console.log(`👉 En tu celular (mismo WiFi): http://<TU_IP_LOCAL>:${PORT}`);
    if (process.env.DATABASE_URL) {
      console.log(`🗄️ Persistencia en la nube activada (PostgreSQL conectado)`);
    } else {
      console.log(`💾 Persistencia local (JSON en disco)`);
    }
    console.log(`====================================================`);
  });
}

startServer();
