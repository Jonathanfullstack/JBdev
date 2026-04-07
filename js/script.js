const header = document.querySelector("header");
const headerMenu = document.querySelector(".header__menu");
const menuBtn = document.querySelector(".menu-btn");
const headerMenuItems = headerMenu ? headerMenu.querySelectorAll("li a") : [];

/** Posições em Y das seções — atualizado no resize, não a cada scroll */
let sectionMetrics = [];
let lastActiveNavIndex = -1;

function refreshSectionMetrics() {
  lastActiveNavIndex = -1;
  sectionMetrics = [];
  headerMenuItems.forEach((link) => {
    const sel = link.getAttribute("href");
    if (!sel || sel.charAt(0) !== "#") return;
    const el = document.querySelector(sel);
    if (el) {
      sectionMetrics.push({
        link,
        top: el.getBoundingClientRect().top + window.scrollY,
      });
    }
  });
}

function changeActiveLink() {
  if (!header || !sectionMetrics.length) return;

  const scrollY = window.scrollY;
  const headerH = header.offsetHeight;
  let maxSectionIndex = -1;
  let maxSectionOffset = Number.NEGATIVE_INFINITY;

  sectionMetrics.forEach((s, index) => {
    if (scrollY >= s.top - headerH) {
      if (s.top > maxSectionOffset) {
        maxSectionOffset = s.top;
        maxSectionIndex = index;
      }
    }
  });

  if (maxSectionIndex >= 0 && maxSectionIndex !== lastActiveNavIndex) {
    headerMenuItems.forEach((link) => link.classList.remove("active"));
    if (sectionMetrics[maxSectionIndex]) {
      sectionMetrics[maxSectionIndex].link.classList.add("active");
      lastActiveNavIndex = maxSectionIndex;
    }
  }
}

let scrollRaf = false;
let headerWasSticky = null;

function onScrollFrame() {
  scrollRaf = false;
  const y = window.scrollY;
  const sticky = y > 0;

  if (header && sticky !== headerWasSticky) {
    header.classList.toggle("sticky", sticky);
    headerWasSticky = sticky;
  }

  changeActiveLink();

  const backToTop = document.getElementById("backToTop");
  if (backToTop) {
    backToTop.style.display = y > 300 ? "flex" : "none";
  }
}

window.addEventListener(
  "scroll",
  () => {
    if (!scrollRaf) {
      scrollRaf = true;
      requestAnimationFrame(onScrollFrame);
    }
  },
  { passive: true }
);

let resizeTimer;
window.addEventListener("resize", () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    refreshSectionMetrics();
    onScrollFrame();
  }, 120);
});

if (menuBtn && headerMenu) {
  menuBtn.addEventListener("click", () => {
    headerMenu.classList.toggle("show");
    menuBtn.classList.toggle("open");
  });
}

headerMenuItems.forEach((item) => {
  item.addEventListener("click", () => {
    if (headerMenu) headerMenu.classList.remove("show");
    if (menuBtn) menuBtn.classList.remove("open");
  });
});

document.addEventListener("DOMContentLoaded", () => {
  headerWasSticky = header ? header.classList.contains("sticky") : null;
  refreshSectionMetrics();
  onScrollFrame();
});
