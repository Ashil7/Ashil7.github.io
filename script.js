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
