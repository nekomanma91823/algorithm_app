// 配列 (Array) - JavaScript実装

class Array {
  constructor(size = 10) {
    this.data = new Array(size); // 固定サイズの配列を作成
    this.length = 0; // 現在の要素数
    this.capacity = size; // 配列の容量
  }

  // 要素へのアクセス - O(1)
  get(index) {
    if (index < 0 || index >= this.length) {
      throw new Error("Index out of bounds");
    }
    return this.data[index];
  }

  // 要素の設定 - O(1)
  set(index, value) {
    if (index < 0 || index >= this.length) {
      throw new Error("Index out of bounds");
    }
    this.data[index] = value;
  }

  // 末尾に要素を追加 - O(1) amortized
  push(value) {
    if (this.length >= this.capacity) {
      this._resize(); // 容量が足りない場合は配列を拡張
    }
    this.data[this.length] = value;
    this.length++;
  }

  // 末尾から要素を削除 - O(1)
  pop() {
    if (this.length === 0) {
      throw new Error("Array is empty");
    }
    const value = this.data[this.length - 1];
    this.length--;
    return value;
  }

  // 指定位置に要素を挿入 - O(n)
  insert(index, value) {
    if (index < 0 || index > this.length) {
      throw new Error("Index out of bounds");
    }

    if (this.length >= this.capacity) {
      this._resize();
    }

    // 要素を右にシフト
    for (let i = this.length; i > index; i--) {
      this.data[i] = this.data[i - 1];
    }

    this.data[index] = value;
    this.length++;
  }

  // 指定位置の要素を削除 - O(n)
  delete(index) {
    if (index < 0 || index >= this.length) {
      throw new Error("Index out of bounds");
    }

    const value = this.data[index];

    // 要素を左にシフト
    for (let i = index; i < this.length - 1; i++) {
      this.data[i] = this.data[i + 1];
    }

    this.length--;
    return value;
  }

  // 要素の検索 - O(n)
  search(value) {
    for (let i = 0; i < this.length; i++) {
      if (this.data[i] === value) {
        return i; // 見つかった場合はインデックスを返す
      }
    }
    return -1; // 見つからない場合は-1を返す
  }

  // 配列の容量を拡張 - O(n)
  _resize() {
    const newCapacity = this.capacity * 2;
    const newData = new Array(newCapacity);

    // 既存の要素をコピー
    for (let i = 0; i < this.length; i++) {
      newData[i] = this.data[i];
    }

    this.data = newData;
    this.capacity = newCapacity;
  }

  // 配列の内容を表示
  toString() {
    const elements = [];
    for (let i = 0; i < this.length; i++) {
      elements.push(this.data[i]);
    }
    return `[${elements.join(", ")}]`;
  }
}

// 使用例
const myArray = new Array(5);

// 要素の追加
myArray.push(10);
myArray.push(20);
myArray.push(30);
console.log(myArray.toString()); // [10, 20, 30]

// 要素へのアクセス
console.log(myArray.get(1)); // 20

// 要素の挿入
myArray.insert(1, 15);
console.log(myArray.toString()); // [10, 15, 20, 30]

// 要素の削除
myArray.delete(2);
console.log(myArray.toString()); // [10, 15, 30]

// 要素の検索
console.log(myArray.search(15)); // 1
console.log(myArray.search(100)); // -1
