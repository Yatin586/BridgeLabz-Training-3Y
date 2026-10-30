"use strict";
// Q9 - JSON Audit

const rawData = [
  '{"user":"Alex","age":25}',
  '{"id":2}',
  '{invalid}',
  '{"user":"Mina","age":"22"}'
];

const cleanData = [];
const errorLog = [];
const requiredKeys = ["user", "age"];

for (let i = 0; i < rawData.length; i++) {
  const lineNumber = i + 1; // human friendly line numbers start at 1

  // DEBUGGING: breakpoint here. Step with F10. For line 3 JSON.parse throws and
  // control jumps straight to catch, skipping the rest of the try block.
  try {
    const parsed = JSON.parse(rawData[i]);

    // Detect missing keys
    const missing = requiredKeys.filter(key => !(key in parsed));
    if (missing.length > 0) {
      throw new Error(`Missing key(s): ${missing.join(", ")}`);
    }

    cleanData.push(parsed); // only reached when parse and key checks pass
  } catch (error) {
    const kind = error instanceof SyntaxError ? "Invalid JSON" : "Validation error";
    errorLog.push(`Line ${lineNumber}: ${kind} - ${error.message}`);
  }
}

console.log("===== Valid entries =====");
console.log(cleanData);

console.log("\n===== Error log =====");
errorLog.forEach(entry => console.log(entry));

// BONUS: convert age to Number and filter out users under 18
const adults = cleanData
  .map(entry => ({ ...entry, age: Number(entry.age) }))
  .filter(entry => entry.age >= 18);

console.log("\n===== Bonus: ages converted, under-18 removed =====");
console.log(adults);
console.log(`Total: ${rawData.length}, valid: ${cleanData.length}, errors: ${errorLog.length}, adults: ${adults.length}`);

// Extra check for the under-18 filter (the given data has no minors)
const testUsers = [{ user: "Tim", age: "15" }, { user: "Zoe", age: "30" }];
console.log("Filter test:", testUsers.map(u => ({ ...u, age: Number(u.age) })).filter(u => u.age >= 18));
