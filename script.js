const root = document.documentElement;
const toggle = document.querySelector(".theme-toggle");
const themeMeta = document.querySelector('meta[name="theme-color"]');

function updateThemeControls() {
  const isDark = root.dataset.theme === "dark";
  toggle.setAttribute("aria-label", `Switch to ${isDark ? "light" : "dark"} theme`);
  themeMeta.setAttribute("content", isDark ? "#11100e" : "#f0eee5");
}

toggle.addEventListener("click", () => {
  root.dataset.theme = root.dataset.theme === "dark" ? "light" : "dark";
  localStorage.setItem("portfolio-theme", root.dataset.theme);
  updateThemeControls();
});

updateThemeControls();
document.querySelector("#year").textContent = new Date().getFullYear();
const designYear = document.querySelector("#design-year");
if (designYear) designYear.textContent = new Date().getFullYear();

const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
document.querySelectorAll("[data-gallery]").forEach((gallery) => {
  const slides = [...gallery.querySelectorAll(".design-slide")];
  const previous = gallery.querySelector(".gallery-prev");
  const next = gallery.querySelector(".gallery-next");
  const count = gallery.querySelector(".gallery-count");
  let current = 0;
  let autoplay;
  if (!slides.length) return;
  gallery.classList.toggle("has-one-slide", slides.length === 1);
  previous.disabled = next.disabled = slides.length === 1;
  const showSlide = (index) => {
    current = (index + slides.length) % slides.length;
    slides.forEach((slide, slideIndex) => {
      const active = slideIndex === current;
      slide.classList.toggle("is-active", active);
      slide.setAttribute("aria-hidden", String(!active));
    });
    count.textContent = `${current + 1} / ${slides.length}`;
  };
  const stopAutoplay = () => clearInterval(autoplay);
  const startAutoplay = () => {
    if (slides.length < 2 || reducedMotion) return;
    stopAutoplay();
    autoplay = setInterval(() => showSlide(current + 1), 1800);
  };
  previous.addEventListener("click", () => showSlide(current - 1));
  next.addEventListener("click", () => showSlide(current + 1));
  gallery.addEventListener("mouseenter", startAutoplay);
  gallery.addEventListener("mouseleave", stopAutoplay);
  gallery.addEventListener("focusin", stopAutoplay);
  showSlide(0);
});
const revealItems = document.querySelectorAll(".reveal");

if (reducedMotion || !("IntersectionObserver" in window)) {
  revealItems.forEach((item) => item.classList.add("visible"));
} else {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  revealItems.forEach((item) => observer.observe(item));
}
