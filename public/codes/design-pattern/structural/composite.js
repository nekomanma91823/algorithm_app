// Component インターフェース
class Component {
  operation() {
    throw new Error("operation() must be implemented");
  }

  add(component) {
    throw new Error("add() not supported");
  }

  remove(component) {
    throw new Error("remove() not supported");
  }

  getChild(index) {
    throw new Error("getChild() not supported");
  }
}

// Leaf クラス
class Leaf extends Component {
  operation() {
    return "Leaf";
  }
}

// Composite クラス
class Composite extends Component {
  constructor() {
    super();
    this.children = [];
  }

  add(component) {
    this.children.push(component);
  }

  remove(component) {
    const index = this.children.indexOf(component);
    if (index !== -1) {
      this.children.splice(index, 1);
    }
  }

  getChild(index) {
    return this.children[index];
  }

  operation() {
    const results = [];
    for (const child of this.children) {
      results.push(child.operation());
    }
    return `Branch(${results.join("+")})`;
  }
}

// Client Code
function clientCode(component) {
  console.log(`RESULT: ${component.operation()}`);
}

function clientCode2(component1, component2) {
  if (component1.add && component2) {
    component1.add(component2);
  }
  console.log(`RESULT: ${component1.operation()}`);
}

// 使用例
const simple = new Leaf();
console.log("Client: I've got a simple component:");
clientCode(simple);
console.log("");

const tree = new Composite();
const branch1 = new Composite();
branch1.add(new Leaf());
branch1.add(new Leaf());
const branch2 = new Composite();
branch2.add(new Leaf());
tree.add(branch1);
tree.add(branch2);
console.log("Client: Now I've got a composite tree:");
clientCode(tree);
console.log("");

console.log(
  "Client: I don't need to check the components classes even when managing the tree:"
);
clientCode2(tree, simple);
