// Q2. String Manipulation Report

// Raw product name with extra spaces and inconsistent casing
const rawTitle = "  wireless headphones PRO  ";

// Step 1: remove extra spaces and convert to lowercase
const trimmedLower = rawTitle.trim().toLowerCase();

// Step 2: split into words, capitalize first letter of each, join back
const capitalized = trimmedLower
  .split(" ")
  .map(word => word.charAt(0).toUpperCase() + word.slice(1))
  .join(" ");

// Step 3: replace "Pro" with "Pro Edition" (case-insensitive match)
const cleanTitle = capitalized.replace(/pro/i, "Pro Edition");

console.log(`Original : "${rawTitle}"`);
console.log(`Cleaned  : "${cleanTitle}"`);
console.log(`Length   : ${cleanTitle.length}`);
