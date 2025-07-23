// 連結リスト (Linked List) - JavaScript実装

// ノードクラス：データと次のノードへの参照を持つ
class Node {
  constructor(data) {
    this.data = data; // ノードが保持するデータ
    this.next = null; // 次のノードへの参照
  }
}

// 単方向連結リスト
class LinkedList {
  constructor() {
    this.head = null; // リストの先頭ノード
    this.size = 0; // リストのサイズ
  }

  // リストの先頭に要素を追加 - O(1)
  prepend(data) {
    const newNode = new Node(data);
    newNode.next = this.head;
    this.head = newNode;
    this.size++;
  }

  // リストの末尾に要素を追加 - O(n)
  append(data) {
    const newNode = new Node(data);

    if (!this.head) {
      this.head = newNode;
    } else {
      let current = this.head;
      while (current.next) {
        current = current.next;
      }
      current.next = newNode;
    }
    this.size++;
  }

  // 指定位置に要素を挿入 - O(n)
  insert(index, data) {
    if (index < 0 || index > this.size) {
      throw new Error("Index out of bounds");
    }

    if (index === 0) {
      this.prepend(data);
      return;
    }

    const newNode = new Node(data);
    let current = this.head;

    for (let i = 0; i < index - 1; i++) {
      current = current.next;
    }

    newNode.next = current.next;
    current.next = newNode;
    this.size++;
  }

  // 指定位置の要素を削除 - O(n)
  delete(index) {
    if (index < 0 || index >= this.size) {
      throw new Error("Index out of bounds");
    }

    if (index === 0) {
      const data = this.head.data;
      this.head = this.head.next;
      this.size--;
      return data;
    }

    let current = this.head;
    for (let i = 0; i < index - 1; i++) {
      current = current.next;
    }

    const data = current.next.data;
    current.next = current.next.next;
    this.size--;
    return data;
  }

  // 指定位置の要素を取得 - O(n)
  get(index) {
    if (index < 0 || index >= this.size) {
      throw new Error("Index out of bounds");
    }

    let current = this.head;
    for (let i = 0; i < index; i++) {
      current = current.next;
    }
    return current.data;
  }

  // 要素を検索 - O(n)
  search(data) {
    let current = this.head;
    let index = 0;

    while (current) {
      if (current.data === data) {
        return index;
      }
      current = current.next;
      index++;
    }
    return -1; // 見つからない場合
  }

  // リストが空かどうかチェック - O(1)
  isEmpty() {
    return this.head === null;
  }

  // リストのサイズを取得 - O(1)
  getSize() {
    return this.size;
  }

  // リストの内容を配列として取得 - O(n)
  toArray() {
    const result = [];
    let current = this.head;

    while (current) {
      result.push(current.data);
      current = current.next;
    }
    return result;
  }

  // リストの内容を表示 - O(n)
  toString() {
    const elements = this.toArray();
    return elements.join(" -> ") + " -> null";
  }

  // リストをクリア - O(1)
  clear() {
    this.head = null;
    this.size = 0;
  }
}

// 使用例
const list = new LinkedList();

// 要素の追加
list.append(10);
list.append(20);
list.append(30);
console.log(list.toString()); // 10 -> 20 -> 30 -> null

// 先頭に要素を追加
list.prepend(5);
console.log(list.toString()); // 5 -> 10 -> 20 -> 30 -> null

// 指定位置に要素を挿入
list.insert(2, 15);
console.log(list.toString()); // 5 -> 10 -> 15 -> 20 -> 30 -> null

// 要素の取得
console.log(list.get(2)); // 15

// 要素の検索
console.log(list.search(20)); // 3
console.log(list.search(100)); // -1

// 要素の削除
const deleted = list.delete(1);
console.log(`削除された要素: ${deleted}`); // 削除された要素: 10
console.log(list.toString()); // 5 -> 15 -> 20 -> 30 -> null

// リストのサイズ
console.log(`リストのサイズ: ${list.getSize()}`); // リストのサイズ: 4
