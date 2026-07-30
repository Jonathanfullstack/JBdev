(function () {
  "use strict";

  var motion = window.JBMotion = window.JBMotion || {};

  motion.createCommercialScenes = function (api) {
    var gsap = api.gsap;
    var ScrollTrigger = api.ScrollTrigger;
    var mobile = api.conditions.mobile;
    var context = gsap.context(function () {
      motion.headingReveal(api, "#services .section-heading h2, #process .section-heading h2");

      var trustTimeline = gsap.timeline({
        scrollTrigger: motion.scrubTrigger(".trust-grid", "top 94%", "bottom 48%", 0.55)
      });
      trustTimeline
        .fromTo(".trust-section > .container > .section-kicker", {
          autoAlpha: 0.35,
          y: 8
        }, {
          autoAlpha: 1,
          y: 0,
          ease: "none",
          duration: 0.25
        })
        .fromTo(".trust-grid article", {
          "--scene-y": "18px",
          "--scene-opacity": 0.25
        }, {
          "--scene-y": "0px",
          "--scene-opacity": 1,
          stagger: mobile ? 0.06 : 0.12,
          ease: "none",
          duration: 0.55
        }, 0.08)
        .to(".trust-grid", {
          "--trust-progress": 1,
          ease: "none",
          duration: 0.65
        }, 0.18);

      var serviceCards = gsap.utils.toArray(".service-card");
      var servicesTimeline = gsap.timeline({
        scrollTrigger: motion.scrubTrigger(".services-grid", "top 91%", "bottom 36%", 0.72)
      });

      serviceCards.forEach(function (card, index) {
        servicesTimeline.fromTo(card, {
          "--scene-x": mobile ? (index % 2 ? "12px" : "-12px") : ((index % 3) - 1) * 20 + "px",
          "--scene-y": (mobile ? 24 : 38 + (index % 2) * 12) + "px",
          "--scene-rotate": mobile ? "0deg" : (index % 2 ? "-2.5deg" : "2.5deg"),
          "--scene-opacity": 0.08,
          "--scene-depth": 0.975
        }, {
          "--scene-x": "0px",
          "--scene-y": "0px",
          "--scene-rotate": "0deg",
          "--scene-opacity": 1,
          "--scene-depth": 1,
          ease: "none",
          duration: 0.34
        }, index * (mobile ? 0.055 : 0.075));

        var icon = card.querySelector("i, svg");
        if (icon) {
          servicesTimeline.fromTo(icon, {
            "--icon-scale": 0.76,
            "--icon-rotation": index % 2 ? "-7deg" : "7deg"
          }, {
            "--icon-scale": 1,
            "--icon-rotation": "0deg",
            ease: "none",
            duration: 0.2
          }, index * (mobile ? 0.055 : 0.075) + 0.08);
        }

        ScrollTrigger.create({
          trigger: card,
          start: "top 62%",
          end: "bottom 39%",
          toggleClass: { targets: card, className: "is-scroll-active" }
        });
      });

      gsap.fromTo("#services .section-cta", {
        "--scene-y": "20px",
        "--scene-opacity": 0.35
      }, {
        "--scene-y": "0px",
        "--scene-opacity": 1,
        ease: "none",
        scrollTrigger: motion.scrubTrigger("#services .section-cta", "top 94%", "top 68%", 0.5)
      });

      var processTimeline = gsap.timeline({
        scrollTrigger: motion.scrubTrigger(".process-grid", "top 78%", "bottom 42%", 0.52)
      });
      processTimeline
        .fromTo(".process-grid", { "--process-progress": 0 }, {
          "--process-progress": 1,
          ease: "none",
          duration: 1
        })
        .fromTo(".process-grid li", {
          "--scene-y": mobile ? "16px" : "24px",
          "--scene-opacity": 0.28
        }, {
          "--scene-y": "0px",
          "--scene-opacity": 1,
          stagger: 0.16,
          ease: "none",
          duration: 0.42
        }, 0);

      var processSteps = gsap.utils.toArray(".process-grid li");
      ScrollTrigger.create({
        trigger: ".process-grid",
        start: mobile ? "top 72%" : "top 70%",
        end: mobile ? "bottom 42%" : "bottom 38%",
        onUpdate: function (self) {
          processSteps.forEach(function (step, index) {
            var threshold = (index + 0.35) / processSteps.length;
            step.classList.toggle("is-active", self.progress >= threshold);
          });
        },
        onLeaveBack: function () {
          processSteps.forEach(function (step) { step.classList.remove("is-active"); });
        },
        invalidateOnRefresh: true
      });
    }, document.body);

    return function () { context.revert(); };
  };
})();
