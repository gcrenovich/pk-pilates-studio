/**
 * TEST SUITE EXHAUSTIVA - PILATES KINÉSICO (PK)
 * Senior QA Automation & Verification Engineer
 */

const path = require('path');
const db = require('../backend/db');
const whatsappService = require('../backend/whatsappService');

const results = {
  total: 0,
  passed: 0,
  failed: 0,
  suites: []
};

function assert(condition, message) {
  results.total++;
  if (!condition) {
    results.failed++;
    throw new Error(`Assertion failed: ${message}`);
  }
  results.passed++;
}

async function runSuite(name, fn) {
  const suiteResult = { name, tests: [], passed: true, error: null };
  console.log(`\n======================================================`);
  console.log(`🧪 EJECUTANDO SUITE: ${name}`);
  console.log(`======================================================`);
  try {
    await fn({
      test(testName, testFn) {
        try {
          testFn();
          suiteResult.tests.push({ name: testName, status: 'PASSED' });
          console.log(`  ✅ [PASS] ${testName}`);
        } catch (err) {
          suiteResult.passed = false;
          suiteResult.tests.push({ name: testName, status: 'FAILED', error: err.message });
          console.error(`  ❌ [FAIL] ${testName}: ${err.message}`);
        }
      },
      async asyncTest(testName, testFn) {
        try {
          await testFn();
          suiteResult.tests.push({ name: testName, status: 'PASSED' });
          console.log(`  ✅ [PASS] ${testName}`);
        } catch (err) {
          suiteResult.passed = false;
          suiteResult.tests.push({ name: testName, status: 'FAILED', error: err.message });
          console.error(`  ❌ [FAIL] ${testName}: ${err.message}`);
        }
      }
    });
  } catch (e) {
    suiteResult.passed = false;
    suiteResult.error = e.message;
    console.error(`  💥 ERROR FATAL EN SUITE: ${e.message}`);
  }
  results.suites.push(suiteResult);
}

