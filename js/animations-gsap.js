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
        if (window.JBIntro && window.JBIntro.active && window.JBLenis) window.JBLenis.stop();

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
