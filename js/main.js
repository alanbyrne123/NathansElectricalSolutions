/* ============================================================
   Nathan's Electrical Solutions — interactions
   ============================================================ */
(function () {
  'use strict';

  /* ---- Mobile navigation toggle ---- */
  var toggle = document.getElementById('navToggle');
  var nav = document.getElementById('nav');

  function closeNav() {
    nav.classList.remove('is-open');
    document.body.classList.remove('nav-open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Open menu');
  }

  function openNav() {
    nav.classList.add('is-open');
    document.body.classList.add('nav-open');
    toggle.setAttribute('aria-expanded', 'true');
    toggle.setAttribute('aria-label', 'Close menu');
  }

  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      if (nav.classList.contains('is-open')) {
        closeNav();
      } else {
        openNav();
      }
    });

    // Close the menu when a link is tapped (mobile)
    nav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', closeNav);
    });

    // Close on Escape
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeNav();
    });
  }

  /* ---- Scroll reveal animations ---- */
  var revealEls = document.querySelectorAll(
    '.service, .spec, .why__text, .why__stats, .contact__info, .contact__form, .section__head'
  );
  revealEls.forEach(function (el) { el.classList.add('reveal'); });

  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    revealEls.forEach(function (el) { observer.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('is-visible'); });
  }

  /* ---- Contact form → open the visitor's email app (mailto) ---- */
  var EMAIL_TO = 'NathansElectricalSolutions@outlook.com';
  var quoteForm = document.getElementById('quoteForm');

  if (quoteForm) {
    quoteForm.addEventListener('submit', function (e) {
      e.preventDefault();

      function val(id) {
        var el = document.getElementById(id);
        return el ? el.value.trim() : '';
      }

      var name = val('name');
      var service = val('service');

      var subject = 'Quote request'
        + (service ? ' — ' + service : '')
        + (name ? ' (' + name + ')' : '');

      var body = [
        'Name: ' + name,
        'Email: ' + val('email'),
        'Phone: ' + val('phone'),
        'Service needed: ' + service,
        '',
        'Message:',
        val('message')
      ].join('\r\n');

      window.location.href = 'mailto:' + EMAIL_TO
        + '?subject=' + encodeURIComponent(subject)
        + '&body=' + encodeURIComponent(body);
    });
  }

  /* ---- Current year in footer ---- */
  var year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();
})();
