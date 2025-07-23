// AVL木 (AVL Tree) - JavaScript実装

class AVLNode {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
    this.height = 1; // ノードの高さ
  }
}

class AVLTree {
  constructor() {
    this.root = null;
  }

  // ノードの高さを取得
  getHeight(node) {
    return node ? node.height : 0;
  }

  // バランス因子を取得
  getBalance(node) {
    return node ? this.getHeight(node.left) - this.getHeight(node.right) : 0;
  }

  // 右回転
  rotateRight(y) {
    const x = y.left;
    const T2 = x.right;

    // 回転実行
    x.right = y;
    y.left = T2;

    // 高さを更新
    y.height = Math.max(this.getHeight(y.left), this.getHeight(y.right)) + 1;
    x.height = Math.max(this.getHeight(x.left), this.getHeight(x.right)) + 1;

    return x;
  }

  // 左回転
  rotateLeft(x) {
    const y = x.right;
    const T2 = y.left;

    // 回転実行
    y.left = x;
    x.right = T2;

    // 高さを更新
    x.height = Math.max(this.getHeight(x.left), this.getHeight(x.right)) + 1;
    y.height = Math.max(this.getHeight(y.left), this.getHeight(y.right)) + 1;

    return y;
  }

  // 要素を挿入
  insert(data) {
    this.root = this._insert(this.root, data);
  }

  _insert(node, data) {
    // 1. 通常のBST挿入
    if (node === null) {
      return new AVLNode(data);
    }

    if (data < node.data) {
      node.left = this._insert(node.left, data);
    } else if (data > node.data) {
      node.right = this._insert(node.right, data);
    } else {
      return node; // 重複は許可しない
    }

    // 2. 高さを更新
    node.height =
      1 + Math.max(this.getHeight(node.left), this.getHeight(node.right));

    // 3. バランス因子を取得
    const balance = this.getBalance(node);

    // 4. バランスが崩れている場合は回転
    // Left Left Case
    if (balance > 1 && data < node.left.data) {
      return this.rotateRight(node);
    }

    // Right Right Case
    if (balance < -1 && data > node.right.data) {
      return this.rotateLeft(node);
    }

    // Left Right Case
    if (balance > 1 && data > node.left.data) {
      node.left = this.rotateLeft(node.left);
      return this.rotateRight(node);
    }

    // Right Left Case
    if (balance < -1 && data < node.right.data) {
      node.right = this.rotateRight(node.right);
      return this.rotateLeft(node);
    }

    return node;
  }

  // 要素を検索
  search(data) {
    return this._search(this.root, data);
  }

  _search(node, data) {
    if (node === null || node.data === data) {
      return node !== null;
    }

    if (data < node.data) {
      return this._search(node.left, data);
    } else {
      return this._search(node.right, data);
    }
  }

  // 中順巡回
  inorderTraversal() {
    const result = [];
    this._inorder(this.root, result);
    return result;
  }

  _inorder(node, result) {
    if (node !== null) {
      this._inorder(node.left, result);
      result.push(node.data);
      this._inorder(node.right, result);
    }
  }

  // 木の高さを取得
  getTreeHeight() {
    return this.getHeight(this.root);
  }

  // バランスが取れているかチェック
  isBalanced() {
    return this._isBalanced(this.root);
  }

  _isBalanced(node) {
    if (node === null) return true;

    const balance = this.getBalance(node);
    return (
      Math.abs(balance) <= 1 &&
      this._isBalanced(node.left) &&
      this._isBalanced(node.right)
    );
  }
}

// 使用例
console.log("=== AVL木の操作 ===");
const avl = new AVLTree();

// 要素の挿入（バランスが自動的に保たれる）
const values = [10, 20, 30, 40, 50, 25];
values.forEach((value) => {
  avl.insert(value);
  console.log(
    `${value}を挿入 - 高さ: ${avl.getTreeHeight()}, バランス: ${avl.isBalanced()}`
  );
});

console.log("中順巡回:", avl.inorderTraversal());
console.log("最終的な高さ:", avl.getTreeHeight());
console.log("バランスが取れている?", avl.isBalanced());

// 検索
console.log("25が存在?", avl.search(25));
console.log("100が存在?", avl.search(100));
