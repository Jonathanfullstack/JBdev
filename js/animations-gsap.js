(function () {
  "use strict";

  if (!window.gsap || !window.ScrollTrigger || !window.JBMotion) {
    document.documentElement.classList.add("gsap-unavailable");
    return;
  }

  var gsap = window.gsap;
  var ScrollTrigger = window.ScrollTrigger;
  var motion = window.JBMotion;
  var root = document.body;
  var media = gsap.matchMedia();
  var runtime = motion.createRuntime(gsap, ScrollTrigger);
  var pageDestroyed = false;
  var refreshFrame = 0;

  gsap.registerPlugin(ScrollTrigger);

  /*
   * Hero aprovada: os seletores, valores, durações e sequência abaixo
   * permanecem iguais à versão protegida pelo checkpoint 09991c6.
   */
  function createApprovedHeroAnimation(conditions) {
    var heroTimeline = gsap.timeline({ defaults: { ease: "power3.out" } });
    heroTimeline
      .from(".hero-line", { autoAlpha: 0, yPercent: 115, duration: 0.9, stagger: 0.1 }, 0.27)
      .from(".hero__lead", { autoAlpha: 0, y: 22, duration: 0.65 }, "-=0.5")
      .from(".hero__actions", { autoAlpha: 0, y: 18, duration: 0.55 }, "-=0.42")
      .from(".hero__assurances li", { autoAlpha: 0, y: 10, duration: 0.4, stagger: 0.07 }, "-=0.3")
      .from(".hero__visual", { autoAlpha: 0, x: conditions.mobile ? 0 : 35, scale: 0.96, duration: 0.85 }, "-=0.8");

    gsap.to(".hero__content", {
      y: conditions.mobile ? -12 : -34,
      autoAlpha: 0.55,
      scale: 0.99,
      ease: "none",
      scrollTrigger: {
        start: function () {
          return document.querySelector("#hero").offsetHeight * 0.42;
        },
        end: function () {
          return document.querySelector("#hero").offsetHeight;
        },
        scrub: 0.45,
        invalidateOnRefresh: true
      }
    });
  }

  var context = gsap.context(function () {
    media.add(
      {
        desktop: "(min-width: 1025px)",
        tablet: "(min-width: 769px) and (max-width: 1024px)",
        mobile: "(max-width: 768px)",
        reduceMotion: "(prefers-reduced-motion: reduce)"
      },
      function (conditionsContext) {
        var conditions = conditionsContext.conditions;
        var cleanups = [];

        if (conditions.reduceMotion) {
          document.documentElement.classList.add("motion-reduced");
          document.documentElement.classList.remove("gsap-ready");
          return function () {
            document.documentElement.classList.remove("motion-reduced");
          };
        }

        document.documentElement.classList.remove("motion-reduced");
        document.documentElement.classList.add("gsap-ready");
        runtime.createSmoothScroll();
        createApprovedHeroAnimation(conditions);

        var api = {
          gsap: gsap,
          ScrollTrigger: ScrollTrigger,
          conditions: conditions
        };

        [
          motion.createConductor,
          motion.createCommercialScenes,
          motion.createTechnologyScene,
          motion.createProjectScene,
          motion.createBrandScenes,
          motion.createConversionScenes
        ].forEach(function (factory) {
          if (typeof factory !== "function") return;
          var cleanup = factory(api);
          if (typeof cleanup === "function") cleanups.push(cleanup);
        });

        return function () {
          cleanups.reverse().forEach(function (cleanup) { cleanup(); });
          runtime.destroy();
          document.documentElement.classList.remove("gsap-ready");
        };
      }
    );
  }, root);

  function scheduleRefresh() {
    if (refreshFrame || pageDestroyed) return;
    refreshFrame = window.requestAnimationFrame(function () {
      refreshFrame = 0;
      runtime.refresh();
    });
  }

  Array.from(document.images).forEach(function (image) {
    if (image.complete) return;
    image.addEventListener("load", scheduleRefresh, { once: true });
    image.addEventListener("error", scheduleRefresh, { once: true });
  });
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(scheduleRefresh);
  }
  if (document.readyState === "complete") scheduleRefresh();
  else window.addEventListener("load", scheduleRefresh, { once: true });

  window.addEventListener("pagehide", function () {
    if (pageDestroyed) return;
    pageDestroyed = true;
    if (refreshFrame) window.cancelAnimationFrame(refreshFrame);
    media.revert();
    context.revert();
    runtime.destroy();
  }, { once: true });
})();
