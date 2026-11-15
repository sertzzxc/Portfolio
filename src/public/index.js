document.addEventListener("DOMContentLoaded", () => {
  const phrases = [
    "A Developer.",
    "A Designer.",
    "An Athlete.",
    "The Problem Solver."
  ];

  const typedEl = document.getElementById("typed");
  const typingSpeed = 70;
  const backspaceSpeed = 45;
  const holdTime = 1200;
  let phraseIndex = 0;
  let charIndex = 0;
  let deleting = false;

  function typeLoop() {
    const current = phrases[phraseIndex];

    if (!deleting) {
      typedEl.textContent = current.slice(0, charIndex + 1);
      charIndex++;
      if (charIndex === current.length) {
        deleting = true;
        setTimeout(typeLoop, holdTime);
        return;
      }
      setTimeout(typeLoop, typingSpeed);
    } else {
      typedEl.textContent = current.slice(0, charIndex - 1);
      charIndex--;
      if (charIndex === 0) {
        deleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
      }
      setTimeout(typeLoop, backspaceSpeed);
    }
  }

  typeLoop(); // start loop

  let lastScrollY = window.scrollY;
  const root = document.documentElement;
  const scrollProgressBar = document.getElementById("scroll-progress");

  function updateAmbientBackground() {
    const maxScroll = root.scrollHeight - window.innerHeight;
    const progress = maxScroll > 0 ? Math.min(window.scrollY / maxScroll, 1) : 0;

    root.style.setProperty("--ambient-hue", 198 + progress * 24);
    root.style.setProperty("--ambient-x", `${18 + progress * 64}%`);
    root.style.setProperty("--ambient-y", `${24 + progress * 52}%`);
    root.style.setProperty("--scroll-progress", progress);
    scrollProgressBar.setAttribute("aria-valuenow", Math.round(progress * 100).toString());
  }

  updateAmbientBackground();
  window.addEventListener("resize", updateAmbientBackground);

  // Shrink navbar on scroll
  window.addEventListener("scroll", function() {
    const navbar = document.getElementById("navbar");
    if (window.scrollY > 70) { // start shrinking after 50px scroll
      navbar.classList.add("navbar-small");
    } else {
      navbar.classList.remove("navbar-small");
    }

    updateAmbientBackground();
  });


  const sections = document.querySelectorAll('.fade-section');
  const fadeThreshold = 0.1;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.intersectionRatio >= fadeThreshold) {
        entry.target.classList.add('active');
      } else {
        entry.target.classList.remove('active');
      }
    });
  }, { threshold: fadeThreshold });

  sections.forEach(section => observer.observe(section));
  
  
});
