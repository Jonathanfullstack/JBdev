(function () {
  "use strict";

  var motion = window.JBMotion = window.JBMotion || {};

  function appendGeometry(conductor) {
    var geometry = document.createElement("span");
    geometry.className = "conductor-geometry";
    geometry.setAttribute("aria-hidden", "true");
    for (var index = 0; index < 4; index += 1) {
      geometry.appendChild(document.createElement("span"));
    }
    conductor.appendChild(geometry);
  }

  motion.createConductor = function (api) {
    var gsap = api.gsap;
    var ScrollTrigger = api.ScrollTrigger;
    var original = document.querySelector(".hero__panel-card");
    if (!original) return function () {};

    var conductor = original.cloneNode(true);
    conductor.className = "conductor-clone";
    conductor.setAttribute("aria-hidden", "true");
    conductor.setAttribute("data-scene", "handoff");
    var narrativeController = typeof motion.createNarrativeIndicator === "function"
      ? motion.createNarrativeIndicator({
          conductor: conductor,
          gsap: gsap,
          ScrollTrigger: ScrollTrigger,
          conditions: api.conditions
        })
      : { destroy: function () {}, pulse: function () {} };
    appendGeometry(conductor);
    document.body.appendChild(conductor);

    function originalPosition() {
      var rect = original.getBoundingClientRect();
      return {
        x: rect.left,
        y: rect.top,
        width: rect.width
      };
    }

    function sidePosition(side, scale, yRatio, inset) {
      var width = parseFloat(window.getComputedStyle(conductor).width) || 288;
      var scaledWidth = width * scale;
      var hiddenEdge = width * (1 - scale) / 2;
      return {
        x: side === "left"
          ? inset - hiddenEdge
          : window.innerWidth - scaledWidth - inset - hiddenEdge,
        y: Math.max(92, window.innerHeight * yRatio)
      };
    }

    function centerPosition(scale) {
      var width = parseFloat(window.getComputedStyle(conductor).width) || 288;
      return {
        x: window.innerWidth * 0.5 - width * 0.5,
        y: Math.max(84, window.innerHeight * 0.12)
      };
    }

    var cleanups = [];
    var context = gsap.context(function () {
      if (api.conditions.mobile) {
        gsap.set(conductor, {
          autoAlpha: 0,
          scale: 0.72,
          rotation: 0,
          force3D: true
        });

        var mobileTimeline = gsap.timeline({
          scrollTrigger: {
            trigger: ".final-cta",
            start: "top 94%",
            end: "bottom 18%",
            scrub: 0.5,
            invalidateOnRefresh: true
          }
        });

        mobileTimeline
          .to(conductor, {
            x: function () { return sidePosition("right", 0.72, 0.13, 8).x; },
            y: function () { return sidePosition("right", 0.72, 0.13, 8).y; },
            autoAlpha: 0.68,
            scale: 0.72,
            rotation: 1,
            "--conductor-light": 0.8,
            duration: 0.34,
            ease: "none"
          })
          .to(conductor, {
            autoAlpha: 0,
            scale: 0.62,
            "--conductor-light": 0,
            duration: 0.66,
            ease: "none"
          });
        return;
      }

      var startPosition = originalPosition();
      gsap.set(conductor, {
        x: startPosition.x,
        y: startPosition.y,
        width: startPosition.width,
        autoAlpha: 0,
        scale: 1,
        rotation: 0,
        "--conductor-lines": 0,
        "--conductor-wire": 0,
        "--conductor-light": 0,
        force3D: true
      });

      var anchors = [
        {
          element: document.querySelector("#technologies"),
          scene: "technology",
          position: function () { return sidePosition("right", 0.74, 0.18, 10); },
          scale: 0.74, opacity: 0.74, rotation: 0.6, lines: 0.12, wire: 0.18, light: 0.38
        },
        {
          element: document.querySelector("#services"),
          scene: "services",
          position: function () { return sidePosition("right", 0.78, 0.18, 10); },
          scale: 0.78, opacity: 0.82, rotation: -0.8, lines: 1, wire: 0.2, light: 0.8
        },
        {
          element: document.querySelector("#process"),
          scene: "process",
          position: function () { return sidePosition("right", 0.76, 0.16, 10); },
          scale: 0.76, opacity: 0.78, rotation: 0.7, lines: 0.6, wire: 0.45, light: 0.55
        },
        {
          element: document.querySelector("#trust"),
          scene: "handoff",
          position: function () { return sidePosition("right", 0.72, 0.16, 10); },
          scale: 0.72, opacity: 0.72, rotation: 0.5, lines: 0.15, wire: 0, light: 0.35
        },
        {
          element: document.querySelector("#projects"),
          scene: "projects",
          position: function () { return sidePosition("left", 0.72, 0.7, 10); },
          scale: 0.72, opacity: api.conditions.tablet ? 0 : 0.62, rotation: -0.4, lines: 0.2, wire: 0.3, light: 0.55
        },
        {
          element: document.querySelector("#advantages"),
          scene: "wireframe",
          position: function () { return sidePosition("left", 0.74, 0.18, 10); },
          scale: 0.74, opacity: 0.76, rotation: 0.7, lines: 1, wire: 1, light: 0.45
        },
        {
          element: document.querySelector("#about"),
          scene: "calm",
          position: function () { return sidePosition("right", 0.7, 0.2, 10); },
          scale: 0.7, opacity: 0.62, rotation: 0, lines: 0.15, wire: 0.25, light: 0.15
        },
        {
          element: document.querySelector("#testimonials"),
          scene: "testimonials",
          position: function () { return sidePosition("left", 0.7, 0.18, 10); },
          scale: 0.7, opacity: 0.68, rotation: -0.4, lines: 0.1, wire: 0.2, light: 0.22
        },
        {
          element: document.querySelector("#faq"),
          scene: "faq",
          position: function () { return sidePosition("right", 0.72, 0.18, 10); },
          scale: 0.72, opacity: 0.74, rotation: 0.4, lines: 0.2, wire: 0.3, light: 0.3
        },
        {
          element: document.querySelector("#final-cta"),
          scene: "final",
          position: function () { return centerPosition(0.82); },
          scale: 0.82, opacity: 0.78, rotation: -0.5, lines: 0.7, wire: 0.75, light: 1
        },
        {
          element: document.querySelector("#contact"),
          scene: "contact",
          position: function () { return sidePosition("left", 0.72, 0.18, 10); },
          scale: 0.72, opacity: 0.7, rotation: 0, lines: 0.2, wire: 0.28, light: 0.32
        },
        {
          element: document.querySelector(".site-footer"),
          scene: "footer",
          position: function () { return sidePosition("right", 0.34, 0.75, 2); },
          scale: 0.34, opacity: 0, rotation: 0, lines: 0, wire: 0, light: 0
        }
      ].filter(function (anchor) { return anchor.element; });

      if (!anchors.length) return;
      var firstOffset = anchors[0].element.offsetTop;
      var lastOffset = anchors[anchors.length - 1].element.offsetTop;
      var totalDistance = Math.max(lastOffset - firstOffset, 1);
      var timeline = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: anchors[0].element,
          start: "top 94%",
          endTrigger: anchors[anchors.length - 1].element,
          end: "top 76%",
          scrub: 0.72,
          invalidateOnRefresh: true
        }
      });

      function moveToAnchor(anchor, duration) {
        timeline.to(conductor, {
          x: function () { return anchor.position().x; },
          y: function () { return anchor.position().y; },
          scale: anchor.scale,
          rotation: anchor.rotation,
          autoAlpha: anchor.opacity,
          "--conductor-lines": anchor.lines,
          "--conductor-wire": anchor.wire,
          "--conductor-light": anchor.light,
          duration: duration,
          force3D: true
        });
      }

      moveToAnchor(anchors[0], 0.035);
      anchors.slice(1).forEach(function (anchor, index) {
        var previous = anchors[index];
        var segment = Math.max((anchor.element.offsetTop - previous.element.offsetTop) / totalDistance, 0.05);
        var transitionDuration = Math.min(segment * 0.22, 0.055);
        var holdDuration = Math.max(segment - transitionDuration, 0.015);
        timeline.to({}, { duration: holdDuration });
        moveToAnchor(anchor, transitionDuration);
      });

      anchors.forEach(function (anchor, index) {
        var next = anchors[index + 1];
        var sceneTrigger = ScrollTrigger.create({
          trigger: anchor.element,
          start: "top 58%",
          endTrigger: next ? next.element : anchor.element,
          end: next ? "top 58%" : "bottom top",
          onEnter: function () { conductor.dataset.scene = anchor.scene; },
          onEnterBack: function () { conductor.dataset.scene = anchor.scene; },
          onLeaveBack: function () {
            conductor.dataset.scene = index ? anchors[index - 1].scene : "handoff";
          },
          invalidateOnRefresh: true
        });
        cleanups.push(function () { sceneTrigger.kill(); });
      });

      gsap.to(original, {
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

      gsap.utils.toArray(".project-card").forEach(function (card, index) {
        var trigger = ScrollTrigger.create({
          trigger: card,
          start: "top 64%",
          end: "bottom 38%",
          onToggle: function (self) {
            if (!self.isActive) return;
            narrativeController.pulse(index);
          }
        });
        cleanups.push(function () { trigger.kill(); });
      });
    }, document.body);

    return function () {
      cleanups.forEach(function (cleanup) { cleanup(); });
      narrativeController.destroy();
      context.revert();
      conductor.remove();
    };
  };
})();
