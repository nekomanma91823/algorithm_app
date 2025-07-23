// スタック (Stack) - JavaScript実装

class Stack {
  constructor() {
    this.items = []; // スタックの要素を格納する配列
    this.top = -1; // スタックの頂上を示すインデックス
  }

  // 要素をスタックに追加（プッシュ） - O(1)
  push(element) {
    this.top++;
    this.items[this.top] = element;
    // または単純に: this.items.push(element);
  }

  // スタックから要素を取り出し（ポップ） - O(1)
  pop() {
    if (this.isEmpty()) {
      throw new Error("Stack is empty");
    }
    const element = this.items[this.top];
    this.top--;
    return element;
    // または単純に: return this.items.pop();
  }

  // スタックの頂上の要素を確認（ピーク） - O(1)
  peek() {
    if (this.isEmpty()) {
      throw new Error("Stack is empty");
    }
    return this.items[this.top];
  }

  // スタックが空かどうかチェック - O(1)
  isEmpty() {
    return this.top === -1;
    // または: return this.items.length === 0;
  }

  // スタックのサイズを取得 - O(1)
  size() {
    return this.top + 1;
    // または: return this.items.length;
  }

  // スタックの内容を表示 - O(n)
  toString() {
    if (this.isEmpty()) {
      return "Stack is empty";
    }

    let result = "Top -> ";
    for (let i = this.top; i >= 0; i--) {
      result += this.items[i];
      if (i > 0) result += " -> ";
    }
    return result + " <- Bottom";
  }

  // スタックをクリア - O(1)
  clear() {
    this.items = [];
    this.top = -1;
  }

  // スタックの内容を配列として取得 - O(n)
  toArray() {
    return this.items.slice(0, this.top + 1).reverse();
  }
}

// 使用例とスタックの応用例

// 基本的な使用例
console.log("=== 基本的なスタック操作 ===");
const stack = new Stack();

// 要素の追加
stack.push(10);
stack.push(20);
stack.push(30);
console.log(stack.toString()); // Top -> 30 -> 20 -> 10 <- Bottom

// 頂上の要素を確認
console.log("頂上の要素:", stack.peek()); // 頂上の要素: 30

// 要素の取り出し
console.log("ポップ:", stack.pop()); // ポップ: 30
console.log("ポップ:", stack.pop()); // ポップ: 20
console.log(stack.toString()); // Top -> 10 <- Bottom

// スタックのサイズ
console.log("サイズ:", stack.size()); // サイズ: 1

// 応用例1: 括弧の対応チェック
console.log("\n=== 括弧の対応チェック ===");
function isBalancedParentheses(str) {
  const stack = new Stack();
  const pairs = {
    ")": "(",
    "}": "{",
    "]": "[",
  };

  for (let char of str) {
    if (char === "(" || char === "{" || char === "[") {
      stack.push(char);
    } else if (char === ")" || char === "}" || char === "]") {
      if (stack.isEmpty() || stack.pop() !== pairs[char]) {
        return false;
      }
    }
  }

  return stack.isEmpty();
}

console.log(isBalancedParentheses("()[]{}")); // true
console.log(isBalancedParentheses("([{}])")); // true
console.log(isBalancedParentheses("([)]")); // false
console.log(isBalancedParentheses("((()")); // false

// 応用例2: 逆ポーランド記法の計算
console.log("\n=== 逆ポーランド記法の計算 ===");
function evaluateRPN(tokens) {
  const stack = new Stack();

  for (let token of tokens) {
    if (["+", "-", "*", "/"].includes(token)) {
      const b = stack.pop();
      const a = stack.pop();
      let result;

      switch (token) {
        case "+":
          result = a + b;
          break;
        case "-":
          result = a - b;
          break;
        case "*":
          result = a * b;
          break;
        case "/":
          result = Math.floor(a / b);
          break;
      }
      stack.push(result);
    } else {
      stack.push(parseInt(token));
    }
  }

  return stack.pop();
}

console.log(evaluateRPN(["2", "1", "+", "3", "*"])); // (2 + 1) * 3 = 9
console.log(evaluateRPN(["4", "13", "5", "/", "+"])); // 4 + (13 / 5) = 6
