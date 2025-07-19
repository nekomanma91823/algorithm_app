// Subsystem クラス群
class Subsystem1 {
  operation1() {
    return "Subsystem1: Ready!\n";
  }

  operationN() {
    return "Subsystem1: Go!\n";
  }
}

class Subsystem2 {
  operation1() {
    return "Subsystem2: Get ready!\n";
  }

  operationZ() {
    return "Subsystem2: Fire!";
  }
}

// Facade クラス
class Facade {
  constructor(subsystem1, subsystem2) {
    this.subsystem1 = subsystem1 || new Subsystem1();
    this.subsystem2 = subsystem2 || new Subsystem2();
  }

  operation() {
    let result = "Facade initializes subsystems:\n";
    result += this.subsystem1.operation1();
    result += this.subsystem2.operation1();
    result += "Facade orders subsystems to perform the action:\n";
    result += this.subsystem1.operationN();
    result += this.subsystem2.operationZ();
    return result;
  }
}

// Client Code
function clientCode(facade) {
  console.log(facade.operation());
}

// 使用例
const subsystem1 = new Subsystem1();
const subsystem2 = new Subsystem2();
const facade = new Facade(subsystem1, subsystem2);
clientCode(facade);
