document.addEventListener("DOMContentLoaded", () => {
  const treeToggle = document.getElementById("tree-toggle");
  const treeContent = document.getElementById("skill-tree-content");
  const projectSection = document.getElementById("projects-section");
  const projectGrid = document.getElementById("project-grid");
  const skillNodes = document.querySelectorAll(".skill-node");
  const projectResultsCount = document.getElementById("project-results-count");
  const projectResultsStatus = document.getElementById("project-results-status");
  const clearSkillFilters = document.getElementById("clear-skill-filters");
  const projectsEmpty = document.getElementById("projects-empty");
  const navbar = document.getElementById("navbar");

  treeToggle.addEventListener("click", () => {
    const isExpanded = treeToggle.getAttribute("aria-expanded") === "true";
    treeToggle.setAttribute("aria-expanded", String(!isExpanded));
    treeContent.classList.toggle("is-collapsed", isExpanded);
    treeContent.inert = isExpanded;
    projectSection.inert = isExpanded;
    treeContent.setAttribute("aria-hidden", String(isExpanded));
  });

  document.querySelectorAll(".branch-toggle").forEach((toggle) => {
    toggle.addEventListener("click", () => {
      const isExpanded = toggle.getAttribute("aria-expanded") === "true";
      const branchSkills = document.getElementById(toggle.getAttribute("aria-controls"));

      toggle.setAttribute("aria-expanded", String(!isExpanded));
      branchSkills.hidden = isExpanded;
    });
  });

  skillNodes.forEach((node) => {
    node.setAttribute("aria-pressed", "false");
    node.addEventListener("click", () => {
      const isSelected = node.getAttribute("aria-pressed") === "true";
      node.setAttribute("aria-pressed", String(!isSelected));
      updateProjectFilters();
    });
  });

  clearSkillFilters.addEventListener("click", () => {
    skillNodes.forEach((node) => node.setAttribute("aria-pressed", "false"));
    updateProjectFilters();
  });

  document.addEventListener("projects:loaded", updateProjectFilters);

  function updateProjectFilters() {
    const selectedSkills = Array.from(skillNodes)
      .filter((node) => node.getAttribute("aria-pressed") === "true")
      .map((node) => node.dataset.skill);

    let visibleProjects = 0;
    projectGrid.querySelectorAll(".project-card").forEach((card) => {
      const projectSkills = card.dataset.skills.split("|");
      const matches = selectedSkills.length === 0 || selectedSkills.some((skill) => projectSkills.includes(skill));

      if (matches) {
        if (card.hidden) {
          card.hidden = false;
          card.classList.add("is-entering");
          requestAnimationFrame(() => card.classList.remove("is-entering"));
        }
        card.classList.remove("is-leaving");
        visibleProjects++;
      } else if (!card.hidden) {
        card.classList.remove("is-entering");
        card.classList.add("is-leaving");

        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
          card.hidden = true;
          card.classList.remove("is-leaving");
        } else {
          window.setTimeout(() => {
            if (card.classList.contains("is-leaving")) {
              card.hidden = true;
              card.classList.remove("is-leaving");
            }
          }, 280);
        }
      }
    });

    projectsEmpty.hidden = visibleProjects !== 0;
    clearSkillFilters.hidden = selectedSkills.length === 0;
    projectResultsCount.textContent = selectedSkills.length
      ? `${visibleProjects} ${visibleProjects === 1 ? "project" : "projects"}`
      : `All ${visibleProjects} projects`;
    projectResultsStatus.textContent = selectedSkills.length
      ? `Showing projects that use any selected skill: ${selectedSkills.join(", ")}.`
      : "Select one or more skills to show projects that use any selected skill.";
  }

  window.addEventListener("scroll", () => {
    navbar.classList.toggle("navbar-small", window.scrollY > 70);
  });
});
