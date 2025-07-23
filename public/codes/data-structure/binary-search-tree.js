// 二分探索木 (Binary Search Tree) - JavaScript実装

// ノードクラス
class TreeNode {
  constructor(data) {
    this.data = data; // ノードが保持するデータ
    this.left = null; // 左の子ノード
    this.right = null; // 右の子ノード
  }
}

// 二分探索木クラス
class BinarySearchTree {
  constructor() {
    this.root = null; // 木の根ノード
    this.size = 0; // 木のサイズ
  }

  // 要素を挿入 - 平均 O(log n), 最悪 O(n)
  insert(data) {
    const newNode = new TreeNode(data);

    if (this.root === null) {
      this.root = newNode;
    } else {
      this._insertNode(this.root, newNode);
    }
    this.size++;
  }

  // ノードを挿入する再帰的なヘルパー関数
  _insertNode(node, newNode) {
    if (newNode.data < node.data) {
      if (node.left === null) {
        node.left = newNode;
      } else {
        this._insertNode(node.left, newNode);
      }
    } else if (newNode.data > node.data) {
      if (node.right === null) {
        node.right = newNode;
      } else {
        this._insertNode(node.right, newNode);
      }
    }
    // 重複する値は挿入しない
  }

  // 要素を検索 - 平均 O(log n), 最悪 O(n)
  search(data) {
    return this._searchNode(this.root, data);
  }

  // ノードを検索する再帰的なヘルパー関数
  _searchNode(node, data) {
    if (node === null) {
      return false;
    }

    if (data === node.data) {
      return true;
    } else if (data < node.data) {
      return this._searchNode(node.left, data);
    } else {
      return this._searchNode(node.right, data);
    }
  }

  // 要素を削除 - 平均 O(log n), 最悪 O(n)
  delete(data) {
    this.root = this._deleteNode(this.root, data);
  }

  // ノードを削除する再帰的なヘルパー関数
  _deleteNode(node, data) {
    if (node === null) {
      return node;
    }

    if (data < node.data) {
      node.left = this._deleteNode(node.left, data);
    } else if (data > node.data) {
      node.right = this._deleteNode(node.right, data);
    } else {
      // 削除するノードが見つかった場合
      this.size--;

      // ケース1: 葉ノード（子がない）
      if (node.left === null && node.right === null) {
        return null;
      }

      // ケース2: 子が一つ
      if (node.left === null) {
        return node.right;
      }
      if (node.right === null) {
        return node.left;
      }

      // ケース3: 子が二つ
      // 右部分木の最小値を見つける
      const minRight = this._findMinNode(node.right);
      node.data = minRight.data;
      node.right = this._deleteNode(node.right, minRight.data);
    }

    return node;
  }

  // 最小値のノードを見つける
  _findMinNode(node) {
    while (node.left !== null) {
      node = node.left;
    }
    return node;
  }

  // 最小値を取得 - O(log n)
  findMin() {
    if (this.root === null) return null;
    const minNode = this._findMinNode(this.root);
    return minNode.data;
  }

  // 最大値を取得 - O(log n)
  findMax() {
    if (this.root === null) return null;
    let current = this.root;
    while (current.right !== null) {
      current = current.right;
    }
    return current.data;
  }

  // 中順巡回（昇順でデータを取得） - O(n)
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

  // 前順巡回 - O(n)
  preorderTraversal() {
    const result = [];
    this._preorder(this.root, result);
    return result;
  }

  _preorder(node, result) {
    if (node !== null) {
      result.push(node.data);
      this._preorder(node.left, result);
      this._preorder(node.right, result);
    }
  }

  // 後順巡回 - O(n)
  postorderTraversal() {
    const result = [];
    this._postorder(this.root, result);
    return result;
  }

  _postorder(node, result) {
    if (node !== null) {
      this._postorder(node.left, result);
      this._postorder(node.right, result);
      result.push(node.data);
    }
  }

  // 木の高さを計算 - O(n)
  getHeight() {
    return this._height(this.root);
  }

  _height(node) {
    if (node === null) return -1;
    return 1 + Math.max(this._height(node.left), this._height(node.right));
  }

  // 木のサイズを取得 - O(1)
  getSize() {
    return this.size;
  }

  // 木が空かチェック - O(1)
  isEmpty() {
    return this.root === null;
  }

  // 木をクリア - O(1)
  clear() {
    this.root = null;
    this.size = 0;
  }

  // 木の構造を文字列で表示
  toString() {
    if (this.isEmpty()) {
      return "Tree is empty";
    }
    return this._nodeToString(this.root, "", true);
  }

  _nodeToString(node, prefix, isLast) {
    if (node === null) return "";

    let result = prefix + (isLast ? "└── " : "├── ") + node.data + "\n";

    const children = [];
    if (node.left !== null) children.push([node.left, false]);
    if (node.right !== null) children.push([node.right, false]);

    if (children.length > 0) {
      children[children.length - 1][1] = true; // 最後の子をマーク
    }

    for (let [child, isChildLast] of children) {
      const extension = isLast ? "    " : "│   ";
      result += this._nodeToString(child, prefix + extension, isChildLast);
    }

    return result;
  }
}

// 使用例
console.log("=== 二分探索木の基本操作 ===");
const bst = new BinarySearchTree();

// 要素の挿入
const values = [50, 30, 70, 20, 40, 60, 80, 10, 25, 35, 45];
values.forEach((value) => bst.insert(value));

console.log("木の構造:");
console.log(bst.toString());

console.log("サイズ:", bst.getSize());
console.log("高さ:", bst.getHeight());

// 要素の検索
console.log("\n=== 検索操作 ===");
console.log("50が存在する?", bst.search(50)); // true
console.log("100が存在する?", bst.search(100)); // false

// 最小値・最大値
console.log("最小値:", bst.findMin()); // 10
console.log("最大値:", bst.findMax()); // 80

// 巡回
console.log("\n=== 巡回操作 ===");
console.log("中順巡回（昇順）:", bst.inorderTraversal());
console.log("前順巡回:", bst.preorderTraversal());
console.log("後順巡回:", bst.postorderTraversal());

// 削除操作
console.log("\n=== 削除操作 ===");
console.log("30を削除前:", bst.inorderTraversal());
bst.delete(30);
console.log("30を削除後:", bst.inorderTraversal());

console.log("\n削除後の木の構造:");
console.log(bst.toString());
