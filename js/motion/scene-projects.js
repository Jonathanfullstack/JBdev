(function () {
  "use strict";

  var motion = window.JBMotion = window.JBMotion || {};

  motion.createProjectScene = function (api) {
    var gsap = api.gsap;
    var ScrollTrigger = api.ScrollTrigger;
    var desktop = api.conditions.desktop;
    var mobile = api.conditions.mobile;
    var cleanups = [];
    var context = gsap.context(function () {
      motion.headingReveal(api, "#projects .section-heading h2", {
        start: "top 88%",
        end: "top 58%",
        shift: 38
      });

      gsap.fromTo("#projects .section-heading > p", {
        "--scene-y": "18px",
        "--scene-opacity": 0.25
      }, {
        "--scene-y": "0px",
        "--scene-opacity": 1,
        ease: "none",
        scrollTrigger: motion.scrubTrigger("#projects .section-heading", "top 88%", "top 52%", 0.58)
      });

      gsap.utils.toArray(".project-card").forEach(function (card, index) {
        var image = card.querySelector("img");
        var content = card.querySelector(":scope > div");
        var direction = index % 2 ? 1 : -1;
        var timeline = gsap.timeline({
          scrollTrigger: motion.scrubTrigger(card, "top 92%", "top 48%", 0.58)
        });

        timeline
          .fromTo(card, {
            "--scene-x": mobile ? "0px" : direction * 42 + "px",
            "--scene-y": mobile ? "24px" : "34px",
            "--scene-opacity": 0.1,
            "--scene-depth": 0.975
          }, {
            "--scene-x": "0px",
            "--scene-y": "0px",
            "--scene-opacity": 1,
            "--scene-depth": 1,
            ease: "none",
            duration: 0.55
          })
          .fromTo(content ? content.children : [], {
            autoAlpha: 0.18,
            y: 14
          }, {
            autoAlpha: 1,
            y: 0,
            stagger: 0.06,
            ease: "none",
            duration: 0.3
          }, 0.2);

        if (image && desktop) {
          gsap.fromTo(image, {
            "--project-parallax": "-1%"
          }, {
            "--project-parallax": "1%",
            ease: "none",
            scrollTrigger: {
              trigger: card,
              start: "top bottom",
              end: "bottom top",
              scrub: 0.55,
              invalidateOnRefresh: true
            }
          });

          var media = card.querySelector(":scope > a");
          if (media) {
            var moveX = gsap.quickTo(image, "--pointer-x", { duration: 0.42, ease: "power2.out" });
            var moveY = gsap.quickTo(image, "--pointer-y", { duration: 0.42, ease: "power2.out" });
            var onPointerMove = function (event) {
              var rect = media.getBoundingClientRect();
              moveX(((event.clientX - rect.left) / rect.width - 0.5) * 0.6 + "%");
              moveY(((event.clientY - rect.top) / rect.height - 0.5) * 0.4 + "%");
            };
            var onPointerLeave = function () {
              moveX("0%");
              moveY("0%");
            };
            media.addEventListener("pointermove", onPointerMove);
            media.addEventListener("pointerleave", onPointerLeave);
            cleanups.push(function () {
              media.removeEventListener("pointermove", onPointerMove);
              media.removeEventListener("pointerleave", onPointerLeave);
            });
          }
        }

        ScrollTrigger.create({
          trigger: card,
          start: "top 60%",
          end: "bottom 38%",
          onToggle: function (self) {
            card.classList.toggle("is-project-active", self.isActive);
          }
        });
      });

      gsap.fromTo("#projects .section-cta", {
        "--scene-y": "24px",
        "--scene-opacity": 0.22
      }, {
        "--scene-y": "0px",
        "--scene-opacity": 1,
        ease: "none",
        scrollTrigger: motion.scrubTrigger("#projects .section-cta", "top 92%", "top 64%", 0.5)
      });
    }, document.body);

    return function () {
      cleanups.forEach(function (cleanup) { cleanup(); });
      context.revert();
    };
  };
})();
