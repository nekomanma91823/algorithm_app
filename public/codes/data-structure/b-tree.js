// B木 (B-Tree) - JavaScript実装（簡略版）

class BTreeNode {
  constructor(degree, isLeaf = false) {
    this.keys = []; // キーを格納
    this.children = []; // 子ノードを格納
    this.isLeaf = isLeaf; // 葉ノードかどうか
    this.degree = degree; // 最小次数
  }

  // ノードが満杯かチェック
  isFull() {
    return this.keys.length === 2 * this.degree - 1;
  }

  // キーを検索
  search(key) {
    let i = 0;
    while (i < this.keys.length && key > this.keys[i]) {
      i++;
    }

    if (i < this.keys.length && key === this.keys[i]) {
      return true;
    }

    if (this.isLeaf) {
      return false;
    }

    return this.children[i].search(key);
  }

  // 葉ノードにキーを挿入
  insertNonFull(key) {
    let i = this.keys.length - 1;

    if (this.isLeaf) {
      // 葉ノードの場合、適切な位置にキーを挿入
      this.keys.push(null);
      while (i >= 0 && this.keys[i] > key) {
        this.keys[i + 1] = this.keys[i];
        i--;
      }
      this.keys[i + 1] = key;
    } else {
      // 内部ノードの場合
      while (i >= 0 && this.keys[i] > key) {
        i--;
      }
      i++;

      if (this.children[i].isFull()) {
        this.splitChild(i);
        if (this.keys[i] < key) {
          i++;
        }
      }
      this.children[i].insertNonFull(key);
    }
  }

  // 満杯の子ノードを分割
  splitChild(index) {
    const fullChild = this.children[index];
    const newChild = new BTreeNode(fullChild.degree, fullChild.isLeaf);
    const degree = this.degree;

    // 新しいノードに後半のキーをコピー
    for (let j = 0; j < degree - 1; j++) {
      newChild.keys[j] = fullChild.keys[j + degree];
    }

    // 子ノードも分割（葉ノードでない場合）
    if (!fullChild.isLeaf) {
      for (let j = 0; j < degree; j++) {
        newChild.children[j] = fullChild.children[j + degree];
      }
    }

    // 元のノードのサイズを調整
    fullChild.keys.length = degree - 1;
    if (!fullChild.isLeaf) {
      fullChild.children.length = degree;
    }

    // 親ノードに新しい子を挿入
    this.children.splice(index + 1, 0, newChild);
    this.keys.splice(index, 0, fullChild.keys[degree - 1]);
  }

  // ノードの内容を表示
  toString(level = 0) {
    let result = "  ".repeat(level) + "Keys: [" + this.keys.join(", ") + "]\n";

    if (!this.isLeaf) {
      for (let i = 0; i < this.children.length; i++) {
        result += this.children[i].toString(level + 1);
      }
    }

    return result;
  }
}

class BTree {
  constructor(degree = 3) {
    this.root = new BTreeNode(degree, true);
    this.degree = degree;
  }

  // キーを検索
  search(key) {
    return this.root.search(key);
  }

  // キーを挿入
  insert(key) {
    const root = this.root;

    if (root.isFull()) {
      // ルートが満杯の場合、新しいルートを作成
      const newRoot = new BTreeNode(this.degree, false);
      newRoot.children.push(root);
      newRoot.splitChild(0);
      this.root = newRoot;
    }

    this.root.insertNonFull(key);
  }

  // 木の構造を表示
  display() {
    console.log("B-Tree structure:");
    console.log(this.root.toString());
  }

  // すべてのキーを取得（中順巡回）
  getAllKeys() {
    const keys = [];
    this._inorderTraversal(this.root, keys);
    return keys;
  }

  _inorderTraversal(node, keys) {
    if (node) {
      let i = 0;
      for (i = 0; i < node.keys.length; i++) {
        if (!node.isLeaf) {
          this._inorderTraversal(node.children[i], keys);
        }
        keys.push(node.keys[i]);
      }
      if (!node.isLeaf) {
        this._inorderTraversal(node.children[i], keys);
      }
    }
  }

  // 高さを計算
  getHeight() {
    return this._getHeight(this.root);
  }

  _getHeight(node) {
    if (node.isLeaf) {
      return 1;
    }
    return 1 + this._getHeight(node.children[0]);
  }
}

// 使用例
console.log("=== B木の操作 ===");
const btree = new BTree(3); // 最小次数3のB木

// キーの挿入
const values = [10, 20, 5, 6, 12, 30, 7, 17, 50, 60, 70, 80, 90];
console.log("挿入するキー:", values);

values.forEach((value) => {
  btree.insert(value);
  console.log(`${value}を挿入:`);
  btree.display();
  console.log("---");
});

// 検索
console.log("検索結果:");
console.log("12が存在?", btree.search(12)); // true
console.log("25が存在?", btree.search(25)); // false
console.log("70が存在?", btree.search(70)); // true

// 統計情報
console.log("\nB木の統計:");
console.log("高さ:", btree.getHeight());
console.log("すべてのキー:", btree.getAllKeys());

// B木の特徴説明
console.log("\n=== B木の特徴 ===");
console.log("- 各ノードが複数のキーを持つ");
console.log("- 常にバランスが保たれる");
console.log("- データベースやファイルシステムで使用");
console.log("- ディスクアクセスを最小化");
console.log(`- 最小次数: ${btree.degree}`);
console.log(`- 各ノードの最大キー数: ${2 * btree.degree - 1}`);
