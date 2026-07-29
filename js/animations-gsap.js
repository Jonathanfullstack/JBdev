(function () {
  "use strict";

  if (!window.gsap || !window.ScrollTrigger) {
    document.documentElement.classList.add("gsap-unavailable");
    return;
  }

  var gsap = window.gsap;
  var ScrollTrigger = window.ScrollTrigger;
  gsap.registerPlugin(ScrollTrigger);

  var root = document.body;
  var media = gsap.matchMedia();
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

        if (conditions.reduceMotion) {
          document.documentElement.classList.add("motion-reduced");
          return;
        }

        document.documentElement.classList.add("gsap-ready");
        var travel = conditions.desktop ? 42 : conditions.tablet ? 30 : 22;
        var projectTravel = conditions.mobile ? 22 : 48;

        var heroTimeline = gsap.timeline({
          defaults: { ease: "power3.out" },
          onComplete: function () {
            gsap.set(
              [
                ".hero-section .eyebrow",
                ".hero-line",
                ".hero__lead",
                ".hero__actions",
                ".hero__assurances li",
                ".hero__visual"
              ],
              { clearProps: "transform,opacity,visibility" }
            );
          }
        });

        heroTimeline
          .from(".hero-section .eyebrow", { autoAlpha: 0, y: 14, duration: 0.55 })
          .from(".hero-line", { autoAlpha: 0, yPercent: 115, duration: 0.9, stagger: 0.11 }, "-=0.28")
          .from(".hero__lead", { autoAlpha: 0, y: 22, duration: 0.65 }, "-=0.5")
          .from(".hero__actions", { autoAlpha: 0, y: 18, duration: 0.55 }, "-=0.42")
          .from(".hero__assurances li", { autoAlpha: 0, y: 10, duration: 0.4, stagger: 0.08 }, "-=0.3")
          .from(".hero__visual", { autoAlpha: 0, x: conditions.mobile ? 0 : 35, scale: 0.96, duration: 0.85 }, "-=0.8");

        gsap.utils.toArray(
          ".section-heading h2, .about__content h2, .testimonials-layout > div:first-child h2, .faq-layout > div:first-child h2"
        ).forEach(function (heading) {
          gsap.from(heading, {
            autoAlpha: 0,
            yPercent: 45,
            clipPath: "inset(0 0 100% 0)",
            duration: 0.8,
            ease: "power3.out",
            clearProps: "transform,opacity,visibility,clipPath",
            scrollTrigger: {
              trigger: heading,
              start: "top 86%",
              once: true
            }
          });
        });

        gsap.utils.toArray(
          ".section-heading > p, .about__content > p, .testimonials-layout > div:first-child > p:last-child, .faq-layout > div:first-child > p:last-child"
        ).forEach(function (text) {
          gsap.from(text, {
            autoAlpha: 0,
            y: 18,
            duration: 0.62,
            ease: "power2.out",
            clearProps: "transform,opacity,visibility",
            scrollTrigger: {
              trigger: text,
              start: "top 88%",
              once: true
            }
          });
        });

        function revealGroup(selector, options) {
          var elements = gsap.utils.toArray(selector);
          if (!elements.length) return;
          gsap.from(elements, {
            autoAlpha: 0,
            y: options.y || travel,
            scale: options.scale || 0.985,
            rotationX: options.rotationX || 0,
            transformOrigin: "50% 100%",
            duration: options.duration || 0.72,
            stagger: options.stagger || 0.09,
            ease: "power3.out",
            clearProps: "transform,opacity,visibility",
            scrollTrigger: {
              trigger: options.trigger || elements[0].parentElement,
              start: options.start || "top 82%",
              once: true
            }
          });
        }

        revealGroup(".trust-grid article", { trigger: ".trust-grid", y: 18, scale: 1, stagger: 0.08 });
        revealGroup(".service-card", {
          trigger: ".services-grid",
          y: travel,
          rotationX: conditions.desktop ? 5 : 0,
          stagger: conditions.mobile ? 0.06 : 0.1
        });
        revealGroup(".advantages-grid article", { trigger: ".advantages-grid", y: 30, stagger: 0.08 });

        gsap.utils.toArray(".service-card").forEach(function (card) {
          ScrollTrigger.create({
            trigger: card,
            start: "top 63%",
            end: "bottom 43%",
            toggleClass: { targets: card, className: "is-scroll-active" }
          });
        });

        var process = document.querySelector(".process-grid");
        if (process) {
          gsap.to(process, {
            "--process-progress": 1,
            ease: "none",
            scrollTrigger: {
              trigger: process,
              start: "top 72%",
              end: "bottom 48%",
              scrub: 0.35
            }
          });

          gsap.utils.toArray(".process-grid li").forEach(function (step) {
            ScrollTrigger.create({
              trigger: step,
              start: conditions.mobile ? "top 68%" : "top 62%",
              end: conditions.mobile ? "bottom 50%" : "bottom 42%",
              toggleClass: { targets: step, className: "is-active" }
            });
          });
        }

        gsap.utils.toArray(".project-card").forEach(function (card, index) {
          var content = card.querySelector(":scope > div");
          var image = card.querySelector("img");

          gsap.from(card, {
            autoAlpha: 0,
            x: conditions.mobile ? 0 : index % 2 === 0 ? -projectTravel : projectTravel,
            y: conditions.mobile ? 26 : 0,
            duration: 0.82,
            ease: "power3.out",
            clearProps: "transform,opacity,visibility",
            scrollTrigger: {
              trigger: card,
              start: "top 84%",
              once: true
            }
          });

          if (content) {
            gsap.from(content.children, {
              autoAlpha: 0,
              y: 14,
              duration: 0.5,
              stagger: 0.06,
              ease: "power2.out",
              clearProps: "transform,opacity,visibility",
              scrollTrigger: {
                trigger: card,
                start: "top 78%",
                once: true
              }
            });
          }

          if (image && !conditions.mobile) {
            gsap.fromTo(
              image,
              { yPercent: -3 },
              {
                yPercent: 3,
                ease: "none",
                scrollTrigger: {
                  trigger: card,
                  start: "top bottom",
                  end: "bottom top",
                  scrub: 0.5
                }
              }
            );
          }
        });

        var finalCta = document.querySelector(".final-cta");
        if (finalCta) {
          gsap.to(finalCta, {
            "--cta-light-y": "92%",
            ease: "none",
            scrollTrigger: {
              trigger: finalCta,
              start: "top bottom",
              end: "bottom top",
              scrub: 0.5
            }
          });

          gsap.from(".final-cta__inner > *", {
            autoAlpha: 0,
            y: function (index) { return 30 + index * 5; },
            scale: function (index) { return index === 3 ? 0.94 : 1; },
            duration: 0.78,
            stagger: 0.09,
            ease: "power3.out",
            clearProps: "transform,opacity,visibility",
            scrollTrigger: {
              trigger: finalCta,
              start: "top 76%",
              once: true
            }
          });
        }

        return function () {
          document.documentElement.classList.remove("gsap-ready");
        };
      }
    );
  }, root);

  function refreshAfterAssets() {
    var images = Array.from(document.images);
    var imagePromises = images.map(function (image) {
      if (image.complete) return Promise.resolve();
      return new Promise(function (resolve) {
        image.addEventListener("load", resolve, { once: true });
        image.addEventListener("error", resolve, { once: true });
      });
    });

    var fontPromise = document.fonts && document.fonts.ready
      ? document.fonts.ready
      : Promise.resolve();

    Promise.allSettled(imagePromises.concat(fontPromise)).then(function () {
      ScrollTrigger.refresh();
    });
  }

  if (document.readyState === "complete") refreshAfterAssets();
  else window.addEventListener("load", refreshAfterAssets, { once: true });

  window.addEventListener("pagehide", function () {
    media.revert();
    context.revert();
  }, { once: true });
})();
