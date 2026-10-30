const userArrow = {
  name: "Yatin",
  showName: () => {
    console.log("Arrow function this.name:", this.name);
  }
};

userArrow.showName();

console.log(
  "Reason: an arrow function has no 'this' of its own. It uses the 'this' of the " +
  "surrounding scope where it was defined (here the module/global scope), not the " +
  "object user. That scope has no 'name' property, so this.name is undefined."
);

const user = {
  name: "Yatin",
  showName: function () {
    console.log("Normal function this.name:", this.name);
  }
};

user.showName();
