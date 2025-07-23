// ヒープ (Heap) - JavaScript実装
// 最大ヒープの実装（親ノードが子ノードより大きい）

class MaxHeap {
  constructor() {
    this.heap = []; // ヒープを配列で表現
  }

  // 親のインデックスを取得
  _getParentIndex(index) {
    return Math.floor((index - 1) / 2);
  }

  // 左の子のインデックスを取得
  _getLeftChildIndex(index) {
    return 2 * index + 1;
  }

  // 右の子のインデックスを取得
  _getRightChildIndex(index) {
    return 2 * index + 2;
  }

  // 親が存在するかチェック
  _hasParent(index) {
    return this._getParentIndex(index) >= 0;
  }

  // 左の子が存在するかチェック
  _hasLeftChild(index) {
    return this._getLeftChildIndex(index) < this.heap.length;
  }

  // 右の子が存在するかチェック
  _hasRightChild(index) {
    return this._getRightChildIndex(index) < this.heap.length;
  }

  // 親の値を取得
  _parent(index) {
    return this.heap[this._getParentIndex(index)];
  }

  // 左の子の値を取得
  _leftChild(index) {
    return this.heap[this._getLeftChildIndex(index)];
  }

  // 右の子の値を取得
  _rightChild(index) {
    return this.heap[this._getRightChildIndex(index)];
  }

  // 2つの要素を交換
  _swap(index1, index2) {
    [this.heap[index1], this.heap[index2]] = [
      this.heap[index2],
      this.heap[index1],
    ];
  }

  // ヒープの最大値を取得（削除しない） - O(1)
  peek() {
    if (this.heap.length === 0) {
      throw new Error("Heap is empty");
    }
    return this.heap[0];
  }

  // 要素を挿入 - O(log n)
  insert(value) {
    this.heap.push(value); // 末尾に追加
    this._heapifyUp(); // ヒープ性質を維持
  }

  // 最大値を削除して返す - O(log n)
  extractMax() {
    if (this.heap.length === 0) {
      throw new Error("Heap is empty");
    }

    if (this.heap.length === 1) {
      return this.heap.pop();
    }

    const max = this.heap[0]; // 最大値を保存
    this.heap[0] = this.heap.pop(); // 最後の要素を根に移動
    this._heapifyDown(); // ヒープ性質を維持
    return max;
  }

  // 上向きにヒープ化（挿入時）
  _heapifyUp() {
    let index = this.heap.length - 1;

    while (this._hasParent(index) && this._parent(index) < this.heap[index]) {
      this._swap(this._getParentIndex(index), index);
      index = this._getParentIndex(index);
    }
  }

  // 下向きにヒープ化（削除時）
  _heapifyDown() {
    let index = 0;

    while (this._hasLeftChild(index)) {
      let largerChildIndex = this._getLeftChildIndex(index);

      // 右の子の方が大きい場合
      if (
        this._hasRightChild(index) &&
        this._rightChild(index) > this._leftChild(index)
      ) {
        largerChildIndex = this._getRightChildIndex(index);
      }

      // 親の方が大きい場合は終了
      if (this.heap[index] > this.heap[largerChildIndex]) {
        break;
      }

      this._swap(index, largerChildIndex);
      index = largerChildIndex;
    }
  }

  // ヒープのサイズを取得 - O(1)
  size() {
    return this.heap.length;
  }

  // ヒープが空かチェック - O(1)
  isEmpty() {
    return this.heap.length === 0;
  }

  // ヒープの内容を配列として取得 - O(1)
  toArray() {
    return [...this.heap];
  }

  // ヒープの内容を表示
  toString() {
    return `[${this.heap.join(", ")}]`;
  }

  // ヒープをクリア - O(1)
  clear() {
    this.heap = [];
  }
}

// 最小ヒープの実装
class MinHeap {
  constructor() {
    this.heap = [];
  }

  _getParentIndex(index) {
    return Math.floor((index - 1) / 2);
  }
  _getLeftChildIndex(index) {
    return 2 * index + 1;
  }
  _getRightChildIndex(index) {
    return 2 * index + 2;
  }
  _hasParent(index) {
    return this._getParentIndex(index) >= 0;
  }
  _hasLeftChild(index) {
    return this._getLeftChildIndex(index) < this.heap.length;
  }
  _hasRightChild(index) {
    return this._getRightChildIndex(index) < this.heap.length;
  }
  _parent(index) {
    return this.heap[this._getParentIndex(index)];
  }
  _leftChild(index) {
    return this.heap[this._getLeftChildIndex(index)];
  }
  _rightChild(index) {
    return this.heap[this._getRightChildIndex(index)];
  }
  _swap(index1, index2) {
    [this.heap[index1], this.heap[index2]] = [
      this.heap[index2],
      this.heap[index1],
    ];
  }

