# AVL木 (AVL Tree) - Python実装


class AVLNode:
    """AVL木のノードクラス"""

    def __init__(self, data):
        self.data = data
        self.left = None
        self.right = None
        self.height = 1  # ノードの高さ


class AVLTree:
    """自動平衡二分探索木（AVL木）の実装"""

    def __init__(self):
        self.root = None

    def get_height(self, node):
        """ノードの高さを取得"""
        return node.height if node else 0

    def get_balance(self, node):
        """バランス因子を取得"""
        return self.get_height(node.left) - self.get_height(node.right) if node else 0

    def rotate_right(self, y):
        """右回転"""
        x = y.left
        T2 = x.right

        # 回転実行
        x.right = y
        y.left = T2

        # 高さを更新
        y.height = max(self.get_height(y.left), self.get_height(y.right)) + 1
        x.height = max(self.get_height(x.left), self.get_height(x.right)) + 1

        return x

    def rotate_left(self, x):
        """左回転"""
        y = x.right
        T2 = y.left

        # 回転実行
        y.left = x
        x.right = T2

        # 高さを更新
        x.height = max(self.get_height(x.left), self.get_height(x.right)) + 1
        y.height = max(self.get_height(y.left), self.get_height(y.right)) + 1

        return y

    def insert(self, data):
        """要素を挿入"""
        self.root = self._insert(self.root, data)

    def _insert(self, node, data):
        """挿入の再帰的実装"""
        # 1. 通常のBST挿入
        if node is None:
            return AVLNode(data)

        if data < node.data:
            node.left = self._insert(node.left, data)
        elif data > node.data:
            node.right = self._insert(node.right, data)
        else:
            return node  # 重複は許可しない

        # 2. 高さを更新
        node.height = 1 + max(self.get_height(node.left), self.get_height(node.right))

        # 3. バランス因子を取得
        balance = self.get_balance(node)

        # 4. バランスが崩れている場合は回転
        # Left Left Case
        if balance > 1 and data < node.left.data:
            return self.rotate_right(node)

        # Right Right Case
        if balance < -1 and data > node.right.data:
            return self.rotate_left(node)

        # Left Right Case
        if balance > 1 and data > node.left.data:
            node.left = self.rotate_left(node.left)
            return self.rotate_right(node)

        # Right Left Case
        if balance < -1 and data < node.right.data:
            node.right = self.rotate_right(node.right)
            return self.rotate_left(node)

        return node

    def search(self, data):
        """要素を検索"""
        return self._search(self.root, data)

    def _search(self, node, data):
        """検索の再帰的実装"""
        if node is None or node.data == data:
            return node is not None

        if data < node.data:
            return self._search(node.left, data)
        else:
            return self._search(node.right, data)

    def inorder_traversal(self):
        """中順巡回"""
        result = []
        self._inorder(self.root, result)
        return result

    def _inorder(self, node, result):
        """中順巡回の再帰的実装"""
        if node is not None:
            self._inorder(node.left, result)
            result.append(node.data)
            self._inorder(node.right, result)

    def get_tree_height(self):
        """木の高さを取得"""
        return self.get_height(self.root)

    def is_balanced(self):
        """バランスが取れているかチェック"""
        return self._is_balanced(self.root)

    def _is_balanced(self, node):
        """バランスチェックの再帰的実装"""
        if node is None:
            return True

        balance = self.get_balance(node)
        return (
            abs(balance) <= 1
            and self._is_balanced(node.left)
            and self._is_balanced(node.right)
        )

    def __contains__(self, data):
        """in演算子のサポート"""
        return self.search(data)


# 使用例
if __name__ == "__main__":
    print("=== AVL木の操作 ===")
    avl = AVLTree()

    # 要素の挿入（バランスが自動的に保たれる）
    values = [10, 20, 30, 40, 50, 25]
    for value in values:
        avl.insert(value)
        print(
            f"{value}を挿入 - 高さ: {avl.get_tree_height()}, "
            f"バランス: {avl.is_balanced()}"
        )

    print(f"中順巡回: {avl.inorder_traversal()}")
    print(f"最終的な高さ: {avl.get_tree_height()}")
    print(f"バランスが取れている? {avl.is_balanced()}")

    # 検索
    print(f"25が存在? {25 in avl}")
    print(f"100が存在? {100 in avl}")

    # 通常の二分探索木との比較
    print("\n=== 効率性の比較 ===")
    # 連続した値を挿入してもバランスが保たれる
    sequential_avl = AVLTree()
    for i in range(1, 8):
        sequential_avl.insert(i)

    print(f"1-7を順次挿入した場合の高さ: {sequential_avl.get_tree_height()}")
    print(f"理想的な高さ（log2(7)）: {int(__import__('math').log2(7)) + 1}")
    print(f"バランスが保たれている? {sequential_avl.is_balanced()}")
