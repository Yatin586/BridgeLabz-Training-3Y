const dropdown = document.getElementById("dropdown");
const dropdownBtn = document.getElementById("dropdownBtn");
const dropdownList = document.getElementById("dropdownList");

// Button click shows or hides the list of options
dropdownBtn.addEventListener("click", function () {
  dropdownList.classList.toggle("hidden");
});

// Clicking an option copies its text to the button and closes the list
dropdownList.addEventListener("click", function (event) {
  if (event.target.tagName === "LI") {
    dropdownBtn.textContent = event.target.textContent;
    dropdownList.classList.add("hidden");
  }
});

// Close the dropdown when the user clicks anywhere outside it.
// The third argument "true" registers the listener for the CAPTURING phase,
// so this runs before any other click handler on the way down to the target.
document.addEventListener(
  "click",
  function (event) {
    if (!dropdown.contains(event.target)) {
      dropdownList.classList.add("hidden");
    }
  },
  true
);
