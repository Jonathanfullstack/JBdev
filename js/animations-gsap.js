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
  var originalConductor = document.querySelector(".hero__panel-card");
  var conductor = originalConductor ? originalConductor.cloneNode(true) : null;
  var media = gsap.matchMedia();

  if (conductor) {
    conductor.className = "conductor-clone";
    conductor.setAttribute("aria-hidden", "true");
    document.body.appendChild(conductor);
  }

  function reversibleTrigger(trigger, start) {
    return {
      trigger: trigger,
      start: start || "top 84%",
      end: "bottom 16%",
      toggleActions: "play none none reverse",
      invalidateOnRefresh: true
    };
  }

  function revealGroup(selector, options) {
    var elements = gsap.utils.toArray(selector);
    if (!elements.length) return;
    gsap.from(elements, {
      autoAlpha: 0,
      x: options.x || 0,
      y: options.y || 0,
      scale: options.scale == null ? 1 : options.scale,
      rotationX: options.rotationX || 0,
      transformOrigin: "50% 100%",
      duration: options.duration || 0.72,
      stagger: options.stagger || 0.08,
      ease: "power3.out",
      clearProps: "transform,opacity,visibility",
      scrollTrigger: reversibleTrigger(options.trigger || elements[0].parentElement, options.start)
    });
  }

  function createDesktopConductor() {
    if (!conductor || !originalConductor) return;

    function originalPosition() {
      var rect = originalConductor.getBoundingClientRect();
      return {
        x: rect.left,
        y: rect.top + window.scrollY,
        width: rect.width
      };
    }

    function sidePosition(scale, yRatio, inset) {
      var width = parseFloat(window.getComputedStyle(conductor).width) || 288;
      return {
        x: window.innerWidth - width * scale - inset - width * (1 - scale) / 2,
        y: window.innerHeight * yRatio
      };
    }

    var anchors = [
      { element: document.querySelector("#hero"), scale: 1, opacity: 0, rotation: 0, position: originalPosition },
      { element: document.querySelector("#services"), scale: 0.55, opacity: 0.34, rotation: 1.5, position: function () { return sidePosition(0.55, 0.14, 10); } },
      { element: document.querySelector("#process"), scale: 0.6, opacity: 0.82, rotation: -1.5, position: function () { return sidePosition(0.6, 0.56, 12); } },
      { element: document.querySelector("#projects"), scale: 0.5, opacity: 0.28, rotation: 1, position: function () { return sidePosition(0.5, 0.22, 8); } },
      { element: document.querySelector("#advantages"), scale: 0.54, opacity: 0.5, rotation: -1, position: function () { return sidePosition(0.54, 0.66, 10); } },
      { element: document.querySelector(".final-cta"), scale: 0.74, opacity: 0.9, rotation: 1.5, position: function () { return sidePosition(0.74, 0.18, 22); } },
      { element: document.querySelector(".site-footer"), scale: 0.45, opacity: 0, rotation: 0, position: function () { return sidePosition(0.45, 0.72, 8); } }
    ].filter(function (anchor) { return anchor.element; });

    var totalDistance = anchors[anchors.length - 1].element.offsetTop - anchors[0].element.offsetTop;
    var timeline = gsap.timeline({
      defaults: { ease: "none" },
      scrollTrigger: {
        start: 0,
        end: function () {
          return Math.max(
            anchors[anchors.length - 1].element.offsetTop - window.innerHeight * 0.78,
            window.innerHeight
          );
        },
        scrub: 0.65,
        invalidateOnRefresh: true,
        onUpdate: function (self) {
          conductor.dataset.scrollProgress = self.progress.toFixed(3);
        },
        onRefresh: function (self) {
          conductor.dataset.scrollRange = Math.round(self.start) + ":" + Math.round(self.end);
        }
      }
    });

    var first = anchors[0].position();
    gsap.set(conductor, {
      x: first.x,
      y: first.y,
      width: first.width,
      scale: anchors[0].scale,
      rotation: anchors[0].rotation,
      autoAlpha: anchors[0].opacity,
      force3D: true
    });

    anchors.slice(1).forEach(function (anchor, index) {
      var previous = anchors[index];
      var segmentDistance = anchor.element.offsetTop - previous.element.offsetTop;
      var duration = Math.max(segmentDistance / totalDistance, 0.04);
      timeline.to(conductor, {
        x: function () { return anchor.position().x; },
        y: function () { return anchor.position().y; },
        scale: anchor.scale,
        rotation: anchor.rotation,
        autoAlpha: anchor.opacity,
        duration: duration,
        force3D: true
      });
    });

    gsap.to(originalConductor, {
      autoAlpha: 0,
      scale: 0.94,
      ease: "none",
      scrollTrigger: {
        start: function () {
          return document.querySelector("#hero").offsetHeight * 0.18;
        },
        end: function () {
          return document.querySelector("#hero").offsetHeight * 0.72;
        },
        scrub: 0.35,
        invalidateOnRefresh: true
      }
    });
  }

  function createMobileConductor() {
    if (!conductor) return;
    var finalCta = document.querySelector(".final-cta");
    if (!finalCta) return;
    gsap.set(conductor, { autoAlpha: 0, scale: 0.42, rotation: 0 });
    gsap.timeline({
      scrollTrigger: {
        trigger: finalCta,
        start: "top 92%",
        end: "bottom 10%",
        scrub: 0.45,
        invalidateOnRefresh: true
      }
    })
      .to(conductor, {
        x: function () {
          var width = parseFloat(window.getComputedStyle(conductor).width) || 240;
          var scale = 0.42;
          return window.innerWidth - width * scale - 10 - width * (1 - scale) / 2;
        },
        y: function () { return Math.max(88, window.innerHeight * 0.14); },
        autoAlpha: 0.58,
        rotation: 1,
        duration: 0.35,
        ease: "none"
      })
      .to(conductor, { autoAlpha: 0, scale: 0.36, duration: 0.65, ease: "none" });
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

        if (conditions.reduceMotion) {
          document.documentElement.classList.add("motion-reduced");
          if (conductor) conductor.hidden = true;
          if (originalConductor) gsap.set(originalConductor, { clearProps: "all" });
          return;
        }

        if (conductor) conductor.hidden = false;
        document.documentElement.classList.add("gsap-ready");
        var travel = conditions.desktop ? 42 : conditions.tablet ? 30 : 22;
        var projectTravel = conditions.mobile ? 20 : 44;
        var stagger = conditions.mobile ? 0.045 : 0.08;

        var heroTimeline = gsap.timeline({ defaults: { ease: "power3.out" } });
        heroTimeline
          .from(".hero-section .eyebrow", { autoAlpha: 0, y: 14, duration: 0.55 })
          .from(".hero-line", { autoAlpha: 0, yPercent: 115, duration: 0.9, stagger: 0.1 }, "-=0.28")
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

        gsap.utils.toArray(
          ".section-heading h2, .about__content h2, .testimonials-layout > div:first-child h2, .faq-layout > div:first-child h2"
        ).forEach(function (heading) {
          gsap.from(heading, {
            autoAlpha: 0,
            yPercent: 42,
            clipPath: "inset(0 0 100% 0)",
            duration: 0.78,
            ease: "power3.out",
            clearProps: "transform,opacity,visibility,clipPath",
            scrollTrigger: reversibleTrigger(heading, "top 86%")
          });
        });

        gsap.utils.toArray(
          ".section-heading > p, .about__content > p, .testimonials-layout > div:first-child > p:last-child, .faq-layout > div:first-child > p:last-child"
        ).forEach(function (text) {
          gsap.from(text, {
            autoAlpha: 0,
            x: conditions.mobile ? 0 : 18,
            y: conditions.mobile ? 14 : 0,
            duration: 0.58,
            ease: "power2.out",
            clearProps: "transform,opacity,visibility",
            scrollTrigger: reversibleTrigger(text, "top 88%")
          });
        });

        revealGroup(".trust-grid article", { trigger: ".trust-grid", y: 16, stagger: stagger });
        gsap.to(".trust-grid", {
          "--trust-progress": 1,
          ease: "none",
          scrollTrigger: {
            trigger: ".trust-grid",
            start: "top 88%",
            end: "bottom 36%",
            scrub: 0.35
          }
        });

        var serviceCards = gsap.utils.toArray(".service-card");
        serviceCards.forEach(function (card, index) {
          var serviceIcon = card.querySelector("i, svg");
          gsap.from(card, {
            autoAlpha: 0,
            x: conditions.mobile ? (index % 2 ? 14 : -14) : (index % 3 - 1) * 18,
            y: travel + (index % 2) * 10,
            rotationX: conditions.desktop ? (index % 2 ? -4 : 4) : 0,
            scale: 0.985,
            duration: 0.72,
            ease: "power3.out",
            clearProps: "transform,opacity,visibility",
            scrollTrigger: reversibleTrigger(card, "top 86%")
          });

          if (serviceIcon) {
            gsap.from(serviceIcon, {
              scale: 0.72,
              rotation: index % 2 ? -6 : 6,
              duration: 0.5,
              ease: "power2.out",
              clearProps: "transform",
              scrollTrigger: reversibleTrigger(card, "top 80%")
            });
          }

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
              end: "bottom 34%",
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
            y: conditions.mobile ? 24 : 0,
            duration: 0.8,
            ease: "power3.out",
            clearProps: "transform,opacity,visibility",
            scrollTrigger: reversibleTrigger(card, "top 84%")
          });
          if (content) {
            gsap.from(content.children, {
              autoAlpha: 0,
              y: 13,
              duration: 0.48,
              stagger: 0.055,
              ease: "power2.out",
              clearProps: "transform,opacity,visibility",
              scrollTrigger: reversibleTrigger(card, "top 79%")
            });
          }
          if (image && !conditions.mobile) {
            gsap.fromTo(image, { yPercent: -3 }, {
              yPercent: 3,
              ease: "none",
              scrollTrigger: {
                trigger: card,
                start: "top bottom",
                end: "bottom top",
                scrub: 0.5
              }
            });
          }
        });

        revealGroup(".advantages-grid article", {
          trigger: ".advantages-grid",
          y: 26,
          x: conditions.mobile ? 0 : 10,
          stagger: stagger
        });
        gsap.to(".advantages-grid", {
          "--advantages-lines": 1,
          ease: "none",
          scrollTrigger: {
            trigger: ".advantages-grid",
            start: "top 82%",
            end: "bottom 42%",
            scrub: 0.4
          }
        });

        gsap.from(".about__image", {
          autoAlpha: 0,
          x: conditions.mobile ? 0 : -36,
          scale: 0.96,
          duration: 0.82,
          ease: "power3.out",
          clearProps: "transform,opacity,visibility",
          scrollTrigger: reversibleTrigger(".about__image", "top 84%")
        });
        if (!conditions.mobile) {
          gsap.fromTo(".about__image img", { yPercent: -2 }, {
            yPercent: 2,
            ease: "none",
            scrollTrigger: {
              trigger: "#about",
              start: "top bottom",
              end: "bottom top",
              scrub: 0.45
            }
          });
        }
        revealGroup(".about__content li", {
          trigger: ".about__content ul",
          x: conditions.mobile ? 0 : 18,
          y: conditions.mobile ? 10 : 0,
          stagger: 0.07
        });

        gsap.from(".testimonial-shell", {
          autoAlpha: 0,
          x: conditions.mobile ? 0 : 36,
          scale: 0.98,
          duration: 0.8,
          ease: "power3.out",
          clearProps: "transform,opacity,visibility",
          scrollTrigger: reversibleTrigger(".testimonial-shell", "top 82%")
        });

        revealGroup(".faq-list details", {
          trigger: ".faq-list",
          x: conditions.mobile ? 0 : 22,
          y: conditions.mobile ? 12 : 0,
          stagger: 0.065
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
            y: function (index) { return 28 + index * 4; },
            scale: function (index) { return index === 3 ? 0.95 : 1; },
            duration: 0.75,
            stagger: 0.08,
            ease: "power3.out",
            clearProps: "transform,opacity,visibility",
            scrollTrigger: reversibleTrigger(finalCta, "top 76%")
          });
        }

        revealGroup(".contact-list > *", {
          trigger: ".contact-list",
          x: conditions.mobile ? 0 : -26,
          y: conditions.mobile ? 12 : 0,
          stagger: 0.065
        });
        revealGroup(".contact__form .field", {
          trigger: ".contact__form",
          y: 18,
          stagger: 0.055,
          start: "top 84%"
        });
        gsap.from(".contact__form > .btn", {
          autoAlpha: 0,
          scale: 0.94,
          duration: 0.55,
          ease: "power2.out",
          clearProps: "transform,opacity,visibility",
          scrollTrigger: reversibleTrigger(".contact__form", "top 74%")
        });

        gsap.to(".site-footer", {
          "--footer-line": 1,
          ease: "none",
          scrollTrigger: {
            trigger: ".site-footer",
            start: "top 92%",
            end: "top 62%",
            scrub: 0.35
          }
        });
        revealGroup(".footer__grid > div", {
          trigger: ".footer__grid",
          y: 18,
          stagger: 0.07,
          start: "top 91%"
        });

        if (conditions.mobile) createMobileConductor();
        else createDesktopConductor();

        return function () {
          document.documentElement.classList.remove("gsap-ready");
        };
      }
    );
  }, root);

  function refreshAfterAssets() {
    var imagePromises = Array.from(document.images).map(function (image) {
      if (image.complete) return Promise.resolve();
      return new Promise(function (resolve) {
        image.addEventListener("load", resolve, { once: true });
        image.addEventListener("error", resolve, { once: true });
      });
    });
    var fontPromise = document.fonts && document.fonts.ready ? document.fonts.ready : Promise.resolve();
    Promise.allSettled(imagePromises.concat(fontPromise)).then(function () {
      ScrollTrigger.refresh();
    });
  }

  if (document.readyState === "complete") refreshAfterAssets();
  else window.addEventListener("load", refreshAfterAssets, { once: true });

  window.addEventListener("pagehide", function () {
    media.revert();
    context.revert();
    if (conductor) conductor.remove();
  }, { once: true });
})();
