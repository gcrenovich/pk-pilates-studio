/**
 * PK - Estudio de Pilates & Contrología Corporal
 * Arquitectura de Software: Antigravity (Systems Engineer) & Cline (Software Engineer)
 * Estado Centralizado, Lógica de Negocio y Cliente API (Datos Oficiales)
 */

const STORAGE_KEYS = {
  TURNOS: 'pk_turnos_v6',
  ALUMNOS: 'pk_alumnos_v6',
  PROFESIONALES: 'pk_profesionales_v6',
  PROMOCIONES: 'pk_promociones_v6',
  CONFIGURACION: 'pk_configuracion_v6'
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
        "inscriptos": [
            "María Rodríguez",
            "Carlos Paz"
        ]
    },
    {
        "id": 102,
        "dia": "Lunes",
        "hora": "09:00 - 10:00",
        "profesorId": 1,
        "tipo": "Pilates Kinésico (Mañana)",
        "cupoMax": 6,
        "inscriptos": [
            "Esteban Quito"
        ]
    },
    {
        "id": 103,
        "dia": "Lunes",
        "hora": "15:00 - 16:00",
        "profesorId": 1,
        "tipo": "Pilates Kinésico (Siesta)",
        "cupoMax": 6,
        "inscriptos": [
            "Valeria Lynch",
            "Gonzalo H."
        ]
    },
    {
        "id": 104,
        "dia": "Lunes",
        "hora": "16:00 - 17:00",
        "profesorId": 1,
        "tipo": "Pilates Kinésico (Siesta)",
        "cupoMax": 6,
        "inscriptos": [
            "Lucía Rossi"
        ]
    },
    {
        "id": 105,
        "dia": "Lunes",
        "hora": "17:00 - 18:00",
        "profesorId": 1,
        "tipo": "Pilates Kinésico (Siesta)",
        "cupoMax": 6,
        "inscriptos": [
            "Daniela Bravo",
            "Andrea F."
        ]
    },
    {
        "id": 106,
        "dia": "Martes",
        "hora": "08:00 - 09:00",
        "profesorId": 1,
        "tipo": "Pilates Kinésico (Mañana)",
        "cupoMax": 6,
        "inscriptos": [
            "Patricia Blanco"
        ]
    },
    {
        "id": 107,
        "dia": "Martes",
        "hora": "09:00 - 10:00",
        "profesorId": 1,
        "tipo": "Pilates Kinésico (Mañana)",
        "cupoMax": 6,
        "inscriptos": [
            "Jorge Sosa"
        ]
    },
    {
        "id": 108,
        "dia": "Martes",
        "hora": "15:00 - 16:00",
        "profesorId": 1,
        "tipo": "Pilates Kinésico (Siesta)",
        "cupoMax": 6,
        "inscriptos": [
            "Camila Morales"
        ]
    },
    {
        "id": 109,
        "dia": "Martes",
        "hora": "16:00 - 17:00",
        "profesorId": 1,
        "tipo": "Pilates Kinésico (Siesta)",
        "cupoMax": 6,
        "inscriptos": [
            "Agustina Ríos"
        ]
    },
    {
        "id": 110,
        "dia": "Martes",
        "hora": "17:00 - 18:00",
        "profesorId": 1,
        "tipo": "Pilates Kinésico (Siesta)",
        "cupoMax": 6,
        "inscriptos": [
            "Marcelo Tinari"
        ]
    },
    {
        "id": 111,
        "dia": "Martes",
        "hora": "18:00 - 19:00",
        "profesorId": 2,
        "tipo": "Pilates Kinésico (Tarde)",
        "cupoMax": 6,
        "inscriptos": [
            "Romina S.",
            "Nicolás Pérez"
        ]
    },
    {
        "id": 112,
        "dia": "Martes",
        "hora": "19:00 - 20:00",
        "profesorId": 2,
        "tipo": "Pilates Kinésico (Tarde)",
        "cupoMax": 6,
        "inscriptos": [
            "Marta Giménez"
        ]
    },
    {
        "id": 113,
        "dia": "Martes",
        "hora": "20:00 - 21:00",
        "profesorId": 2,
        "tipo": "Pilates Kinésico (Tarde)",
        "cupoMax": 6,
        "inscriptos": []
    },
    {
        "id": 114,
        "dia": "Miércoles",
        "hora": "08:00 - 09:00",
        "profesorId": 1,
        "tipo": "Pilates Kinésico (Mañana)",
        "cupoMax": 6,
        "inscriptos": [
            "Carlos Paz"
        ]
    },
    {
        "id": 115,
        "dia": "Miércoles",
        "hora": "09:00 - 10:00",
        "profesorId": 1,
        "tipo": "Pilates Kinésico (Mañana)",
        "cupoMax": 6,
        "inscriptos": [
            "María Rodríguez"
        ]
    },
    {
        "id": 116,
        "dia": "Miércoles",
        "hora": "15:00 - 16:00",
        "profesorId": 1,
        "tipo": "Pilates Kinésico (Siesta)",
        "cupoMax": 6,
        "inscriptos": [
            "Esteban Quito"
        ]
    },
    {
        "id": 117,
        "dia": "Miércoles",
        "hora": "16:00 - 17:00",
        "profesorId": 1,
        "tipo": "Pilates Kinésico (Siesta)",
        "cupoMax": 6,
        "inscriptos": []
    },
    {
        "id": 118,
        "dia": "Miércoles",
        "hora": "17:00 - 18:00",
        "profesorId": 1,
        "tipo": "Pilates Kinésico (Siesta)",
        "cupoMax": 6,
        "inscriptos": [
            "Lucía Rossi"
        ]
    },
    {
        "id": 119,
        "dia": "Jueves",
        "hora": "08:00 - 09:00",
        "profesorId": 1,
        "tipo": "Pilates Kinésico (Mañana)",
        "cupoMax": 6,
        "inscriptos": [
            "Patricia Blanco"
        ]
    },
    {
        "id": 120,
        "dia": "Jueves",
        "hora": "09:00 - 10:00",
        "profesorId": 1,
        "tipo": "Pilates Kinésico (Mañana)",
        "cupoMax": 6,
        "inscriptos": []
    },
    {
        "id": 121,
        "dia": "Jueves",
        "hora": "15:00 - 16:00",
        "profesorId": 1,
        "tipo": "Pilates Kinésico (Siesta)",
        "cupoMax": 6,
        "inscriptos": [
            "Jorge Sosa"
        ]
    },
    {
        "id": 122,
        "dia": "Jueves",
        "hora": "16:00 - 17:00",
        "profesorId": 1,
        "tipo": "Pilates Kinésico (Siesta)",
        "cupoMax": 6,
        "inscriptos": []
    },
    {
        "id": 123,
        "dia": "Jueves",
        "hora": "17:00 - 18:00",
        "profesorId": 1,
        "tipo": "Pilates Kinésico (Siesta)",
        "cupoMax": 6,
        "inscriptos": [
            "Valeria Lynch"
        ]
    },
    {
        "id": 124,
        "dia": "Jueves",
        "hora": "18:00 - 19:00",
        "profesorId": 2,
        "tipo": "Pilates Kinésico (Tarde)",
        "cupoMax": 6,
        "inscriptos": [
            "Romina S."
        ]
    },
    {
        "id": 125,
        "dia": "Jueves",
        "hora": "19:00 - 20:00",
        "profesorId": 2,
        "tipo": "Pilates Kinésico (Tarde)",
        "cupoMax": 6,
        "inscriptos": [
            "Julieta Venegas"
        ]
    },
    {
        "id": 126,
        "dia": "Jueves",
        "hora": "20:00 - 21:00",
        "profesorId": 2,
        "tipo": "Pilates Kinésico (Tarde)",
        "cupoMax": 6,
        "inscriptos": []
    },
    {
        "id": 127,
        "dia": "Viernes",
        "hora": "08:00 - 09:00",
        "profesorId": 1,
        "tipo": "Pilates Kinésico (Mañana)",
        "cupoMax": 6,
        "inscriptos": [
            "María Rodríguez"
        ]
    },
    {
        "id": 128,
        "dia": "Viernes",
        "hora": "09:00 - 10:00",
        "profesorId": 1,
        "tipo": "Pilates Kinésico (Mañana)",
        "cupoMax": 6,
        "inscriptos": []
    },
    {
        "id": 129,
        "dia": "Viernes",
        "hora": "15:00 - 16:00",
        "profesorId": 1,
        "tipo": "Pilates Kinésico (Siesta)",
        "cupoMax": 6,
        "inscriptos": [
            "Daniela Bravo"
        ]
    },
    {
        "id": 130,
        "dia": "Viernes",
        "hora": "16:00 - 17:00",
        "profesorId": 1,
        "tipo": "Pilates Kinésico (Siesta)",
        "cupoMax": 6,
        "inscriptos": []
    },
    {
        "id": 131,
        "dia": "Viernes",
        "hora": "17:00 - 18:00",
        "profesorId": 1,
        "tipo": "Pilates Kinésico (Siesta)",
        "cupoMax": 6,
        "inscriptos": []
    }
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

    await this.syncWithBackend();
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
      const res = await fetch('/api/status');
      if (res.ok) {
        this.isApiConnected = true;
        const [turnosRes, alumnosRes, profesRes, promosRes, confRes] = await Promise.all([
          fetch('/api/turnos').then(r => r.json()),
          fetch('/api/alumnos').then(r => r.json()),
          fetch('/api/profesionales').then(r => r.json()),
          fetch('/api/promociones').then(r => r.json()),
          fetch('/api/configuracion').then(r => r.json())
        ]);
        this.turnos = turnosRes;
        this.alumnos = alumnosRes;
        this.profesionales = profesRes;
        this.promociones = promosRes;
        if (confRes) this.configuracion = confRes;
        this.saveAllLocal();
      }
    } catch (e) {
      this.isApiConnected = false;
    }
  },

  // ABM Profesores
  async crearProfesional(profe) {
    if (this.isApiConnected) {
      try {
        const res = await fetch('/api/profesionales', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(profe)
        });
        if (res.ok) {
          const nuevo = await res.json();
          this.profesionales.push(nuevo);
          this.saveLocal(STORAGE_KEYS.PROFESIONALES, this.profesionales);
          return nuevo;
        }
      } catch (e) {}
    }

    profe.id = Date.now();
    profe.activo = true;
    this.profesionales.push(profe);
    this.saveLocal(STORAGE_KEYS.PROFESIONALES, this.profesionales);
    return profe;
  },

  async actualizarProfesional(id, datos) {
    if (this.isApiConnected) {
      try {
        const res = await fetch(`/api/profesionales/${id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(datos)
        });
        if (res.ok) {
          const updated = await res.json();
          const idx = this.profesionales.findIndex(p => p.id === parseInt(id));
          if (idx !== -1) this.profesionales[idx] = updated;
          this.saveLocal(STORAGE_KEYS.PROFESIONALES, this.profesionales);
          return updated;
        }
      } catch (e) {}
    }

    const profe = this.profesionales.find(p => p.id === parseInt(id));
    if (profe) {
      Object.assign(profe, datos);
      this.saveLocal(STORAGE_KEYS.PROFESIONALES, this.profesionales);
      return profe;
    }
    return null;
  },

  async eliminarProfesional(id) {
    const idNum = parseInt(id);
    if (this.isApiConnected) {
      try { await fetch(`/api/profesionales/${idNum}`, { method: 'DELETE' }); } catch (e) {}
    }

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

    if (this.isApiConnected) {
      try {
        const res = await fetch('/api/alumnos', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(nuevo)
        });
        if (res.ok) {
          const creado = await res.json();
          this.alumnos.push(creado);
          this.saveLocal(STORAGE_KEYS.ALUMNOS, this.alumnos);
          return creado;
        }
      } catch (e) {}
    }

    nuevo.id = Date.now();
    nuevo.deuda = nuevo.estado === 'atrasado' ? nuevo.montoMensual : 0;
    nuevo.ultimoPago = nuevo.ultimoPago || new Date().toISOString().split('T')[0];
    const venc = new Date();
    venc.setDate(venc.getDate() + 30);
    nuevo.vencimiento = nuevo.vencimiento || venc.toISOString().split('T')[0];
    this.alumnos.push(nuevo);
    this.saveLocal(STORAGE_KEYS.ALUMNOS, this.alumnos);
    return nuevo;
  },

  async actualizarAlumno(id, datos) {
    const idNum = parseInt(id);
    if (datos.habilitado !== undefined) {
      datos.habilitado = (datos.habilitado === true || datos.habilitado === 'true');
    }
    if (this.isApiConnected) {
      try {
        const res = await fetch(`/api/alumnos/${idNum}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(datos)
        });
        if (res.ok) {
          const updated = await res.json();
          const idx = this.alumnos.findIndex(a => a.id === idNum);
          if (idx !== -1) this.alumnos[idx] = updated;
          this.saveLocal(STORAGE_KEYS.ALUMNOS, this.alumnos);
          return updated;
        }
      } catch (e) {}
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
      return alumno;
    }
    return null;
  },

  async toggleHabilitacionAlumno(id) {
    const idNum = parseInt(id);
    if (this.isApiConnected) {
      try {
        const res = await fetch(`/api/alumnos/${idNum}/toggle-habilitar`, { method: 'POST' });
        if (res.ok) {
          const updated = await res.json();
          const idx = this.alumnos.findIndex(a => a.id === idNum);
          if (idx !== -1) this.alumnos[idx] = updated;
          this.saveLocal(STORAGE_KEYS.ALUMNOS, this.alumnos);
          return updated;
        }
      } catch (e) {}
    }

    const alumno = this.alumnos.find(a => a.id === idNum);
    if (alumno) {
      alumno.habilitado = !alumno.habilitado;
      this.saveLocal(STORAGE_KEYS.ALUMNOS, this.alumnos);
      return alumno;
    }
    return null;
  },

  async eliminarAlumno(id) {
    const idNum = parseInt(id);
    if (this.isApiConnected) {
      try { await fetch(`/api/alumnos/${idNum}`, { method: 'DELETE' }); } catch (e) {}
    }

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
    if (this.isApiConnected) {
      try {
        const res = await fetch(`/api/alumnos/${idNum}/pago`, { method: 'POST' });
        if (res.ok) {
          const updated = await res.json();
          const idx = this.alumnos.findIndex(a => a.id === idNum);
          if (idx !== -1) this.alumnos[idx] = updated;
          this.saveLocal(STORAGE_KEYS.ALUMNOS, this.alumnos);
          return updated;
        }
      } catch (e) {}
    }

    const alumno = this.alumnos.find(a => a.id === idNum);
    if (alumno) {
      alumno.estado = 'al_dia';
      alumno.deuda = 0;
      alumno.ultimoPago = new Date().toISOString().split('T')[0];
      const proximo = new Date();
      proximo.setDate(proximo.getDate() + 30);
      alumno.vencimiento = proximo.toISOString().split('T')[0];
      this.saveLocal(STORAGE_KEYS.ALUMNOS, this.alumnos);
      return alumno;
    }
    return null;
  },

  // ABM Turnos y Camas
  async crearTurno(nuevoTurno) {
    nuevoTurno.profesorId = parseInt(nuevoTurno.profesorId);
    nuevoTurno.cupoMax = parseInt(nuevoTurno.cupoMax) || this.configuracion.camasDefault;

    if (this.isApiConnected) {
      try {
        const res = await fetch('/api/turnos', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(nuevoTurno)
        });
        if (res.ok) {
          const creado = await res.json();
          this.turnos.push(creado);
          this.saveLocal(STORAGE_KEYS.TURNOS, this.turnos);
          return creado;
        }
      } catch (e) {}
    }

    nuevoTurno.id = Date.now();
    nuevoTurno.inscriptos = [];
    this.turnos.push(nuevoTurno);
    this.saveLocal(STORAGE_KEYS.TURNOS, this.turnos);
    return nuevoTurno;
  },

  async actualizarTurno(id, datos) {
    const idNum = parseInt(id);
    if (datos.profesorId) datos.profesorId = parseInt(datos.profesorId);
    if (datos.cupoMax) datos.cupoMax = parseInt(datos.cupoMax);

    if (this.isApiConnected) {
      try {
        const res = await fetch(`/api/turnos/${idNum}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(datos)
        });
        if (res.ok) {
          const updated = await res.json();
          const idx = this.turnos.findIndex(t => t.id === idNum);
          if (idx !== -1) this.turnos[idx] = updated;
          this.saveLocal(STORAGE_KEYS.TURNOS, this.turnos);
          return updated;
        }
      } catch (e) {}
    }

    const turno = this.turnos.find(t => t.id === idNum);
    if (turno) {
      Object.assign(turno, datos);
      this.saveLocal(STORAGE_KEYS.TURNOS, this.turnos);
      return turno;
    }
    return null;
  },

  async eliminarTurno(id) {
    const idNum = parseInt(id);
    if (this.isApiConnected) {
      try { await fetch(`/api/turnos/${idNum}`, { method: 'DELETE' }); } catch (e) {}
    }
    this.turnos = this.turnos.filter(t => t.id !== idNum);
    this.saveLocal(STORAGE_KEYS.TURNOS, this.turnos);
    return true;
  },

  async reservarCupo(turnoId, alumnoNombre, alumnoTelefono, metodoPago, obraSocial) {
    const idNum = parseInt(turnoId);
    if (this.isApiConnected) {
      try {
        const res = await fetch(`/api/turnos/${idNum}/reservar`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ nombre: alumnoNombre, telefono: alumnoTelefono, metodoPago, obraSocial })
        });
        const data = await res.json();
        if (res.ok && data.ok) {
          await this.syncWithBackend();
          return data;
        } else {
          return { ok: false, msg: data.msg || 'Error al reservar' };
        }
      } catch (e) {}
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
    if (this.isApiConnected) {
      try {
        await fetch(`/api/turnos/${idNum}/liberar`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ nombreAlumno })
        });
      } catch (e) {}
    }

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
    if (this.isApiConnected) {
      try {
        const res = await fetch(`/api/promociones/${idNum}/toggle`, { method: 'PUT' });
        if (res.ok) {
          const toggled = await res.json();
          const idx = this.promociones.findIndex(p => p.id === idNum);
          if (idx !== -1) this.promociones[idx] = toggled;
          this.saveLocal(STORAGE_KEYS.PROMOCIONES, this.promociones);
          return toggled;
        }
      } catch (e) {}
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
    if (this.isApiConnected) {
      try {
        const res = await fetch('/api/promociones', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(promo)
        });
        if (res.ok) {
          const nueva = await res.json();
          this.promociones.push(nueva);
          this.saveLocal(STORAGE_KEYS.PROMOCIONES, this.promociones);
          return nueva;
        }
      } catch (e) {}
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
    if (this.isApiConnected) {
      try {
        await fetch('/api/configuracion', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ camasDefault: qty, actualizarCuposTurnos: actualizarCupos })
        });
      } catch (e) {}
    }
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

    if (this.isApiConnected) {
      try {
        await fetch('/api/turnos/reubicar', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ origenId, destinoId, nombreAlumno })
        });
      } catch (e) {}
    }
    return { ok: true, origen, destino };
  },

  async asignarCupoAlumno(turnoId, nombreAlumno, telefono = '') {
    return await this.reservarCupo(turnoId, nombreAlumno, telefono, 'Efectivo', 'Particular');
  },

  async actualizarPinSeguridad(nuevoPin) {
    this.configuracion.adminPin = nuevoPin;
    if (this.isApiConnected) {
      try {
        await fetch('/api/configuracion', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ adminPin: nuevoPin })
        });
      } catch (e) {}
    }
    this.saveLocal(STORAGE_KEYS.CONFIGURACION, this.configuracion);
    return true;
  }
};

window.PKStore = PKStore;
