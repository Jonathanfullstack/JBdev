(function () {
  function boot() {
    var el = document.getElementById("particles-js");
    if (!el || typeof particlesJS !== "function") return;

    var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    /* Tablet/mobile: canvas custa muito GPU — desligado */
    var notDesktop = window.matchMedia("(max-width: 991px)").matches;

    if (reduced || notDesktop) {
      el.style.display = "none";
      return;
    }

    var coarse = window.matchMedia("(pointer: coarse)").matches;

    particlesJS("particles-js", {
      particles: {
        number: {
          value: 28,
          density: { enable: true, value_area: 1100 },
        },
        color: { value: "#493eda" },
        shape: {
          type: "circle",
          stroke: { width: 0, color: "#252525" },
          polygon: { nb_sides: 5 },
        },
        opacity: {
          value: 0.4,
          random: true,
          anim: { enable: false },
        },
        size: {
          value: 2,
          random: true,
          anim: { enable: false },
        },
        line_linked: {
          enable: true,
          distance: 110,
          color: "#493eda",
          opacity: 0.22,
          width: 1,
        },
        move: {
          enable: true,
          speed: 1.2,
          direction: "none",
          random: false,
          straight: false,
          out_mode: "out",
          bounce: false,
          attract: { enable: false },
        },
      },
      interactivity: {
        detect_on: "canvas",
        events: {
          onhover: {
            enable: !coarse,
            mode: "repulse",
          },
          onclick: {
            enable: false,
          },
          resize: true,
        },
        modes: {
          repulse: { distance: 40, duration: 0.3 },
          push: { particles_nb: 2 },
        },
      },
      retina_detect: true,
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
