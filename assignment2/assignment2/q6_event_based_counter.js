// Q6. Event-Based Counter Simulation

let count = 0; // shared counter

// Increase count by 1 and log it
function increment() {
  count++;
  console.log("Incremented -> count =", count);
}

// Decrease count by 1 and log it
function decrement() {
  count--;
  console.log("Decremented -> count =", count);
}

// Nested function example: inner function can access and update
// 'count' of the outer function because of function (lexical) scope
function counterWithNestedFunction() {
  let localCount = count; // starts from current global value

  function updateBy(amount) {
    localCount += amount; // inner function modifies outer variable
    console.log(`Nested update by ${amount} -> localCount = ${localCount}`);
  }

  updateBy(5);
  updateBy(-2);
  return localCount;
}

// Simulate "click" events by calling the functions manually
console.log("Click: + button");
increment();
increment();
increment();

console.log("Click: - button");
decrement();

console.log("--- Nested function demo ---");
const result = counterWithNestedFunction();
console.log("Returned localCount:", result);
console.log("Global count unchanged by nested function:", count);
