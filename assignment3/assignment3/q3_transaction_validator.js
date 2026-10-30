"use strict";
// Q3 - Transaction Validator

const transactions = [
  { id: 1, amount: 2000 },
  { id: 2, amount: -500 },
  { id: 3 },
  null
];

// Custom error classes so each failure type can be categorized
class NegativeAmountError extends Error {
  constructor(message) { super(message); this.name = "NegativeAmountError"; }
}
class MissingFieldError extends Error {
  constructor(message) { super(message); this.name = "MissingFieldError"; }
}
class NullEntryError extends Error {
  constructor(message) { super(message); this.name = "NullEntryError"; }
}

function validateTransaction(tx) {
  if (tx === null || tx === undefined) throw new NullEntryError("Transaction entry is null");
  if (tx.id === undefined || tx.amount === undefined) {
    throw new MissingFieldError(`Transaction ${tx.id ?? "?"} is missing id or amount`);
  }
  if (tx.amount < 0) throw new NegativeAmountError(`Transaction ${tx.id} has negative amount ${tx.amount}`);
  return tx;
}

const valid = [];
const invalid = [];
const errorCategories = { NegativeAmountError: [], MissingFieldError: [], NullEntryError: [] };

for (let i = 0; i < transactions.length; i++) {
  const tx = transactions[i];

  // DEBUGGING: set a breakpoint on the next line (click the gutter in VS Code),
  // run with F5 and add tx, i, valid and invalid to the Watch panel.
  // The debugger statement below pauses automatically when a debugger is attached
  // and does nothing when running normally.
  debugger;

  try {
    valid.push(validateTransaction(tx));
  } catch (error) {
    invalid.push({ index: i, type: error.name, message: error.message });
    if (errorCategories[error.name]) errorCategories[error.name].push(error.message);
  }
}

console.log("===== Transaction Report =====");
console.log("Valid transactions  :", valid);
console.log("Invalid transactions:", invalid);
console.log("Errors by category  :", errorCategories);
console.log(`Successful: ${valid.length}, Failed: ${invalid.length}`);
