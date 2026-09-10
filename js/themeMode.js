(function () {
  var toggle = document.getElementById("color-toggle");
  var icon = document.getElementById("theme-icon");
  var headerLogo = document.getElementById("header-logo-img");
  var themedLogos = document.querySelectorAll("[data-theme-logo]");
  var metaTheme = document.querySelector('meta[name="theme-color"]');

  function preferredTheme() {
    var stored;
    try { stored = localStorage.getItem("colorMode"); } catch (error) {}
    if (stored === "dark" || stored === "light") return stored;
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }

  function applyTheme(theme, persist) {
    var isDark = theme === "dark";
    document.body.classList.toggle("dark-mode", isDark);
    var logoSrc = isDark ? "assents/img/logo-escura.png" : "assents/img/logo.png";
    if (headerLogo) headerLogo.src = logoSrc;
    themedLogos.forEach(function (logo) { logo.src = logoSrc; });
    if (metaTheme) metaTheme.content = isDark ? "#0b1020" : "#f6f8fc";
    if (toggle) {
      toggle.setAttribute("aria-pressed", String(isDark));
      toggle.setAttribute("aria-label", window.JBI18N ? window.JBI18N.t(isDark ? "lightTheme" : "darkTheme") : (isDark ? "Ativar tema claro" : "Ativar tema escuro"));
    }
    if (icon) icon.className = isDark ? "fas fa-sun" : "fas fa-moon";
    if (persist) { try { localStorage.setItem("colorMode", theme); } catch (error) {} }
    window.dispatchEvent(new CustomEvent("jbdev:themechange", { detail: { theme: theme } }));
  }

  applyTheme(preferredTheme(), false);
  if (toggle) {
    toggle.addEventListener("click", function () {
      applyTheme(document.body.classList.contains("dark-mode") ? "light" : "dark", true);
    });
  }
  window.addEventListener("jbdev:languagechange", function () { applyTheme(document.body.classList.contains("dark-mode") ? "dark" : "light", false); });
})();
