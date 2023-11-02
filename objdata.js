// Use getters and setters
// Bad
function makeBankAccount() {
    // ...
  
    return {
      balance: 0
      // ...
    };
  }
  
  const account = makeBankAccount();
  account.balance = 100;
// Good
function makeBankAccount() {
    // this one is private
    let balance = 0;
  
    // a "getter", made public via the returned object below
    function getBalance() {
      return balance;
    }
  
    // a "setter", made public via the returned object below
    function setBalance(amount) {
      // ... validate before updating the balance
      balance = amount;
    }
  
    return {
      // ...
      getBalance,
      setBalance
    };
  }
  
  const account = makeBankAccount();
  account.setBalance(100);

// Make objects have private members
// Bad
const Employee = function(name) {
    this.name = name;
  };
  
  Employee.prototype.getName = function getName() {
    return this.name;
  };
  
  const employee = new Employee("John Doe");
  console.log(`Employee name: ${employee.getName()}`); // Employee name: John Doe
  delete employee.name;
  console.log(`Employee name: ${employee.getName()}`); // Employee name: undefined
// Good
function makeEmployee(name) {
    return {
      getName() {
        return name;
      }
    };
  }
  
  const employee = makeEmployee("John Doe");
  console.log(`Employee name: ${employee.getName()}`); // Employee name: John Doe
  delete employee.name;
  console.log(`Employee name: ${employee.getName()}`); // Employee name: John Doe