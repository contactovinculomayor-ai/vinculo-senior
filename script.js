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
