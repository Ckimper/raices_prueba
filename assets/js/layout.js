/* =========================================================
   RAICES – Encabezado y pie compartidos (versión TraveLand)
   El menú y el pie viven SOLO aquí: editar este archivo
   actualiza todas las páginas.

   Uso en cada página:
     <body data-pagina="inicio">
       <script src="assets/js/layout.js"></script>
       <script>Raices.encabezado()</script>
       <main id="contenido"> ... </main>
       <script>Raices.pie()</script>
   ========================================================= */
(function () {
  // ---------- Mapa del sitio (única fuente de verdad) ----------
  var MENU = [
    { id: 'inicio', texto: 'Inicio', url: 'index.html' },
    { id: 'sobre', texto: 'Sobre', url: 'sobre.html' },
    { id: 'investigacion', texto: 'Investigación', url: 'investigacion.html', hijos: [
      { id: 'investigacion', texto: 'Todas las áreas', url: 'investigacion.html' },
      { id: 'peligros', texto: 'Peligros climáticos', url: 'peligros.html' },
      { id: 'modelacion', texto: 'Modelación atmosférica', url: 'modelacion.html' },
      { id: 'sociedad', texto: 'Impactos sociales', url: 'sociedad.html' }
    ] },
    { id: 'equipo', texto: 'Equipo', url: 'equipo.html' },
    { id: 'recursos', texto: 'Recursos', url: 'recursos.html' },
    { id: 'participa', texto: 'Participa', url: 'comunidad.html', hijos: [
      { id: 'comunidad', texto: 'Comunidad', url: 'comunidad.html' },
      { id: 'estudiantes', texto: 'Estudiantes', url: 'estudiantes.html' },
      { id: 'oportunidades', texto: 'Oportunidades', url: 'oportunidades.html' }
    ] },
    { id: 'actualidad', texto: 'Actualidad', url: 'eventos.html', hijos: [
      { id: 'eventos', texto: 'Eventos', url: 'eventos.html' },
      { id: 'noticias', texto: 'Noticias', url: 'noticias.html' }
    ] },
    { id: 'contacto', texto: 'Contacto', url: 'contacto.html' }
  ];

  // Página → sección del menú que se marca como activa
  var PADRE = {
    proyecto: 'investigacion', peligros: 'investigacion', modelacion: 'investigacion', sociedad: 'investigacion',
    comunidad: 'participa', estudiantes: 'participa', oportunidades: 'participa',
    eventos: 'actualidad', evento: 'actualidad', noticias: 'actualidad', noticia: 'actualidad'
  };

  var pagina = document.body.getAttribute('data-pagina') || '';
  var seccion = PADRE[pagina] || pagina;

  // Logo provisional: raíz dentro de un cuadro redondeado (hereda el color del texto)
  function logo(tam) {
    tam = tam || 40;
    return '<svg width="' + tam + '" height="' + tam + '" viewBox="0 0 40 40" fill="none" aria-hidden="true">' +
      '<rect x="1" y="1" width="38" height="38" rx="10" stroke="currentColor" stroke-width="2"/>' +
      '<path d="M20 8v12M20 20c-3 3-7 4-9 9M20 20c3 3 7 4 9 9M20 22c0 4-1 7-3 10M20 22c0 4 1 7 3 10" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>' +
      '</svg>';
  }

  function itemMenu(item) {
    var activo = item.id === seccion ? ' active' : '';
    if (!item.hijos) {
      return '<li class="nav-item' + activo + '"><a href="' + item.url + '"' + (activo ? ' aria-current="page"' : '') + '>' + item.texto + '</a></li>';
    }
    var hijos = item.hijos.map(function (h) {
      var a = h.id === pagina ? ' class="active" aria-current="page"' : '';
      return '<li><a href="' + h.url + '"' + a + '>' + h.texto + '</a></li>';
    }).join('');
    return '<li class="nav-item' + activo + '">' +
      '<a href="' + item.url + '">' + item.texto + ' <i class="lni lni-chevron-down flecha" aria-hidden="true"></i></a>' +
      '<ul class="sub-menu">' + hijos + '</ul>' +
      '<button class="sub-nav-toggler" type="button" aria-label="Abrir submenú de ' + item.texto + '"><span></span></button>' +
      '</li>';
  }

  function encabezado() {
    var html =
      '<a href="#contenido" class="skip-link">Saltar al contenido</a>' +

      // Pantalla de carga (spinner de TraveLand en colores RAICES)
      '<div class="preloader"><div class="loader"><div class="ytp-spinner"><div class="ytp-spinner-container"><div class="ytp-spinner-rotator">' +
      '<div class="ytp-spinner-left"><div class="ytp-spinner-circle"></div></div>' +
      '<div class="ytp-spinner-right"><div class="ytp-spinner-circle"></div></div>' +
      '</div></div></div><div class="marca">RAICES</div></div></div>' +

      // Banner de alerta climática (se activa con data-alerta en <body>)
      '<div id="alerta-clima" class="alerta-clima" hidden><div class="container d-flex flex-wrap align-items-center justify-content-between">' +
      '<div><span class="punto"></span><strong>[Aviso de evento climático activo]</strong></div>' +
      '<a href="#">[Acción recomendada]</a></div></div>' +

      // Menú
      '<header class="header_area"><div class="header_navbar"><div class="container"><div class="row"><div class="col-lg-12">' +
      '<nav class="navbar navbar-expand-lg" aria-label="Principal">' +
      '<a class="navbar-brand" href="index.html" aria-label="RAICES – Inicio">' + logo(42) +
      '<span><span class="marca-nombre">RAICES</span><span class="marca-sub">UPR Mayagüez</span></span></a>' +
      '<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#menuPrincipal" aria-controls="menuPrincipal" aria-expanded="false" aria-label="Abrir menú">' +
      '<span class="toggler-icon"></span><span class="toggler-icon"></span><span class="toggler-icon"></span></button>' +
      '<div class="collapse navbar-collapse sub-menu-bar" id="menuPrincipal">' +
      '<ul class="navbar-nav ml-auto">' + MENU.map(itemMenu).join('') + '</ul>' +
      '<div class="nav-acciones">' +
      '<span class="idioma" role="group" aria-label="Idioma"><a href="#" class="activo" lang="es">ES</a><a href="#" lang="en">EN</a></span>' +
      '<a href="comunidad.html" class="main-btn btn-sm btn-bosque"><i class="lni lni-handshake"></i>Colabora</a>' +
      '</div></div></nav></div></div></div></div></header>';

    document.currentScript.insertAdjacentHTML('afterend', html);
  }

  function pie() {
    var columna = function (titulo, items) {
      return '<div class="footer_link mt-45"><h4 class="footer_title">' + titulo + '</h4><ul class="link">' +
        items.map(function (i) { return '<li><a href="' + i[1] + '">' + i[0] + '</a></li>'; }).join('') +
        '</ul></div>';
    };

    var html =
      '<footer id="footer" class="footer_area"><div class="footer_widget pt-80 pb-60"><div class="container">' +
      '<div class="row">' +

      '<div class="col-lg-4 col-md-6">' +
      '<div class="footer_about mt-50">' +
      '<a href="index.html" class="marca">' + logo(50) + '<span><strong>RAICES</strong><small>Resiliencia y Acción</small></span></a>' +
      '<p>[Descripción breve del proyecto: investigación climática y sus efectos en la sociedad puertorriqueña.]</p>' +
      '<ul class="social">' +
      '<li><a href="#" aria-label="Facebook"><i class="lni lni-facebook-original"></i></a></li>' +
      '<li><a href="#" aria-label="Instagram"><i class="lni lni-instagram-original"></i></a></li>' +
      '<li><a href="#" aria-label="YouTube"><i class="lni lni-youtube"></i></a></li>' +
      '<li><a href="#" aria-label="LinkedIn"><i class="lni lni-linkedin-original"></i></a></li>' +
      '</ul></div></div>' +

      '<div class="col-lg-5 col-md-12 order-md-3 order-lg-2"><div class="footer_link_wrapper d-flex flex-wrap">' +
      columna('Proyecto', [['Sobre RAICES', 'sobre.html'], ['Equipo', 'equipo.html'], ['Investigación', 'investigacion.html'], ['Recursos', 'recursos.html']]) +
      columna('Participa', [['Comunidad', 'comunidad.html'], ['Estudiantes', 'estudiantes.html'], ['Oportunidades', 'oportunidades.html'], ['Eventos', 'eventos.html'], ['Noticias', 'noticias.html']]) +
      '</div></div>' +

      '<div class="col-lg-3 col-md-6 order-md-2 order-lg-3"><div class="mt-45">' +
      '<h4 class="footer_title">Contacto</h4>' +
      '<ul class="footer_contacto pt-15">' +
      '<li><i class="lni lni-envelope"></i>[correo del proyecto]</li>' +
      '<li><i class="lni lni-phone"></i>[teléfono]</li>' +
      '<li><i class="lni lni-map-marker"></i>[Edificio y oficina], Recinto Universitario de Mayagüez</li>' +
      '</ul></div></div>' +
      '</div>' +

      '<div class="footer_socios"><div class="rotulo">Socios y financiamiento</div>' +
      '<div class="logos justify-content-start"><div class="logo-socio">UPRM</div><div class="logo-socio">NSF NCAR</div><div class="logo-socio">[Socio]</div><div class="logo-socio">[Agencia]</div></div>' +
      '<p class="mt-15" style="font-size:13px">[Aviso de financiamiento]</p></div>' +

      '<div class="footer_inferior d-flex flex-wrap justify-content-between">' +
      '<p>© <span id="anio"></span> RAICES · Universidad de Puerto Rico, Recinto Universitario de Mayagüez</p>' +
      '<p><a href="privacidad.html">Privacidad</a> · <a href="accesibilidad.html">Accesibilidad</a></p>' +
      '</div>' +
      // Crédito obligatorio de la licencia gratuita de TraveLand (no quitar)
      '<p class="text-center mt-30" style="font-size:13px;color:#6f849a">Designed and Developed by <a href="https://uideck.com/" target="_blank" rel="noopener">UIdeck</a> · Distributed by <a href="https://themewagon.com" target="_blank" rel="noopener">ThemeWagon</a></p>' +
      '</div></div></footer>' +

      '<a href="#" class="back-to-top" aria-label="Volver arriba"><i class="lni lni-chevron-up"></i></a>' +
      '<div id="toast" class="toast-raices" role="status" aria-live="polite"><i class="lni lni-checkmark-circle"></i><span id="toast-msg"></span></div>';

    document.currentScript.insertAdjacentHTML('afterend', html);
    document.getElementById('anio').textContent = new Date().getFullYear();
  }

  window.Raices = { encabezado: encabezado, pie: pie, MENU: MENU };
})();
