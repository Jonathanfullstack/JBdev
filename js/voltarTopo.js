document.addEventListener("DOMContentLoaded", function () {
  var button = document.getElementById("backToTop");
  if (!button) return;
  button.addEventListener("click", function () {
    window.scrollTo({
      top: 0,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth"
    });
  });
});
