const textInput = document.getElementById("textInput");
const counter = document.getElementById("counter");
const resetBtn = document.getElementById("resetBtn");

const MAX_CHARACTERS = 100;
const WARNING_LIMIT = 20; // counter turns yellow at this many characters left

// Recalculate the remaining characters and update the counter colour
function updateCounter() {
  const remaining = MAX_CHARACTERS - textInput.value.length;
  counter.textContent = remaining;

  // Remove old colour classes, then add the one that matches the situation
  counter.classList.remove("warning", "danger");
  if (remaining <= 0) {
    counter.classList.add("danger");
  } else if (remaining <= WARNING_LIMIT) {
    counter.classList.add("warning");
  }
}

// Stop typing once the limit is reached
textInput.addEventListener("keydown", function (event) {
  const limitReached = textInput.value.length >= MAX_CHARACTERS;
  const hasSelection = textInput.selectionStart !== textInput.selectionEnd;

  // A printable key has a one-character name (e.g. "a", "5", " ").
  // Ctrl/Cmd shortcuts and keys like Backspace or arrows are still allowed.
  const isPrintableKey =
    event.key.length === 1 && !event.ctrlKey && !event.metaKey;

  // Typing over a selected piece of text does not add length, so allow it
  if (limitReached && isPrintableKey && !hasSelection) {
    event.preventDefault();
  }
});

// The input event also catches pasted text, which keydown cannot stop
textInput.addEventListener("input", function () {
  if (textInput.value.length > MAX_CHARACTERS) {
    textInput.value = textInput.value.slice(0, MAX_CHARACTERS);
  }
  updateCounter();
});

// Reset clears the text area and restores the counter
resetBtn.addEventListener("click", function () {
  textInput.value = "";
  updateCounter();
  textInput.focus();
});

updateCounter();
