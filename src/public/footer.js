document.addEventListener("DOMContentLoaded", () => {
  const footer = document.querySelector(".site-footer");
  if (!footer || !("IntersectionObserver" in window)) {
    return;
  }

  document.documentElement.classList.add("footer-reveal-enabled");

  const observer = new IntersectionObserver((entries, currentObserver) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        currentObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  observer.observe(footer);
});