  peek() {
    if (this.heap.length === 0) throw new Error("Heap is empty");
    return this.heap[0];
  }

  insert(value) {
    this.heap.push(value);
    this._heapifyUp();
  }

  extractMin() {
    if (this.heap.length === 0) throw new Error("Heap is empty");
    if (this.heap.length === 1) return this.heap.pop();

    const min = this.heap[0];
    this.heap[0] = this.heap.pop();
    this._heapifyDown();
    return min;
  }

  _heapifyUp() {
    let index = this.heap.length - 1;
    while (this._hasParent(index) && this._parent(index) > this.heap[index]) {
      this._swap(this._getParentIndex(index), index);
      index = this._getParentIndex(index);
    }
  }

  _heapifyDown() {
    let index = 0;
    while (this._hasLeftChild(index)) {
      let smallerChildIndex = this._getLeftChildIndex(index);
      if (
        this._hasRightChild(index) &&
        this._rightChild(index) < this._leftChild(index)
      ) {
        smallerChildIndex = this._getRightChildIndex(index);
      }
      if (this.heap[index] < this.heap[smallerChildIndex]) break;
      this._swap(index, smallerChildIndex);
      index = smallerChildIndex;
    }
  }

  size() {
    return this.heap.length;
  }
  isEmpty() {
    return this.heap.length === 0;
  }
  toArray() {
    return [...this.heap];
  }
  toString() {
    return `[${this.heap.join(", ")}]`;
  }
}

// 優先度キューの実装（最小ヒープを使用）
class PriorityQueue {
  constructor() {
    this.heap = [];
  }

  // 要素を優先度付きで追加
  enqueue(item, priority) {
    this.heap.push({ item, priority });
    this._heapifyUp();
  }

  // 最高優先度の要素を取り出し
  dequeue() {
    if (this.heap.length === 0) return null;
    if (this.heap.length === 1) return this.heap.pop().item;

    const item = this.heap[0].item;
    this.heap[0] = this.heap.pop();
    this._heapifyDown();
    return item;
  }

  _heapifyUp() {
    let index = this.heap.length - 1;
    while (index > 0) {
      const parentIndex = Math.floor((index - 1) / 2);
      if (this.heap[parentIndex].priority <= this.heap[index].priority) break;
      [this.heap[parentIndex], this.heap[index]] = [
        this.heap[index],
        this.heap[parentIndex],
      ];
      index = parentIndex;
    }
  }

  _heapifyDown() {
    let index = 0;
    while (true) {
      let smallest = index;
      const leftChild = 2 * index + 1;
      const rightChild = 2 * index + 2;

      if (
        leftChild < this.heap.length &&
        this.heap[leftChild].priority < this.heap[smallest].priority
      ) {
        smallest = leftChild;
      }

      if (
        rightChild < this.heap.length &&
        this.heap[rightChild].priority < this.heap[smallest].priority
      ) {
        smallest = rightChild;
      }

      if (smallest === index) break;
      [this.heap[index], this.heap[smallest]] = [
        this.heap[smallest],
        this.heap[index],
      ];
      index = smallest;
    }
  }

  peek() {
    return this.heap.length > 0 ? this.heap[0].item : null;
  }

  isEmpty() {
    return this.heap.length === 0;
  }

  size() {
    return this.heap.length;
  }
}

// 使用例
console.log("=== 最大ヒープの操作 ===");
const maxHeap = new MaxHeap();

// 要素の挿入
[10, 20, 15, 30, 25].forEach((value) => {
  maxHeap.insert(value);
  console.log(`${value}を挿入: ${maxHeap.toString()}`);
});

// 最大値の確認
console.log("最大値:", maxHeap.peek());

// 最大値の削除
while (!maxHeap.isEmpty()) {
  console.log("削除:", maxHeap.extractMax(), "残り:", maxHeap.toString());
}

console.log("\n=== 最小ヒープの操作 ===");
const minHeap = new MinHeap();
[10, 20, 15, 30, 25].forEach((value) => minHeap.insert(value));
console.log("最小ヒープ:", minHeap.toString());
console.log("最小値:", minHeap.peek());

console.log("\n=== 優先度キューの操作 ===");
const pq = new PriorityQueue();
pq.enqueue("低優先度タスク", 3);
pq.enqueue("高優先度タスク", 1);
pq.enqueue("中優先度タスク", 2);

while (!pq.isEmpty()) {
  console.log("実行:", pq.dequeue());
}
