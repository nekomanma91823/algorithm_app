// Implementor インターフェース
class Implementation {
  operationImplementation() {
    throw new Error("operationImplementation() must be implemented");
  }
}

// Concrete Implementors
class ConcreteImplementationA extends Implementation {
  operationImplementation() {
    return "ConcreteImplementationA: Here's the result on the platform A.";
  }
}

class ConcreteImplementationB extends Implementation {
  operationImplementation() {
    return "ConcreteImplementationB: Here's the result on the platform B.";
  }
}

// Abstraction
class Abstraction {
  constructor(implementation) {
    this.implementation = implementation;
  }

  operation() {
    const result = this.implementation.operationImplementation();
    return `Abstraction: Base operation with:\n${result}`;
  }
}

// Extended Abstraction
class ExtendedAbstraction extends Abstraction {
  operation() {
    const result = this.implementation.operationImplementation();
    return `ExtendedAbstraction: Extended operation with:\n${result}`;
  }
}

// Client Code
function clientCode(abstraction) {
  console.log(abstraction.operation());
}

// 使用例
let implementation = new ConcreteImplementationA();
let abstraction = new Abstraction(implementation);
clientCode(abstraction);

console.log("");

implementation = new ConcreteImplementationB();
abstraction = new ExtendedAbstraction(implementation);
clientCode(abstraction);
