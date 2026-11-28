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

  const reflectionToggles = document.querySelectorAll("#skills .timeline-prompt-button");
  const reflectionsToggle = document.getElementById("timeline-reflections-toggle");

  const setReflectionState = (reflectionToggle, showReflection) => {
    const contentId = reflectionToggle.getAttribute("aria-controls");
    const cardContent = contentId ? document.getElementById(contentId) : null;
    const overview = cardContent && cardContent.querySelector(".timeline-overview");
    const reflection = cardContent && cardContent.querySelector(".timeline-reflection");
    const timelineItem = reflectionToggle.closest(".timeline-item");

    if (!overview || !reflection) return;

    const outgoingPanel = showReflection ? overview : reflection;
    const incomingPanel = showReflection ? reflection : overview;
    outgoingPanel.hidden = true;
    incomingPanel.hidden = false;
    incomingPanel.addEventListener("animationend", () => {
      incomingPanel.classList.remove("is-entering");
    }, { once: true });
    incomingPanel.classList.add("is-entering");

    reflectionToggle.setAttribute("aria-expanded", String(showReflection));
    reflectionToggle.textContent = showReflection
      ? "Back to overview"
      : reflectionToggle.dataset.prompt;

    if (timelineItem) {
      timelineItem.classList.toggle("reflection-open", showReflection);
    }
  };

  const syncReflectionsToggle = () => {
    if (!reflectionsToggle) return;
    const allReflectionsOpen = Array.from(reflectionToggles)
      .every((toggle) => toggle.getAttribute("aria-expanded") === "true");
    reflectionsToggle.setAttribute("aria-expanded", String(allReflectionsOpen));
    reflectionsToggle.querySelector("span").textContent = allReflectionsOpen
      ? "Show all overviews"
      : "Click this to reveal some of the personal reflections I've had over the years";
  };

  reflectionToggles.forEach((reflectionToggle) => {
    reflectionToggle.addEventListener("click", () => {
      const showReflection = reflectionToggle.getAttribute("aria-expanded") !== "true";
      setReflectionState(reflectionToggle, showReflection);
      syncReflectionsToggle();
      updateTimelineProgress();
    });
  });

  if (reflectionsToggle) {
    reflectionsToggle.addEventListener("click", () => {
      const allReflectionsOpen = Array.from(reflectionToggles)
        .every((toggle) => toggle.getAttribute("aria-expanded") === "true");
      const showReflection = !allReflectionsOpen;

      reflectionToggles.forEach((toggle) => {
        setReflectionState(toggle, showReflection);
      });

      syncReflectionsToggle();
      updateTimelineProgress();
    });
  }

  let lastScrollY = window.scrollY;
  const root = document.documentElement;
  const scrollProgressBar = document.getElementById("scroll-progress");
  const timeline = document.querySelector("#skills .timeline");
  const timelineDots = timeline ? Array.from(timeline.querySelectorAll(".timeline-dot")) : [];

  function updateAmbientBackground() {
    const maxScroll = root.scrollHeight - window.innerHeight;
    const progress = maxScroll > 0 ? Math.min(window.scrollY / maxScroll, 1) : 0;

    root.style.setProperty("--ambient-hue", 198 + progress * 24);
    root.style.setProperty("--ambient-x", `${18 + progress * 64}%`);
    root.style.setProperty("--ambient-y", `${24 + progress * 52}%`);
    root.style.setProperty("--scroll-progress", progress);
    scrollProgressBar.setAttribute("aria-valuenow", Math.round(progress * 100).toString());
  }

  function updateTimelineProgress() {
    if (!timeline) {
      return;
    }

    const timelineBounds = timeline.getBoundingClientRect();
    const progress = Math.max(
      0,
      Math.min(1, (window.innerHeight * 0.55 - timelineBounds.top) / timelineBounds.height)
    );

    timeline.style.setProperty("--timeline-progress", progress.toString());

    const progressLinePosition = timelineBounds.top + timelineBounds.height * progress;
    timelineDots.forEach((dot) => {
      const dotBounds = dot.getBoundingClientRect();
      const dotCenter = dotBounds.top + dotBounds.height / 2;
      dot.classList.toggle("is-passed", dotCenter <= progressLinePosition);
    });
  }

  updateAmbientBackground();
  updateTimelineProgress();
  window.addEventListener("resize", () => {
    updateAmbientBackground();
    updateTimelineProgress();
  });

  // Shrink navbar on scroll
  window.addEventListener("scroll", function() {
    const navbar = document.getElementById("navbar");
    if (window.scrollY > 70) { // start shrinking after 50px scroll
      navbar.classList.add("navbar-small");
    } else {
      navbar.classList.remove("navbar-small");
    }

    updateAmbientBackground();
    updateTimelineProgress();
  }, { passive: true });


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
