document.addEventListener("DOMContentLoaded", function () {
  var button = document.getElementById("backToTop");
  if (!button) return;
  button.addEventListener("click", function () {
    if (window.JBLenis) {
      window.JBLenis.scrollTo(0, {
        duration: 0.9,
        force: true
      });
      return;
    }
    window.scrollTo({
      top: 0,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth"
    });
  });
});
