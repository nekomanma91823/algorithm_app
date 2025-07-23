// 集合演算の実装
class SetOperations {
  constructor(elements = []) {
    // 重複を除いた配列として集合を表現
    this.elements = [...new Set(elements)];
  }

  // 要素を追加
  add(element) {
    if (!this.has(element)) {
      this.elements.push(element);
    }
    return this;
  }

  // 要素を削除
  remove(element) {
    this.elements = this.elements.filter((e) => e !== element);
    return this;
  }

  // 要素が含まれているかチェック
  has(element) {
    return this.elements.includes(element);
  }

  // 集合のサイズ
  size() {
    return this.elements.length;
  }

  // 和集合（Union）
  union(other) {
    const unionElements = [...this.elements, ...other.elements];
    return new SetOperations(unionElements);
  }

  // 積集合（Intersection）
  intersection(other) {
    const intersectionElements = this.elements.filter((element) =>
      other.has(element)
    );
    return new SetOperations(intersectionElements);
  }

  // 差集合（Difference）
  difference(other) {
    const differenceElements = this.elements.filter(
      (element) => !other.has(element)
    );
    return new SetOperations(differenceElements);
  }

  // 対称差集合（Symmetric Difference）
  symmetricDifference(other) {
    const leftDiff = this.difference(other);
    const rightDiff = other.difference(this);
    return leftDiff.union(rightDiff);
  }

  // 部分集合かどうかチェック
  isSubsetOf(other) {
    return this.elements.every((element) => other.has(element));
  }

  // 上位集合かどうかチェック
  isSupersetOf(other) {
    return other.isSubsetOf(this);
  }

  // 空集合かどうかチェック
  isEmpty() {
    return this.elements.length === 0;
  }

  // 集合を配列として取得
  toArray() {
    return [...this.elements];
  }

  // 集合を文字列として表現
  toString() {
    return `{${this.elements.join(", ")}}`;
  }

  // ベン図的な表現（簡易版）
  static visualizeRelation(setA, setB, operation) {
    const aOnly = setA.difference(setB);
    const bOnly = setB.difference(setA);
    const both = setA.intersection(setB);

    console.log("=== ベン図的な表現 ===");
    console.log(`A のみ: ${aOnly.toString()}`);
    console.log(`B のみ: ${bOnly.toString()}`);
    console.log(`A ∩ B: ${both.toString()}`);

    let result;
    switch (operation) {
      case "union":
        result = setA.union(setB);
        console.log(`A ∪ B: ${result.toString()}`);
        break;
      case "intersection":
        result = setA.intersection(setB);
        console.log(`A ∩ B: ${result.toString()}`);
        break;
      case "difference":
        result = setA.difference(setB);
        console.log(`A - B: ${result.toString()}`);
        break;
      default:
        result = setA;
    }

    return result;
  }
}

// 使用例
console.log("=== 集合演算の例 ===");

// 集合の作成
const numbersA = new SetOperations([1, 2, 3, 4, 5]);
const numbersB = new SetOperations([4, 5, 6, 7, 8]);

console.log(`集合A: ${numbersA.toString()}`);
console.log(`集合B: ${numbersB.toString()}`);

// 基本演算
console.log(`\n=== 基本演算 ===`);
console.log(`A ∪ B (和集合): ${numbersA.union(numbersB).toString()}`);
console.log(`A ∩ B (積集合): ${numbersA.intersection(numbersB).toString()}`);
console.log(`A - B (差集合): ${numbersA.difference(numbersB).toString()}`);
console.log(`B - A (差集合): ${numbersB.difference(numbersA).toString()}`);

// 関係のチェック
console.log(`\n=== 集合の関係 ===`);
const subset = new SetOperations([1, 2, 3]);
console.log(`{1, 2, 3} は A の部分集合: ${subset.isSubsetOf(numbersA)}`);
console.log(`A は {1, 2, 3} の上位集合: ${numbersA.isSupersetOf(subset)}`);

// 実際の例：プログラミング言語
console.log(`\n=== 実用例：プログラミング言語 ===`);
const webLanguages = new SetOperations([
  "JavaScript",
  "HTML",
  "CSS",
  "TypeScript",
]);
const systemLanguages = new SetOperations(["C", "C++", "Rust", "Go"]);
const popularLanguages = new SetOperations([
  "JavaScript",
  "Python",
  "Java",
  "C++",
]);

console.log(`Web開発言語: ${webLanguages.toString()}`);
console.log(`システム言語: ${systemLanguages.toString()}`);
console.log(`人気言語: ${popularLanguages.toString()}`);

console.log(
  `\nWeb開発と人気言語の共通: ${webLanguages
    .intersection(popularLanguages)
    .toString()}`
);
console.log(
  `システムと人気言語の共通: ${systemLanguages
    .intersection(popularLanguages)
    .toString()}`
);
