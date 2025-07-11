// Component インターフェース
class Component {
  operation() {
    throw new Error("operation() must be implemented");
  }
}

// Concrete Component
class ConcreteComponent extends Component {
  operation() {
    return "ConcreteComponent";
  }
}

// Base Decorator
class Decorator extends Component {
  constructor(component) {
    super();
    this.component = component;
  }

  operation() {
    return this.component.operation();
  }
}

// Concrete Decorators
class ConcreteDecoratorA extends Decorator {
  operation() {
    return `ConcreteDecoratorA(${super.operation()})`;
  }
}

class ConcreteDecoratorB extends Decorator {
  operation() {
    return `ConcreteDecoratorB(${super.operation()})`;
  }
}

// Client Code
function clientCode(component) {
  console.log(`RESULT: ${component.operation()}`);
}

// 使用例
const simple = new ConcreteComponent();
console.log("Client: I've got a simple component:");
clientCode(simple);
console.log("");

const decorator1 = new ConcreteDecoratorA(simple);
const decorator2 = new ConcreteDecoratorB(decorator1);
console.log("Client: Now I've got a decorated component:");
clientCode(decorator2);
