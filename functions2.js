// Avoid Side Effects (part 1)
// Bad
// Global variable referenced by following function.
// If we had another function that used this name, now it'd be an array and it could break it.
let name = "Ryan McDermott";

function splitIntoFirstAndLastName() {
  name = name.split(" ");
}

splitIntoFirstAndLastName();

console.log(name); // ['Ryan', 'McDermott'];
// Good
function splitIntoFirstAndLastName(name) {
    return name.split(" ");
  }
  
  const name = "Ryan McDermott";
  const newName = splitIntoFirstAndLastName(name);
  
  console.log(name); // 'Ryan McDermott';
  console.log(newName); // ['Ryan', 'McDermott'];

// Avoid Side Effects (part 2)
// Bad
const addItemToCart = (cart, item) => {
    cart.push({ item, date: Date.now() });
  };
// Good
const addItemToCart = (cart, item) => {
    return [...cart, { item, date: Date.now() }];
  };
  
// Don't write to global functions
// Bad
Array.prototype.diff = function diff(comparisonArray) {
    const hash = new Set(comparisonArray);
    return this.filter(elem => !hash.has(elem));
  };
// Good
class SuperArray extends Array {
    diff(comparisonArray) {
      const hash = new Set(comparisonArray);
      return this.filter(elem => !hash.has(elem));
    }
  }

// Favor functional programming over imperative programming
// Bad
const programmerOutput = [
    {
      name: "Uncle Bobby",
      linesOfCode: 500
    },
    {
      name: "Suzie Q",
      linesOfCode: 1500
    },
    {
      name: "Jimmy Gosling",
      linesOfCode: 150
    },
    {
      name: "Gracie Hopper",
      linesOfCode: 1000
    }
  ];
  
  let totalOutput = 0;
  
  for (let i = 0; i < programmerOutput.length; i++) {
    totalOutput += programmerOutput[i].linesOfCode;
  }
// Good
const programmerOutput = [
    {
      name: "Uncle Bobby",
      linesOfCode: 500
    },
    {
      name: "Suzie Q",
      linesOfCode: 1500
    },
    {
      name: "Jimmy Gosling",
      linesOfCode: 150
    },
    {
      name: "Gracie Hopper",
      linesOfCode: 1000
    }
  ];
  
  const totalOutput = programmerOutput.reduce(
    (totalLines, output) => totalLines + output.linesOfCode,
    0
  );
  
// Encapsulate conditionals
// Bad
if (fsm.state === "fetching" && isEmpty(listNode)) {
    // ...
  }
// Good
function shouldShowSpinner(fsm, listNode) {
    return fsm.state === "fetching" && isEmpty(listNode);
  }
  
  if (shouldShowSpinner(fsmInstance, listNodeInstance)) {
    // ...
  }

// Avoid negative conditionals
// Bad
function isDOMNodeNotPresent(node) {
    // ...
  }
  
  if (!isDOMNodeNotPresent(node)) {
    // ...
  }
// Good
function isDOMNodePresent(node) {
    // ...
  }
  
  if (isDOMNodePresent(node)) {
    // ...
  }

// Avoid conditionals
// Bad
class Airplane {
    // ...
    getCruisingAltitude() {
      switch (this.type) {
        case "777":
          return this.getMaxAltitude() - this.getPassengerCount();
        case "Air Force One":
          return this.getMaxAltitude();
        case "Cessna":
          return this.getMaxAltitude() - this.getFuelExpenditure();
      }
    }
  }
// Good
class Airplane {
    // ...
  }
  
  class Boeing777 extends Airplane {
    // ...
    getCruisingAltitude() {
      return this.getMaxAltitude() - this.getPassengerCount();
    }
  }
  
  class AirForceOne extends Airplane {
    // ...
    getCruisingAltitude() {
      return this.getMaxAltitude();
    }
  }
  
  class Cessna extends Airplane {
    // ...
    getCruisingAltitude() {
      return this.getMaxAltitude() - this.getFuelExpenditure();
    }
  }

// Avoid type-checking (part 1)
// Bad
function travelToTexas(vehicle) {
    if (vehicle instanceof Bicycle) {
      vehicle.pedal(this.currentLocation, new Location("texas"));
    } else if (vehicle instanceof Car) {
      vehicle.drive(this.currentLocation, new Location("texas"));
    }
  }
// Good
function travelToTexas(vehicle) {
    vehicle.move(this.currentLocation, new Location("texas"));
  }

// Avoid type-checking (part 2)  
// Bad
function combine(val1, val2) {
    if (
      (typeof val1 === "number" && typeof val2 === "number") ||
      (typeof val1 === "string" && typeof val2 === "string")
    ) {
      return val1 + val2;
    }
  
    throw new Error("Must be of type String or Number");
  }
// Good
function combine(val1, val2) {
    return val1 + val2;
  }