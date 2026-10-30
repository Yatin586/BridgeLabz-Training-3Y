"use strict";
// Q10 - Nested Hoisting and Closures

// 1. PREDICTION
// outer() prints:   undefined   (outer's own var count is hoisted, value not yet assigned)
// inner() prints:   undefined   (inner has its OWN var count, hoisted inside inner,
//                                so it shadows outer's count = 5)
function outer() {
  console.log("outer, before assignment:", count); // undefined
  var count = 5;
  function inner() {
    console.log("inner, before assignment:", count); // undefined (inner's own count)
    var count = 10;
  }
  inner();
  console.log("outer, after inner():", count); // 5 - inner never touched outer's count
}
console.log("--- Original ---");
outer();

// 2. SEPARATE MEMORY CONTEXTS
// Each function call creates its own execution context with its own variable
// environment. JS hoists declarations to the top of THEIR function:
//   outer context: { count: undefined -> 5, inner: <function> }
//   inner context: { count: undefined -> 10 }
// The inner count shadows the outer one, so they are two different variables.

// 3. INNER AS AN ARROW FUNCTION
function outerArrow() {
  console.log("\n--- Arrow version ---");
  console.log("outerArrow, before assignment:", count); // undefined
  var count = 5;

  // Behaviour change 1: an arrow function in a const is NOT hoisted with its body.
  try {
    innerArrow(); // const is in the TDZ here
  } catch (error) {
    console.log(`Early call -> ${error.name}: ${error.message}`);
  }

  const innerArrow = () => {
    console.log("innerArrow, before assignment:", count); // still undefined: var count below is hoisted to the arrow
    var count = 10;
  };
  innerArrow();

  // Behaviour change 2: without its own `var count`, the arrow closes over outer's count.
  const innerClosure = () => console.log("innerClosure sees outer count:", count); // 5
  innerClosure();
}
outerArrow();

// 4. DEBUG SESSION / CALL STACK
// - Set a breakpoint on the first console.log inside outer and press F5.
// - Add `count` to Watch: it shows undefined until `var count = 5` runs.
// - Step Into (F11) on inner(). CALL STACK now reads:
//       inner
//       outer
//       (anonymous) top-level module code
// - Inside inner, Watch `count` shows undefined (the inner variable); the Scope panel
//   lists "Local: count" for inner and "Closure (outer): count = 5" separately.
// - Step Out (Shift+F11): inner is popped off the stack and control returns to outer.