// Empezar pruebas
async function main() {
  console.log(`Iniciando Evaluación Exhaustiva de Calidad (Senior QA) - PK Pilates`);
  console.log(`Fecha/Hora: ${new Date().toISOString()}`);

  // SUITE 1: VERIFICACIÓN DE INFORMACIÓN FEHACIENTE DEL ESTUDIO
  await runSuite('1. Información Fehaciente del Estudio y Profesionales', s => {
    s.test('Configuración General Oficial', () => {
      const conf = db.getConfiguracion();
      assert(conf.nombreEstudio === 'PK Estudio de Pilates & Contrología Corporal', 'Nombre del estudio debe coincidir exactamente');
      assert(conf.servicioPrincipal === 'Pilates Kinésico', 'Servicio principal debe ser Pilates Kinésico');
      assert(conf.camasDefault === 6, 'Cantidad de camas Reformer por defecto debe ser 6');
      assert(conf.adminPin === '2026', 'PIN administrativo oficial debe ser 2026');
      assert(conf.telefonoGeneral === '5493884123456', 'Teléfono general debe ser 5493884123456');
      assert(Array.isArray(conf.beneficios) && conf.beneficios.length >= 5, 'Debe incluir al menos 5 beneficios kinésicos');
    });

    s.test('Profesionales y Datos Bancarios Oficiales', () => {
      const profes = db.getProfesionales();
      assert(profes.length === 2, 'Deben existir exactamente 2 profesionales titulares');

      const gustavo = profes.find(p => p.nombre.includes('Gustavo Moyano'));
      assert(gustavo, 'Lic. Gustavo Moyano debe estar registrado');
      assert(gustavo.matricula === 'MP 3.840', 'Matrícula de Gustavo Moyano debe ser MP 3.840');
      assert(gustavo.banco.includes('Macro'), 'Banco de Gustavo debe ser Banco Macro');
      assert(gustavo.alias === 'gustavo.moyano.pk', 'Alias de Gustavo debe ser gustavo.moyano.pk');
      assert(gustavo.cbu === '2850590940090418135201', 'CBU de Gustavo debe ser 2850590940090418135201');
      assert(gustavo.cuit === '20-31849204-7', 'CUIT de Gustavo debe ser 20-31849204-7');
      assert(gustavo.telefono === '5493884123456', 'Teléfono de Gustavo debe ser 5493884123456');
      assert(gustavo.diasAtencion === 'Lunes a Viernes', 'Días de atención deben ser Lunes a Viernes');

      const agustina = profes.find(p => p.nombre.includes('Agustina Maidana'));
      assert(agustina, 'Lic. Agustina Maidana debe estar registrada');
      assert(agustina.matricula === 'MP 4.120', 'Matrícula de Agustina Maidana debe ser MP 4.120');
      assert(agustina.banco.includes('Mercado Pago'), 'Billetera de Agustina debe ser Mercado Pago (CVU)');
      assert(agustina.alias === 'agustina.maidana.pk', 'Alias de Agustina debe ser agustina.maidana.pk');
      assert(agustina.cbu === '0000003100084729184512', 'CVU de Agustina debe ser 0000003100084729184512');
      assert(agustina.cuit === '27-36940182-4', 'CUIT de Agustina debe ser 27-36940182-4');
      assert(agustina.telefono === '5493885987654', 'Teléfono de Agustina debe ser 5493885987654');
      assert(agustina.diasAtencion === 'Martes y Jueves', 'Días de atención deben ser Martes y Jueves');
    });

    s.test('Aranceles y Promociones Oficiales', () => {
      const promos = db.getPromociones();
      assert(promos.length >= 2, 'Deben existir al menos 2 planes/promociones');

      const particular = promos.find(p => p.id === 301 || p.tag.includes('Particular'));
      assert(particular, 'Debe existir plan Particular');
      assert(particular.precio === 50000, 'Arancel Particular debe ser $50.000');
      assert(particular.activa === true, 'Plan Particular debe estar activo');

      const isj = promos.find(p => p.id === 302 || p.titulo.includes('Instituto de Seguro'));
      assert(isj, 'Debe existir convenio Obra Social Instituto de Seguro');
      assert(isj.precio === 35000, 'Arancel Instituto de Seguro debe ser $35.000');
      assert(isj.activa === true, 'Convenio ISJ debe estar activo');
    });

    s.test('Malla de 26 Turnos y Disponibilidad de Camas Reformer', () => {
      const turnos = db.getTurnos();
      assert(turnos.length === 26, `Deben existir exactamente 26 turnos semanales, encontrado: ${turnos.length}`);
      
      const turnosGustavo = turnos.filter(t => t.profesorId === 1);
      assert(turnosGustavo.length === 20, `Gustavo Moyano debe tener 20 turnos (4x5 días), encontrado: ${turnosGustavo.length}`);

      const turnosAgustina = turnos.filter(t => t.profesorId === 2);
      assert(turnosAgustina.length === 6, `Agustina Maidana debe tener 6 turnos (3x2 días), encontrado: ${turnosAgustina.length}`);

      turnos.forEach(t => {
        assert(t.cupoMax === 6, `El turno ${t.id} (${t.dia} ${t.hora}) debe tener cupoMax = 6`);
        assert(Array.isArray(t.inscriptos), `El turno ${t.id} debe tener arreglo inscriptos`);
      });
    });
  });

  // SUITE 2: MOTOR DE REGLAS DE NEGOCIO Y LIBERACIÓN AUTOMÁTICA
  await runSuite('2. Reglas de Negocio: Reservas, Cupos y Auto-Liberación por Vencimiento', s => {
    s.test('Reserva Exitosa de Cupo', () => {
      const res = db.reservarCupo(101, 'Test Alumno QA', '5493881234567', 'Efectivo', 'Particular');
      assert(res.ok === true, 'La reserva de una cama disponible debe ser exitosa');
      assert(res.turno.inscriptos.includes('Test Alumno QA'), 'El alumno debe quedar registrado en inscriptos');

      const alu = db.getAlumnos().find(a => a.nombre === 'Test Alumno QA');
      assert(alu, 'El alumno debe ser registrado automáticamente en el padrón');
      assert(alu.montoMensual === 50000, 'El monto asignado debe ser 50.000 para Particular');
      assert(alu.habilitado === true, 'El alumno nuevo debe crearse habilitado');
    });

    s.test('Prevención de Doble Reserva (Duplicados)', () => {
      const res = db.reservarCupo(101, 'Test Alumno QA', '5493881234567', 'Efectivo', 'Particular');
      assert(res.ok === false, 'Debe rechazar si el alumno ya tiene reservada una cama en ese horario');
      assert(res.msg.includes('Ya tienes reservada'), 'Mensaje de error debe indicar turno ya reservado');
    });

    s.test('Control Estricto de Capacidad Máxima (6 Camas)', () => {
      const turno = db.getTurnos().find(t => t.id === 101);
      turno.inscriptos = ['Alumno 1', 'Alumno 2', 'Alumno 3', 'Alumno 4', 'Alumno 5', 'Alumno 6'];
      db.save();

      const res = db.reservarCupo(101, 'Alumno Excedente', '5493880000000', 'Efectivo', 'Particular');
      assert(res.ok === false, 'Debe rechazar la reserva si ya hay 6 camas ocupadas');
      assert(res.msg.includes('ocupadas'), 'Debe informar que todas las camas están ocupadas');
    });

    s.test('Liberación Manual de Cama Reformer', () => {
      const ok = db.liberarCupo(101, 'Alumno 1');
      assert(ok === true, 'liberarCupo debe retornar true');
      const turno = db.getTurnos().find(t => t.id === 101);
      assert(!turno.inscriptos.includes('Alumno 1'), 'Alumno 1 no debe figurar más en inscriptos');
      assert(turno.inscriptos.length === 5, 'Deben quedar 5 camas ocupadas');
    });

    s.test('Reubicación de Alumno entre Turnos', () => {
      const res = db.reubicarCupo(101, 102, 'Alumno 2');
      assert(res.ok === true, 'reubicarCupo debe ser exitoso');
      const t101 = db.getTurnos().find(t => t.id === 101);
      const t102 = db.getTurnos().find(t => t.id === 102);
      assert(!t101.inscriptos.includes('Alumno 2'), 'Alumno 2 no debe estar en origen');
      assert(t102.inscriptos.includes('Alumno 2'), 'Alumno 2 debe estar en destino');
      db.liberarCupo(102, 'Alumno 2');
    });

    s.test('Auditoría y Liberación Automática por Vencimiento / Deuda', () => {
      const fechaVencida = new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
      const aluVencido = db.crearAlumno({
        nombre: 'Alumno Moroso Test',
        montoMensual: 50000,
        estado: 'al_dia',
        vencimiento: fechaVencida,
        habilitado: true
      });

      const t103 = db.getTurnos().find(t => t.id === 103);
      t103.inscriptos.push('Alumno Moroso Test');
      db.save();

      const audit = db.evaluarVencimientosYLiberarCupos();
      assert(audit.count >= 1, 'La auditoría debe registrar al menos una liberación de cama');

      const aluActualizado = db.getAlumnos().find(a => a.id === aluVencido.id);
      assert(aluActualizado.habilitado === false, 'El alumno vencido debe quedar inhabilitado (en pausa)');
      assert(aluActualizado.estado === 'atrasado', 'El estado debe cambiar a atrasado');
      assert(aluActualizado.deuda === 50000, 'Debe registrar la deuda del arancel');

      const t103Actualizado = db.getTurnos().find(t => t.id === 103);
      assert(!t103Actualizado.inscriptos.includes('Alumno Moroso Test'), 'La cama en el turno 103 debe haberse liberado automáticamente');

      const intento = db.reservarCupo(103, 'Alumno Moroso Test', '123', 'Efectivo', 'Particular');
      assert(intento.ok === false, 'No debe permitir reservar a un alumno con cuota vencida o en pausa');

      db.eliminarAlumno(aluVencido.id);
    });

    s.test('Rehabilitación Automática por Pago de Cuota', () => {
      const aluSuspendido = db.crearAlumno({
        nombre: 'Alumno Pagador Test',
        montoMensual: 35000,
        estado: 'atrasado',
        deuda: 35000,
        habilitado: false
      });

      const pagado = db.registrarPago(aluSuspendido.id);
      assert(pagado.habilitado === true, 'El alumno debe rehabilitarse inmediatamente tras pagar');
      assert(pagado.estado === 'al_dia', 'El estado debe volver a al_dia');
      assert(pagado.deuda === 0, 'La deuda debe quedar en 0');

      db.eliminarAlumno(aluSuspendido.id);
    });
  });

  // SUITE 3: CHATBOT DE WHATSAPP Y ATENCIÓN AUTOMATIZADA
  await runSuite('3. Asistente y Webhook de WhatsApp Cloud API', s => {
    s.test('Verificación de Webhook con Meta (Handshake GET)', () => {
      const ok = whatsappService.verify('subscribe', 'pk_pilates_token_2026', 'challenge_test_xyz');
      assert(ok.ok === true && ok.challenge === 'challenge_test_xyz', 'Debe validar token y retornar challenge');

      const bad = whatsappService.verify('subscribe', 'token_invalido', 'xyz');
      assert(bad.ok === false, 'Debe rechazar token inválido');
    });

    s.test('Flujo de Saludo y Menú Interactivo', () => {
      const resp = whatsappService.generateResponse('Hola, buenas tardes', 'María', '5493881112222');
      assert(resp.type === 'interactive_menu', 'Debe responder con menú interactivo');
      assert(resp.text.includes('PK Pilates'), 'Debe incluir bienvenida oficial de PK');
      assert(resp.text.includes('Gustavo Moyano'), 'Debe mencionar a Gustavo Moyano');
      assert(resp.text.includes('Agustina Maidana'), 'Debe mencionar a Agustina Maidana');
    });

    s.test('Flujo de Consulta de Horarios y Disponibilidad en Vivo', () => {
      const resp = whatsappService.generateResponse('que horarios tienen disponibles?', 'Carlos', '5493882223333');
      assert(resp.text.includes('Lic. Gustavo Moyano'), 'Debe detallar turnos de Gustavo');
      assert(resp.text.includes('Lic. Agustina Maidana'), 'Debe detallar turnos de Agustina');
      assert(resp.text.toLowerCase().includes('camas disponibles'), 'Debe informar disponibilidad de camas');
    });

    s.test('Flujo de Aranceles (Particular vs Obra Social)', () => {
      const resp = whatsappService.generateResponse('cuanto sale la cuota mensual?', 'Lucía', '5493883334444');
      assert(resp.text.includes('50.000'), 'Debe informar $50.000 para Particular');
      assert(resp.text.includes('35.000'), 'Debe informar $35.000 para Obra Social Instituto de Seguro');
      assert(resp.text.includes('2 clases semanales'), 'Debe especificar 2 clases semanales');
    });

    s.test('Flujo de Datos Bancarios de Kinesiólogos', () => {
      const resp = whatsappService.generateResponse('pasame el cbu o alias para transferir', 'Gonzalo', '5493884445555');
      assert(resp.text.includes('gustavo.moyano.pk'), 'Debe indicar alias de Gustavo');
      assert(resp.text.includes('2850590940090418135201'), 'Debe indicar CBU de Gustavo');
      assert(resp.text.includes('agustina.maidana.pk'), 'Debe indicar alias de Agustina');
      assert(resp.text.includes('0000003100084729184512'), 'Debe indicar CVU de Agustina');
    });

    s.test('Flujo de Beneficios Kinésicos', () => {
      const resp = whatsappService.generateResponse('cuales son los beneficios de pilates kinesico?', 'Elena', '5493885556666');
      assert(resp.text.includes('Licenciados en Kinesiología y Fisioterapia'), 'Debe destacar que está a cargo de Kinesiólogos');
      assert(resp.text.includes('columna') || resp.text.includes('postura'), 'Debe incluir alineación y postura');
    });

    s.test('Registro y Auditoría de Logs de WhatsApp', () => {
      const webhookPayload = {
        from: '5493887778888',
        name: 'Cliente Auditoria',
        text: 'aranceles'
      };
      const result = whatsappService.processWebhook(webhookPayload);
      assert(result.ok === true, 'El webhook debe procesar el mensaje con éxito');
      const logs = whatsappService.getLogs();
      assert(logs.length > 0, 'Debe haber guardado el evento en el log');
      assert(logs[0].remitente === 'Cliente Auditoria', 'El remitente debe coincidir en el log');
    });
  });

  // Limpiar cualquier turno de prueba
  const turnos = db.getTurnos();
  turnos.forEach(t => t.inscriptos = []);
  db.data.alumnos = [];
  db.save();

  console.log(`\n======================================================`);
  console.log(`📊 RESUMEN FINAL DE LA AUDITORÍA DE QA SENIOR`);
  console.log(`======================================================`);
  console.log(`Total de aserciones evaluadas: ${results.total}`);
  console.log(`Aserciones APROBADAS: ${results.passed} ✅`);
  console.log(`Aserciones FALLIDAS:  ${results.failed} ❌`);
  
  if (results.failed === 0) {
    console.log(`\n🎉 EVALUACIÓN DE QA COMPLETADA CON ÉXITO: 100% OPERATIVO Y FEHACIENTE.`);
  } else {
    console.error(`\n⚠️ SE DETECTARON FALLOS EN LA EVALUACIÓN.`);
    process.exit(1);
  }
}

main().catch(err => {
  console.error('Error fatal ejecutando test suite:', err);
  process.exit(1);
});
