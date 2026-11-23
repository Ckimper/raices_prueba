/* =========================================================
   RAICES – Comportamiento del sitio
   Basado en assets/js/main.js de TraveLand, adaptado a varias páginas.
   ========================================================= */
$(function () {
  'use strict';

  // ---- Pantalla de carga ----
  $(window).on('load', function () { $('.preloader').delay(300).fadeOut(400); });
  setTimeout(function () { $('.preloader').fadeOut(400); }, 3000); // por si 'load' tarda (conexión lenta)

  // ---- Menú fijo al bajar ----
  function fijarMenu() { $('.header_navbar').toggleClass('sticky', $(window).scrollTop() >= 20); }
  $(window).on('scroll', fijarMenu);
  fijarMenu();

  // ---- Menú móvil ----
  $('.navbar-toggler').on('click', function () {
    var activo = $(this).toggleClass('active').hasClass('active');
    $(this).attr('aria-expanded', String(activo));
  });
  $('.sub-nav-toggler').on('click', function () {
    var sub = $(this).siblings('.sub-menu');
    sub.toggleClass('abierto');
    $(this).attr('aria-expanded', String(sub.hasClass('abierto')));
  });

  // ---- Contadores (solo los que tienen número) ----
  if ($.fn.counterUp) $('.counter').counterUp({ delay: 10, time: 2000 });

  // ---- Volver arriba ----
  $(window).on('scroll', function () {
    if ($(this).scrollTop() > 600) $('.back-to-top').fadeIn(200); else $('.back-to-top').fadeOut(200);
  });
  $('.back-to-top').on('click', function (e) {
    e.preventDefault();
    $('html, body').animate({ scrollTop: 0 }, 800);
  });

  // ---- Selects con estilo ----
  if ($.fn.niceSelect) $('select').niceSelect();

  // ---- Animaciones de entrada ----
  if (window.WOW && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    new WOW({ boxClass: 'wow', mobile: false }).init();
  }

  // ---- Filtros de listados ----
  // <div class="filtros" data-filtra="#lista"><button class="filtro activo" data-filtro="todos">
  // Elementos de la lista con data-categoria="a b"
  $('.filtros').each(function () {
    var grupo = $(this);
    var lista = $(grupo.data('filtra'));
    grupo.on('click', '.filtro', function () {
      var valor = $(this).data('filtro');
      grupo.find('.filtro').removeClass('activo').attr('aria-pressed', 'false');
      $(this).addClass('activo').attr('aria-pressed', 'true');
      lista.find('[data-categoria]').each(function () {
        var cats = String($(this).data('categoria')).split(' ');
        $(this).toggle(valor === 'todos' || cats.indexOf(valor) !== -1);
      });
      // WOW deja ocultas las tarjetas que aún no animó: mostrarlas ya
      lista.find('.wow').css({ visibility: 'visible', animationName: 'none' });
    });
  });

  // ---- Formularios (todavía sin servidor) ----
  $('form[data-toast]').on('submit', function (e) {
    e.preventDefault();
    mostrarAviso($(this).data('toast'));
    this.reset();
    if ($.fn.niceSelect) $(this).find('select').niceSelect('update');
  });

  function mostrarAviso(msg) {
    $('#toast-msg').text(msg);
    var t = $('#toast').addClass('visible');
    setTimeout(function () { t.removeClass('visible'); }, 3500);
  }

  // ---- Banner de alerta climática ----
  // Para activarlo: <body data-alerta="aviso"> o data-alerta="critica"
  var nivel = $('body').data('alerta');
  if (nivel) {
    $('#alerta-clima').prop('hidden', false).toggleClass('critica', nivel === 'critica');
    $('body').addClass('con-alerta');
  }
});
