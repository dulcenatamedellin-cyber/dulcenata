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
  categorias: '["Desayunos sorpresa","Anchetas","Detalles dulces","Globos","Flores","Peluches"]',

  // Mensajes al cliente. Puedes usar: {cliente} {pedido} {entrega} {recibe} {link} {tienda}
  msgConfirmado:  '¡Hola {cliente}! 💝 Tu pedido *{pedido}* en {tienda} está *confirmado*.\n📅 Entrega: {entrega}\n\nPuedes seguirlo aquí: {link}',
  msgPreparacion: '¡Hola {cliente}! 🎀 Ya estamos *preparando* tu pedido *{pedido}* con mucho amor.\n\nSíguelo aquí: {link}',
  msgCamino:      '¡Hola {cliente}! 🚗 Tu pedido *{pedido}* va *en camino* a donde {recibe}.\n\nSíguelo aquí: {link}',
  msgEntregado:   '¡Hola {cliente}! ✅ Tu pedido *{pedido}* fue *entregado* a {recibe}.\n📸 Mira la foto de la entrega aquí: {link}\n\n¡Gracias por elegir {tienda}! 💖 Si te gustó, nos encantaría que nos etiquetaras en Instagram.',
  msgCancelado:   'Hola {cliente}, tu pedido *{pedido}* fue cancelado. Si tienes preguntas, escríbenos por aquí.'
};
