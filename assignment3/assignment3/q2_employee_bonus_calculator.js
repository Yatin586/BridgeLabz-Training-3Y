"use strict";
// Q2 - Employee Bonus Calculator
// "use strict" means any accidental undeclared variable throws a ReferenceError
// instead of silently creating a global.

const employees = [
  { name: "Amit", salary: "45000", years: "5" },
  { name: "Sara", salary: "38000", years: "2" },
  { name: "Kiran", salary: "52000", years: "7" }
];

function processEmployee(emp) {
  // Missing object / property checks
  if (emp === null || typeof emp !== "object") {
    throw new TypeError("Employee record is missing or not an object");
  }
  if (!("name" in emp) || !("salary" in emp) || !("years" in emp)) {
    throw new Error(`Missing property in record: ${JSON.stringify(emp)}`);
  }

  // Convert strings to numbers and validate the conversion
  const salary = Number(emp.salary);
  const years = Number(emp.years);
  if (Number.isNaN(salary) || Number.isNaN(years)) {
    throw new Error(`Conversion failed for ${emp.name}: salary="${emp.salary}", years="${emp.years}"`);
  }

  // bonus = 10% if years > 3, else 5%
  const bonus = years > 3 ? salary * 0.1 : salary * 0.05;

  return { name: emp.name, salary, years, bonus };
}

function printEmployees(list) {
  for (const emp of list) {
    try {
      const r = processEmployee(emp);
      console.log(`Employee: ${r.name} | Salary: ${r.salary} | Years: ${r.years} | Bonus: ${r.bonus} | Total: ${r.salary + r.bonus}`);
    } catch (error) {
      console.log(`Error: ${error.message}`);
    }
  }
}

console.log("--- Given employees ---");
printEmployees(employees);

// Extra records to demonstrate the try...catch handling
console.log("\n--- Error handling demo ---");
printEmployees([
  { name: "Ravi", years: "3" },                    // missing salary
  { name: "Neha", salary: "abc", years: "4" },    // bad conversion
  null                                            // missing record
]);
