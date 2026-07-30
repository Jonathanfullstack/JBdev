(function () {
  "use strict";

  var motion = window.JBMotion = window.JBMotion || {};

  motion.createRuntime = function (gsap, ScrollTrigger) {
    var lenis = null;
    var tickerCallback = null;

    function createSmoothScroll() {
      var canSmooth = window.Lenis
        && window.matchMedia("(min-width: 769px) and (pointer: fine)").matches
        && !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (!canSmooth || lenis) return null;

      lenis = new window.Lenis({
        duration: 1.05,
        smoothWheel: true,
        syncTouch: false,
        wheelMultiplier: 0.88,
        touchMultiplier: 1,
        anchors: {
          offset: 84,
          duration: 0.9
        }
      });

      lenis.on("scroll", ScrollTrigger.update);
      tickerCallback = function (time) {
        if (lenis) lenis.raf(time * 1000);
      };
      gsap.ticker.add(tickerCallback);
      gsap.ticker.lagSmoothing(0);
      document.documentElement.classList.add("lenis-ready");
      window.JBLenis = lenis;
      return lenis;
    }

    function refresh() {
      if (lenis) lenis.resize();
      ScrollTrigger.refresh();
    }

    function destroy() {
      if (tickerCallback) gsap.ticker.remove(tickerCallback);
      if (lenis) {
        lenis.off("scroll", ScrollTrigger.update);
        lenis.destroy();
      }
      lenis = null;
      tickerCallback = null;
      window.JBLenis = null;
      document.documentElement.classList.remove("lenis-ready");
    }

    return {
      createSmoothScroll: createSmoothScroll,
      refresh: refresh,
      destroy: destroy,
      getLenis: function () { return lenis; }
    };
  };

  motion.scrubTrigger = function (trigger, start, end, scrub) {
    return {
      trigger: trigger,
      start: start || "top 88%",
      end: end || "bottom 42%",
      scrub: scrub == null ? 0.65 : scrub,
      invalidateOnRefresh: true
    };
  };

  motion.headingReveal = function (api, selector, options) {
    var gsap = api.gsap;
    var elements = gsap.utils.toArray(selector);
    var config = options || {};

    elements.forEach(function (heading) {
      gsap.fromTo(heading, {
        "--heading-clip": "100%",
        "--heading-shift": (config.shift || 32) + "px"
      }, {
        "--heading-clip": "0%",
        "--heading-shift": "0px",
        ease: "none",
        scrollTrigger: motion.scrubTrigger(
          heading,
          config.start || "top 91%",
          config.end || "top 58%",
          config.scrub
        )
      });
    });
  };
})();
