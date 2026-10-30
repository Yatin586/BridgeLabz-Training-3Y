function PersonProto(name) {
  this.name = name;
}

PersonProto.prototype.printName = function () {
  return "Name: " + this.name;
};

function StudentProto(name, branch) {
  PersonProto.call(this, name);
  this.branch = branch;
}

StudentProto.prototype = Object.create(PersonProto.prototype);
StudentProto.prototype.constructor = StudentProto;

StudentProto.prototype.printBranch = function () {
  return "Branch: " + this.branch;
};

class Person {
  constructor(name) {
    this.name = name;
  }

  printName() {
    return "Name: " + this.name;
  }
}

class Student extends Person {
  constructor(name, branch) {
    super(name);
    this.branch = branch;
  }

  printBranch() {
    return "Branch: " + this.branch;
  }
}

const protoStudent = new StudentProto("Yatin", "CSE");
const classStudent = new Student("Yatin", "CSE");

console.log("Prototype version:", protoStudent.printName(), "|", protoStudent.printBranch());
console.log("Class version    :", classStudent.printName(), "|", classStudent.printBranch());

console.log("Same name output:", protoStudent.printName() === classStudent.printName());
console.log("Same branch output:", protoStudent.printBranch() === classStudent.printBranch());
console.log("Proto instanceof parent:", protoStudent instanceof PersonProto);
console.log("Class instanceof parent:", classStudent instanceof Person);
console.log(
  "Parent of Student.prototype is Person.prototype (both):",
  Object.getPrototypeOf(StudentProto.prototype) === PersonProto.prototype,
  Object.getPrototypeOf(Student.prototype) === Person.prototype
);
