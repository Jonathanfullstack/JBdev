document.addEventListener("DOMContentLoaded", function () {
  var backToTopButton = document.getElementById("backToTop");
  if (!backToTopButton) return;

  backToTopButton.addEventListener("click", function () {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
});
