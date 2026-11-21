const themeButtons = document.querySelectorAll("[data-theme-choice]");
const themeLabel = document.getElementById("themeLabel");

// Apply a theme using setAttribute only (no classList / style shortcuts)
function applyTheme(themeName) {
  // The class (theme-light / theme-dark / theme-blue) triggers the CSS rules
  document.body.setAttribute("class", "theme-" + themeName);

  // The custom attribute stores the active theme, e.g. data-theme="dark"
  document.body.setAttribute("data-theme", themeName);

  themeLabel.textContent = document.body.getAttribute("data-theme");
}

themeButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    applyTheme(button.getAttribute("data-theme-choice"));
  });
});

// Start with the light theme
applyTheme("light");
