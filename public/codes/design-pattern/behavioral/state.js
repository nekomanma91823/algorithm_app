// Context
class Context {
  constructor(state) {
    this.transitionTo(state);
  }

  transitionTo(state) {
    console.log(`Context: Transition to ${state.constructor.name}.`);
    this.state = state;
    this.state.setContext(this);
  }

  request1() {
    this.state.handle1();
  }

  request2() {
    this.state.handle2();
  }
}

// State
class State {
  setContext(context) {
    this.context = context;
  }

  handle1() {
    throw new Error("handle1() must be implemented");
  }

  handle2() {
    throw new Error("handle2() must be implemented");
  }
}

// Concrete States
class ConcreteStateA extends State {
  handle1() {
    console.log("ConcreteStateA handles request1.");
    console.log("ConcreteStateA wants to change the state of the context.");
    this.context.transitionTo(new ConcreteStateB());
  }

  handle2() {
    console.log("ConcreteStateA handles request2.");
  }
}

class ConcreteStateB extends State {
  handle1() {
    console.log("ConcreteStateB handles request1.");
  }

  handle2() {
    console.log("ConcreteStateB handles request2.");
    console.log("ConcreteStateB wants to change the state of the context.");
    this.context.transitionTo(new ConcreteStateA());
  }
}

// 使用例
const context = new Context(new ConcreteStateA());
context.request1();
context.request2();
