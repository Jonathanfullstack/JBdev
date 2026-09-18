(function () {
  'use strict';
  var state = window.JBIntro;
  if (!state || !state.active) return;
  var gsap = window.gsap;
  var root = document.documentElement;
  var canvas = document.querySelector('.hero__canvas');
  var visual = document.querySelector('.hero__visual');
  var selectors = '.site-header, .header__logo, .site-header nav, .header__actions, .hero__eyebrow, .hero-line, .hero__lead, .hero__actions a, .hero__assurances li, .hero-section__glow';
  var timeline;
  var reduced = matchMedia('(prefers-reduced-motion: reduce)');
  document.querySelectorAll('.site-header, main, .site-footer, .whatsapp-button, .back-to-top, .skip-link').forEach(function (el) {
    if (!el.inert) { el.inert = true; el.setAttribute('data-intro-inert', ''); }
  });
  function finish() {
    if (timeline) timeline.kill();
    clearTimeout(state.watchdog);
    state.chaos = 0; state.infinity = 0; state.pulse = 0; state.reveal = 1;
    if (gsap) gsap.set(selectors + ', .hero__content, .hero-accent', { clearProps: 'opacity,visibility,transform,filter,textShadow' });
    canvas.style.cssText = '';
    state.release();
    window.dispatchEvent(new Event('jb:intro-finished'));
    if (window.ScrollTrigger) window.ScrollTrigger.refresh();
  }
  state.finish = finish;
  if (!gsap) { finish(); return; }
  // FLIP: keep the final layout box fixed; only composite its transform.
  // The shader follows the apparent aspect ratio, preserving the original morph.
  var destination = canvas.getBoundingClientRect();
  var viewportHeight = document.documentElement.clientHeight;
  state.view = { width: window.innerWidth, height: viewportHeight };
  gsap.set(canvas, {
    x: -destination.left, y: -destination.top,
    scaleX: window.innerWidth / destination.width,
    scaleY: viewportHeight / destination.height,
    transformOrigin: '0 0'
  });
  function start() {
    if (!state.active || state.started) return;
    state.started = true;
    if (window.JBLenis) window.JBLenis.stop();
    var mobile = matchMedia('(max-width: 768px)').matches;
    var hold = mobile ? 2 : 2.6;
    var infinityFormed = hold + (mobile ? 1.25 : 1.6);
    var morphStart = infinityFormed + .45; // A readable moment for the living infinity.
    var formed = morphStart + (mobile ? 1.25 : 1.5);
    var reveal = formed + .3;
    gsap.set(selectors, { autoAlpha: 0 });
    gsap.set('.hero-line', { yPercent: 110, filter: 'blur(7px)' });
    timeline = gsap.timeline({ defaults: { ease: 'power3.out' }, onComplete: finish });
    timeline.to(state, { reveal: 1, duration: .55 }, .15)
      .to(state, { chaos: 0, duration: infinityFormed - hold, ease: 'power2.inOut' }, hold)
      .to(state, { infinity: 0, duration: formed - morphStart, ease: 'power2.inOut' }, morphStart)
      .to(state, { pulse: 1, duration: .18, repeat: 1, yoyo: true }, formed)
      .call(function () {
        root.classList.replace('intro-pending', 'intro-playing');
        gsap.set('.site-header, .hero__content', { autoAlpha: 1 });
        timeline.to(canvas, { x: 0, y: 0, scaleX: 1, scaleY: 1,
          duration: .95, ease: 'power3.inOut' }, reveal);
        timeline.to(state.view, { width: destination.width, height: destination.height,
          duration: .95, ease: 'power3.inOut' }, reveal);
      }, null, reveal)
      .to('.header__logo', { autoAlpha: 1, duration: .4 }, reveal)
      .to('.site-header nav, .header__actions', { autoAlpha: 1, duration: .4, stagger: .08 }, reveal + .1)
      .fromTo('.hero__eyebrow', { y: 8 }, { y: 0, autoAlpha: 1, duration: .4 }, reveal + .18)
      .to('.hero-line', { autoAlpha: 1, yPercent: 0, filter: 'blur(0px)', duration: .7, stagger: .1 }, reveal + .3)
      .to('.hero__lead', { autoAlpha: 1, duration: .5 }, reveal + .7)
      .to('.hero__actions a', { autoAlpha: 1, duration: .4, stagger: .12 }, reveal + .95)
      .to('.hero__assurances li', { autoAlpha: 1, duration: .35, stagger: .07 }, reveal + 1.2)
      .to('.hero-section__glow', { autoAlpha: 1, duration: .35 }, reveal + 1.4)
      .fromTo('.hero-accent', { textShadow: '0 0 0px transparent' }, { textShadow: '0 0 24px #258bff66', duration: .2, repeat: 1, yoyo: true }, reveal + 1);
  }
  window.addEventListener('jb:particles-ready', start, { once: true });
  if (state.ready) start();
  window.addEventListener('jb:particles-failed', finish, { once: true });
  reduced.addEventListener('change', function () { if (reduced.matches) finish(); });
  window.addEventListener('resize', function () { if (state.started && state.active) finish(); });
  window.addEventListener('pagehide', finish, { once: true });
}());
