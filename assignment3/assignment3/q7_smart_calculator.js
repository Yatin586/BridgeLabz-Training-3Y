"use strict";
// Q7 - Smart Calculator

const operations = ["add", "divide", "power", "root", "subtract"];
const num1 = 25, num2 = 0;

// Custom error types
class DivideByZeroError extends Error {
  constructor(message) { super(message); this.name = "DivideByZeroError"; }
}
class NegativeRootError extends Error {
  constructor(message) { super(message); this.name = "NegativeRootError"; }
}
class InvalidOperationError extends Error {
  constructor(message) { super(message); this.name = "InvalidOperationError"; }
}

function calculate(operation, a, b) {
  switch (operation) {
    case "add":
      return a + b;
    case "subtract":
      return a - b;
    case "divide":
      if (b === 0) throw new DivideByZeroError("Cannot divide by zero");
      return a / b;
    case "power":
      return Math.pow(a, b);
    case "root": // square root of the first number
      if (a < 0) throw new NegativeRootError(`Cannot take root of negative number (${a})`);
      return Math.sqrt(a);
    default:
      throw new InvalidOperationError(`Operation "${operation}" is not recognized`);
  }
}

function runAll(ops, a, b) {
  console.log(`Inputs: num1 = ${a}, num2 = ${b}`);
  console.log("-----------------------------------");
  for (const op of ops) {
    try {
      const result = calculate(op, a, b);
      console.log(`${op.padEnd(9)} => ${result}`);
    } catch (error) {
      console.log(`${op.padEnd(9)} => ${error.name}: ${error.message}`);
    }
  }
  console.log("-----------------------------------");
}

console.log("===== Calculator Summary =====");
runAll(operations, num1, num2);

console.log("\n===== Extra tests =====");
runAll(["root", "modulo"], -9, 3); // negative root + unrecognized operation
