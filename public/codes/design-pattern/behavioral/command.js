// Command インターフェース
class Command {
  execute() {
    throw new Error("execute() must be implemented");
  }
}

// Simple Command
class SimpleCommand extends Command {
  constructor(payload) {
    super();
    this.payload = payload;
  }

  execute() {
    console.log(
      `SimpleCommand: See, I can do simple things like printing (${this.payload})`
    );
  }
}

// Complex Command
class ComplexCommand extends Command {
  constructor(receiver, a, b) {
    super();
    this.receiver = receiver;
    this.a = a;
    this.b = b;
  }

  execute() {
    console.log(
      "ComplexCommand: Complex stuff should be done by a receiver object."
    );
    this.receiver.doSomething(this.a);
    this.receiver.doSomethingElse(this.b);
  }
}

// Receiver
class Receiver {
  doSomething(a) {
    console.log(`Receiver: Working on (${a}.)`);
  }

  doSomethingElse(b) {
    console.log(`Receiver: Also working on (${b}.)`);
  }
}

// Invoker
class Invoker {
  setOnStart(command) {
    this.onStart = command;
  }

  setOnFinish(command) {
    this.onFinish = command;
  }

  doSomethingImportant() {
    console.log("Invoker: Does anybody want something done before I begin?");
    if (this.onStart && this.onStart.execute) {
      this.onStart.execute();
    }

    console.log("Invoker: ...doing something really important...");

    console.log("Invoker: Does anybody want something done after I finish?");
    if (this.onFinish && this.onFinish.execute) {
      this.onFinish.execute();
    }
  }
}

// 使用例
const invoker = new Invoker();
invoker.setOnStart(new SimpleCommand("Say Hi!"));
const receiver = new Receiver();
invoker.setOnFinish(new ComplexCommand(receiver, "Send email", "Save report"));

invoker.doSomethingImportant();
