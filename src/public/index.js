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

  // Shrink navbar on scroll
  window.addEventListener("scroll", function() {
    const navbar = document.getElementById("navbar");
    if (window.scrollY > 70) { // start shrinking after 50px scroll
      navbar.classList.add("navbar-small");
    } else {
      navbar.classList.remove("navbar-small");
    }
  });


  const sections = document.querySelectorAll('.fade-section');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
      } else {
        entry.target.classList.remove('active'); // remove for fade-out
      }
    });
  }, { threshold: 0.1 }); // trigger when 20% of the section is visible

  sections.forEach(section => observer.observe(section));
  
  
});
