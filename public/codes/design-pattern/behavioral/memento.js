// Memento
class Memento {
  constructor(state) {
    this.state = state;
    this.date = new Date().toISOString().slice(0, 19).replace("T", " ");
  }

  getState() {
    return this.state;
  }

  getName() {
    return `${this.date} / (${this.state.substr(0, 9)}...)`;
  }

  getDate() {
    return this.date;
  }
}

// Originator
class Originator {
  constructor(state) {
    this.state = state;
    console.log(`Originator: My initial state is: ${state}`);
  }

  doSomething() {
    console.log("Originator: I'm doing something important.");
    this.state = this.generateRandomString(30);
    console.log(`Originator: and my state has changed to: ${this.state}`);
  }

  generateRandomString(length = 10) {
    const charSet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    return Array.from(
      { length },
      () => charSet[Math.floor(Math.random() * charSet.length)]
    ).join("");
  }

  save() {
    return new Memento(this.state);
  }

  restore(memento) {
    this.state = memento.getState();
    console.log(`Originator: My state has changed to: ${this.state}`);
  }
}

// Caretaker
class Caretaker {
  constructor(originator) {
    this.mementos = [];
    this.originator = originator;
  }

  backup() {
    console.log("\nCaretaker: Saving Originator's state...");
    this.mementos.push(this.originator.save());
  }

  undo() {
    if (!this.mementos.length) {
      return;
    }
    const memento = this.mementos.pop();

    console.log(`Caretaker: Restoring state to: ${memento.getName()}`);
    try {
      this.originator.restore(memento);
    } catch (e) {
      this.undo();
    }
  }

  showHistory() {
    console.log("Caretaker: Here's the list of mementos:");
    for (const memento of this.mementos) {
      console.log(memento.getName());
    }
  }
}

// 使用例
const originator = new Originator("Super-duper-super-puper-super.");
const caretaker = new Caretaker(originator);

caretaker.backup();
originator.doSomething();

caretaker.backup();
originator.doSomething();

caretaker.backup();
originator.doSomething();

console.log("");
caretaker.showHistory();

console.log("\nClient: Now, let's rollback!\n");
caretaker.undo();

console.log("\nClient: Once more!\n");
caretaker.undo();
