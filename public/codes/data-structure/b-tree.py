# B木 (B-Tree) - Python実装（簡略版）


class BTreeNode:
    """B木のノードクラス"""

    def __init__(self, degree, is_leaf=False):
        self.keys = []  # キーを格納
        self.children = []  # 子ノードを格納
        self.is_leaf = is_leaf  # 葉ノードかどうか
        self.degree = degree  # 最小次数

    def is_full(self):
        """ノードが満杯かチェック"""
        return len(self.keys) == 2 * self.degree - 1

    def search(self, key):
        """キーを検索"""
        i = 0
        while i < len(self.keys) and key > self.keys[i]:
            i += 1

        if i < len(self.keys) and key == self.keys[i]:
            return True

        if self.is_leaf:
            return False

        return self.children[i].search(key)

    def insert_non_full(self, key):
        """満杯でないノードにキーを挿入"""
        i = len(self.keys) - 1

        if self.is_leaf:
            # 葉ノードの場合、適切な位置にキーを挿入
            self.keys.append(None)
            while i >= 0 and self.keys[i] > key:
                self.keys[i + 1] = self.keys[i]
                i -= 1
            self.keys[i + 1] = key
        else:
            # 内部ノードの場合
            while i >= 0 and self.keys[i] > key:
                i -= 1
            i += 1

            if self.children[i].is_full():
                self.split_child(i)
                if self.keys[i] < key:
                    i += 1
            self.children[i].insert_non_full(key)

    def split_child(self, index):
        """満杯の子ノードを分割"""
        full_child = self.children[index]
        new_child = BTreeNode(full_child.degree, full_child.is_leaf)
        degree = self.degree

        # 新しいノードに後半のキーをコピー
        new_child.keys = full_child.keys[degree:]
        full_child.keys = full_child.keys[: degree - 1]

        # 子ノードも分割（葉ノードでない場合）
        if not full_child.is_leaf:
            new_child.children = full_child.children[degree:]
            full_child.children = full_child.children[:degree]

        # 親ノードに新しい子を挿入
        self.children.insert(index + 1, new_child)
        self.keys.insert(index, full_child.keys[degree - 1])

    def __str__(self, level=0):
        """ノードの内容を表示"""
        result = "  " * level + f"Keys: {self.keys}\n"

        if not self.is_leaf:
            for child in self.children:
                result += child.__str__(level + 1)

        return result


class BTree:
    """B木クラス"""

    def __init__(self, degree=3):
        self.root = BTreeNode(degree, True)
        self.degree = degree

    def search(self, key):
        """キーを検索"""
        return self.root.search(key)

    def insert(self, key):
        """キーを挿入"""
        root = self.root

        if root.is_full():
            # ルートが満杯の場合、新しいルートを作成
            new_root = BTreeNode(self.degree, False)
            new_root.children.append(root)
            new_root.split_child(0)
            self.root = new_root

        self.root.insert_non_full(key)

    def display(self):
        """木の構造を表示"""
        print("B-Tree structure:")
        print(self.root)

    def get_all_keys(self):
        """すべてのキーを取得（中順巡回）"""
        keys = []
        self._inorder_traversal(self.root, keys)
        return keys

    def _inorder_traversal(self, node, keys):
        """中順巡回の再帰的実装"""
        if node:
            i = 0
            for i in range(len(node.keys)):
                if not node.is_leaf:
                    self._inorder_traversal(node.children[i], keys)
                keys.append(node.keys[i])
            if not node.is_leaf:
                self._inorder_traversal(node.children[i + 1], keys)

    def get_height(self):
        """高さを計算"""
        return self._get_height(self.root)

    def _get_height(self, node):
        """高さ計算の再帰的実装"""
        if node.is_leaf:
            return 1
        return 1 + self._get_height(node.children[0])

    def __contains__(self, key):
        """in演算子のサポート"""
        return self.search(key)


# 使用例
if __name__ == "__main__":
    print("=== B木の操作 ===")
    btree = BTree(3)  # 最小次数3のB木

    # キーの挿入
    values = [10, 20, 5, 6, 12, 30, 7, 17, 50, 60, 70, 80, 90]
    print(f"挿入するキー: {values}")

    for value in values:
        btree.insert(value)
        print(f"{value}を挿入:")
        btree.display()
        print("---")

    # 検索
    print("検索結果:")
    print(f"12が存在? {12 in btree}")  # True
    print(f"25が存在? {25 in btree}")  # False
    print(f"70が存在? {70 in btree}")  # True

    # 統計情報
    print(f"\nB木の統計:")
    print(f"高さ: {btree.get_height()}")
    print(f"すべてのキー: {btree.get_all_keys()}")

    # B木の特徴説明
    print("\n=== B木の特徴 ===")
    print("- 各ノードが複数のキーを持つ")
    print("- 常にバランスが保たれる")
    print("- データベースやファイルシステムで使用")
    print("- ディスクアクセスを最小化")
    print(f"- 最小次数: {btree.degree}")
    print(f"- 各ノードの最大キー数: {2 * btree.degree - 1}")

    # 性能の比較
    print("\n=== 性能の比較 ===")
    import time

    # 大量データでの挿入テスト
    large_btree = BTree(50)  # より大きな次数
    start_time = time.time()

    for i in range(1000):
        large_btree.insert(i)

    end_time = time.time()
    print(f"1000要素の挿入時間: {end_time - start_time:.4f}秒")
    print(f"最終的な高さ: {large_btree.get_height()}")
