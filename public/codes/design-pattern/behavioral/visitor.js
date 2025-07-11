// Visitor インターフェース
class Visitor {
  visitConcreteComponentA(element) {
    throw new Error("visitConcreteComponentA() must be implemented");
  }

  visitConcreteComponentB(element) {
    throw new Error("visitConcreteComponentB() must be implemented");
  }
}

// Concrete Visitors
class ConcreteVisitor1 extends Visitor {
  visitConcreteComponentA(element) {
    console.log(
      `${element.exclusiveMethodOfConcreteComponentA()} + ConcreteVisitor1`
    );
  }

  visitConcreteComponentB(element) {
    console.log(
      `${element.specialMethodOfConcreteComponentB()} + ConcreteVisitor1`
    );
  }
}

class ConcreteVisitor2 extends Visitor {
  visitConcreteComponentA(element) {
    console.log(
      `${element.exclusiveMethodOfConcreteComponentA()} + ConcreteVisitor2`
    );
  }

  visitConcreteComponentB(element) {
    console.log(
      `${element.specialMethodOfConcreteComponentB()} + ConcreteVisitor2`
    );
  }
}

// Component インターフェース
class Component {
  accept(visitor) {
    throw new Error("accept() must be implemented");
  }
}

// Concrete Components
class ConcreteComponentA extends Component {
  accept(visitor) {
    visitor.visitConcreteComponentA(this);
  }

  exclusiveMethodOfConcreteComponentA() {
    return "A";
  }
}

class ConcreteComponentB extends Component {
  accept(visitor) {
    visitor.visitConcreteComponentB(this);
  }

  specialMethodOfConcreteComponentB() {
    return "B";
  }
}

// Client Code
function clientCode(components, visitor) {
  for (const component of components) {
    component.accept(visitor);
  }
}

// 使用例
const components = [new ConcreteComponentA(), new ConcreteComponentB()];

console.log(
  "The client code works with all visitors via the base Visitor interface:"
);
const visitor1 = new ConcreteVisitor1();
clientCode(components, visitor1);
console.log("");

console.log(
  "It allows the same client code to work with different types of visitors:"
);
const visitor2 = new ConcreteVisitor2();
clientCode(components, visitor2);
