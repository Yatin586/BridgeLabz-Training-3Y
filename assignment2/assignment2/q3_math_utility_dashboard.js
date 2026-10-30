// Q3. Math Utility Dashboard

const x = 16.75;

const rounded = Math.round(x);                         // nearest integer
const squareRoot = Math.sqrt(x);                       // square root
const cube = Math.pow(x, 3);                           // x raised to power 3
const randomNum = Math.floor(Math.random() * 41) + 10; // random integer 10-50

// Formatted summary using a template literal
console.log(`
===== Math Dashboard =====
Number          : ${x}
Rounded value   : ${rounded}
Square root     : ${squareRoot.toFixed(4)}
Power (x^3)     : ${cube.toFixed(4)}
Random (10-50)  : ${randomNum}
==========================
`);
