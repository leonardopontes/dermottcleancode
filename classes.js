// Prefer ES2015/ES6 classes over ES5 plain functions
// Bad
const Animal = function(age) {
    if (!(this instanceof Animal)) {
      throw new Error("Instantiate Animal with `new`");
    }
  
    this.age = age;
  };
  
  Animal.prototype.move = function move() {};
  
  const Mammal = function(age, furColor) {
    if (!(this instanceof Mammal)) {
      throw new Error("Instantiate Mammal with `new`");
    }
  
    Animal.call(this, age);
    this.furColor = furColor;
  };
  
  Mammal.prototype = Object.create(Animal.prototype);
  Mammal.prototype.constructor = Mammal;
  Mammal.prototype.liveBirth = function liveBirth() {};
  
  const Human = function(age, furColor, languageSpoken) {
    if (!(this instanceof Human)) {
      throw new Error("Instantiate Human with `new`");
    }
  
    Mammal.call(this, age, furColor);
    this.languageSpoken = languageSpoken;
  };
  
  Human.prototype = Object.create(Mammal.prototype);
  Human.prototype.constructor = Human;
  Human.prototype.speak = function speak() {};
// Good
class Animal {
    constructor(age) {
      this.age = age;
    }
  
    move() {
      /* ... */
    }
  }
  
  class Mammal extends Animal {
    constructor(age, furColor) {
      super(age);
      this.furColor = furColor;
    }
  
    liveBirth() {
      /* ... */
    }
  }
  
  class Human extends Mammal {
    constructor(age, furColor, languageSpoken) {
      super(age, furColor);
      this.languageSpoken = languageSpoken;
    }
  
    speak() {
      /* ... */
    }
  }

// Use method chaining
// Bad
class Car {
    constructor(make, model, color) {
      this.make = make;
      this.model = model;
      this.color = color;
    }
  
    setMake(make) {
      this.make = make;
    }
  
    setModel(model) {
      this.model = model;
    }
  
    setColor(color) {
      this.color = color;
    }
  
    save() {
      console.log(this.make, this.model, this.color);
    }
  }
  
  const car = new Car("Ford", "F-150", "red");
  car.setColor("pink");
  car.save();
// Good
class Car {
    constructor(make, model, color) {
      this.make = make;
      this.model = model;
      this.color = color;
    }
  
    setMake(make) {
      this.make = make;
      // NOTE: Returning this for chaining
      return this;
    }
  
    setModel(model) {
      this.model = model;
      // NOTE: Returning this for chaining
      return this;
    }
  
    setColor(color) {
      this.color = color;
      // NOTE: Returning this for chaining
      return this;
    }
  
    save() {
      console.log(this.make, this.model, this.color);
      // NOTE: Returning this for chaining
      return this;
    }
  }
  
  const car = new Car("Ford", "F-150", "red").setColor("pink").save();

// Prefer composition over inheritance
// Bad
class Employee {
    constructor(name, email) {
      this.name = name;
      this.email = email;
    }
  
    // ...
  }
  
  // Bad because Employees "have" tax data. EmployeeTaxData is not a type of Employee
  class EmployeeTaxData extends Employee {
    constructor(ssn, salary) {
      super();
      this.ssn = ssn;
      this.salary = salary;
    }
  
    // ...
  }
// Good
class EmployeeTaxData {
    constructor(ssn, salary) {
      this.ssn = ssn;
      this.salary = salary;
    }
  
    // ...
  }
  
  class Employee {
    constructor(name, email) {
      this.name = name;
      this.email = email;
    }
  
    setTaxData(ssn, salary) {
      this.taxData = new EmployeeTaxData(ssn, salary);
    }
    // ...
  }