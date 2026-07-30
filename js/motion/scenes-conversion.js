(function () {
  "use strict";

  var motion = window.JBMotion = window.JBMotion || {};

  motion.createConversionScenes = function (api) {
    var gsap = api.gsap;
    var mobile = api.conditions.mobile;
    var context = gsap.context(function () {
      motion.headingReveal(api,
        "#testimonials h2, #faq h2, .final-cta h2, #contact .contact__intro h2"
      );

      var testimonialTimeline = gsap.timeline({
        scrollTrigger: motion.scrubTrigger("#testimonials", "top 90%", "bottom 46%", 0.68)
      });
      testimonialTimeline
        .fromTo(".testimonials-layout > div:first-child > *", {
          "--scene-x": mobile ? "0px" : "-24px",
          "--scene-y": mobile ? "16px" : "0px",
          "--scene-opacity": 0.16
        }, {
          "--scene-x": "0px",
          "--scene-y": "0px",
          "--scene-opacity": 1,
          stagger: 0.09,
          ease: "none",
          duration: 0.45
        })
        .fromTo(".testimonial-shell", {
          "--scene-x": mobile ? "0px" : "34px",
          "--scene-y": mobile ? "20px" : "0px",
          "--scene-opacity": 0.12,
          "--scene-depth": 0.98
        }, {
          "--scene-x": "0px",
          "--scene-y": "0px",
          "--scene-opacity": 1,
          "--scene-depth": 1,
          ease: "none",
          duration: 0.5
        }, 0.12);

      var faqTimeline = gsap.timeline({
        scrollTrigger: motion.scrubTrigger("#faq", "top 90%", "bottom 44%", 0.66)
      });
      faqTimeline
        .fromTo(".faq-layout > div:first-child > *", {
          "--scene-x": mobile ? "0px" : "-22px",
          "--scene-y": mobile ? "15px" : "0px",
          "--scene-opacity": 0.16
        }, {
          "--scene-x": "0px",
          "--scene-y": "0px",
          "--scene-opacity": 1,
          stagger: 0.08,
          ease: "none",
          duration: 0.42
        })
        .fromTo(".faq-list details", {
          "--scene-x": mobile ? "0px" : "24px",
          "--scene-y": mobile ? "12px" : "0px",
          "--scene-opacity": 0.12,
          "--faq-line": 0
        }, {
          "--scene-x": "0px",
          "--scene-y": "0px",
          "--scene-opacity": 1,
          "--faq-line": 1,
          stagger: 0.08,
          ease: "none",
          duration: 0.54
        }, 0.08)
        .fromTo(".faq-cta", {
          "--scene-y": "18px",
          "--scene-opacity": 0.2
        }, {
          "--scene-y": "0px",
          "--scene-opacity": 1,
          ease: "none",
          duration: 0.28
        }, 0.46);

      gsap.fromTo(".final-cta", {
        "--cta-light-y": "5%",
        "--cta-composition": 0,
        "--cta-ring-scale": 0.78
      }, {
        "--cta-light-y": "88%",
        "--cta-composition": 0.7,
        "--cta-ring-scale": 1,
        ease: "none",
        scrollTrigger: motion.scrubTrigger(".final-cta", "top bottom", "bottom top", 0.74)
      });

      gsap.fromTo(".final-cta__inner > *", {
          "--scene-y": function (index) { return 30 + index * 5 + "px"; },
          "--scene-opacity": 0.08,
          "--scene-depth": function (index) { return index === 3 ? 0.94 : 1; }
        }, {
          "--scene-y": "0px",
          "--scene-opacity": 1,
          "--scene-depth": 1,
          stagger: 0.11,
          ease: "none",
          scrollTrigger: motion.scrubTrigger(".final-cta", "top 90%", "top 34%", 0.62)
        });

      var contactTimeline = gsap.timeline({
        scrollTrigger: motion.scrubTrigger("#contact", "top 92%", "bottom 38%", 0.68)
      });
      contactTimeline
        .fromTo(".contact__intro > *", {
          "--scene-x": mobile ? "0px" : "-28px",
          "--scene-y": mobile ? "14px" : "0px",
          "--scene-opacity": 0.14
        }, {
          "--scene-x": "0px",
          "--scene-y": "0px",
          "--scene-opacity": 1,
          stagger: 0.07,
          ease: "none",
          duration: 0.48
        })
        .fromTo(".contact__form .field, .contact__form > .btn", {
          "--scene-y": "18px",
          "--scene-opacity": 0.12
        }, {
          "--scene-y": "0px",
          "--scene-opacity": 1,
          stagger: 0.06,
          ease: "none",
          duration: 0.52
        }, 0.14);

      var footerTimeline = gsap.timeline({
        scrollTrigger: motion.scrubTrigger(".site-footer", "top 96%", "bottom 72%", 0.55)
      });
      footerTimeline
        .fromTo(".site-footer", { "--footer-line": 0 }, {
          "--footer-line": 1,
          ease: "none",
          duration: 0.5
        })
        .fromTo(".footer__grid > div", {
          "--scene-y": "16px",
          "--scene-opacity": 0.15
        }, {
          "--scene-y": "0px",
          "--scene-opacity": 1,
          stagger: 0.08,
          ease: "none",
          duration: 0.46
        }, 0.08)
        .fromTo(".footer__bottom", {
          "--scene-y": "10px",
          "--scene-opacity": 0.16
        }, {
          "--scene-y": "0px",
          "--scene-opacity": 1,
          ease: "none",
          duration: 0.26
        }, 0.28);
    }, document.body);

    return function () { context.revert(); };
  };
})();
