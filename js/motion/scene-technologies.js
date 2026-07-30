(function () {
  "use strict";

  var motion = window.JBMotion = window.JBMotion || {};

  motion.createTechnologyScene = function (api) {
    var gsap = api.gsap;
    var ScrollTrigger = api.ScrollTrigger;
    var section = document.querySelector("#technologies");
    if (!section) return function () {};

    var title = section.querySelector("h2");
    var track = section.querySelector(".technology-track");
    var lists = Array.from(section.querySelectorAll(".technology-list"));
    var firstList = section.querySelector("[data-technology-list]");
    if (!title || !track || lists.length < 2 || !firstList) return function () {};

    var distance = 0;
    var position = 0;
    var velocityScale = 1;
    var targetVelocityScale = 1;
    var lastScrollUpdate = 0;
    var sectionVisible = false;
    var marqueeStarted = false;
    var destroyed = false;
    var baseSpeed = api.conditions.mobile ? 11 : api.conditions.tablet ? 13 : 15;
    var setPosition = gsap.quickSetter(track, "x", "px");
    var resizeObserver;
    var context;

    function measure() {
      var previousDistance = distance;
      var progress = previousDistance ? Math.abs(position / previousDistance) : 0;
      distance = firstList.getBoundingClientRect().width;
      position = distance ? -((progress % 1) * distance) : 0;
      setPosition(position);
    }

    function ticker(time, deltaTime) {
      if (destroyed || !sectionVisible || !marqueeStarted || !distance) return;

      var now = performance.now();
      if (now - lastScrollUpdate > 140) targetVelocityScale = 1;

      var seconds = Math.min(deltaTime / 1000, 0.05);
      velocityScale += (targetVelocityScale - velocityScale) * Math.min(seconds * 2.5, 1);
      position -= baseSpeed * velocityScale * seconds;

      if (position <= -distance) position += distance;
      setPosition(position);
    }

    context = gsap.context(function () {
      gsap.set(track, { x: 0, force3D: true });

      var entrance = gsap.timeline({
        paused: true,
        defaults: { ease: "power2.out" }
      });

      entrance
        .fromTo(title, { autoAlpha: 0, y: 8 }, { autoAlpha: 1, y: 0, duration: 0.65 }, 0)
        .fromTo(lists, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.75 }, 0.12)
        .call(function () { marqueeStarted = true; }, null, 0.4);

      var visibilityTrigger = ScrollTrigger.create({
        trigger: section,
        start: "top 88%",
        end: "bottom 8%",
        onEnter: function () {
          sectionVisible = true;
          entrance.play();
        },
        onEnterBack: function () {
          sectionVisible = true;
          entrance.play();
        },
        onLeave: function () { sectionVisible = false; },
        onLeaveBack: function () {
          sectionVisible = false;
          marqueeStarted = false;
          entrance.reverse();
        }
      });

      var velocityTrigger = ScrollTrigger.create({
        trigger: section,
        start: "top bottom",
        end: "bottom top",
        onUpdate: function (self) {
          var velocity = self.getVelocity();
          var intensity = Math.min(Math.abs(velocity) / 2600, 1);
          targetVelocityScale = velocity < 0
            ? 1 - (0.22 * intensity)
            : 1 + (0.32 * intensity);
          lastScrollUpdate = performance.now();
        }
      });

      gsap.ticker.add(ticker);

      if ("ResizeObserver" in window) {
        resizeObserver = new ResizeObserver(measure);
        resizeObserver.observe(firstList);
      }
      measure();

      return function () {
        visibilityTrigger.kill();
        velocityTrigger.kill();
      };
    }, section);

    return function () {
      destroyed = true;
      gsap.ticker.remove(ticker);
      if (resizeObserver) resizeObserver.disconnect();
      context.revert();
      gsap.set(track, { clearProps: "transform" });
    };
  };
})();
