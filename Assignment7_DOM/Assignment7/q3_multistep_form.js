const steps = document.querySelectorAll(".step");
const stepIndicator = document.getElementById("stepIndicator");
const errorMessage = document.getElementById("errorMessage");
const backBtn = document.getElementById("backBtn");
const nextBtn = document.getElementById("nextBtn");
const formArea = document.getElementById("formArea");
const summary = document.getElementById("summary");

const nameInput = document.getElementById("nameInput");
const emailInput = document.getElementById("emailInput");
const passwordInput = document.getElementById("passwordInput");

let currentStep = 0; // index of the step being shown (0, 1 or 2)

// One validator per step. Each returns an error text, or "" when the value is valid.
const validators = [
  function validateName() {
    return nameInput.value.trim().length >= 2
      ? ""
      : "Please enter a name with at least 2 characters.";
  },
  function validateEmail() {
    // Simple email pattern: something@something.something
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(emailInput.value.trim())
      ? ""
      : "Please enter a valid email address.";
  },
  function validatePassword() {
    return passwordInput.value.length >= 6
      ? ""
      : "Password must be at least 6 characters.";
  }
];

// Show only the current step and update the buttons/labels
function showStep() {
  steps.forEach(function (step, index) {
    step.classList.toggle("hidden", index !== currentStep);
  });

  stepIndicator.textContent = "Step " + (currentStep + 1) + " of " + steps.length;
  backBtn.disabled = currentStep === 0;
  nextBtn.textContent = currentStep === steps.length - 1 ? "Finish" : "Next";
  errorMessage.textContent = "";
}

// Replace the form with a summary of everything the user entered
function showSummary() {
  formArea.classList.add("hidden");
  stepIndicator.textContent = "All steps complete";

  summary.classList.remove("hidden");
  summary.innerHTML =
    "<h2>Summary</h2>" +
    "<p><strong>Name:</strong> " + escapeHtml(nameInput.value.trim()) + "</p>" +
    "<p><strong>Email:</strong> " + escapeHtml(emailInput.value.trim()) + "</p>" +
    "<p><strong>Password:</strong> " + "*".repeat(passwordInput.value.length) + "</p>";
}

// Prevent user text from being treated as HTML when shown in the summary
function escapeHtml(text) {
  const holder = document.createElement("div");
  holder.textContent = text;
  return holder.innerHTML;
}

nextBtn.addEventListener("click", function () {
  // Run the validator that belongs to the current step
  const problem = validators[currentStep]();

  if (problem !== "") {
    errorMessage.textContent = problem; // stay on this step
    return;
  }

  if (currentStep === steps.length - 1) {
    showSummary();
  } else {
    currentStep++;
    showStep();
  }
});

backBtn.addEventListener("click", function () {
  if (currentStep > 0) {
    currentStep--;
    showStep();
  }
});

showStep();
