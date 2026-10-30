"use strict";
// Q8 - Strict Mode Showdown
// The original function cannot even be parsed in strict mode, so this file
// compiles the snippets at runtime with new Function(), once sloppy and once strict.

const originalBody = `
  function demo(a, a) {
    total = 10;
    delete total;
  }
  demo(5, 10);
`;

function run(title, source) {
  try {
    new Function(source)();
    console.log(`${title}: ran without errors`);
  } catch (error) {
    console.log(`${title}: ${error.name} -> ${error.message}`);
  }
}

console.log("===== 1. Without strict mode (sloppy) =====");
// - duplicate parameter names allowed: the LAST value wins (a = 10)
// - total = 10 silently creates a global variable
// - delete total works on that global property
run("Sloppy original", originalBody);
const sloppyDetail = new Function(`
  function demo(a, a) {
    total = 10;
    var deleted = delete total;
    return "a=" + a + ", deleted=" + deleted + ", typeof total after=" + typeof total;
  }
  return demo(5, 10);
`)();
console.log("Sloppy details:", sloppyDetail);

console.log("\n===== 2. With strict mode: each rule on its own =====");
run("Duplicate parameters", `"use strict"; function demo(a, a) {}`);
run("Undeclared assignment", `"use strict"; total = 10;`);
run("delete on a variable ", `"use strict"; var total = 10; delete total;`);
run("Whole original code  ", `"use strict";` + originalBody);

console.log(`
===== 3. Why strict mode makes these illegal =====
- Duplicate parameters: "a" would be ambiguous (which value does it hold?) and
  usually hides a typo, so it is a SyntaxError.
- Undeclared assignment: a typo like totl = 10 would silently create a global
  variable. Strict mode throws ReferenceError so the bug is found immediately.
- delete on a variable: variables are not removable properties; delete is only
  meant for object properties, so deleting a plain identifier is a SyntaxError.
`);

console.log("===== 4. Correct ES6 version =====");
function demoFixed(first, second) {
  let total = first + second; // declared, unique parameter names
  console.log(`first=${first}, second=${second}, total=${total}`);

  // delete is only for object properties:
  const data = { total };
  delete data.total;
  console.log("After deleting property:", data);
  return total;
}
demoFixed(5, 10);
