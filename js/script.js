(function () {
  var header = document.getElementById("site-header");
  var menu = document.getElementById("primary-menu");
  var menuButton = document.querySelector(".menu-btn");
  var backToTop = document.getElementById("backToTop");
  var menuLinks = menu ? Array.from(menu.querySelectorAll('a[href^="#"]')) : [];
  var lastFocusedElement = null;
  var menuFocusTimer = null;
  var scrollFrame = null;

  function isMenuOpen() {
    return Boolean(menu && menu.classList.contains("show"));
  }

  function getFocusableMenuItems() {
    if (!menu) return [];
    return Array.from(menu.querySelectorAll("a[href], button:not([disabled])"));
  }

  function openMenu() {
    if (!menu || !menuButton) return;
    lastFocusedElement = document.activeElement;
    menu.classList.add("show");
    menuButton.classList.add("open");
    menuButton.setAttribute("aria-expanded", "true");
    menuButton.setAttribute("aria-label", "Fechar menu");
    document.body.classList.add("menu-open");
    var firstItem = getFocusableMenuItems()[0];
    if (firstItem) {
      clearTimeout(menuFocusTimer);
      menuFocusTimer = window.setTimeout(function () {
        if (isMenuOpen()) firstItem.focus();
      }, 240);
    }
  }

  function closeMenu(options) {
    if (!menu || !menuButton) return;
    menu.classList.remove("show");
    menuButton.classList.remove("open");
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute("aria-label", "Abrir menu");
    document.body.classList.remove("menu-open");
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
      var first = focusable[0];
      var last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === menuButton) {
        event.preventDefault();
        last.focus();
      } else if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        menuButton.focus();
      } else if (!event.shiftKey && document.activeElement === menuButton) {
        event.preventDefault();
        first.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        menuButton.focus();
      }
    });
  }

  menuLinks.forEach(function (link) {
    link.addEventListener("click", function () {
      if (isMenuOpen()) closeMenu({ restoreFocus: false });
    });
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
    if (window.innerWidth > 1024 && isMenuOpen()) closeMenu({ restoreFocus: false });
    updatePageState();
  });

  var testimonials = Array.from(document.querySelectorAll(".testimonial"));
  var testimonialButtons = Array.from(document.querySelectorAll(".testimonial-navigation button"));
  function showTestimonial(index) {
    testimonials.forEach(function (item, itemIndex) {
      var active = itemIndex === index;
      item.hidden = !active;
      item.classList.toggle("is-active", active);
    });
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

  document.addEventListener("DOMContentLoaded", function () {
    updatePageState();
  });
})();
