const themeStorageKey = "portfolio-theme";
const rootElement = document.documentElement;
const savedTheme = window.localStorage.getItem(themeStorageKey);
rootElement.dataset.theme = savedTheme === "light" ? "light" : "dark";

document.addEventListener("DOMContentLoaded", () => {
  const themeToggle = document.getElementById("theme-toggle");
  if (!themeToggle) {
    return;
  }

  function applyTheme(theme) {
    const isLight = theme === "light";
    rootElement.dataset.theme = isLight ? "light" : "dark";
    themeToggle.setAttribute("aria-pressed", String(isLight));
    themeToggle.setAttribute("aria-label", `Switch to ${isLight ? "dark" : "light"} mode`);
    themeToggle.title = `Switch to ${isLight ? "dark" : "light"} mode`;
    window.localStorage.setItem(themeStorageKey, rootElement.dataset.theme);
  }

  applyTheme(rootElement.dataset.theme);
  themeToggle.addEventListener("click", () => {
    applyTheme(rootElement.dataset.theme === "light" ? "dark" : "light");
  });
});
