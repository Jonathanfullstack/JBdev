function toggleDarkMode() {
  document.body.classList.toggle("dark-mode");
  const isDark = document.body.classList.contains("dark-mode");
  localStorage.setItem("colorMode", isDark ? "dark" : "light");
  setLogoBasedOnMode(isDark ? "dark" : "light");
  setThemeColorMeta(isDark);
}

function setLogoBasedOnMode(currentMode) {
  const headerLogoImg = document.getElementById("header-logo-img");
  const footerLogoImg = document.getElementById("footer-logo-img");

  const logoLight = "assents/img/logo.png";
  const logoDark = "assents/img/logo-escura.png";
  const src = currentMode === "dark" ? logoDark : logoLight;

  if (headerLogoImg) headerLogoImg.src = src;
  if (footerLogoImg) footerLogoImg.src = src;
}

function setThemeColorMeta(isDark) {
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.setAttribute("content", isDark ? "#111111" : "#493eda");
}

function applyStoredTheme() {
  const stored = localStorage.getItem("colorMode");
  if (stored === "dark") {
    document.body.classList.add("dark-mode");
    setLogoBasedOnMode("dark");
    setThemeColorMeta(true);
  } else {
    document.body.classList.remove("dark-mode");
    setLogoBasedOnMode("light");
    setThemeColorMeta(false);
  }
}

const colorToggle = document.getElementById("color-toggle");
if (colorToggle) {
  colorToggle.addEventListener("click", toggleDarkMode);
}

applyStoredTheme();
