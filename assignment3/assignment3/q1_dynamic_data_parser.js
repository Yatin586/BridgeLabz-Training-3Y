"use strict";
// Q1 - Dynamic Data Parser

const apiData = ["25", "true", "false", "NaN", " ", "100px", "3.14", null, undefined];

const validNumbers = [];   // values that are usable numbers
const invalidEntries = []; // values that must be skipped (logged separately)

// Decide if a raw value can be treated as a valid number.
// Number(" ") is 0 and Number(null) is 0, which would silently pass as "valid",
// so blank strings and null/undefined are rejected explicitly.
function isValidNumeric(value) {
  if (value === null || value === undefined) return false;
  if (String(value).trim() === "") return false;
  return Number.isFinite(Number(value)); // NaN, "100px", "true" -> false
}

console.log("===== Conversion Report =====");
for (let i = 0; i < apiData.length; i++) {
  const raw = apiData[i];

  // Step 1: convert each value to Number, Boolean and String forms
  const asNumber = Number(raw);
  const asBoolean = Boolean(raw); // note: Boolean("false") is true (non-empty string)
  const asString = String(raw);

  console.log(
    `[${i}] raw=${JSON.stringify(raw)} | Number=${asNumber} | Boolean=${asBoolean} | String="${asString}"`
  );

  // Steps 2 & 3: separate valid and invalid values
  if (isValidNumeric(raw)) {
    validNumbers.push(asNumber);
  } else {
    invalidEntries.push({ index: i, value: raw });
  }
}

// Step 4: detailed report with conditional formatting
console.log("\n===== Valid Numeric Data =====");
for (const num of validNumbers) {
  const label = Number.isInteger(num) ? "integer" : "decimal";
  console.log(`  OK   ${num} (${label})`);
}
console.log("Valid array  :", validNumbers);

console.log("\n===== Invalid / Skipped Data =====");
for (const entry of invalidEntries) {
  let reason;
  if (entry.value === null) reason = "null (missing value)";
  else if (entry.value === undefined) reason = "undefined (missing value)";
  else if (String(entry.value).trim() === "") reason = "blank string";
  else reason = "not convertible to a finite number";
  console.log(`  SKIP index ${entry.index}: ${JSON.stringify(entry.value)} -> ${reason}`);
}
console.log("Invalid array:", invalidEntries.map(e => e.value));
console.log(`\nSummary: ${validNumbers.length} valid, ${invalidEntries.length} invalid`);
