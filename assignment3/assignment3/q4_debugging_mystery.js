"use strict";
// Q4 - Debugging Mystery

// 1. WHY THE ORIGINAL CODE FAILS
// Original:
//   function showMessage() { greeting = "Welcome"; console.log(greeting); }
// `greeting` is never declared with var/let/const. In sloppy mode JavaScript would
// silently create a global variable. Under "use strict" that is forbidden, so
// the assignment throws ReferenceError: greeting is not defined.
function showMessageBroken() {
  greeting = "Welcome"; // undeclared -> ReferenceError in strict mode
  console.log(greeting);
}

console.log("--- Original (broken) code ---");
try {
  showMessageBroken();
} catch (error) {
  console.log(`${error.name}: ${error.message}`);
}

// 2. THE FIX: declare the variable so it has a defined scope.
// `let` (or const) inside the function makes greeting local to showMessage;
// it no longer leaks into the global scope.
function showMessage() {
  const greeting = "Welcome";
  console.log(greeting);
}

console.log("--- Fixed code ---");
showMessage();
console.log("Leaked to global scope?", typeof globalThis.greeting !== "undefined"); // false

// 3. DEBUGGING IN VS CODE
// - Click left of a line number to set a breakpoint inside showMessage (on console.log).
// - Press F5 and choose Node.js. Add `greeting` in the WATCH panel.
// - The CALL STACK panel shows: showMessage -> (anonymous / module) top-level code.
// - Step Over (F10) to execute the assignment and watch `greeting` change to "Welcome".
function showMessageDebug() {
  const greeting = "Welcome";
  debugger; // pauses here when a debugger is attached
  console.log(greeting);
}
showMessageDebug();
