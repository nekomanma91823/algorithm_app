// Abstract Product A
class AbstractProductA {
  usefulFunctionA() {
    throw new Error("usefulFunctionA() must be implemented");
  }
}

// Abstract Product B
class AbstractProductB {
  usefulFunctionB() {
    throw new Error("usefulFunctionB() must be implemented");
  }

  anotherUsefulFunctionB(collaborator) {
    throw new Error("anotherUsefulFunctionB() must be implemented");
  }
}

// Concrete Products A
class ConcreteProductA1 extends AbstractProductA {
  usefulFunctionA() {
    return "The result of the product A1.";
  }
}

class ConcreteProductA2 extends AbstractProductA {
  usefulFunctionA() {
    return "The result of the product A2.";
  }
}

// Concrete Products B
class ConcreteProductB1 extends AbstractProductB {
  usefulFunctionB() {
    return "The result of the product B1.";
  }

  anotherUsefulFunctionB(collaborator) {
    const result = collaborator.usefulFunctionA();
    return `The result of the B1 collaborating with the (${result})`;
  }
}

class ConcreteProductB2 extends AbstractProductB {
  usefulFunctionB() {
    return "The result of the product B2.";
  }

  anotherUsefulFunctionB(collaborator) {
    const result = collaborator.usefulFunctionA();
    return `The result of the B2 collaborating with the (${result})`;
  }
}

// Abstract Factory
class AbstractFactory {
  createProductA() {
    throw new Error("createProductA() must be implemented");
  }

  createProductB() {
    throw new Error("createProductB() must be implemented");
  }
}

// Concrete Factories
class ConcreteFactory1 extends AbstractFactory {
  createProductA() {
    return new ConcreteProductA1();
  }

  createProductB() {
    return new ConcreteProductB1();
  }
}

class ConcreteFactory2 extends AbstractFactory {
  createProductA() {
    return new ConcreteProductA2();
  }

  createProductB() {
    return new ConcreteProductB2();
  }
}

// Client Code
function clientCode(factory) {
  const productA = factory.createProductA();
  const productB = factory.createProductB();

  console.log(productB.usefulFunctionB());
  console.log(productB.anotherUsefulFunctionB(productA));
}

// 使用例
console.log("Client: Testing client code with the first factory type...");
clientCode(new ConcreteFactory1());

console.log(
  "Client: Testing the same client code with the second factory type..."
);
clientCode(new ConcreteFactory2());
