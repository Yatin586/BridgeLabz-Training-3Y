"use strict";
// Q6 - Pyramid Pattern Generator

// Rows is controlled by user input: node q6_pyramid_pattern_generator.js 7
// Default is 5 when nothing (or something invalid) is passed.
const inputArg = typeof process !== "undefined" ? process.argv[2] : undefined;
let rows = Number.parseInt(inputArg, 10);
if (Number.isNaN(rows) || rows < 1) rows = 5;

// ---- Version with let (block scoped) ----
function printPyramidLet(limit) {
  for (let i = 1; i <= limit; i++) {
    let line = "";
    for (let j = 1; j <= i; j++) {
      line += "* ";
    }
    console.log(line.trim());
  }
}

// ---- Version with var (function scoped) ----
function printPyramidVar(limit) {
  for (var i = 1; i <= limit; i++) {
    var line = "";
    for (var j = 1; j <= i; j++) {
      line += "* ";
    }
    console.log(line.trim());
  }
  // OBSERVATION: var is not limited to the loop block, so i, j and line still
  // exist here. The same variable is re-used across all iterations.
  console.log(`After loop (var): i=${i}, j=${j}`);
}

console.log(`Pyramid with let (${rows} rows):`);
printPyramidLet(rows);

console.log(`\nPyramid with var (${rows} rows):`);
printPyramidVar(rows);

// Output is identical, but scope is different. The difference shows up with closures:
const letFunctions = [];
const varFunctions = [];
for (let i = 0; i < 3; i++) letFunctions.push(() => i); // new i per iteration
for (var k = 0; k < 3; k++) varFunctions.push(() => k); // one shared k
console.log("\nClosures with let:", letFunctions.map(f => f())); // [0, 1, 2]
console.log("Closures with var:", varFunctions.map(f => f())); // [3, 3, 3]

// DEBUGGING: put a breakpoint on `line += "* "`, add i, j and line to Watch,
// and step through (F10). With var you can see a single i/j slot being re-used.

// Strict mode catches undeclared loop variables:
console.log("\nUndeclared loop variable under strict mode:");
try {
  new Function('"use strict"; for (n = 1; n <= 3; n++) {}')();
} catch (error) {
  console.log(`${error.name}: ${error.message}`);
}
