// キュー (Queue) - JavaScript実装

class Queue {
  constructor() {
    this.items = []; // キューの要素を格納する配列
    this.front = 0; // キューの先頭を示すインデックス
    this.rear = 0; // キューの末尾を示すインデックス
  }

  // 要素をキューに追加（エンキュー） - O(1)
  enqueue(element) {
    this.items[this.rear] = element;
    this.rear++;
  }

  // キューから要素を取り出し（デキュー） - O(1) amortized
  dequeue() {
    if (this.isEmpty()) {
      throw new Error("Queue is empty");
    }
    const element = this.items[this.front];
    delete this.items[this.front]; // メモリ解放
    this.front++;

    // キューが空になったらインデックスをリセット
    if (this.front === this.rear) {
      this.front = 0;
      this.rear = 0;
    }

    return element;
  }

  // キューの先頭の要素を確認（フロント） - O(1)
  peek() {
    if (this.isEmpty()) {
      throw new Error("Queue is empty");
    }
    return this.items[this.front];
  }

  // キューが空かどうかチェック - O(1)
  isEmpty() {
    return this.front === this.rear;
  }

  // キューのサイズを取得 - O(1)
  size() {
    return this.rear - this.front;
  }

  // キューの内容を表示 - O(n)
  toString() {
    if (this.isEmpty()) {
      return "Queue is empty";
    }

    let result = "Front -> ";
    for (let i = this.front; i < this.rear; i++) {
      result += this.items[i];
      if (i < this.rear - 1) result += " -> ";
    }
    return result + " <- Rear";
  }

  // キューをクリア - O(1)
  clear() {
    this.items = [];
    this.front = 0;
    this.rear = 0;
  }

  // キューの内容を配列として取得 - O(n)
  toArray() {
    const result = [];
    for (let i = this.front; i < this.rear; i++) {
      result.push(this.items[i]);
    }
    return result;
  }
}

// 循環キュー（サイズ固定版）
class CircularQueue {
  constructor(capacity = 10) {
    this.items = new Array(capacity);
    this.capacity = capacity;
    this.front = 0;
    this.rear = 0;
    this.count = 0;
  }

  // 要素を追加 - O(1)
  enqueue(element) {
    if (this.isFull()) {
      throw new Error("Queue is full");
    }
    this.items[this.rear] = element;
    this.rear = (this.rear + 1) % this.capacity;
    this.count++;
  }

  // 要素を取り出し - O(1)
  dequeue() {
    if (this.isEmpty()) {
      throw new Error("Queue is empty");
    }
    const element = this.items[this.front];
    this.front = (this.front + 1) % this.capacity;
    this.count--;
    return element;
  }

  // キューが満杯かチェック - O(1)
  isFull() {
    return this.count === this.capacity;
  }

  // キューが空かチェック - O(1)
  isEmpty() {
    return this.count === 0;
  }

  // キューのサイズ - O(1)
  size() {
    return this.count;
  }
}

// 使用例とキューの応用例

// 基本的な使用例
console.log("=== 基本的なキュー操作 ===");
const queue = new Queue();

// 要素の追加
queue.enqueue(10);
queue.enqueue(20);
queue.enqueue(30);
console.log(queue.toString()); // Front -> 10 -> 20 -> 30 <- Rear

// 先頭の要素を確認
console.log("先頭の要素:", queue.peek()); // 先頭の要素: 10

// 要素の取り出し
console.log("デキュー:", queue.dequeue()); // デキュー: 10
console.log("デキュー:", queue.dequeue()); // デキュー: 20
console.log(queue.toString()); // Front -> 30 <- Rear

// キューのサイズ
console.log("サイズ:", queue.size()); // サイズ: 1

// 応用例1: 幅優先探索（BFS）のシミュレーション
console.log("\n=== BFSシミュレーション ===");
function bfsSimulation(graph, start) {
  const queue = new Queue();
  const visited = new Set();
  const result = [];

  queue.enqueue(start);
  visited.add(start);

  while (!queue.isEmpty()) {
    const current = queue.dequeue();
    result.push(current);

    // 隣接ノードをキューに追加
    for (let neighbor of graph[current] || []) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.enqueue(neighbor);
      }
    }
  }

  return result;
}

const graph = {
  A: ["B", "C"],
  B: ["A", "D", "E"],
  C: ["A", "F"],
  D: ["B"],
  E: ["B", "F"],
  F: ["C", "E"],
};

console.log("BFS訪問順序:", bfsSimulation(graph, "A"));

// 応用例2: タスクスケジューラー
console.log("\n=== タスクスケジューラー ===");
class TaskScheduler {
  constructor() {
    this.taskQueue = new Queue();
  }

  addTask(task) {
    this.taskQueue.enqueue(task);
    console.log(`タスク追加: ${task}`);
  }

  executeNext() {
    if (this.taskQueue.isEmpty()) {
      console.log("実行するタスクがありません");
      return null;
    }
    const task = this.taskQueue.dequeue();
    console.log(`タスク実行: ${task}`);
    return task;
  }

  showPendingTasks() {
    console.log("待機中のタスク:", this.taskQueue.toArray());
  }
}

const scheduler = new TaskScheduler();
scheduler.addTask("メール送信");
scheduler.addTask("データ処理");
scheduler.addTask("レポート生成");
scheduler.showPendingTasks();
scheduler.executeNext();
scheduler.executeNext();
scheduler.showPendingTasks();
