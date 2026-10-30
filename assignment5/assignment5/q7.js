function makeMultiplier(multiplier) {
  return function (number) {
    return number * multiplier;
  };
}

const double = makeMultiplier(2);
const triple = makeMultiplier(3);

console.log(double(5));
console.log(triple(5));
console.log(triple(10));

console.log(
  "Closure: when makeMultiplier(3) finishes, its variable 'multiplier' would normally " +
  "be discarded. But the returned inner function still refers to it, so JavaScript keeps " +
  "that variable alive. Each call to makeMultiplier creates a separate remembered " +
  "'multiplier', which is why double and triple do not affect each other."
);
