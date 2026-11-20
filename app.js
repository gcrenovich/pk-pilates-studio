/**
 * PK - Estudio de Pilates & Contrología Corporal
 * Arquitectura de Software: Antigravity (Systems Engineer) & Cline (Software Engineer)
 * Estado Centralizado, Lógica de Negocio y Cliente API (Datos Oficiales)
 */

const STORAGE_KEYS = {
  TURNOS: 'pk_turnos_v8',
  ALUMNOS: 'pk_alumnos_v8',
  PROFESIONALES: 'pk_profesionales_v8',
  PROMOCIONES: 'pk_promociones_v8',
  CONFIGURACION: 'pk_configuracion_v8',
  PENDING_MUTATIONS: 'pk_pending_mutations_v8'
};

const SEED_DATA = {
  configuracion: {
    nombreEstudio: 'PK Estudio de Pilates & Contrología Corporal',
    servicioPrincipal: 'Pilates Kinésico',
    eslogan: 'Tu bienestar, en manos de profesionales de la salud.',
    camasDefault: 6,
    adminPin: '2026',
    telefonoGeneral: '5493884123456',
    beneficios: [
      'Mejorar la movilidad y flexibilidad.',
      'Fortalecer la musculatura.',
      'Mejorar la postura.',
      'Prevenir lesiones.',
      'Promover el bienestar físico y una mejor calidad de vida.'
    ]
  },
  profesionales: [
    {
      id: 1,
      nombre: 'Lic. Gustavo Moyano',
      titulo: 'Licenciado en Kinesiología y Fisioterapia',
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
      titulo: 'Licenciada en Kinesiología y Fisioterapia',
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
    {
        "id": 101,
        "dia": "Lunes",
        "hora": "08:00 - 09:00",
        "profesorId": 1,
        "tipo": "Pilates Kinésico (Mañana)",
        "cupoMax": 6,
        "inscriptos": []
    },
    {
        "id": 102,
        "dia": "Lunes",
        "hora": "15:00 - 16:00",
        "profesorId": 1,
        "tipo": "Pilates Kinésico (Siesta)",
        "cupoMax": 6,
        "inscriptos": []
    },
    {
        "id": 103,
        "dia": "Lunes",
        "hora": "16:00 - 17:00",
        "profesorId": 1,
        "tipo": "Pilates Kinésico (Siesta)",
        "cupoMax": 6,
        "inscriptos": []
    },
    {
        "id": 104,
        "dia": "Lunes",
        "hora": "17:00 - 18:00",
        "profesorId": 1,
        "tipo": "Pilates Kinésico (Siesta)",
        "cupoMax": 6,
        "inscriptos": []
    },
    {
        "id": 105,
        "dia": "Martes",
        "hora": "08:00 - 09:00",
        "profesorId": 1,
        "tipo": "Pilates Kinésico (Mañana)",
        "cupoMax": 6,
        "inscriptos": []
    },
    {
        "id": 106,
        "dia": "Martes",
        "hora": "15:00 - 16:00",
        "profesorId": 1,
        "tipo": "Pilates Kinésico (Siesta)",
        "cupoMax": 6,
        "inscriptos": []
    },
    {
        "id": 107,
        "dia": "Martes",
        "hora": "16:00 - 17:00",
        "profesorId": 1,
        "tipo": "Pilates Kinésico (Siesta)",
        "cupoMax": 6,
        "inscriptos": []
    },
    {
        "id": 108,
        "dia": "Martes",
        "hora": "17:00 - 18:00",
        "profesorId": 1,
        "tipo": "Pilates Kinésico (Siesta)",
        "cupoMax": 6,
        "inscriptos": []
    },
    {
        "id": 109,
        "dia": "Martes",
        "hora": "18:00 - 19:00",
        "profesorId": 2,
        "tipo": "Pilates Kinésico (Tarde/Noche)",
        "cupoMax": 6,
        "inscriptos": []
    },
    {
        "id": 110,
        "dia": "Martes",
        "hora": "19:00 - 20:00",
        "profesorId": 2,
        "tipo": "Pilates Kinésico (Tarde/Noche)",
        "cupoMax": 6,
        "inscriptos": []
    },
    {
        "id": 111,
        "dia": "Martes",
        "hora": "20:00 - 21:00",
        "profesorId": 2,
        "tipo": "Pilates Kinésico (Noche)",
        "cupoMax": 6,
        "inscriptos": []
    },
    {
        "id": 112,
        "dia": "Miércoles",
        "hora": "08:00 - 09:00",
        "profesorId": 1,
        "tipo": "Pilates Kinésico (Mañana)",
        "cupoMax": 6,
        "inscriptos": []
    },
    {
        "id": 113,
        "dia": "Miércoles",
        "hora": "15:00 - 16:00",
        "profesorId": 1,
        "tipo": "Pilates Kinésico (Siesta)",
        "cupoMax": 6,
        "inscriptos": []
    },
    {
        "id": 114,
        "dia": "Miércoles",
        "hora": "16:00 - 17:00",
        "profesorId": 1,
        "tipo": "Pilates Kinésico (Siesta)",
        "cupoMax": 6,
        "inscriptos": []
    },
    {
        "id": 115,
        "dia": "Miércoles",
        "hora": "17:00 - 18:00",
        "profesorId": 1,
        "tipo": "Pilates Kinésico (Siesta)",
        "cupoMax": 6,
        "inscriptos": []
    },
    {
        "id": 116,
        "dia": "Jueves",
        "hora": "08:00 - 09:00",
        "profesorId": 1,
        "tipo": "Pilates Kinésico (Mañana)",
        "cupoMax": 6,
        "inscriptos": []
    },
    {
        "id": 117,
        "dia": "Jueves",
        "hora": "15:00 - 16:00",
        "profesorId": 1,
        "tipo": "Pilates Kinésico (Siesta)",
        "cupoMax": 6,
        "inscriptos": []
    },
    {
        "id": 118,
        "dia": "Jueves",
        "hora": "16:00 - 17:00",
        "profesorId": 1,
        "tipo": "Pilates Kinésico (Siesta)",
        "cupoMax": 6,
        "inscriptos": []
    },
    {
        "id": 119,
        "dia": "Jueves",
        "hora": "17:00 - 18:00",
        "profesorId": 1,
        "tipo": "Pilates Kinésico (Siesta)",
        "cupoMax": 6,
        "inscriptos": []
    },
    {
        "id": 120,
        "dia": "Jueves",
        "hora": "18:00 - 19:00",
        "profesorId": 2,
        "tipo": "Pilates Kinésico (Tarde/Noche)",
        "cupoMax": 6,
        "inscriptos": []
    },
    {
        "id": 121,
        "dia": "Jueves",
        "hora": "19:00 - 20:00",
        "profesorId": 2,
        "tipo": "Pilates Kinésico (Tarde/Noche)",
        "cupoMax": 6,
        "inscriptos": []
    },
    {
        "id": 122,
        "dia": "Jueves",
        "hora": "20:00 - 21:00",
        "profesorId": 2,
        "tipo": "Pilates Kinésico (Noche)",
        "cupoMax": 6,
        "inscriptos": []
    },
    {
        "id": 123,
        "dia": "Viernes",
        "hora": "08:00 - 09:00",
        "profesorId": 1,
        "tipo": "Pilates Kinésico (Mañana)",
        "cupoMax": 6,
        "inscriptos": []
    },
    {
        "id": 124,
        "dia": "Viernes",
        "hora": "15:00 - 16:00",
        "profesorId": 1,
        "tipo": "Pilates Kinésico (Siesta)",
        "cupoMax": 6,
        "inscriptos": []
    },
    {
        "id": 125,
        "dia": "Viernes",
        "hora": "16:00 - 17:00",
        "profesorId": 1,
        "tipo": "Pilates Kinésico (Siesta)",
        "cupoMax": 6,
        "inscriptos": []
    },
    {
        "id": 126,
        "dia": "Viernes",
        "hora": "17:00 - 18:00",
        "profesorId": 1,
        "tipo": "Pilates Kinésico (Siesta)",
        "cupoMax": 6,
        "inscriptos": []
    }
],
  alumnos: [],
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
  ]
};

