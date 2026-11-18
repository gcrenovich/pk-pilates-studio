/**
 * PK - Estudio de Pilates & Contrología Corporal
 * Motor de Chatbot & Webhook de WhatsApp Cloud API
 * Adaptado con los Horarios, Profesionales, Aranceles y Beneficios Oficiales
 * Desarrollado por Antigravity (Lead Architect) & Cline (Software Engineer)
 */

const db = require('./db');

const VERIFY_TOKEN = process.env.WHATSAPP_VERIFY_TOKEN || 'pk_pilates_token_2026';
const webhookLogs = [];

class WhatsAppService {
  constructor() {
    this.verifyToken = VERIFY_TOKEN;
  }

  verify(mode, token, challenge) {
    if (mode === 'subscribe' && token === this.verifyToken) {
      console.log('✅ Webhook de WhatsApp verificado correctamente con Meta');
      return { ok: true, challenge };
    }
    return { ok: false, error: 'Token de verificación inválido' };
  }

  processWebhook(payload) {
    const timestamp = new Date().toLocaleTimeString();
    let messageData = null;

    if (payload.entry && payload.entry[0]?.changes && payload.entry[0].changes[0]?.value?.messages) {
      const msgObj = payload.entry[0].changes[0].value.messages[0];
      const contact = payload.entry[0].changes[0].value.contacts?.[0];
      messageData = {
        from: msgObj.from,
        name: contact?.profile?.name || 'Cliente WhatsApp',
        type: msgObj.type,
        text: msgObj.type === 'text' ? msgObj.text.body : (msgObj.interactive?.button_reply?.title || 'Interacción'),
        raw: msgObj
      };
    } else if (payload.from && payload.text) {
      messageData = {
        from: payload.from,
        name: payload.name || 'Alumno',
        type: 'text',
        text: payload.text,
        raw: payload
      };
    }

    if (!messageData) {
      return { ok: true, status: 'NO_MESSAGE_EVENT' };
    }

    const respuestaBot = this.generateResponse(messageData.text, messageData.name, messageData.from);

    const logEntry = {
      id: Date.now(),
      hora: timestamp,
      remitente: messageData.name,
      telefono: messageData.from,
      mensajeEntrante: messageData.text,
      respuestaBot: respuestaBot.text,
      tipoRespuesta: respuestaBot.type || 'text'
    };

    webhookLogs.unshift(logEntry);
    if (webhookLogs.length > 50) webhookLogs.pop();

    return {
      ok: true,
      sender: messageData,
      reply: respuestaBot,
      log: logEntry
    };
  }

