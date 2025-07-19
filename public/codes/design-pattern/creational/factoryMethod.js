// Product クラス
class Product {
  operation() {
    throw new Error("operation() must be implemented");
  }
}

class ConcreteProductA extends Product {
  operation() {
    return "Result of the ConcreteProductA";
  }
}

class ConcreteProductB extends Product {
  operation() {
    return "Result of the ConcreteProductB";
  }
}

// Creator クラス
class Creator {
  factoryMethod() {
    throw new Error("factoryMethod() must be implemented");
  }

  someOperation() {
    const product = this.factoryMethod();
    return `Creator: The same creator's code has just worked with ${product.operation()}`;
  }
}

class ConcreteCreatorA extends Creator {
  factoryMethod() {
    return new ConcreteProductA();
  }
}

class ConcreteCreatorB extends Creator {
  factoryMethod() {
    return new ConcreteProductB();
  }
}

// 使用例
const creatorA = new ConcreteCreatorA();
console.log(creatorA.someOperation());

const creatorB = new ConcreteCreatorB();
console.log(creatorB.someOperation());