const PKStore = {
  isApiConnected: false,
  turnos: [],
  alumnos: [],
  profesionales: [],
  promociones: [],
  configuracion: { ...SEED_DATA.configuracion },

  async init() {
    // Limpieza de claves obsoletas con alumnos dummy anteriores
    [
      'pk_turnos_v1', 'pk_turnos_v2', 'pk_turnos_v3', 'pk_turnos_v4', 'pk_turnos_v5', 'pk_turnos_v6', 'pk_turnos_v7',
      'pk_alumnos_v1', 'pk_alumnos_v2', 'pk_alumnos_v3', 'pk_alumnos_v4', 'pk_alumnos_v5', 'pk_alumnos_v6', 'pk_alumnos_v7',
      'pk_profesionales_v6', 'pk_promociones_v6', 'pk_configuracion_v6', 'pk_historial_pagos_v6'
    ].forEach(k => {
      try { localStorage.removeItem(k); } catch (e) {}
    });

    this.configuracion = this.load(STORAGE_KEYS.CONFIGURACION, SEED_DATA.configuracion);
    this.profesionales = this.load(STORAGE_KEYS.PROFESIONALES, SEED_DATA.profesionales);
    this.turnos = this.load(STORAGE_KEYS.TURNOS, SEED_DATA.turnos);
    this.alumnos = this.load(STORAGE_KEYS.ALUMNOS, SEED_DATA.alumnos);
    if (Array.isArray(this.alumnos)) {
      this.alumnos.forEach(a => {
        if (a.habilitado === undefined) a.habilitado = true;
        if (a.dni === undefined) a.dni = '';
        if (a.carnetObraSocial === undefined) a.carnetObraSocial = '';
        if (a.grupoEtario === undefined) a.grupoEtario = 'adulto';
        if (a.observaciones === undefined) a.observaciones = '';
      });
    }
    this.promociones = this.load(STORAGE_KEYS.PROMOCIONES, SEED_DATA.promociones);
    this.historialPagos = this.load('pk_historial_pagos_v8', []);

    this.evaluarVencimientosYLiberarCupos();
    await this.syncWithBackend();
  },

  // Helper para comunicación segura con la API (resiliente a reinicios de contenedor)
  async apiFetch(url, options = {}, timeoutMs = 8000) {
    try {
      const controller = new AbortController();
      const id = setTimeout(() => controller.abort(), timeoutMs);
      const res = await fetch(url, { ...options, signal: controller.signal });
      clearTimeout(id);
      if (res && res.ok) {
        this.isApiConnected = true;
        return res;
      }
      return null;
    } catch (e) {
      return null;
    }
  },

  queuePendingMutation(mutation) {
    try {
      const queue = this.load(STORAGE_KEYS.PENDING_MUTATIONS, []);
      queue.push({ ...mutation, timestamp: Date.now() });
      this.saveLocal(STORAGE_KEYS.PENDING_MUTATIONS, queue);
    } catch (e) {}
  },

  async flushPendingMutations() {
    const queue = this.load(STORAGE_KEYS.PENDING_MUTATIONS, []);
    if (!Array.isArray(queue) || queue.length === 0) return;
    const remaining = [];
    for (const item of queue) {
      try {
        const res = await this.apiFetch(item.url, {
          method: item.method || 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: item.body ? JSON.stringify(item.body) : undefined
        }, 5000);
        if (!res) {
          remaining.push(item);
        }
      } catch (e) {
        remaining.push(item);
      }
    }
    this.saveLocal(STORAGE_KEYS.PENDING_MUTATIONS, remaining);
  },

  evaluarVencimientosYLiberarCupos() {
    const hoyStr = new Date().toISOString().split('T')[0];
    const hoy = new Date(hoyStr);
    let huboCambios = false;

    if (!Array.isArray(this.alumnos) || !Array.isArray(this.turnos)) return;

    this.alumnos.forEach(alumno => {
      if (!alumno.vencimiento) return;
      const fVenc = new Date(alumno.vencimiento);
      const diffDias = Math.ceil((fVenc - hoy) / (1000 * 60 * 60 * 24));

      const estaVencido = diffDias < 0;
      const tieneDeuda = (alumno.deuda && alumno.deuda > 0);
      const estaAtrasado = alumno.estado === 'atrasado';

      if (estaVencido || tieneDeuda || estaAtrasado) {
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

        // Liberar camas ocupadas por alumnos con cuotas vencidas
        const nombreBuscado = (alumno.nombre || '').trim().toLowerCase();
        if (nombreBuscado) {
          this.turnos.forEach(t => {
            if (Array.isArray(t.inscriptos)) {
              const cantAntes = t.inscriptos.length;
              t.inscriptos = t.inscriptos.filter(nom => nom.trim().toLowerCase() !== nombreBuscado);
              if (t.inscriptos.length < cantAntes) huboCambios = true;
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
      this.saveAllLocal();
    }
  },

  load(key, fallback) {
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : fallback;
    } catch (e) {
      return fallback;
    }
  },

  saveLocal(key, data) {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (e) {}
  },

  saveAllLocal() {
    this.saveLocal(STORAGE_KEYS.CONFIGURACION, this.configuracion);
    this.saveLocal(STORAGE_KEYS.PROFESIONALES, this.profesionales);
    this.saveLocal(STORAGE_KEYS.TURNOS, this.turnos);
    this.saveLocal(STORAGE_KEYS.ALUMNOS, this.alumnos);
    this.saveLocal(STORAGE_KEYS.PROMOCIONES, this.promociones);
  },

  async syncWithBackend() {
    try {
      const controller = new AbortController();
      const toId = setTimeout(() => controller.abort(), 6000);
      const res = await fetch('/api/status', { signal: controller.signal }).catch(() => null);
      clearTimeout(toId);

      if (res && res.ok) {
        this.isApiConnected = true;
        this._syncRetryAttempts = 0;

        // Si había mutaciones pendientes realizadas sin conexión, enviarlas
        await this.flushPendingMutations();

        const [turnosRes, alumnosRes, profesRes, promosRes, confRes] = await Promise.all([
          fetch('/api/turnos').then(r => r.json()).catch(() => null),
          fetch('/api/alumnos').then(r => r.json()).catch(() => null),
          fetch('/api/profesionales').then(r => r.json()).catch(() => null),
          fetch('/api/promociones').then(r => r.json()).catch(() => null),
          fetch('/api/configuracion').then(r => r.json()).catch(() => null)
        ]);

        // Base de datos en la nube (PostgreSQL) como fuente única autoritativa
        if (Array.isArray(alumnosRes)) {
          this.alumnos = alumnosRes;
        }
        if (Array.isArray(turnosRes)) {
          this.turnos = turnosRes;
        }
        if (Array.isArray(profesRes) && profesRes.length > 0) {
          this.profesionales = profesRes;
        }
        if (Array.isArray(promosRes) && promosRes.length > 0) {
          this.promociones = promosRes;
        }
        if (confRes) {
          this.configuracion = confRes;
        }

        this.evaluarVencimientosYLiberarCupos();
        this.saveAllLocal();
        window.dispatchEvent(new CustomEvent('pk:sync-completed'));
      } else {
        this.isApiConnected = false;
        this.programarReintentoSync();
      }
    } catch (e) {
      this.isApiConnected = false;
      this.programarReintentoSync();
    }
  },

  programarReintentoSync() {
    if (this._syncRetryTimer) return;
    this._syncRetryAttempts = (this._syncRetryAttempts || 0) + 1;
    if (this._syncRetryAttempts > 20) return;
    this._syncRetryTimer = setTimeout(async () => {
      this._syncRetryTimer = null;
      await this.syncWithBackend();
    }, 4000);
  },

  // Copia de Seguridad & Respaldo Permanente (JSON)
  descargarBackupJSON() {
    const backup = {
      sistema: 'PK PILATES KINÉSICO',
      version: '8.0',
      fechaExportacion: new Date().toISOString(),
      configuracion: this.configuracion,
      profesionales: this.profesionales,
      turnos: this.turnos,
      alumnos: this.alumnos,
      promociones: this.promociones,
      historialPagos: this.historialPagos
    };

    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(backup, null, 2));
    const dlAnchor = document.createElement('a');
    const fecha = new Date().toISOString().split('T')[0];
    dlAnchor.setAttribute('href', dataStr);
    dlAnchor.setAttribute('download', `backup_pk_pilates_${fecha}.json`);
    document.body.appendChild(dlAnchor);
    dlAnchor.click();
    dlAnchor.remove();
  },

  async restaurarBackupJSON(jsonString) {
    try {
      const data = typeof jsonString === 'string' ? JSON.parse(jsonString) : jsonString;
      if (!data) return false;

      if (data.configuracion) this.configuracion = { ...this.configuracion, ...data.configuracion };
      if (Array.isArray(data.profesionales)) this.profesionales = data.profesionales;
      if (Array.isArray(data.turnos)) this.turnos = data.turnos;
      if (Array.isArray(data.alumnos)) this.alumnos = data.alumnos;
      if (Array.isArray(data.promociones)) this.promociones = data.promociones;
      this.saveAllLocal();

      await this.apiFetch('/api/backup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      return true;
    } catch (e) {
      console.error('Error restaurando backup:', e);
      return false;
    }
  },

  // ABM Profesores
  async crearProfesional(profe) {
    const res = await this.apiFetch('/api/profesionales', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(profe)
    });
    if (res) {
      const nuevo = await res.json();
      this.profesionales.push(nuevo);
      this.saveLocal(STORAGE_KEYS.PROFESIONALES, this.profesionales);
      return nuevo;
    }

    profe.id = Date.now();
    profe.activo = true;
    this.profesionales.push(profe);
    this.saveLocal(STORAGE_KEYS.PROFESIONALES, this.profesionales);
    this.queuePendingMutation({ url: '/api/profesionales', method: 'POST', body: profe });
    return profe;
  },

  async actualizarProfesional(id, datos) {
    const idNum = parseInt(id);
    const res = await this.apiFetch(`/api/profesionales/${idNum}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(datos)
    });
    if (res) {
      const updated = await res.json();
      const idx = this.profesionales.findIndex(p => p.id === idNum);
      if (idx !== -1) this.profesionales[idx] = updated;
      this.saveLocal(STORAGE_KEYS.PROFESIONALES, this.profesionales);
      return updated;
    }

    const profe = this.profesionales.find(p => p.id === idNum);
    if (profe) {
      Object.assign(profe, datos);
      this.saveLocal(STORAGE_KEYS.PROFESIONALES, this.profesionales);
      this.queuePendingMutation({ url: `/api/profesionales/${idNum}`, method: 'PUT', body: datos });
      return profe;
    }
    return null;
  },

  async eliminarProfesional(id) {
    const idNum = parseInt(id);
    await this.apiFetch(`/api/profesionales/${idNum}`, { method: 'DELETE' });

    this.profesionales = this.profesionales.filter(p => p.id !== idNum);
    this.turnos.forEach(t => {
      if (t.profesorId === idNum) t.profesorId = this.profesionales[0]?.id || 1;
    });
    this.saveLocal(STORAGE_KEYS.PROFESIONALES, this.profesionales);
    this.saveLocal(STORAGE_KEYS.TURNOS, this.turnos);
    return true;
  },

  // ABM Alumnos
  async crearAlumno(nuevo) {
    nuevo.montoMensual = parseInt(nuevo.montoMensual) || (nuevo.obraSocial?.includes('Seguro') ? 35000 : 50000);
    nuevo.habilitado = (nuevo.habilitado !== false && nuevo.habilitado !== 'false');
    nuevo.dni = nuevo.dni ? String(nuevo.dni).trim() : '';
    nuevo.carnetObraSocial = nuevo.carnetObraSocial ? String(nuevo.carnetObraSocial).trim() : '';
    nuevo.grupoEtario = nuevo.grupoEtario || 'adulto';
    nuevo.observaciones = nuevo.observaciones ? String(nuevo.observaciones).trim() : '';
    nuevo.kinesiologo = nuevo.kinesiologo || 'Lic. Gustavo Moyano';

    const res = await this.apiFetch('/api/alumnos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(nuevo)
    });
    if (res) {
      const creado = await res.json();
      this.alumnos.push(creado);
      this.saveLocal(STORAGE_KEYS.ALUMNOS, this.alumnos);
      return creado;
    }

    nuevo.id = Date.now();
    nuevo.deuda = nuevo.estado === 'atrasado' ? nuevo.montoMensual : 0;
    nuevo.ultimoPago = nuevo.ultimoPago || new Date().toISOString().split('T')[0];
    const venc = new Date();
    venc.setDate(venc.getDate() + 30);
    nuevo.vencimiento = nuevo.vencimiento || venc.toISOString().split('T')[0];
    this.alumnos.push(nuevo);
    this.saveLocal(STORAGE_KEYS.ALUMNOS, this.alumnos);
    this.queuePendingMutation({ url: '/api/alumnos', method: 'POST', body: nuevo });
    return nuevo;
  },

  async actualizarAlumno(id, datos) {
    const idNum = parseInt(id);
    if (datos.habilitado !== undefined) {
      datos.habilitado = (datos.habilitado === true || datos.habilitado === 'true');
    }

    const res = await this.apiFetch(`/api/alumnos/${idNum}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(datos)
    });
    if (res) {
      const updated = await res.json();
      const idx = this.alumnos.findIndex(a => a.id === idNum);
      if (idx !== -1) this.alumnos[idx] = updated;
      this.saveLocal(STORAGE_KEYS.ALUMNOS, this.alumnos);
      return updated;
    }

    const alumno = this.alumnos.find(a => a.id === idNum);
    if (alumno) {
      Object.assign(alumno, datos);
      if (alumno.montoMensual) alumno.montoMensual = parseInt(alumno.montoMensual);
      if (alumno.estado === 'atrasado') {
        alumno.deuda = alumno.montoMensual;
      } else if (alumno.estado === 'al_dia') {
        alumno.deuda = 0;
      }
      this.saveLocal(STORAGE_KEYS.ALUMNOS, this.alumnos);
      this.queuePendingMutation({ url: `/api/alumnos/${idNum}`, method: 'PUT', body: datos });
      return alumno;
    }
    return null;
  },

  async toggleHabilitacionAlumno(id) {
    const idNum = parseInt(id);
    const res = await this.apiFetch(`/api/alumnos/${idNum}/toggle-habilitar`, { method: 'POST' });
    if (res) {
      const updated = await res.json();
      const idx = this.alumnos.findIndex(a => a.id === idNum);
      if (idx !== -1) this.alumnos[idx] = updated;
      this.saveLocal(STORAGE_KEYS.ALUMNOS, this.alumnos);
      return updated;
    }

    const alumno = this.alumnos.find(a => a.id === idNum);
    if (alumno) {
      alumno.habilitado = !alumno.habilitado;
      this.saveLocal(STORAGE_KEYS.ALUMNOS, this.alumnos);
      this.queuePendingMutation({ url: `/api/alumnos/${idNum}/toggle-habilitar`, method: 'POST' });
      return alumno;
    }
    return null;
  },

  async eliminarAlumno(id) {
    const idNum = parseInt(id);
    await this.apiFetch(`/api/alumnos/${idNum}`, { method: 'DELETE' });

    const alumno = this.alumnos.find(a => a.id === idNum);
    if (alumno) {
      this.turnos.forEach(t => {
        t.inscriptos = t.inscriptos.filter(n => n.toLowerCase() !== alumno.nombre.toLowerCase());
      });
    }

    this.alumnos = this.alumnos.filter(a => a.id !== idNum);
    this.saveLocal(STORAGE_KEYS.ALUMNOS, this.alumnos);
    this.saveLocal(STORAGE_KEYS.TURNOS, this.turnos);
    return true;
  },

  async registrarPagoAlumno(alumnoId) {
    const idNum = parseInt(alumnoId);
    const res = await this.apiFetch(`/api/alumnos/${idNum}/pago`, { method: 'POST' });
    if (res) {
      const updated = await res.json();
      const idx = this.alumnos.findIndex(a => a.id === idNum);
      if (idx !== -1) this.alumnos[idx] = updated;
      this.saveLocal(STORAGE_KEYS.ALUMNOS, this.alumnos);
      return updated;
    }

    const alumno = this.alumnos.find(a => a.id === idNum);
    if (alumno) {
      alumno.estado = 'al_dia';
      alumno.habilitado = true; // REHABILITADO AUTOMÁTICAMENTE AL ABONAR
      alumno.deuda = 0;
      alumno.ultimoPago = new Date().toISOString().split('T')[0];
      const proximo = new Date();
      proximo.setDate(proximo.getDate() + 30);
      alumno.vencimiento = proximo.toISOString().split('T')[0];
      this.saveLocal(STORAGE_KEYS.ALUMNOS, this.alumnos);
      this.queuePendingMutation({ url: `/api/alumnos/${idNum}/pago`, method: 'POST' });
      return alumno;
    }
    return null;
  },

  // ABM Turnos y Camas
  async crearTurno(nuevoTurno) {
    nuevoTurno.profesorId = parseInt(nuevoTurno.profesorId);
    nuevoTurno.cupoMax = parseInt(nuevoTurno.cupoMax) || this.configuracion.camasDefault;

    const res = await this.apiFetch('/api/turnos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(nuevoTurno)
    });
    if (res) {
      const creado = await res.json();
      this.turnos.push(creado);
      this.saveLocal(STORAGE_KEYS.TURNOS, this.turnos);
      return creado;
    }

    nuevoTurno.id = Date.now();
    nuevoTurno.inscriptos = [];
    this.turnos.push(nuevoTurno);
    this.saveLocal(STORAGE_KEYS.TURNOS, this.turnos);
    this.queuePendingMutation({ url: '/api/turnos', method: 'POST', body: nuevoTurno });
    return nuevoTurno;
  },

  async actualizarTurno(id, datos) {
    const idNum = parseInt(id);
    if (datos.profesorId) datos.profesorId = parseInt(datos.profesorId);
    if (datos.cupoMax) datos.cupoMax = parseInt(datos.cupoMax);

    const res = await this.apiFetch(`/api/turnos/${idNum}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(datos)
    });
    if (res) {
      const updated = await res.json();
      const idx = this.turnos.findIndex(t => t.id === idNum);
      if (idx !== -1) this.turnos[idx] = updated;
      this.saveLocal(STORAGE_KEYS.TURNOS, this.turnos);
      return updated;
    }

    const turno = this.turnos.find(t => t.id === idNum);
    if (turno) {
      Object.assign(turno, datos);
      this.saveLocal(STORAGE_KEYS.TURNOS, this.turnos);
      this.queuePendingMutation({ url: `/api/turnos/${idNum}`, method: 'PUT', body: datos });
      return turno;
    }
    return null;
  },

  async eliminarTurno(id) {
    const idNum = parseInt(id);
    await this.apiFetch(`/api/turnos/${idNum}`, { method: 'DELETE' });
    this.turnos = this.turnos.filter(t => t.id !== idNum);
    this.saveLocal(STORAGE_KEYS.TURNOS, this.turnos);
    return true;
  },

  async reservarCupo(turnoId, alumnoNombre, alumnoTelefono, metodoPago, obraSocial) {
    const idNum = parseInt(turnoId);
    const res = await this.apiFetch(`/api/turnos/${idNum}/reservar`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nombre: alumnoNombre, telefono: alumnoTelefono, metodoPago, obraSocial })
    });
    if (res) {
      const data = await res.json();
      if (data.ok) {
        await this.syncWithBackend();
        return data;
      } else {
        return { ok: false, msg: data.msg || 'Error al reservar' };
      }
    }

    const turno = this.turnos.find(t => t.id === idNum);
    if (!turno) return { ok: false, msg: 'Turno no encontrado' };
    if (turno.inscriptos.length >= turno.cupoMax) {
      return { ok: false, msg: 'No quedan camas disponibles en este horario.' };
    }
    if (turno.inscriptos.includes(alumnoNombre)) {
      return { ok: false, msg: 'Ya te encuentras inscripto/a en este turno.' };
    }

    turno.inscriptos.push(alumnoNombre);

    let alumno = this.alumnos.find(a => a.nombre.toLowerCase() === alumnoNombre.toLowerCase());
    if (!alumno) {
      const profe = this.profesionales.find(p => p.id === turno.profesorId);
      const hoy = new Date();
      const venc = new Date(hoy.getTime() + 30 * 24 * 60 * 60 * 1000);
      const esISJ = obraSocial && obraSocial.toLowerCase().includes('seguro');
      const monto = esISJ ? 35000 : 50000;

      alumno = {
        id: Date.now(),
        nombre: alumnoNombre,
        dni: '',
        telefono: alumnoTelefono,
        habilitado: true,
        patologias: 'Inscripción online directa',
        grupoEtario: 'adulto',
        plan: esISJ ? 'Obra Social Instituto de Seguro (2 clases)' : 'Particular (2 clases)',
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
      this.alumnos.push(alumno);
    }

    this.saveAllLocal();
    return { ok: true, turno, alumno };
  },

  async liberarCupoAlumno(turnoId, nombreAlumno) {
    const idNum = parseInt(turnoId);
    await this.apiFetch(`/api/turnos/${idNum}/liberar`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nombreAlumno })
    });

    const turno = this.turnos.find(t => t.id === idNum);
    if (turno) {
      turno.inscriptos = turno.inscriptos.filter(n => n !== nombreAlumno);
      this.saveLocal(STORAGE_KEYS.TURNOS, this.turnos);
      return true;
    }
    return false;
  },

  async togglePromocion(promoId) {
    const idNum = parseInt(promoId);
    const res = await this.apiFetch(`/api/promociones/${idNum}/toggle`, { method: 'PUT' });
    if (res) {
      const toggled = await res.json();
      const idx = this.promociones.findIndex(p => p.id === idNum);
      if (idx !== -1) this.promociones[idx] = toggled;
      this.saveLocal(STORAGE_KEYS.PROMOCIONES, this.promociones);
      return toggled;
    }

    const p = this.promociones.find(item => item.id === idNum);
    if (p) {
      p.activa = !p.activa;
      this.saveLocal(STORAGE_KEYS.PROMOCIONES, this.promociones);
      return p;
    }
    return null;
  },

  async crearPromocion(promo) {
    promo.precio = parseInt(promo.precio) || 50000;
    const res = await this.apiFetch('/api/promociones', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(promo)
    });
    if (res) {
      const nueva = await res.json();
      this.promociones.push(nueva);
      this.saveLocal(STORAGE_KEYS.PROMOCIONES, this.promociones);
      return nueva;
    }

    promo.id = Date.now();
    promo.activa = true;
    this.promociones.push(promo);
    this.saveLocal(STORAGE_KEYS.PROMOCIONES, this.promociones);
    return promo;
  },

  async actualizarCamasDefault(cantidad, actualizarCupos = true) {
    const qty = parseInt(cantidad) || 6;
    this.configuracion.camasDefault = qty;
    if (actualizarCupos && this.turnos) {
      this.turnos.forEach(t => { t.cupoMax = qty; });
      this.saveLocal(STORAGE_KEYS.TURNOS, this.turnos);
    }
    await this.apiFetch('/api/configuracion', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ camasDefault: qty, actualizarCuposTurnos: actualizarCupos })
    });
    this.saveLocal(STORAGE_KEYS.CONFIGURACION, this.configuracion);
    return this.configuracion;
  },

  async reubicarAlumno(origenId, destinoId, nombreAlumno) {
    const origen = this.turnos.find(t => t.id === parseInt(origenId));
    const destino = this.turnos.find(t => t.id === parseInt(destinoId));
    if (!origen || !destino) return { ok: false, msg: 'Turnos no encontrados' };
    if (destino.inscriptos.length >= destino.cupoMax) return { ok: false, msg: 'El horario destino ya tiene el cupo completo' };

    origen.inscriptos = origen.inscriptos.filter(n => n.toLowerCase() !== nombreAlumno.toLowerCase());
    if (!destino.inscriptos.some(n => n.toLowerCase() === nombreAlumno.toLowerCase())) {
      destino.inscriptos.push(nombreAlumno);
    }
    this.saveLocal(STORAGE_KEYS.TURNOS, this.turnos);

    await this.apiFetch('/api/turnos/reubicar', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ origenId, destinoId, nombreAlumno })
    });
    return { ok: true, origen, destino };
  },

  async asignarCupoAlumno(turnoId, nombreAlumno, telefono = '') {
    return await this.reservarCupo(turnoId, nombreAlumno, telefono, 'Efectivo', 'Particular');
  },

  async actualizarPinSeguridad(nuevoPin) {
    this.configuracion.adminPin = nuevoPin;
    await this.apiFetch('/api/configuracion', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ adminPin: nuevoPin })
    });
    this.saveLocal(STORAGE_KEYS.CONFIGURACION, this.configuracion);
    return true;
  }
};

window.PKStore = PKStore;
