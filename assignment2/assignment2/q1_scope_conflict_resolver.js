// Q1. Scope Conflict Resolver

// Global variable: accessible everywhere in the script
var bonus = 5000;

function calculateSalary(permanentStatus) {
  // Local variables: exist only inside this function
  let salary = 40000;
  let isPermanent = permanentStatus;

  // Add the global bonus only for permanent employees
  if (isPermanent) {
    salary = salary + bonus;
  }

  console.log(`isPermanent = ${isPermanent} -> Total salary: ${salary}`);
  return salary;
}

console.log("--- Permanent employee ---");
calculateSalary(true);

console.log("--- Non-permanent employee ---");
calculateSalary(false);

// Demonstration: changing isPermanent never changes the global bonus,
// and local variables are not accessible outside the function.
console.log("Global bonus after both calls:", bonus); // still 5000
console.log("Is 'salary' accessible outside?", typeof salary); // undefined
console.log("Is 'isPermanent' accessible outside?", typeof isPermanent); // undefined
