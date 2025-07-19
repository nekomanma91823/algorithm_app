// Abstract Class
class AbstractClass {
  templateMethod() {
    this.baseOperation1();
    this.requiredOperations1();
    this.baseOperation2();
    this.hook1();
    this.requiredOperation2();
    this.baseOperation3();
    this.hook2();
  }

  baseOperation1() {
    console.log("AbstractClass says: I am doing the bulk of the work");
  }

  baseOperation2() {
    console.log(
      "AbstractClass says: But I let subclasses override some operations"
    );
  }

  baseOperation3() {
    console.log(
      "AbstractClass says: But I am doing the bulk of the work anyway"
    );
  }

  requiredOperations1() {
    throw new Error("requiredOperations1() must be implemented");
  }

  requiredOperation2() {
    throw new Error("requiredOperation2() must be implemented");
  }

  hook1() {}

  hook2() {}
}

// Concrete Classes
class ConcreteClass1 extends AbstractClass {
  requiredOperations1() {
    console.log("ConcreteClass1 says: Implemented Operation1");
  }

  requiredOperation2() {
    console.log("ConcreteClass1 says: Implemented Operation2");
  }
}

class ConcreteClass2 extends AbstractClass {
  requiredOperations1() {
    console.log("ConcreteClass2 says: Implemented Operation1");
  }

  requiredOperation2() {
    console.log("ConcreteClass2 says: Implemented Operation2");
  }

  hook1() {
    console.log("ConcreteClass2 says: Overridden Hook1");
  }
}

// Client Code
function clientCode(abstractClass) {
  abstractClass.templateMethod();
}

// 使用例
console.log("Same client code can work with different subclasses:");
clientCode(new ConcreteClass1());
console.log("");

console.log("Same client code can work with different subclasses:");
clientCode(new ConcreteClass2());
