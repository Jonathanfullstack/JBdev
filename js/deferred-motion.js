(function () {
  'use strict';
  // Scroll scenes do not participate in the opening. Initialize them close to
  // their first section, while keeping GSAP available for the original intro.
  var loading;
  function script(src) {
    return new Promise(function (resolve, reject) {
      var tag = document.createElement('script');
      tag.src = src;
      tag.onload = resolve;
      tag.onerror = reject;
      document.head.appendChild(tag);
    });
  }
  function load() {
    if (loading || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    loading = Promise.all([
      script('js/vendor/ScrollTrigger-3.13.0.min.js'),
      matchMedia('(min-width: 769px) and (pointer: fine)').matches
        ? script('js/vendor/lenis-1.3.23.min.js') : Promise.resolve()
    ]).then(function () {
      return Promise.all([
        'runtime', 'scenes-commercial', 'scene-technologies',
        'scene-projects', 'scenes-brand', 'scenes-conversion'
      ].map(function (name) { return script('js/motion/' + name + '.js'); }));
    }).then(function () {
      return script('js/animations-gsap.js?v=14');
    }).catch(function () {
      document.documentElement.classList.add('gsap-unavailable');
      loading = null;
    });
    return loading;
  }
  var section = document.getElementById('technologies');
  if ('IntersectionObserver' in window && section) {
    var observer = new IntersectionObserver(function (entries) {
      if (entries.some(function (entry) { return entry.isIntersecting; })) load();
    }, { rootMargin: '400px 0px' });
    function observe() { observer.observe(section); }
    if (window.JBIntro && window.JBIntro.active) {
      window.addEventListener('jb:intro-finished', observe, { once: true });
      // The watchdog also releases the page if an animation dependency fails.
      setTimeout(observe, 11200);
    } else observe();
  } else load();
  // Anchor navigation and desktop smooth-scroll must also work on a deep link.
  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener('pointerenter', load, { once: true });
    link.addEventListener('focus', load, { once: true });
  });
  matchMedia('(prefers-reduced-motion: reduce)').addEventListener('change', function (event) {
    if (!event.matches) load();
  });
}());
