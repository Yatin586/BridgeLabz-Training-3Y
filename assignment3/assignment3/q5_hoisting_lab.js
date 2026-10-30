"use strict";
// Q5 - Hoisting Lab: The Sequence Trap

// ---------- Part 1: the given code (predict, then run) ----------
// PREDICTION: undefined / Game started / ready
console.log("--- Original code ---");
console.log(score);   // var score is hoisted and initialised to undefined -> prints undefined
announce();           // function declarations are hoisted with their full body -> works
var score = 50;       // assignment happens here at runtime
function announce() { console.log("Game started"); }
let status = "ready"; // let is hoisted but stays in the Temporal Dead Zone until this line
startGame();          // called AFTER the let line, so status is initialised -> works
function startGame() {
  console.log(status);
}

// ---------- Part 2: memory state of each hoisted element ----------
// score      : var   -> hoisted, initialised to undefined (usable early, value is undefined)
// announce   : function declaration -> hoisted completely (name AND body)
// status     : let   -> hoisted but UNINITIALISED (Temporal Dead Zone) until its line runs
// startGame  : function declaration -> hoisted completely
console.log("\n--- What goes wrong if startGame ran before the let line (TDZ) ---");
try {
  (function () {
    tdzDemo();
    let lateStatus = "ready";
    function tdzDemo() { console.log(lateStatus); }
  })();
} catch (error) {
  console.log(`${error.name}: ${error.message}`);
}

// ---------- Part 3: fixed version (declare first, then use) ----------
console.log("\n--- Fixed code ---");
function announceFixed() { console.log("Game started"); }
function startGameFixed() { console.log(statusFixed); }
const scoreFixed = 50;
const statusFixed = "ready";
console.log(scoreFixed);
announceFixed();
startGameFixed();

// ---------- Part 4: arrow function comparison ----------
// Arrow functions are stored in variables (const/let/var) so only the variable is
// hoisted, never the function body. Calling early fails.
console.log("\n--- Arrow functions ---");
try {
  announceArrow(); // const is in the TDZ -> ReferenceError
} catch (error) {
  console.log(`const arrow before definition -> ${error.name}: ${error.message}`);
}
const announceArrow = () => console.log("Game started (arrow)");
const startGameArrow = () => console.log(statusFixed);
announceArrow();
startGameArrow();

// With var the name is hoisted as undefined, so the error is a TypeError instead.
try {
  varArrow();
} catch (error) {
  console.log(`var arrow before definition   -> ${error.name}: ${error.message}`);
}
var varArrow = () => console.log("never reached");
