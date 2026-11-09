document.addEventListener("DOMContentLoaded", () => {
  const projectGrid = document.getElementById("project-grid");
  const dialog = document.getElementById("project-dialog");
  const closeButton = document.getElementById("project-dialog-close");
  const coverContainer = document.getElementById("project-dialog-cover");
  const caption = document.getElementById("project-dialog-caption");
  const approachSection = document.getElementById("project-dialog-approach-section");
  const skillsContainer = document.getElementById("project-dialog-skills");

  function createImage(project, className) {
    if (!project.image) {
      const placeholder = document.createElement("div");
      placeholder.className = className === "project-image"
        ? "project-image-placeholder"
        : "project-dialog-image-placeholder";
      placeholder.textContent = "Add a project image";
      placeholder.setAttribute("role", "img");
      placeholder.setAttribute("aria-label", `Image placeholder for ${project.title}`);
      return placeholder;
    }

    const image = document.createElement("img");
    image.className = className;
    image.src = project.image;
    image.alt = project.imageAlt || `${project.title} project`;
    return image;
  }

  function createProjectCard(project) {
    const card = document.createElement("button");
    card.className = "project-card";
    card.type = "button";
    card.dataset.project = project.id;
    card.dataset.skills = project.skills.join("|");
    card.setAttribute("aria-haspopup", "dialog");
    card.setAttribute("aria-label", `Open details for ${project.title}`);
    card.append(createImage(project, "project-image"));

    const body = document.createElement("div");
    body.className = "project-card-body";

    const title = document.createElement("h3");
    title.textContent = project.title;
    body.append(title);

    const summary = document.createElement("p");
    summary.textContent = project.summary;
    body.append(summary);

    const tags = document.createElement("div");
    tags.className = "project-tags";
    tags.setAttribute("aria-label", "Skills used");
    project.skills.forEach((skill) => {
      const tag = document.createElement("span");
      tag.className = "project-tag";
      tag.textContent = skill;
      tags.append(tag);
    });

    body.append(tags);
    card.append(body);
    card.addEventListener("click", () => openProjectDialog(project));
    return card;
  }

  function openProjectDialog(project) {
    document.getElementById("project-dialog-category").textContent = project.category || "";
    document.getElementById("project-dialog-title").textContent = project.title;
    document.getElementById("project-dialog-summary").textContent = project.summary;
    document.getElementById("project-dialog-overview").textContent = project.overview || "";
    document.getElementById("project-dialog-approach").textContent = project.approach || "";
    approachSection.hidden = !project.approach;

    coverContainer.replaceChildren(createImage(project, "project-dialog-image"));
    caption.textContent = project.caption || "";
    caption.hidden = !project.image || !project.caption;

    skillsContainer.replaceChildren();
    project.skills.forEach((skill) => {
      const tag = document.createElement("span");
      tag.className = "project-dialog-tag";
      tag.textContent = skill;
      skillsContainer.append(tag);
    });

    dialog.showModal();
    closeButton.focus();
  }

  async function loadProjects() {
    const response = await fetch("./projects.json");
    if (!response.ok) {
      throw new Error(`Could not load projects.json (HTTP ${response.status}).`);
    }

    const projects = await response.json();
    if (!Array.isArray(projects)) {
      throw new Error("projects.json must contain an array of projects.");
    }

    projects.forEach((project, index) => {
      if (!project.id || !project.title || !project.summary || !Array.isArray(project.skills)) {
        throw new Error(`Project at index ${index} is missing a required field.`);
      }
      projectGrid.append(createProjectCard(project));
    });

    document.dispatchEvent(new Event("projects:loaded"));
  }

  closeButton.addEventListener("click", () => dialog.close());
  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) {
      dialog.close();
    }
  });

  loadProjects().catch((error) => {
    console.error("Unable to load portfolio projects.", error);
    const message = document.createElement("p");
    message.className = "projects-empty";
    message.setAttribute("role", "alert");
    message.textContent = "Projects couldn’t be loaded. Please refresh the page and try again.";
    projectGrid.replaceChildren(message);
  });
});
