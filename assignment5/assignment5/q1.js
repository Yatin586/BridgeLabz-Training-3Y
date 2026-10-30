function showEndMessage() {
  console.log("Welcome to the course!");
}

function greetUser(name, callback) {
  console.log("Hello " + name);
  callback();
}

console.log("Start");
greetUser("Yatin", showEndMessage);
console.log("End");
