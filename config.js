/* =========================================================
   CONFIGURACIÓN DE LA TIENDA DULCENATA
   ---------------------------------------------------------
   1. Pega aquí la URL que te da Google Apps Script al
      "Implementar > Nueva implementación > Aplicación web".
      Termina en /exec
   2. Mientras esté vacía, la tienda funciona en MODO DEMO
      (productos de ejemplo guardados solo en tu navegador).
   ========================================================= */
window.DULCENATA_CONFIG = {
  API_URL: 'https://script.google.com/macros/s/AKfycbyo1wvpCNLNR8XIsxoImn2xjsvMCkKQ0nRBCWfm3oYxbepsAEZ3RoGmYiKxn3trI-hQmA/exec', // cuenta dulcenatamedellin

  // Valores por defecto (todo esto se cambia desde el panel > Ajustes)
  nombre: 'Dulcenata',
  eslogan: 'Los mejores desayunos y detalles de Medellín',
  whatsapp: '573000000000', // con 57 adelante, sin + ni espacios
  instagram: 'regalos_dulcenata',
  ciudad: 'Medellín',
  horario: 'Lunes a sábado 8:00 a.m. – 7:00 p.m. · Domingos con reserva',
  domicilio: 'Domicilio según la zona. Te confirmamos el valor por WhatsApp.',
  pagos: 'Nequi, Daviplata, Bancolombia, Efectivo',
  banner: '',               // vacío = usa banner.jpg
  correo: 'dulcenatamedellin@gmail.com',
  direccionTienda: 'Medellín, Antioquia',
  nit: '',                  // NIT o cédula (opcional, sale en el recibo)
  categorias: '["Desayunos sorpresa","Anchetas","Detalles dulces","Globos","Flores","Peluches"]',

  // Datos que ve el cliente al elegir cada medio de pago (se editan en el panel > Ajustes)
  pagosInfo: {
    'Nequi': 'Al confirmar tu pedido te enviamos por WhatsApp los datos para pagar.',
    'Daviplata': 'Al confirmar tu pedido te enviamos por WhatsApp los datos para pagar.',
    'Bancolombia': 'Al confirmar tu pedido te enviamos por WhatsApp los datos para pagar.',
    'Efectivo': 'Pagas al recibir. Cuéntanos con cuánto vas a pagar para llevar las vueltas.'
  },

  // Frases sugeridas para la tarjeta (se editan en el panel > Mensajes)
  mensajes: [
    { cat: 'Amor', texto: 'Eres mi lugar favorito en el mundo. Te amo hoy y siempre. 💖' },
    { cat: 'Amor', texto: 'Contigo cada día es un regalo. Gracias por existir en mi vida.' },
    { cat: 'Amor', texto: 'No necesito una fecha especial para decirte lo mucho que te quiero.' },
    { cat: 'Cumpleaños', texto: '¡Feliz cumpleaños! Que este nuevo año te traiga todo lo que sueñas. 🎉' },
    { cat: 'Cumpleaños', texto: 'Hoy celebramos a una persona maravillosa: ¡tú! Feliz día.' },
    { cat: 'Cumpleaños', texto: 'Que la vida te siga regalando motivos para sonreír. ¡Feliz cumpleaños!' },
    { cat: 'Aniversario', texto: 'Un año más eligiéndonos. Gracias por cada momento a mi lado. Feliz aniversario.' },
    { cat: 'Aniversario', texto: 'Contigo el tiempo vuela y el amor crece. ¡Feliz aniversario, mi amor!' },
    { cat: 'Mamá', texto: 'Gracias por tu amor infinito, mamá. Eres mi ejemplo y mi mayor bendición.' },
    { cat: 'Mamá', texto: 'Para la mujer que me lo dio todo: te amo, mamá.' },
    { cat: 'Papá', texto: 'Gracias por ser mi guía y mi héroe. Te quiero mucho, papá.' },
    { cat: 'Amistad', texto: 'Los amigos son la familia que uno escoge. Gracias por estar siempre.' },
    { cat: 'Amistad', texto: 'Un detalle pequeño para alguien que hace mi vida más bonita.' },
    { cat: 'Gracias', texto: 'Gracias por tanto. Este detalle es solo una forma de decirte lo especial que eres.' },
    { cat: 'Pronta recuperación', texto: 'Te mando un abrazo enorme y mucha energía. ¡Que te recuperes pronto!' },
    { cat: 'Sorpresa', texto: 'Porque sí, porque te lo mereces y porque quería sacarte una sonrisa. 😊' },
    { cat: 'Sorpresa', texto: 'Hoy es un buen día para recordarte lo increíble que eres.' },
    { cat: 'Perdón', texto: 'Lo siento. Eres muy importante para mí y quiero arreglar las cosas.' }
  ],

  // Mensajes al cliente. Puedes usar: {cliente} {pedido} {entrega} {recibe} {link} {recibo} {tienda}
  msgConfirmado:  '¡Hola {cliente}! 💝 Tu pedido *{pedido}* en {tienda} está *confirmado*.\n📅 Entrega: {entrega}\n\n🧾 Tu recibo de compra: {recibo}\n🔎 Síguelo aquí: {link}',
  msgPreparacion: '¡Hola {cliente}! 🎀 Ya estamos *preparando* tu pedido *{pedido}* con mucho amor.\n\nSíguelo aquí: {link}',
  msgCamino:      '¡Hola {cliente}! 🚗 Tu pedido *{pedido}* va *en camino* a donde {recibe}.\n\nSíguelo aquí: {link}',
  msgEntregado:   '¡Hola {cliente}! ✅ Tu pedido *{pedido}* fue *entregado* a {recibe}.\n📸 Tu recibo con la foto de la entrega: {recibo}\n\n¡Gracias por elegir {tienda}! 💖 Si te gustó, nos encantaría que nos etiquetaras en Instagram.',
  msgCancelado:   'Hola {cliente}, tu pedido *{pedido}* fue cancelado. Si tienes preguntas, escríbenos por aquí.'
};
