(function () {
  var toggle = document.getElementById("color-toggle");
  var icon = document.getElementById("theme-icon");
  var headerLogo = document.getElementById("header-logo-img");
  var metaTheme = document.querySelector('meta[name="theme-color"]');

  function preferredTheme() {
    var stored = localStorage.getItem("colorMode");
    if (stored === "dark" || stored === "light") return stored;
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }

  function applyTheme(theme, persist) {
    var isDark = theme === "dark";
    document.body.classList.toggle("dark-mode", isDark);
    if (headerLogo) headerLogo.src = isDark ? "assents/img/logo-escura.png" : "assents/img/logo.png";
    if (metaTheme) metaTheme.content = isDark ? "#0b1020" : "#493eda";
    if (toggle) {
      toggle.setAttribute("aria-pressed", String(isDark));
      toggle.setAttribute("aria-label", isDark ? "Ativar tema claro" : "Ativar tema escuro");
    }
    if (icon) icon.className = isDark ? "fas fa-sun" : "fas fa-moon";
    if (persist) localStorage.setItem("colorMode", theme);
  }

  applyTheme(preferredTheme(), false);
  if (toggle) {
    toggle.addEventListener("click", function () {
      applyTheme(document.body.classList.contains("dark-mode") ? "light" : "dark", true);
    });
  }
})();
