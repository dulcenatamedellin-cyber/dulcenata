/* =========================================================
   CAPA DE DATOS DULCENATA
   Habla con Google Apps Script (Google Sheets + Drive).
   Si no hay API_URL configurada, usa MODO DEMO (localStorage).
   ========================================================= */
(function () {
  const CFG = window.DULCENATA_CONFIG || {};
  const API = (CFG.API_URL || '').trim();
  const DEMO = !API;
  const LS_KEY = 'dulcenata_demo_v6';

  // ---------- Imagen de ejemplo (SVG) ----------
  function placeholder(emoji, c1, c2) {
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600">
      <defs><radialGradient id="g" cx="30%" cy="25%" r="90%"><stop offset="0" stop-color="${c1}"/><stop offset="1" stop-color="${c2}"/></radialGradient></defs>
      <rect width="600" height="600" fill="url(#g)"/>
      <circle cx="470" cy="120" r="70" fill="#fff" opacity=".18"/><circle cx="110" cy="500" r="110" fill="#fff" opacity=".12"/>
      <text x="300" y="360" font-size="230" text-anchor="middle">${emoji}</text></svg>`;
    return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
  }

  const hace = h => new Date(Date.now() - h * 3600e3).toISOString();
  const SEED = {
    config: {},
    productos: [
      { id: 'p1', nombre: 'Desayuno sorpresa clásico', categoria: 'Desayunos sorpresa', precio: 85000, precioAntes: 0, descripcion: 'Bandeja decorada con sándwich, fruta picada, jugo natural, yogur con granola, café o chocolate y tarjeta personalizada.', imagen: placeholder('🥐', '#ffd1e3', '#e8337f'), etiqueta: 'Más vendido', estado: 'activo', destacado: true, orden: 1 },
      { id: 'p2', nombre: 'Desayuno premium con globo', categoria: 'Desayunos sorpresa', precio: 125000, precioAntes: 140000, descripcion: 'Desayuno completo en caja de madera, globo burbuja con nombre, fresas con chocolate y mini botella de espumoso.', imagen: placeholder('🎈', '#fff3a8', '#f2a900'), etiqueta: 'Oferta', estado: 'activo', destacado: true, orden: 2 },
      { id: 'p3', nombre: 'Ancheta dulce', categoria: 'Anchetas', precio: 95000, precioAntes: 0, descripcion: 'Canasta con chocolates, galletas, gomitas, snacks y moño de cinta. Ideal para cumpleaños y aniversarios.', imagen: placeholder('🧺', '#ffe0ec', '#c2185b'), etiqueta: '', estado: 'activo', destacado: false, orden: 3 },
      { id: 'p4', nombre: 'Ancheta para él', categoria: 'Anchetas', precio: 110000, precioAntes: 0, descripcion: 'Cervezas artesanales, maní, papitas, chocolatina y tarjeta. Para papá, novio o amigo.', imagen: placeholder('🎁', '#fde68a', '#d97706'), etiqueta: 'Nuevo', estado: 'activo', destacado: false, orden: 4 },
      { id: 'p5', nombre: 'Caja de fresas con chocolate', categoria: 'Detalles dulces', precio: 55000, precioAntes: 0, descripcion: '12 fresas bañadas en chocolate blanco y negro, decoradas a mano. Se entregan frescas el mismo día.', imagen: placeholder('🍓', '#ffd6e0', '#e11d48'), etiqueta: '', estado: 'activo', destacado: true, orden: 5 },
      { id: 'p6', nombre: 'Bouquet de 12 rosas', categoria: 'Flores', precio: 90000, precioAntes: 0, descripcion: 'Rosas rojas o rosadas con follaje, papel coreano y tarjeta con tu mensaje.', imagen: placeholder('🌹', '#ffe4ef', '#be185d'), etiqueta: '', estado: 'activo', destacado: false, orden: 6, colorTitulo: 'Color de las rosas', colores: [{ n: 'Rojo', h: '#c8102e' }, { n: 'Rosado', h: '#f48fb1' }, { n: 'Blanco', h: '#ffffff' }] },
      { id: 'p7', nombre: 'Globo burbuja personalizado', categoria: 'Globos', precio: 45000, precioAntes: 0, descripcion: 'Globo transparente con nombre o frase en vinilo, plumas o confeti por dentro y base.', imagen: placeholder('🎉', '#fff7c2', '#e8337f'), etiqueta: '', estado: 'activo', destacado: false, orden: 7, colorTitulo: 'Color del globo', colores: [{ n: 'Rosado', h: '#f48fb1' }, { n: 'Dorado', h: '#d4af37' }, { n: 'Plateado', h: '#c0c0c0' }, { n: 'Azul', h: '#64b5f6' }] },
      { id: 'a1', nombre: 'Globo metalizado de corazón', categoria: 'Adiciones', precio: 12000, precioAntes: 0, descripcion: 'Globo de 45 cm inflado con helio, con cinta.', imagen: placeholder('❤️', '#ffe0ec', '#e11d48'), etiqueta: '', estado: 'activo', destacado: false, orden: 20, colorTitulo: 'Color del globo', colores: [{ n: 'Rojo', h: '#c8102e' }, { n: 'Rosado', h: '#f48fb1' }, { n: 'Dorado', h: '#d4af37' }, { n: 'Plateado', h: '#c0c0c0' }] },
      { id: 'a2', nombre: 'Vaso personalizado', categoria: 'Adiciones', precio: 18000, precioAntes: 0, descripcion: 'Vaso con nombre o frase en vinilo.', imagen: placeholder('🥤', '#e0f2fe', '#0284c7'), etiqueta: '', estado: 'activo', destacado: false, orden: 21 },
      { id: 'a3', nombre: 'Mini vino espumoso', categoria: 'Adiciones', precio: 35000, precioAntes: 0, descripcion: 'Botella de 375 ml para brindar.', imagen: placeholder('🍾', '#fef3c7', '#b45309'), etiqueta: '', estado: 'activo', destacado: false, orden: 22 },
      { id: 'a4', nombre: 'Rosa adicional', categoria: 'Adiciones', precio: 6000, precioAntes: 0, descripcion: 'Una rosa natural con papel y moño.', imagen: placeholder('🌹', '#ffe4ef', '#be185d'), etiqueta: '', estado: 'activo', destacado: false, orden: 23, colorTitulo: 'Color de la rosa', colores: [{ n: 'Rojo', h: '#c8102e' }, { n: 'Rosado', h: '#f48fb1' }, { n: 'Blanco', h: '#ffffff' }, { n: 'Amarillo', h: '#ffd60a' }] },
      { id: 'p8', nombre: 'Peluche con chocolates', categoria: 'Peluches', precio: 75000, precioAntes: 0, descripcion: 'Osito de peluche de 30 cm, caja de chocolates y globo metalizado.', imagen: placeholder('🧸', '#fde2e4', '#9d174d'), etiqueta: '', estado: 'agotado', destacado: false, orden: 8 }
    ],
    resenas: [
      { id: 'r1', fecha: hace(30), nombre: 'Valentina (ejemplo)', estrellas: 5, texto: 'El desayuno llegó puntual y hermoso, mi mamá lloró de la emoción. ¡Gracias!', producto: 'Desayuno sorpresa clásico', estado: 'aprobada', respuesta: '¡Gracias Valentina! Fue un placer ser parte de ese momento 💖' },
      { id: 'r2', fecha: hace(80), nombre: 'Julián (ejemplo)', estrellas: 5, texto: 'Excelente atención por WhatsApp y la ancheta muy completa.', producto: 'Ancheta dulce', estado: 'aprobada', respuesta: '' },
      { id: 'r3', fecha: hace(2), nombre: 'Sara (ejemplo)', estrellas: 4, texto: 'Muy lindo todo, el globo podría ser un poquito más grande.', producto: '', estado: 'pendiente', respuesta: '' }
    ],
    pedidos: [
      { id: 'DN-7QK2', fecha: hace(3), cliente: 'Andrés Ruiz (ejemplo)', telefono: '3109876543', recibe: 'Camila', direccion: 'Calle 10 #40-20, El Poblado', fechaEntrega: 'mañana · 9:00 a. m.', mensaje: 'Feliz aniversario #17', pago: 'Daviplata', notas: 'Es sorpresa', productos: '1 x Desayuno premium con globo ($125.000)', total: 125000, estado: 'Confirmado', fotoEntrega: '', historial: [{ e: 'Pendiente', t: hace(3) }, { e: 'Confirmado', t: hace(2) }] },
      { id: 'DN-6MA9', fecha: hace(26), cliente: 'Laura Gómez (ejemplo)', telefono: '3001234567', recibe: 'Mamá', direccion: 'Cra 43 #12-30', fechaEntrega: 'hoy · 8:00 a. m.', mensaje: 'Feliz cumpleaños mamá', pago: 'Nequi', notas: '', productos: '1 x Desayuno sorpresa clásico ($85.000)', total: 85000, estado: 'Pendiente', fotoEntrega: '', historial: [{ e: 'Pendiente', t: hace(26) }] }
    ]
  };

  function demoLoad() {
    try { const raw = localStorage.getItem(LS_KEY); if (raw) return JSON.parse(raw); } catch (e) {}
    return JSON.parse(JSON.stringify(SEED));
  }
  function demoSave(db) {
    try { localStorage.setItem(LS_KEY, JSON.stringify(db)); }
    catch (e) { console.warn('El navegador no dejó guardar (¿foto muy grande?)'); }
  }
  let demoDb = DEMO ? demoLoad() : null;

  // ---------- Llamadas a Apps Script ----------
  async function get(params) {
    const qs = Object.keys(params).map(k => k + '=' + encodeURIComponent(params[k])).join('&');
    const r = await fetch(API + '?' + qs + '&t=' + Date.now());
    const j = await r.json();
    if (!j.ok) throw new Error(j.error || 'Error del servidor');
    return j.data;
  }
  async function post(body) {
    // Sin cabeceras => text/plain => no hay "preflight" CORS con Apps Script
    const r = await fetch(API, { method: 'POST', body: JSON.stringify(body) });
    const j = await r.json();
    if (!j.ok) throw new Error(j.error || 'Error del servidor');
    return j.data;
  }

  function mergeConfig(c) { return Object.assign({}, CFG, c || {}); }
  const uid = () => 'p' + Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
  function hist(h) { if (Array.isArray(h)) return h; try { return JSON.parse(h || '[]'); } catch (e) { return []; } }

  window.DN = {
    DEMO,
    placeholder,
    ESTADOS: ['Pendiente', 'Confirmado', 'En preparación', 'En camino', 'Entregado', 'Cancelado'],

    // Lista de categorías: las guardadas en Ajustes + las que usen los productos
    categorias(config, productos) {
      let base = [];
      try { base = JSON.parse(config.categorias || '[]'); } catch (e) {}
      (productos || []).forEach(p => { if (p.categoria && base.indexOf(p.categoria) < 0) base.push(p.categoria); });
      if (!base.some(c => DN.esAdicionCat(c))) base.push('Adiciones');   // siempre existe la categoría de adiciones
      return base;
    },

    // Frases para tarjeta [{cat, texto}] y datos de pago {medio: texto}. Aceptan texto JSON o lista
    mensajes(config) {
      let m = config.mensajes;
      if (typeof m === 'string') { try { m = JSON.parse(m); } catch (e) { m = []; } }
      return Array.isArray(m) ? m.filter(x => x && x.texto) : [];
    },
    pagosInfo(config) {
      let m = config.pagosInfo;
      if (typeof m === 'string') { try { m = JSON.parse(m); } catch (e) { m = {}; } }
      return m && typeof m === 'object' ? m : {};
    },
    zonas(config) {
      let z = config.zonas;
      if (typeof z === 'string') { try { z = JSON.parse(z); } catch (e) { z = []; } }
      return Array.isArray(z) ? z.filter(x => x && x.nombre).map(x => ({ nombre: String(x.nombre), valor: Number(x.valor) || 0 })) : [];
    },
    esAdicionCat(c) { return /^adici[oó]n(es)?$/i.test(String(c || '').trim()); },
    esAdicion(p) { return DN.esAdicionCat(p && p.categoria); },
    esEfectivo(medio) { return /efectivo/i.test(medio || ''); },

    async tienda() {
      if (DEMO) {
        demoDb = demoLoad();
        return { config: mergeConfig(demoDb.config), productos: demoDb.productos.slice(),
                 resenas: (demoDb.resenas || []).filter(r => r.estado === 'aprobada') };
      }
      const d = await get({ action: 'tienda' });
      return { config: mergeConfig(d.config), productos: d.productos, resenas: d.resenas || [] };
    },

    // ----- Reseñas -----
    async crearResena(r) {
      if (DEMO) {
        demoDb = demoLoad(); demoDb.resenas = demoDb.resenas || [];
        demoDb.resenas.unshift(Object.assign({ id: 'r' + Date.now().toString(36), fecha: new Date().toISOString(), estado: 'pendiente', respuesta: '' }, r));
        demoSave(demoDb); return true;
      }
      return post({ action: 'crearResena', resena: r });
    },
    async resenaActualizar(pin, id, campos) {
      if (DEMO) { demoDb = demoLoad(); const r = (demoDb.resenas || []).find(x => x.id === id); if (r) Object.assign(r, campos); demoSave(demoDb); return true; }
      return post({ action: 'resenaActualizar', pin, id, campos });
    },
    async resenaEliminar(pin, id) {
      if (DEMO) { demoDb = demoLoad(); demoDb.resenas = (demoDb.resenas || []).filter(x => x.id !== id); demoSave(demoDb); return true; }
      return post({ action: 'resenaEliminar', pin, id });
    },

    // ----- Colores de un producto: [{n: nombre, h: '#hex'}] -----
    PALETA: [
      { n: 'Rojo', h: '#c8102e' }, { n: 'Rosado', h: '#f48fb1' }, { n: 'Fucsia', h: '#d81b70' }, { n: 'Palo de rosa', h: '#d8a7a7' },
      { n: 'Blanco', h: '#ffffff' }, { n: 'Crema', h: '#f5e6c8' }, { n: 'Amarillo', h: '#ffd60a' }, { n: 'Naranja', h: '#f57c00' },
      { n: 'Lila', h: '#b39ddb' }, { n: 'Morado', h: '#6a1b9a' }, { n: 'Azul cielo', h: '#64b5f6' }, { n: 'Azul', h: '#1e4fa8' },
      { n: 'Verde menta', h: '#a5d6a7' }, { n: 'Verde', h: '#2e7d32' }, { n: 'Dorado', h: '#d4af37' }, { n: 'Plateado', h: '#c0c0c0' },
      { n: 'Negro', h: '#222222' }, { n: 'Café', h: '#6d4c41' }, { n: 'Multicolor', h: 'linear-gradient(135deg,#f48fb1,#ffd60a,#64b5f6,#a5d6a7)' }
    ],
    colores(p) {
      let c = p && p.colores;
      if (typeof c === 'string') { try { c = JSON.parse(c || '[]'); } catch (e) { c = []; } }
      return Array.isArray(c) ? c.filter(x => x && x.n) : [];
    },

    // Pedidos de un cliente buscados por su número de celular
    async seguimiento(tel) {
      const c = DN.cel(tel);
      if (c.length < 7) throw new Error('Escribe tu número de celular completo');
      let d;
      if (DEMO) {
        demoDb = demoLoad();
        d = { config: demoDb.config, pedidos: demoDb.pedidos.filter(p => DN.cel(p.telefono) === c).map(p => Object.assign({}, p, {
          cliente: String(p.cliente).split(' ')[0], recibe: String(p.recibe || '').split(' ')[0], direccion: undefined, telefono: undefined })) };
      } else d = await get({ action: 'seguimiento', tel: c });
      d.config = mergeConfig(d.config);
      d.pedidos.forEach(p => p.historial = hist(p.historial));
      if (!d.pedidos.length) throw new Error('No encontramos pedidos con ese número');
      return d;
    },

    async crearPedido(pedido) {
      if (DEMO) {
        const id = pedido.id || DN.nuevoId();
        const t = new Date().toISOString();
        demoDb = demoLoad();
        const p = Object.assign({ fecha: t, fotoEntrega: '', domicilio: '' }, pedido, { id, estado: 'Pendiente', historial: [{ e: 'Pendiente', t }] });
        p.comprobante = p.comprobanteData || ''; delete p.comprobanteData; p.fotoTarjeta = p.fotoTarjetaData || ''; delete p.fotoTarjetaData;
        demoDb.pedidos.unshift(p);
        demoSave(demoDb);
        return { id };
      }
      return post({ action: 'crearPedido', pedido });
    },

    async recibo(tel, id) {
      let d;
      if (DEMO) {
        demoDb = demoLoad();
        const p = demoDb.pedidos.find(x => x.id === id && DN.cel(x.telefono) === DN.cel(tel));
        if (!p) throw new Error('Recibo no encontrado');
        d = Object.assign({}, p, { config: demoDb.config });
      } else d = await get({ action: 'recibo', tel: DN.cel(tel), id });
      d.config = mergeConfig(d.config); d.historial = hist(d.historial);
      return d;
    },

    // ----- Admin -----
    async login(pin) {
      if (DEMO) { if (String(pin) !== '1234') throw new Error('PIN incorrecto'); return true; }
      return post({ action: 'login', pin });
    },
    async adminDatos(pin) {
      let d;
      if (DEMO) { demoDb = demoLoad(); d = { config: demoDb.config, productos: demoDb.productos.slice(), pedidos: demoDb.pedidos.slice(), resenas: (demoDb.resenas || []).slice() }; }
      else d = await post({ action: 'adminDatos', pin });
      d.config = mergeConfig(d.config);
      d.pedidos.forEach(p => p.historial = hist(p.historial));
      d.resenas = d.resenas || [];
      return d;
    },
    async guardarProducto(pin, p) {
      if (DEMO) {
        if (!p.id) { p.id = uid(); demoDb.productos.push(p); }
        else { const i = demoDb.productos.findIndex(x => x.id === p.id); if (i >= 0) demoDb.productos[i] = p; else demoDb.productos.push(p); }
        demoSave(demoDb); return p;
      }
      return post({ action: 'guardarProducto', pin, producto: p });
    },
    async eliminarProducto(pin, id) {
      if (DEMO) { demoDb.productos = demoDb.productos.filter(x => x.id !== id); demoSave(demoDb); return true; }
      return post({ action: 'eliminarProducto', pin, id });
    },
    async renombrarCategoria(pin, de, a) {
      if (DEMO) { demoDb.productos.forEach(p => { if (p.categoria === de) p.categoria = a; }); demoSave(demoDb); return true; }
      return post({ action: 'renombrarCategoria', pin, de, a });
    },
    async subirImagen(pin, dataUrl, nombre) {
      if (DEMO) return dataUrl; // en demo la foto queda en el navegador
      return post({ action: 'subirImagen', pin, dataUrl, nombre });
    },
    async estadoPedido(pin, id, estado) {
      if (DEMO) {
        demoDb = demoLoad();
        const p = demoDb.pedidos.find(x => x.id === id);
        if (p) { p.estado = estado; p.historial = hist(p.historial); p.historial.push({ e: estado, t: new Date().toISOString() }); if (estado === 'Entregado' || estado === 'Cancelado') p.tokenEntrega = ''; }
        demoSave(demoDb); return true;
      }
      return post({ action: 'estadoPedido', pin, id, estado });
    },
    async fotoEntrega(pin, id, url) {
      if (DEMO) {
        demoDb = demoLoad();
        const p = demoDb.pedidos.find(x => x.id === id);
        if (p) { p.fotoEntrega = url; p.tokenEntrega = ''; if (p.estado !== 'Entregado') { p.estado = 'Entregado'; p.historial = hist(p.historial); p.historial.push({ e: 'Entregado', t: new Date().toISOString() }); } }
        demoSave(demoDb); return true;
      }
      return post({ action: 'fotoEntrega', pin, id, url });
    },
    // ----- Mensajero: enlace de un solo uso -----
    async entrega(tk) {
      if (DEMO) {
        demoDb = demoLoad();
        const p = demoDb.pedidos.find(x => x.tokenEntrega && x.tokenEntrega === tk);
        if (!p || ['Entregado', 'Cancelado'].indexOf(p.estado) >= 0) throw new Error('USADO');
        return Object.assign({}, p, { config: mergeConfig(demoDb.config) });
      }
      const d = await get({ action: 'entrega', tk }); d.config = mergeConfig(d.config); return d;
    },
    async entregaEnCamino(tk) {
      if (DEMO) {
        const p = await DN.entrega(tk); demoDb = demoLoad();
        const q = demoDb.pedidos.find(x => x.id === p.id);
        if (q.estado !== 'En camino') { q.estado = 'En camino'; q.historial = hist(q.historial); q.historial.push({ e: 'En camino', t: new Date().toISOString(), por: 'mensajero' }); }
        demoSave(demoDb); return true;
      }
      return post({ action: 'entregaEnCamino', tk });
    },
    async entregaFinalizar(tk, dataUrl, quien) {
      if (DEMO) {
        const p = await DN.entrega(tk); demoDb = demoLoad();
        const q = demoDb.pedidos.find(x => x.id === p.id);
        q.fotoEntrega = dataUrl; q.estado = 'Entregado'; q.tokenEntrega = '';
        q.historial = hist(q.historial); q.historial.push({ e: 'Entregado', t: new Date().toISOString(), por: 'mensajero', quien: quien || '' });
        demoSave(demoDb); return { fotoEntrega: dataUrl };
      }
      return post({ action: 'entregaFinalizar', tk, dataUrl, quien });
    },
    nuevoToken() {
      const a = new Uint8Array(12); (window.crypto || window.msCrypto).getRandomValues(a);
      return Array.from(a, b => 'abcdefghijkmnpqrstuvwxyz23456789'[b % 32]).join('');
    },
    linkEntrega(tk) { return DN.base() + 'entrega.html#' + tk; },

    async actualizarPedido(pin, id, campos) {
      if (DEMO) { demoDb = demoLoad(); const p = demoDb.pedidos.find(x => x.id === id); if (p) Object.assign(p, campos); demoSave(demoDb); return true; }
      return post({ action: 'actualizarPedido', pin, id, campos });
    },
    async guardarConfig(pin, config) {
      if (DEMO) { demoDb.config = Object.assign({}, demoDb.config, config); demoSave(demoDb); return true; }
      return post({ action: 'guardarConfig', pin, config });
    },
    resetDemo() { if (DEMO) { demoDb = JSON.parse(JSON.stringify(SEED)); demoSave(demoDb); } },

    // ----- Utilidades -----
    pesos(n) { return '$' + Number(n || 0).toLocaleString('es-CO'); },
    esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c])); },
    telWa(t) { const d = String(t || '').replace(/\D/g, ''); return d.length === 10 ? '57' + d : d; },
    // Dirección base del sitio (carpeta donde están index.html, admin.html, pedido.html)
    base() { return location.href.split('#')[0].split('?')[0].replace(/[^/]*$/, ''); },
    cel(t) { return String(t || '').replace(/\D/g, '').slice(-10); },          // últimos 10 dígitos
    linkSeguimiento(tel) { return DN.base() + 'pedido.html#' + DN.cel(tel); },  // seguimiento por celular
    linkRecibo(p) { return DN.base() + 'recibo.html#' + DN.cel(p.telefono) + '-' + p.id; },
    // Productos guardados como "1 x Nombre ($85.000)" -> [{cant, nombre, valor}]
    lineas(txt) {
      return String(txt || '').split('\n').map(l => l.trim()).filter(Boolean).map(l => {
        const m = l.match(/^(\d+)\s*x\s*(.+?)\s*\((\$[\d.,]+)\)\s*$/i);
        return m ? { cant: Number(m[1]), nombre: m[2], valor: Number(m[3].replace(/\D/g, '')) } : { cant: 1, nombre: l, valor: 0 };
      });
    },

    // ----- Sonido de aviso: dos notas suaves (campanita) -----
    _ctx: null,
    desbloquearSonido() {
      try {
        if (!DN._ctx) DN._ctx = new (window.AudioContext || window.webkitAudioContext)();
        if (DN._ctx.state === 'suspended') DN._ctx.resume();
        return true;
      } catch (e) { return false; }
    },
    sonar(tipo) {
      try {
        if (!DN._ctx) DN.desbloquearSonido();
        const ctx = DN._ctx; if (!ctx || ctx.state !== 'running') return false;
        const notas = tipo === 'estado' ? [784, 1175] : [880, 1319, 1760];   // estado: 2 notas · pedido nuevo: 3 notas
        notas.forEach((f, i) => {
          const t0 = ctx.currentTime + i * 0.16;
          const o = ctx.createOscillator(), g = ctx.createGain();
          o.type = 'sine'; o.frequency.value = f;
          g.gain.setValueAtTime(0.0001, t0);
          g.gain.exponentialRampToValueAtTime(0.09, t0 + 0.02);
          g.gain.exponentialRampToValueAtTime(0.0001, t0 + 0.9);
          o.connect(g).connect(ctx.destination); o.start(t0); o.stop(t0 + 1);
        });
        if (navigator.vibrate) try { navigator.vibrate(tipo === 'estado' ? [60, 60, 60] : 120); } catch (e) {}
        return true;
      } catch (e) { return false; }
    },

    nuevoId() { return 'DN-' + Date.now().toString(36).slice(-4).toUpperCase(); } // código corto, ej: DN-7QK2
  };
})();
