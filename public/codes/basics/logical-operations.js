// 論理演算の実装例
class LogicalOperations {
  // 基本的な論理演算
  static and(a, b) {
    return a && b;
  }

  static or(a, b) {
    return a || b;
  }

  static not(a) {
    return !a;
  }

  static xor(a, b) {
    return (a || b) && !(a && b);
  }

  static nand(a, b) {
    return !this.and(a, b);
  }

  static nor(a, b) {
    return !this.or(a, b);
  }

  // 真理値表の生成
  static generateTruthTable(operation) {
    const results = [];
    const inputs = [
      [false, false],
      [false, true],
      [true, false],
      [true, true],
    ];

    for (const [a, b] of inputs) {
      let result;
      switch (operation) {
        case "AND":
          result = this.and(a, b);
          break;
        case "OR":
          result = this.or(a, b);
          break;
        case "XOR":
          result = this.xor(a, b);
          break;
        case "NAND":
          result = this.nand(a, b);
          break;
        case "NOR":
          result = this.nor(a, b);
          break;
        default:
          result = false;
      }
      results.push({
        a: a,
        b: b,
        result: result,
      });
    }
    return results;
  }

  // 複合論理式の評価
  static evaluateExpression(a, b, c) {
    // 例: (A AND B) OR (NOT C)
    return this.or(this.and(a, b), this.not(c));
  }

  // ド・モルガンの法則の実証
  static demonstrateDeMorgan(a, b) {
    // NOT(A AND B) = (NOT A) OR (NOT B)
    const left = this.not(this.and(a, b));
    const right = this.or(this.not(a), this.not(b));

    // NOT(A OR B) = (NOT A) AND (NOT B)
    const left2 = this.not(this.or(a, b));
    const right2 = this.and(this.not(a), this.not(b));

    return {
      rule1: { left, right, equal: left === right },
      rule2: { left: left2, right: right2, equal: left2 === right2 },
    };
  }
}

// 使用例とテスト
console.log("=== 基本的な論理演算 ===");
console.log(`true AND false = ${LogicalOperations.and(true, false)}`);
console.log(`true OR false = ${LogicalOperations.or(true, false)}`);
console.log(`NOT true = ${LogicalOperations.not(true)}`);
console.log(`true XOR false = ${LogicalOperations.xor(true, false)}`);

console.log("\n=== AND演算の真理値表 ===");
const andTable = LogicalOperations.generateTruthTable("AND");
andTable.forEach((row) => {
  console.log(`${row.a} AND ${row.b} = ${row.result}`);
});

console.log("\n=== ド・モルガンの法則の実証 ===");
const deMorgan = LogicalOperations.demonstrateDeMorgan(true, false);
console.log(`規則1が成立: ${deMorgan.rule1.equal}`);
console.log(`規則2が成立: ${deMorgan.rule2.equal}`);
