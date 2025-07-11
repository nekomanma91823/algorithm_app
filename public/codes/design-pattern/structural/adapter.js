// Target インターフェース
class Target {
  request() {
    return "Target: The default target's behavior.";
  }
}

// Adaptee クラス（適応させたいクラス）
class Adaptee {
  specificRequest() {
    return ".eetpadA eht fo roivaheb laicepS";
  }
}

// Adapter クラス
class Adapter extends Target {
  constructor(adaptee) {
    super();
    this.adaptee = adaptee;
  }

  request() {
    const result = this.adaptee.specificRequest().split("").reverse().join("");
    return `Adapter: (TRANSLATED) ${result}`;
  }
}

// Client Code
function clientCode(target) {
  console.log(target.request());
}

// 使用例
console.log("Client: I can work just fine with the Target objects:");
const target = new Target();
clientCode(target);

console.log("");

const adaptee = new Adaptee();
console.log(
  `Client: The Adaptee class has a weird interface. See, I don't understand it:`
);
console.log(`Adaptee: ${adaptee.specificRequest()}`);

console.log("");

console.log("Client: But I can work with it via the Adapter:");
const adapter = new Adapter(adaptee);
clientCode(adapter);
