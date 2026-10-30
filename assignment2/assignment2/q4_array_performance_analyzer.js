// Q4. Array Performance Analyzer

// Generate 8 random scores between 30 and 100 (inclusive)
const scores = Array.from({ length: 8 }, () => Math.floor(Math.random() * 71) + 30);

const highest = Math.max(...scores);
const lowest = Math.min(...scores);

// reduce() sums all scores, then divide by count
const average = scores.reduce((sum, s) => sum + s, 0) / scores.length;

// filter() keeps only passing scores (>= 50)
const passedScores = scores.filter(s => s >= 50);

// map() builds a Pass/Fail label for each score
const results = scores.map(s => `${s} (${s >= 50 ? "Pass" : "Fail"})`);

console.log("===== Student Performance Summary =====");
console.log("Scores         :", scores.join(", "));
console.log("Results        :", results.join(", "));
console.log("Highest score  :", highest);
console.log("Lowest score   :", lowest);
console.log("Average score  :", average.toFixed(2));
console.log(`Students passed: ${passedScores.length} out of ${scores.length}`);
console.log("=======================================");
