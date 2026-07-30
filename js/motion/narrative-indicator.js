(function () {
  "use strict";

  var motion = window.JBMotion = window.JBMotion || {};

  var ICONS = {
    code: '<path d="m8 9-3 3 3 3M16 9l3 3-3 3M14 5l-4 14"/>',
    bolt: '<path d="m13 2-9 12h7l-1 8 9-12h-7l1-8Z"/>',
    tools: '<path d="M14.7 6.3a4 4 0 0 0-5-5l2.2 2.2-2.4 2.4-2.2-2.2a4 4 0 0 0 5 5l6.8 6.8a2 2 0 1 1-2.8 2.8l-6.8-6.8M5 21l4.5-4.5"/>',
    flow: '<circle cx="5" cy="6" r="2"/><circle cx="19" cy="18" r="2"/><path d="M7 6h5a4 4 0 0 1 4 4v1M17 18h-5a4 4 0 0 1-4-4v-1"/><path d="m13 8 3 3 3-3M11 16l-3-3-3 3"/>',
    shield: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z"/><path d="m9 12 2 2 4-4"/>',
    grid: '<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>',
    target: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/>',
    user: '<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>',
    quote: '<path d="M9 11H5a4 4 0 0 0 4 4v4H5a8 8 0 0 1 0-16h4v8ZM21 11h-4a4 4 0 0 0 4 4v4h-4a8 8 0 0 1 0-16h4v8Z"/>',
    help: '<circle cx="12" cy="12" r="9"/><path d="M9.7 9a2.5 2.5 0 1 1 3.7 2.2c-.9.5-1.4 1-1.4 2.1M12 17h.01"/>',
    message: '<path d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4v8Z"/><path d="m9 13 6-6M10 7h5v5"/>'
  };

  var NARRATIVE_STATES = [
    { sectionId: "hero", selector: "#hero", label: "Estratégia + Tecnologia", icon: "code", tone: "hero" },
    { sectionId: "technologies", selector: "#technologies", label: "Tecnologia de ponta", icon: "bolt", tone: "technology" },
    { sectionId: "services", selector: "#services", label: "Soluções sob medida", icon: "tools", tone: "services" },
    { sectionId: "process", selector: "#process", label: "Do planejamento à entrega", icon: "flow", tone: "process" },
    { sectionId: "trust", selector: "#trust", label: "Confiança em cada etapa", icon: "shield", tone: "trust" },
    { sectionId: "projects", selector: "#projects", label: "Projetos que geram resultados", icon: "grid", tone: "projects" },
    { sectionId: "advantages", selector: "#advantages", label: "Foco em resultados", icon: "target", tone: "advantages" },
    { sectionId: "about", selector: "#about", label: "Quem está por trás", icon: "user", tone: "about" },
    { sectionId: "testimonials", selector: "#testimonials", label: "Experiências compartilhadas", icon: "quote", tone: "testimonials" },
    { sectionId: "faq", selector: "#faq", label: "Decisões com clareza", icon: "help", tone: "faq" },
    { sectionId: "final-cta", selector: "#final-cta", label: "Vamos construir juntos", icon: "message", tone: "cta" },
    { sectionId: "contact", selector: "#contact", label: "Vamos construir juntos", icon: "message", tone: "cta" }
  ];

  function iconMarkup(name) {
    return '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">' + ICONS[name] + "</svg>";
  }

  function buildIndicator(conductor, initialState) {
    conductor.textContent = "";

    var main = document.createElement("span");
    main.className = "conductor-narrative-main";

    var iconShell = document.createElement("span");
    iconShell.className = "conductor-icon-shell";
    var icon = document.createElement("span");
    icon.className = "conductor-narrative-icon";
    icon.innerHTML = iconMarkup(initialState.icon);
    iconShell.appendChild(icon);

    var labelStage = document.createElement("span");
    labelStage.className = "conductor-label-stage";
    var label = document.createElement("strong");
    label.className = "conductor-narrative-label";
    label.textContent = initialState.label;
    labelStage.appendChild(label);

    var measurer = document.createElement("span");
    measurer.className = "conductor-label-measurer";
    measurer.setAttribute("aria-hidden", "true");

    var progress = document.createElement("span");
    progress.className = "conductor-journey-progress";
    progress.setAttribute("aria-hidden", "true");
    progress.appendChild(document.createElement("span"));

    main.appendChild(iconShell);
    main.appendChild(labelStage);
    conductor.appendChild(main);
    conductor.appendChild(measurer);
    conductor.appendChild(progress);

    return {
      icon: icon,
      iconShell: iconShell,
      label: label,
      measurer: measurer,
      progress: progress.firstElementChild
    };
  }

  motion.createNarrativeIndicator = function (api) {
    var conductor = api.conductor;
    var gsap = api.gsap;
    var ScrollTrigger = api.ScrollTrigger;
    var states = NARRATIVE_STATES.map(function (state) {
      return Object.assign({}, state, { element: document.querySelector(state.selector) });
    }).filter(function (state) {
      return state.element;
    });

    if (!conductor || !states.length) {
      return { destroy: function () {}, pulse: function () {} };
    }

    var elements = buildIndicator(conductor, states[0]);
    var activeIndex = 0;
    var transition = null;
    var resizeFrame = 0;
    var positionRefreshFrame = 0;
    var destroyed = false;
    var triggers = [];
    var context;

    function measureWidth(label) {
      elements.measurer.textContent = label;
      var contentWidth = Math.ceil(elements.measurer.scrollWidth);
      var mobile = window.matchMedia("(max-width: 768px)").matches;
      var conductorStyle = window.getComputedStyle(conductor);
      var mainStyle = window.getComputedStyle(elements.label.parentElement.parentElement);
      var iconWidth = elements.iconShell.offsetWidth || 48;
      var horizontalPadding = parseFloat(conductorStyle.paddingLeft) + parseFloat(conductorStyle.paddingRight);
      var gap = parseFloat(mainStyle.columnGap || mainStyle.gap) || (mobile ? 14 : 14.4);
      var minimum = mobile ? 188 : 240;
      var maximum = mobile
        ? Math.min(272, document.documentElement.clientWidth - 24)
        : Math.min(376, document.documentElement.clientWidth - 32);
      var naturalWidth = contentWidth + iconWidth + gap + horizontalPadding + 2;

      return Math.min(Math.max(naturalWidth, minimum), maximum);
    }

    function applyState(state) {
      elements.label.textContent = state.label;
      elements.icon.innerHTML = iconMarkup(state.icon);
      conductor.dataset.narrativeState = state.tone;
      conductor.dataset.activeSection = state.sectionId;
    }

    function schedulePositionRefresh() {
      if (positionRefreshFrame || destroyed) return;
      positionRefreshFrame = window.requestAnimationFrame(function () {
        positionRefreshFrame = 0;
        ScrollTrigger.refresh();
      });
    }

    function setState(nextIndex, directionHint, immediate) {
      if (nextIndex < 0 || nextIndex >= states.length) return;
      if (nextIndex === activeIndex && !immediate) return;

      var previousIndex = activeIndex;
      var state = states[nextIndex];
      var direction = directionHint || (nextIndex >= previousIndex ? 1 : -1);
      activeIndex = nextIndex;

      if (transition) transition.kill();
      if (immediate) {
        applyState(state);
        gsap.set(conductor, { width: measureWidth(state.label) });
        gsap.set([elements.label, elements.icon], { clearProps: "transform,opacity,visibility" });
        return;
      }

      transition = gsap.timeline({
        defaults: { overwrite: "auto" },
        onComplete: function () {
          transition = null;
          schedulePositionRefresh();
        }
      });

      transition
        .to(elements.label, {
          y: -6 * direction,
          autoAlpha: 0,
          duration: 0.16,
          ease: "power2.in"
        }, 0)
        .to(elements.icon, {
          y: -2 * direction,
          scale: 0.76,
          rotation: -7 * direction,
          autoAlpha: 0,
          duration: 0.18,
          ease: "power2.in"
        }, 0)
        .to(conductor, {
          width: measureWidth(state.label),
          duration: 0.48,
          ease: "power2.inOut"
        }, 0)
        .call(function () {
          applyState(state);
          gsap.set(elements.label, { y: 7 * direction });
          gsap.set(elements.icon, { y: 3 * direction, scale: 0.82, rotation: 6 * direction });
        }, null, 0.17)
        .to(elements.label, {
          y: 0,
          autoAlpha: 1,
          duration: 0.28,
          ease: "power3.out"
        }, 0.21)
        .to(elements.icon, {
          y: 0,
          scale: 1,
          rotation: 0,
          autoAlpha: 1,
          duration: 0.32,
          ease: "power3.out"
        }, 0.19);
    }

    function handleResize() {
      if (resizeFrame || destroyed) return;
      resizeFrame = window.requestAnimationFrame(function () {
        resizeFrame = 0;
        gsap.set(conductor, { width: measureWidth(states[activeIndex].label) });
      });
    }

    context = gsap.context(function () {
      setState(0, 1, true);

      states.forEach(function (state, index) {
        var next = states[index + 1];
        var trigger = ScrollTrigger.create({
          trigger: state.element,
          start: "top 54%",
          endTrigger: next ? next.element : state.element,
          end: next ? "top 54%" : "bottom 54%",
          onEnter: function () { setState(index, 1, false); },
          onEnterBack: function () { setState(index, -1, false); },
          onLeaveBack: function () { setState(Math.max(index - 1, 0), -1, false); },
          invalidateOnRefresh: true
        });
        triggers.push(trigger);
      });

      gsap.fromTo(elements.progress, {
        scaleX: 0
      }, {
        scaleX: 1,
        ease: "none",
        scrollTrigger: {
          trigger: states[0].element,
          start: "top top",
          endTrigger: states[states.length - 1].element,
          end: "bottom bottom",
          scrub: 0.35,
          invalidateOnRefresh: true
        }
      });
    }, conductor);

    window.addEventListener("resize", handleResize, { passive: true });
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(handleResize);
    }

    return {
      pulse: function (index) {
        if (destroyed) return;
        gsap.fromTo(elements.iconShell, {
          scale: 0.96
        }, {
          scale: 1.035,
          duration: 0.22,
          ease: "power2.out",
          repeat: 1,
          yoyo: true,
          overwrite: "auto"
        });
        conductor.style.setProperty("--project-index", index);
      },
      destroy: function () {
        destroyed = true;
        if (resizeFrame) window.cancelAnimationFrame(resizeFrame);
        if (positionRefreshFrame) window.cancelAnimationFrame(positionRefreshFrame);
        window.removeEventListener("resize", handleResize);
        if (transition) transition.kill();
        triggers.forEach(function (trigger) { trigger.kill(); });
        context.revert();
      }
    };
  };
})();
