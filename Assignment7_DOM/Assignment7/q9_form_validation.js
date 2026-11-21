const signupForm = document.getElementById("signupForm");
const successMessage = document.getElementById("successMessage");

// Each field has its input, its error paragraph and a rule.
// A rule returns an error text, or "" when the value is valid.
const fields = [
  {
    input: document.getElementById("nameInput"),
    error: document.getElementById("nameError"),
    validate: function (value) {
      return value.trim() === "" ? "Name is required." : "";
    }
  },
  {
    input: document.getElementById("emailInput"),
    error: document.getElementById("emailError"),
    validate: function (value) {
      if (value.trim() === "") return "Email is required.";
      if (!value.includes("@")) return "Email must contain @.";
      return "";
    }
  },
  {
    input: document.getElementById("passwordInput"),
    error: document.getElementById("passwordError"),
    validate: function (value) {
      return value.length < 6 ? "Password must be at least 6 characters." : "";
    }
  }
];

// Validate one field, show or clear its error, and report whether it is valid
function checkField(field) {
  const message = field.validate(field.input.value);

  field.error.textContent = message;
  field.input.classList.toggle("invalid", message !== "");

  return message === "";
}

// On submit: always block the real submission, then validate every field
signupForm.addEventListener("submit", function (event) {
  event.preventDefault();
  successMessage.textContent = "";

  // Check all fields (no early exit) so every error is displayed together
  let allValid = true;
  fields.forEach(function (field) {
    if (!checkField(field)) allValid = false;
  });

  if (allValid) {
    successMessage.textContent = "Form Submitted Successfully";
    signupForm.reset();
  }
});

// Live errors: while typing, re-check the field so its error vanishes once fixed.
// Only fields that already show an error are re-checked, so untouched fields stay clean.
fields.forEach(function (field) {
  field.input.addEventListener("input", function () {
    if (field.error.textContent !== "") {
      checkField(field);
    }
  });
});
