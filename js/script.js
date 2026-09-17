(function () {
  var header = document.getElementById("site-header");
  var menu = document.getElementById("primary-menu");
  var menuButton = document.querySelector(".menu-btn");
  var headerInner = document.querySelector(".header__inner");
  var backToTop = document.getElementById("backToTop");
  var menuAnchors = menu ? Array.from(menu.querySelectorAll("a")) : [];
  // The panel CTA points at WhatsApp, so it must stay out of the scroll spy.
  var menuLinks = menuAnchors.filter(function (link) {
    return !link.closest(".header__menu-cta");
  });
  var lastFocusedElement = null;
  var menuFocusTimer = null;
  var scrollFrame = null;

  function isMenuOpen() {
    return Boolean(menu && menu.classList.contains("show"));
  }

  function getFocusableMenuItems() {
    if (!menu) return [];
    return [menuButton]
      .concat(Array.from(document.querySelectorAll(".home-language-toggle button:not([disabled])")))
      .concat(Array.from(menu.querySelectorAll("a[href]")))
      .filter(Boolean);
  }

  function openMenu() {
    if (!menu || !menuButton) return;
    lastFocusedElement = document.activeElement;
    menu.classList.add("show");
    menuButton.classList.add("open");
    menuButton.setAttribute("aria-expanded", "true");
    menuButton.setAttribute("aria-label", window.JBI18N ? window.JBI18N.t("closeMenu") : "Fechar menu");
    document.body.style.paddingRight = Math.max(0, window.innerWidth - document.documentElement.clientWidth) + "px";
    document.documentElement.classList.add("menu-open");
    document.body.classList.add("menu-open");
    if (window.JBLenis) window.JBLenis.stop();
    if (menuButton) {
      clearTimeout(menuFocusTimer);
      menuFocusTimer = window.setTimeout(function () {
        if (isMenuOpen()) menuButton.focus();
      }, 240);
    }
  }

  function closeMenu(options) {
    if (!menu || !menuButton) return;
    menu.classList.remove("show");
    menuButton.classList.remove("open");
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute("aria-label", window.JBI18N ? window.JBI18N.t("openMenu") : "Abrir menu");
    document.body.classList.remove("menu-open");
    document.documentElement.classList.remove("menu-open");
    document.body.style.paddingRight = "";
    if (window.JBLenis) window.JBLenis.start();
    clearTimeout(menuFocusTimer);
    if (!options || options.restoreFocus !== false) {
      if (lastFocusedElement && typeof lastFocusedElement.focus === "function") {
        lastFocusedElement.focus();
      } else {
        menuButton.focus();
      }
    }
  }

  if (menuButton && menu) {
    menuButton.addEventListener("click", function () {
      isMenuOpen() ? closeMenu() : openMenu();
    });

    document.addEventListener("keydown", function (event) {
      if (!isMenuOpen()) return;
      if (event.key === "Escape") {
        event.preventDefault();
        closeMenu();
        return;
      }
      if (event.key !== "Tab") return;
      var focusable = getFocusableMenuItems();
      if (!focusable.length) return;
      event.preventDefault();
      var currentIndex = focusable.indexOf(document.activeElement);
      var nextIndex = event.shiftKey ? currentIndex - 1 : currentIndex + 1;
      if (currentIndex < 0) nextIndex = 0;
      if (nextIndex < 0) nextIndex = focusable.length - 1;
      if (nextIndex >= focusable.length) nextIndex = 0;
      focusable[nextIndex].focus();
    });
  }

  menuAnchors.forEach(function (link) {
    link.addEventListener("click", function () {
      if (isMenuOpen()) closeMenu({ restoreFocus: false, restoreScroll: false });
    });
  });

  // Clicking anywhere outside the bar or the panel (i.e. the scrim) closes it.
  document.addEventListener("click", function (event) {
    if (!isMenuOpen()) return;
    var target = event.target;
    if (menu.contains(target) || (headerInner && headerInner.contains(target))) return;
    closeMenu({ restoreFocus: false });
  });

  function updatePageState() {
    scrollFrame = null;
    var y = window.scrollY;
    if (header) header.classList.toggle("sticky", y > 8);
    if (backToTop) backToTop.classList.toggle("is-visible", y > 500);

    var activeLink = null;
    menuLinks.forEach(function (link) {
      var section = document.querySelector(link.getAttribute("href"));
      if (section && section.getBoundingClientRect().top <= 130) activeLink = link;
    });
    menuLinks.forEach(function (link) {
      link.classList.toggle("active", link === activeLink);
    });
  }

  window.addEventListener("scroll", function () {
    if (!scrollFrame) scrollFrame = window.requestAnimationFrame(updatePageState);
  }, { passive: true });

  window.addEventListener("resize", function () {
    if (window.innerWidth > 1152 && isMenuOpen()) closeMenu({ restoreFocus: false });
    updatePageState();
  });
  window.addEventListener("hashchange", function () { if (isMenuOpen()) closeMenu({ restoreFocus: false }); });
  window.addEventListener("pagehide", function () {
    if (!isMenuOpen()) return;
    document.body.classList.remove("menu-open");
    document.documentElement.classList.remove("menu-open");
    document.body.style.paddingRight = "";
  });
  window.addEventListener("jbdev:languagechange", function () {
    if (!menuButton) return;
    menuButton.setAttribute("aria-label", window.JBI18N.t(isMenuOpen() ? "closeMenu" : "openMenu"));
  });

  var testimonials = Array.from(document.querySelectorAll(".testimonial"));
  var testimonialButtons = Array.from(document.querySelectorAll(".testimonial-navigation button"));
  var activeTestimonialIndex = 0;
  function showTestimonial(index) {
    if (index === activeTestimonialIndex) return;
    var previousIndex = activeTestimonialIndex;
    var previous = testimonials[previousIndex];
    var next = testimonials[index];
    var reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var direction = index > previousIndex ? 1 : -1;
    activeTestimonialIndex = index;

    if (window.gsap && !reducedMotion && previous && next) {
      window.gsap.killTweensOf([previous, next]);
      next.hidden = false;
      next.classList.add("is-active");
      window.gsap.timeline()
        .to(previous, {
          autoAlpha: 0,
          x: -12 * direction,
          duration: 0.2,
          ease: "power2.in",
          onComplete: function () {
            previous.hidden = true;
            previous.classList.remove("is-active");
            window.gsap.set(previous, { clearProps: "transform,opacity,visibility" });
          }
        })
        .fromTo(next, {
          autoAlpha: 0,
          x: 14 * direction
        }, {
          autoAlpha: 1,
          x: 0,
          duration: 0.32,
          ease: "power2.out",
          clearProps: "transform,opacity,visibility"
        });
    } else {
      testimonials.forEach(function (item, itemIndex) {
        var active = itemIndex === index;
        item.hidden = !active;
        item.classList.toggle("is-active", active);
      });
    }

    testimonialButtons.forEach(function (button, buttonIndex) {
      var active = buttonIndex === index;
      button.classList.toggle("is-active", active);
      if (active) button.setAttribute("aria-current", "true");
      else button.removeAttribute("aria-current");
    });
  }
  testimonialButtons.forEach(function (button, index) {
    button.addEventListener("click", function () { showTestimonial(index); });
  });

  var faqItems = Array.from(document.querySelectorAll(".faq-list details"));
  faqItems.forEach(function (details) {
    var summary = details.querySelector("summary");
    var content = details.querySelector("p");
    if (!summary || !content) return;
    summary.addEventListener("click", function (event) {
      var reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (!window.gsap || reducedMotion) return;
      event.preventDefault();
      window.gsap.killTweensOf(content);

      if (details.open) {
        window.gsap.to(content, {
          height: 0,
          autoAlpha: 0,
          paddingBottom: 0,
          overflow: "hidden",
          duration: 0.25,
          ease: "power2.inOut",
          onComplete: function () {
            details.open = false;
            window.gsap.set(content, { clearProps: "height,opacity,visibility,paddingBottom,overflow" });
          }
        });
      } else {
        details.open = true;
        window.gsap.fromTo(content, {
          height: 0,
          autoAlpha: 0,
          paddingBottom: 0,
          overflow: "hidden"
        }, {
          height: "auto",
          autoAlpha: 1,
          paddingBottom: "1.5rem",
          duration: 0.32,
          ease: "power2.out",
          clearProps: "height,opacity,visibility,paddingBottom,overflow"
        });
      }
    });
  });

  var formStatus = document.getElementById("form-status");
  if (formStatus && window.MutationObserver) {
    new MutationObserver(function () {
      if (!formStatus.textContent.trim()) return;
      if (window.gsap && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        window.gsap.fromTo(formStatus, {
          autoAlpha: 0,
          y: 8
        }, {
          autoAlpha: 1,
          y: 0,
          duration: 0.28,
          ease: "power2.out",
          clearProps: "transform,opacity,visibility"
        });
      }
    }).observe(formStatus, { childList: true });
  }

  document.addEventListener("DOMContentLoaded", function () {
    updatePageState();
  });
})();

// Keep the conversation shortcut clear of the footer and mobile keyboard.
(function () {
  var shortcut = document.querySelector('.whatsapp-button');
  var footer = document.querySelector('footer');
  if (!shortcut) return;
  var footerVisible = false;
  function updateShortcut() {
    var mobile = window.matchMedia('(max-width: 767px)').matches;
    var editing = document.activeElement && document.activeElement.matches('input, textarea, select, [contenteditable="true"]');
    shortcut.hidden = footerVisible || (mobile && editing);
    shortcut.dataset.cta = mobile ? 'mobile_sticky' : 'floating';
  }
  if (footer && 'IntersectionObserver' in window) {
    new IntersectionObserver(function (entries) {
      footerVisible = entries[0].isIntersecting;
      updateShortcut();
    }).observe(footer);
  }
  document.addEventListener('focusin', updateShortcut);
  document.addEventListener('focusout', function () { window.requestAnimationFrame(updateShortcut); });
  window.addEventListener('resize', updateShortcut);
  updateShortcut();
})();
