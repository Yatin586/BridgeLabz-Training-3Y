Array.prototype.myMap = function (callback) {
  const result = [];
  for (let i = 0; i < this.length; i++) {
    result.push(callback(this[i], i, this));
  }
  return result;
};

console.log([1, 2, 3].myMap((num) => num * 2));
console.log([1, 2, 3].myMap((num, index) => num + index));
console.log(["a", "b"].myMap((letter) => letter.toUpperCase()));
console.log("Built-in map:", [1, 2, 3].map((num) => num * 2));
