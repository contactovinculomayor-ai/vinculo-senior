// Vínculo Senior — script.js
// Controla la apertura/cierre del menú de navegación en mobile.

document.addEventListener('DOMContentLoaded', function () {
  var toggle = document.querySelector('.menu-toggle');
  var mobileLinks = document.querySelector('.mobile-links');

  if (toggle && mobileLinks) {
    toggle.addEventListener('click', function () {
      mobileLinks.classList.toggle('open');
    });

    // Cierra el menú mobile automáticamente al tocar un enlace
    mobileLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        mobileLinks.classList.remove('open');
      });
    });
  }
});

// Carrusel de servicios
document.addEventListener('DOMContentLoaded', function () {
  var root = document.querySelector('.svc-carousel');
  if (!root) return;
  var slides = root.querySelectorAll('.svc-slide');
  var tabs = root.querySelectorAll('.svc-tab');
  var current = 0, timer = null, stopped = false;
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function show(i) {
    current = (i + slides.length) % slides.length;
    slides.forEach(function (s, k) { s.classList.toggle('is-active', k === current); });
    tabs.forEach(function (t, k) {
      t.classList.toggle('is-active', k === current);
      t.setAttribute('aria-selected', k === current ? 'true' : 'false');
    });
  }
  function start() { if (reduce || stopped) return; stop(); timer = setInterval(function () { show(current + 1); }, 8000); }
  function stop() { if (timer) { clearInterval(timer); timer = null; } }
  function userAction(i) { stopped = true; stop(); show(i); }

  tabs.forEach(function (t, k) { t.addEventListener('click', function () { userAction(k); }); });
  root.querySelectorAll('.svc-arrow').forEach(function (b) {
    b.addEventListener('click', function () { userAction(current + parseInt(b.getAttribute('data-dir'), 10)); });
  });
  root.addEventListener('mouseenter', stop);
  root.addEventListener('mouseleave', start);
  root.addEventListener('focusin', stop);

  var x0 = null;
  root.addEventListener('touchstart', function (e) { x0 = e.touches[0].clientX; stopped = true; stop(); }, { passive: true });
  root.addEventListener('touchend', function (e) {
    if (x0 === null) return;
    var dx = e.changedTouches[0].clientX - x0;
    if (Math.abs(dx) > 50) show(current + (dx < 0 ? 1 : -1));
    x0 = null;
  });
  start();
});
