function Person(name) {
  this.name = name;
}

Person.prototype.printName = function () {
  console.log("Name: " + this.name);
};

function Student(name, branch) {
  Person.call(this, name);
  this.branch = branch;
}

Student.prototype = Object.create(Person.prototype);
Student.prototype.constructor = Student;

Student.prototype.printBranch = function () {
  console.log("Branch: " + this.branch);
};

Student.prototype.printDetails = function () {
  this.printName();
  this.printBranch();
};

const student = new Student("Yatin", "CSE");

student.printDetails();

console.log("student instanceof Student:", student instanceof Student);
console.log("student instanceof Person:", student instanceof Person);
console.log("Student.prototype is parent of student:", Object.getPrototypeOf(student) === Student.prototype);
console.log("Person.prototype is parent of Student.prototype:", Object.getPrototypeOf(Student.prototype) === Person.prototype);
console.log("Chain ends at Object.prototype:", Object.getPrototypeOf(Person.prototype) === Object.prototype);