  generateResponse(mensajeRaw, remitenteNombre, telefono) {
    const msg = mensajeRaw.toLowerCase().trim();

    // 1. HORARIOS Y PROFESIONALES (Con verificación de cupos de camas)
    if (msg.includes('horario') || msg.includes('turno') || msg.includes('profesional') || msg.includes('disponib') || msg.includes('gustavo') || msg.includes('agustina')) {
      const turnos = db.getTurnos();
      const libres = turnos.filter(t => t.inscriptos.length < t.cupoMax);

      let texto = `¡Hola *${remitenteNombre}*! 😊\n\n`;
      texto += `Te compartimos nuestros horarios disponibles para las clases de *PILATES KINÉSICO*:\n\n`;

      texto += `📅 *HORARIOS Y PROFESIONALES*\n\n`;
      texto += `👨‍⚕️ *Lic. Gustavo Moyano*\n`;
      texto += `• _Lunes a viernes:_\n`;
      texto += `  - Turno mañana: *08:00 a 09:00 hs.*\n`;
      texto += `  - Turno siesta: *15:00, 16:00 y 17:00 hs.*\n\n`;

      texto += `👩‍⚕️ *Lic. Agustina Maidana*\n`;
      texto += `• _Martes y jueves:_\n`;
      texto += `  - Turnos tarde/noche: *18:00, 19:00 y 20:00 hs.*\n\n`;

      texto += `🛏️ *Camas Reformer Libres para Hoy/Mañana:*\n`;
      libres.slice(0, 4).forEach(t => {
        const cLibres = t.cupoMax - t.inscriptos.length;
        const prof = t.profesorId === 1 ? 'Lic. Gustavo Moyano' : 'Lic. Agustina Maidana';
        texto += `• *${t.dia} ${t.hora} hs* (${cLibres} camas disponibles) - _${prof}_\n`;
      });

      texto += `\n👉 Para asegurar tu cama podés tocar "Reservar Cama" en la web o responder con el horario elegido.`;

      return {
        type: 'interactive_list',
        text: texto,
        quickReplies: ['Aranceles y Precios', 'Beneficios', 'Reservar mi Lugar', 'Datos para Transferir']
      };
    }

    // 2. ARANCELES Y PRECIOS (Particular vs Obra Social Instituto de Seguro)
    if (msg.includes('arancel') || msg.includes('precio') || msg.includes('tarifa') || msg.includes('cuanto') || msg.includes('obra social') || msg.includes('instituto') || msg.includes('particular')) {
      let texto = `💰 *ARANCELES MENSUALES - PILATES KINÉSICO*\n\n`;
      texto += `🔹 *Particular:* $50.000 mensuales.\n`;
      texto += `_Incluye 2 clases semanales en camillas Reformer con seguimiento kinesiológico._\n\n`;

      texto += `🔹 *Obra Social Instituto de Seguro:* $35.000 mensuales.\n`;
      texto += `_Presentando el carnet correspondiente. Incluye 2 clases semanales._\n\n`;

      texto += `💳 *Medios de Pago:* Transferencia por Alias/CBU de los profesionales (Mercado Pago, Macro) o efectivo en el estudio.\n\n`;
      texto += `💚 *Tu bienestar, en manos de profesionales de la salud.*\n¿Te gustaría consultar disponibilidad de horarios?`;

      return {
        type: 'text',
        text: texto,
        quickReplies: ['Ver Horarios', 'Beneficios Kinésicos', 'Alias para Transferir']
      };
    }

    // 3. BENEFICIOS DEL PILATES KINÉSICO
    if (msg.includes('beneficio') || msg.includes('salud') || msg.includes('postura') || msg.includes('dolor') || msg.includes('lesion') || msg.includes('que es')) {
      let texto = `🧘 *BENEFICIOS DEL PILATES KINÉSICO*\n\n`;
      texto += `Nuestras clases están a cargo de *Licenciados en Kinesiología y Fisioterapia*, profesionales de la salud especializados en el movimiento y la rehabilitación.\n\n`;
      texto += `Trabajamos para:\n`;
      texto += `✔️ Mejorar la movilidad y flexibilidad.\n`;
      texto += `✔️ Fortalecer la musculatura profunda.\n`;
      texto += `✔️ Mejorar la postura y alineación de columna.\n`;
      texto += `✔️ Prevenir lesiones y aliviar dolores crónicos.\n`;
      texto += `✔️ Promover el bienestar físico y una mejor calidad de vida.\n\n`;
      texto += `💚 *Tu bienestar, en manos de profesionales de la salud.*`;

      return {
        type: 'text',
        text: texto,
        quickReplies: ['Ver Horarios', 'Aranceles Mensuales', 'Anotarme']
      };
    }

    // 4. DATOS DE TRANSFERENCIA (Alias y CBU de Gustavo y Agustina)
    if (msg.includes('pago') || msg.includes('pagar') || msg.includes('alias') || msg.includes('cbu') || msg.includes('transferir') || msg.includes('comprobante')) {
      let texto = `💳 *Datos de Transferencia Bancaria Digital:*\n\n`;
      texto += `👨‍⚕️ *Lic. Gustavo Moyano*\n`;
      texto += `• Banco: Banco Macro\n`;
      texto += `• Alias: \`gustavo.moyano.pk\`\n`;
      texto += `• CBU: \`2850590940090418135201\`\n\n`;

      texto += `👩‍⚕️ *Lic. Agustina Maidana*\n`;
      texto += `• Billetera: Mercado Pago (CVU)\n`;
      texto += `• Alias: \`agustina.maidana.pk\`\n`;
      texto += `• CVU: \`0000003100084729184512\`\n\n`;

      texto += `📸 _Una vez transferido, enviá la captura de tu comprobante por aquí para confirmarte la cama._`;

      return {
        type: 'text',
        text: texto,
        quickReplies: ['Ya transferí', 'Ver Horarios']
      };
    }

    // 5. RESERVA DE LUGAR
    if (msg.startsWith('anotarme') || msg.startsWith('reservar') || msg.includes('reserva')) {
      const turnos = db.getTurnos();
      const turnoLibre = turnos.find(t => t.inscriptos.length < t.cupoMax);

      if (turnoLibre) {
        db.reservarCupo(turnoLibre.id, remitenteNombre, telefono, 'transferencia', 'Particular');
        const prof = turnoLibre.profesorId === 1 ? 'Lic. Gustavo Moyano' : 'Lic. Agustina Maidana';

        let texto = `🎉 *¡Excelente ${remitenteNombre}! Tu lugar ha sido reservado con éxito.*\n\n`;
        texto += `📅 *Día:* ${turnoLibre.dia} a las ${turnoLibre.hora} hs\n`;
        texto += `🤸 *Clase:* ${turnoLibre.tipo}\n`;
        texto += `👨‍⚕️ *Profesional:* ${prof}\n\n`;
        texto += `Arancel mensual: $50.000 (o $35.000 con carnet del Instituto de Seguro).\n¡Te esperamos en el estudio! 😊`;

        return { type: 'text', text: texto };
      }
    }

    // 6. MENSAJE PRINCIPAL / PROPAGANDA OFICIAL
    let bienvenida = `¡Hola! Buenas tardes 😊\n\n`;
    bienvenida += `Bienvenido/a a *PK Pilates - Contrología Corporal & Kinesiología*.\n\n`;
    bienvenida += `Te compartimos nuestras opciones para *PILATES KINÉSICO*:\n\n`;
    bienvenida += `1️⃣ 📅 *Horarios y Profesionales* (Gustavo Moyano y Agustina Maidana)\n`;
    bienvenida += `2️⃣ 💰 *Aranceles Mensuales* (Particular $50.000 / Instituto de Seguro $35.000)\n`;
    bienvenida += `3️⃣ 🧘 *Beneficios Kinésicos* (Postura, fuerza y rehabilitación)\n`;
    bienvenida += `4️⃣ 💳 *Datos de Pago* (Alias y CBU bancario)\n\n`;
    bienvenida += `💚 _Tu bienestar, en manos de profesionales de la salud._`;

    return {
      type: 'interactive_menu',
      text: bienvenida,
      quickReplies: ['1. Horarios y Profesionales', '2. Aranceles Mensuales', '3. Beneficios Kinésicos', '4. Datos de Pago']
    };
  }

  getLogs() {
    return webhookLogs;
  }
}

module.exports = new WhatsAppService();
