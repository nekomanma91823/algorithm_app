# 二分探索木 (Binary Search Tree) - Python実装


class TreeNode:
    """二分探索木のノードクラス"""

    def __init__(self, data):
        self.data = data  # ノードが保持するデータ
        self.left = None  # 左の子ノード
        self.right = None  # 右の子ノード


class BinarySearchTree:
    """二分探索木クラス"""

    def __init__(self):
        self.root = None  # 木の根ノード
        self.size = 0  # 木のサイズ

    def insert(self, data):
        """要素を挿入 - 平均 O(log n), 最悪 O(n)"""
        if self.root is None:
            self.root = TreeNode(data)
            self.size += 1
        else:
            if self._insert_node(self.root, data):
                self.size += 1

    def _insert_node(self, node, data):
        """ノードを挿入する再帰的なヘルパー関数"""
        if data < node.data:
            if node.left is None:
                node.left = TreeNode(data)
                return True
            else:
                return self._insert_node(node.left, data)
        elif data > node.data:
            if node.right is None:
                node.right = TreeNode(data)
                return True
            else:
                return self._insert_node(node.right, data)
        else:
            # 重複する値は挿入しない
            return False

    def search(self, data):
        """要素を検索 - 平均 O(log n), 最悪 O(n)"""
        return self._search_node(self.root, data)

    def _search_node(self, node, data):
        """ノードを検索する再帰的なヘルパー関数"""
        if node is None:
            return False

        if data == node.data:
            return True
        elif data < node.data:
            return self._search_node(node.left, data)
        else:
            return self._search_node(node.right, data)

    def delete(self, data):
        """要素を削除 - 平均 O(log n), 最悪 O(n)"""
        self.root, deleted = self._delete_node(self.root, data)
        if deleted:
            self.size -= 1

    def _delete_node(self, node, data):
        """ノードを削除する再帰的なヘルパー関数"""
        if node is None:
            return node, False

        if data < node.data:
            node.left, deleted = self._delete_node(node.left, data)
            return node, deleted
        elif data > node.data:
            node.right, deleted = self._delete_node(node.right, data)
            return node, deleted
        else:
            # 削除するノードが見つかった場合

            # ケース1: 葉ノード（子がない）
            if node.left is None and node.right is None:
                return None, True

            # ケース2: 子が一つ
            if node.left is None:
                return node.right, True
            if node.right is None:
                return node.left, True

            # ケース3: 子が二つ
            # 右部分木の最小値を見つける
            min_right = self._find_min_node(node.right)
            node.data = min_right.data
            node.right, _ = self._delete_node(node.right, min_right.data)
            return node, True

    def _find_min_node(self, node):
        """最小値のノードを見つける"""
        while node.left is not None:
            node = node.left
        return node

    def find_min(self):
        """最小値を取得 - O(log n)"""
        if self.root is None:
            return None
        min_node = self._find_min_node(self.root)
        return min_node.data

    def find_max(self):
        """最大値を取得 - O(log n)"""
        if self.root is None:
            return None
        current = self.root
        while current.right is not None:
            current = current.right
        return current.data

    def inorder_traversal(self):
        """中順巡回（昇順でデータを取得） - O(n)"""
        result = []
        self._inorder(self.root, result)
        return result

    def _inorder(self, node, result):
        """中順巡回の再帰的なヘルパー関数"""
        if node is not None:
            self._inorder(node.left, result)
            result.append(node.data)
            self._inorder(node.right, result)

    def preorder_traversal(self):
        """前順巡回 - O(n)"""
        result = []
        self._preorder(self.root, result)
        return result

    def _preorder(self, node, result):
        """前順巡回の再帰的なヘルパー関数"""
        if node is not None:
            result.append(node.data)
            self._preorder(node.left, result)
            self._preorder(node.right, result)

    def postorder_traversal(self):
        """後順巡回 - O(n)"""
        result = []
        self._postorder(self.root, result)
        return result

    def _postorder(self, node, result):
        """後順巡回の再帰的なヘルパー関数"""
        if node is not None:
            self._postorder(node.left, result)
            self._postorder(node.right, result)
            result.append(node.data)

    def get_height(self):
        """木の高さを計算 - O(n)"""
        return self._height(self.root)

    def _height(self, node):
        """高さを計算する再帰的なヘルパー関数"""
        if node is None:
            return -1
        return 1 + max(self._height(node.left), self._height(node.right))

    def get_size(self):
        """木のサイズを取得 - O(1)"""
        return self.size

    def is_empty(self):
        """木が空かチェック - O(1)"""
        return self.root is None

    def clear(self):
        """木をクリア - O(1)"""
        self.root = None
        self.size = 0

    def __len__(self):
        """len()関数のサポート"""
        return self.size

    def __contains__(self, data):
        """in演算子のサポート"""
        return self.search(data)

    def __str__(self):
        """木の構造を文字列で表示"""
        if self.is_empty():
            return "Tree is empty"
        return self._node_to_string(self.root, "", True)

    def _node_to_string(self, node, prefix, is_last):
        """ノードを文字列に変換する再帰的なヘルパー関数"""
        if node is None:
            return ""

        result = prefix + ("└── " if is_last else "├── ") + str(node.data) + "\n"

        children = []
        if node.left is not None:
            children.append((node.left, False))
        if node.right is not None:
            children.append((node.right, False))

        if children:
            children[-1] = (children[-1][0], True)  # 最後の子をマーク

        for child, is_child_last in children:
            extension = "    " if is_last else "│   "
            result += self._node_to_string(child, prefix + extension, is_child_last)

        return result

    def is_valid_bst(self):
        """有効な二分探索木かチェック"""
        return self._is_valid_bst_helper(self.root, float("-inf"), float("inf"))

    def _is_valid_bst_helper(self, node, min_val, max_val):
        """有効な二分探索木かチェックするヘルパー関数"""
        if node is None:
            return True

        if node.data <= min_val or node.data >= max_val:
            return False

        return self._is_valid_bst_helper(
            node.left, min_val, node.data
        ) and self._is_valid_bst_helper(node.right, node.data, max_val)


# 使用例
if __name__ == "__main__":
    print("=== 二分探索木の基本操作 ===")
    bst = BinarySearchTree()

    # 要素の挿入
    values = [50, 30, 70, 20, 40, 60, 80, 10, 25, 35, 45]
    for value in values:
        bst.insert(value)

    print("木の構造:")
    print(bst)

    print(f"サイズ: {bst.get_size()}")
    print(f"高さ: {bst.get_height()}")

    # 要素の検索
    print("\n=== 検索操作 ===")
    print(f"50が存在する? {50 in bst}")  # True
    print(f"100が存在する? {100 in bst}")  # False

    # 最小値・最大値
    print(f"最小値: {bst.find_min()}")  # 10
    print(f"最大値: {bst.find_max()}")  # 80

    # 巡回
    print("\n=== 巡回操作 ===")
    print(f"中順巡回（昇順）: {bst.inorder_traversal()}")
    print(f"前順巡回: {bst.preorder_traversal()}")
    print(f"後順巡回: {bst.postorder_traversal()}")

    # 削除操作
    print("\n=== 削除操作 ===")
    print(f"30を削除前: {bst.inorder_traversal()}")
    bst.delete(30)
    print(f"30を削除後: {bst.inorder_traversal()}")

    print("\n削除後の木の構造:")
    print(bst)

    # 木の妥当性チェック
    print(f"有効な二分探索木? {bst.is_valid_bst()}")

    # Pythonic な操作
    print(f"len(bst): {len(bst)}")
    print(f"bst.is_empty(): {bst.is_empty()}")
