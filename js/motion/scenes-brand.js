(function () {
  "use strict";

  var motion = window.JBMotion = window.JBMotion || {};

  motion.createBrandScenes = function (api) {
    var gsap = api.gsap;
    var mobile = api.conditions.mobile;
    var context = gsap.context(function () {
      motion.headingReveal(api, "#advantages .section-heading h2, #about .about__content h2", {
        start: "top 90%",
        end: "top 59%"
      });

      var advantagesTimeline = gsap.timeline({
        scrollTrigger: motion.scrubTrigger(".advantages-grid", "top 90%", "bottom 42%", 0.66)
      });
      advantagesTimeline
        .fromTo(".advantages-grid article", {
          "--scene-x": function (index) {
            if (mobile) return "0px";
            return index % 2 ? "18px" : "-18px";
          },
          "--scene-y": mobile ? "20px" : "30px",
          "--scene-opacity": 0.12,
          "--scene-depth": 0.98
        }, {
          "--scene-x": "0px",
          "--scene-y": "0px",
          "--scene-opacity": 1,
          "--scene-depth": 1,
          stagger: mobile ? 0.08 : 0.12,
          ease: "none",
          duration: 0.62
        })
        .to(".advantages-grid", {
          "--advantages-lines": 1,
          "--advantages-network": 1,
          ease: "none",
          duration: 0.72
        }, 0.12)
      var advantageIcons = gsap.utils.toArray(".advantages-grid i, .advantages-grid svg");
      if (advantageIcons.length) {
        advantagesTimeline.fromTo(advantageIcons, {
          "--icon-scale": 0.72,
          "--icon-rotation": "-5deg"
        }, {
          "--icon-scale": 1,
          "--icon-rotation": "0deg",
          stagger: 0.1,
          ease: "none",
          duration: 0.38
        }, 0.18);
      }

      var aboutTimeline = gsap.timeline({
        scrollTrigger: motion.scrubTrigger("#about", "top 88%", "bottom 42%", 0.82)
      });
      aboutTimeline
        .fromTo(".about__image", {
          "--about-clip": "inset(8% 8% 8% 8% round 1.6rem)",
          "--scene-x": mobile ? "0px" : "-30px",
          "--scene-opacity": 0.18,
          "--scene-depth": 0.97
        }, {
          "--about-clip": "inset(0% 0% 0% 0% round 1.6rem)",
          "--scene-x": "0px",
          "--scene-opacity": 1,
          "--scene-depth": 1,
          ease: "none",
          duration: 0.58
        })
        .fromTo(".about__content > .section-kicker, .about__content > p", {
          "--scene-y": "18px",
          "--scene-opacity": 0.15
        }, {
          "--scene-y": "0px",
          "--scene-opacity": 1,
          stagger: 0.09,
          ease: "none",
          duration: 0.42
        }, 0.18)
        .fromTo(".about__content li", {
          "--scene-x": mobile ? "0px" : "18px",
          "--scene-y": mobile ? "10px" : "0px",
          "--scene-opacity": 0.16
        }, {
          "--scene-x": "0px",
          "--scene-y": "0px",
          "--scene-opacity": 1,
          stagger: 0.08,
          ease: "none",
          duration: 0.34
        }, 0.36);

      if (!mobile) {
        gsap.fromTo(".about__image img", {
          "--about-parallax": "-2%"
        }, {
          "--about-parallax": "2%",
          ease: "none",
          scrollTrigger: {
            trigger: "#about",
            start: "top bottom",
            end: "bottom top",
            scrub: 0.72,
            invalidateOnRefresh: true
          }
        });
      }
    }, document.body);

    return function () { context.revert(); };
  };
})();
