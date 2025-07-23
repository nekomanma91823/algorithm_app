# ヒープ (Heap) - Python実装
# 最大ヒープの実装（親ノードが子ノードより大きい）

import heapq


class MaxHeap:
    """最大ヒープの実装"""

    def __init__(self):
        self.heap = []  # ヒープを配列で表現

    def _get_parent_index(self, index):
        """親のインデックスを取得"""
        return (index - 1) // 2

    def _get_left_child_index(self, index):
        """左の子のインデックスを取得"""
        return 2 * index + 1

    def _get_right_child_index(self, index):
        """右の子のインデックスを取得"""
        return 2 * index + 2

    def _has_parent(self, index):
        """親が存在するかチェック"""
        return self._get_parent_index(index) >= 0

    def _has_left_child(self, index):
        """左の子が存在するかチェック"""
        return self._get_left_child_index(index) < len(self.heap)

    def _has_right_child(self, index):
        """右の子が存在するかチェック"""
        return self._get_right_child_index(index) < len(self.heap)

    def _parent(self, index):
        """親の値を取得"""
        return self.heap[self._get_parent_index(index)]

    def _left_child(self, index):
        """左の子の値を取得"""
        return self.heap[self._get_left_child_index(index)]

    def _right_child(self, index):
        """右の子の値を取得"""
        return self.heap[self._get_right_child_index(index)]

    def _swap(self, index1, index2):
        """2つの要素を交換"""
        self.heap[index1], self.heap[index2] = self.heap[index2], self.heap[index1]

    def peek(self):
        """ヒープの最大値を取得（削除しない） - O(1)"""
        if not self.heap:
            raise IndexError("Heap is empty")
        return self.heap[0]

    def insert(self, value):
        """要素を挿入 - O(log n)"""
        self.heap.append(value)  # 末尾に追加
        self._heapify_up()  # ヒープ性質を維持

    def extract_max(self):
        """最大値を削除して返す - O(log n)"""
        if not self.heap:
            raise IndexError("Heap is empty")

        if len(self.heap) == 1:
            return self.heap.pop()

        max_value = self.heap[0]  # 最大値を保存
        self.heap[0] = self.heap.pop()  # 最後の要素を根に移動
        self._heapify_down()  # ヒープ性質を維持
        return max_value

    def _heapify_up(self):
        """上向きにヒープ化（挿入時）"""
        index = len(self.heap) - 1

        while self._has_parent(index) and self._parent(index) < self.heap[index]:
            self._swap(self._get_parent_index(index), index)
            index = self._get_parent_index(index)

    def _heapify_down(self):
        """下向きにヒープ化（削除時）"""
        index = 0

        while self._has_left_child(index):
            larger_child_index = self._get_left_child_index(index)

            # 右の子の方が大きい場合
            if self._has_right_child(index) and self._right_child(
                index
            ) > self._left_child(index):
                larger_child_index = self._get_right_child_index(index)

            # 親の方が大きい場合は終了
            if self.heap[index] > self.heap[larger_child_index]:
                break

            self._swap(index, larger_child_index)
            index = larger_child_index

    def size(self):
        """ヒープのサイズを取得 - O(1)"""
        return len(self.heap)

    def is_empty(self):
        """ヒープが空かチェック - O(1)"""
        return len(self.heap) == 0

    def to_list(self):
        """ヒープの内容をリストとして取得 - O(1)"""
        return self.heap.copy()

    def clear(self):
        """ヒープをクリア - O(1)"""
        self.heap.clear()

    def __str__(self):
        """ヒープの内容を表示"""
        return str(self.heap)

    def __len__(self):
        """len()関数のサポート"""
        return len(self.heap)


class MinHeap:
    """最小ヒープの実装（Pythonのheapqを使用）"""

    def __init__(self):
        self.heap = []

    def peek(self):
        """最小値を取得（削除しない） - O(1)"""
        if not self.heap:
            raise IndexError("Heap is empty")
        return self.heap[0]

    def insert(self, value):
        """要素を挿入 - O(log n)"""
        heapq.heappush(self.heap, value)

    def extract_min(self):
        """最小値を削除して返す - O(log n)"""
        if not self.heap:
            raise IndexError("Heap is empty")
        return heapq.heappop(self.heap)

    def size(self):
        """ヒープのサイズを取得"""
        return len(self.heap)

    def is_empty(self):
        """ヒープが空かチェック"""
        return len(self.heap) == 0

    def to_list(self):
        """ヒープの内容をリストとして取得"""
        return self.heap.copy()

    def __str__(self):
        return str(self.heap)


class PriorityQueue:
    """優先度キューの実装（最小ヒープを使用）"""

    def __init__(self):
        self.heap = []
        self.index = 0  # 同じ優先度の要素の順序を保つため

    def enqueue(self, item, priority):
        """要素を優先度付きで追加"""
        # タプル (priority, index, item) でheapqを使用
        # indexは同じ優先度の場合の順序を保つため
        heapq.heappush(self.heap, (priority, self.index, item))
        self.index += 1

    def dequeue(self):
        """最高優先度の要素を取り出し"""
        if not self.heap:
            return None
        priority, index, item = heapq.heappop(self.heap)
        return item

    def peek(self):
        """最高優先度の要素を確認（削除しない）"""
        if not self.heap:
            return None
        return self.heap[0][2]

    def is_empty(self):
        """キューが空かチェック"""
        return len(self.heap) == 0

    def size(self):
        """キューのサイズを取得"""
        return len(self.heap)

    def __str__(self):
        items = [(priority, item) for priority, index, item in self.heap]
        return str(items)


def heapsort(arr):
    """ヒープソートの実装"""
    # 最大ヒープを構築
    heap = MaxHeap()
    for value in arr:
        heap.insert(value)

    # 最大値を順番に取り出して降順にソート
    result = []
    while not heap.is_empty():
        result.append(heap.extract_max())

    return result


def find_k_largest(arr, k):
    """配列からk番目に大きい要素を見つける"""
    # 最小ヒープを使用してk個の最大値を管理
    min_heap = MinHeap()

    for value in arr:
        if min_heap.size() < k:
            min_heap.insert(value)
        elif value > min_heap.peek():
            min_heap.extract_min()
            min_heap.insert(value)

    return min_heap.to_list()


# 使用例
if __name__ == "__main__":
    print("=== 最大ヒープの操作 ===")
    max_heap = MaxHeap()

    # 要素の挿入
    values = [10, 20, 15, 30, 25]
    for value in values:
        max_heap.insert(value)
        print(f"{value}を挿入: {max_heap}")

    # 最大値の確認
    print(f"最大値: {max_heap.peek()}")

    # 最大値の削除
    while not max_heap.is_empty():
        max_value = max_heap.extract_max()
        print(f"削除: {max_value}, 残り: {max_heap}")

    print("\n=== 最小ヒープの操作 ===")
    min_heap = MinHeap()
    for value in [10, 20, 15, 30, 25]:
        min_heap.insert(value)
    print(f"最小ヒープ: {min_heap}")
    print(f"最小値: {min_heap.peek()}")

    print("\n=== 優先度キューの操作 ===")
    pq = PriorityQueue()
    pq.enqueue("低優先度タスク", 3)
    pq.enqueue("高優先度タスク", 1)
    pq.enqueue("中優先度タスク", 2)

    while not pq.is_empty():
        task = pq.dequeue()
        print(f"実行: {task}")

    print("\n=== ヒープソート ===")
    data = [64, 34, 25, 12, 22, 11, 90]
    sorted_data = heapsort(data)
    print(f"元のデータ: {data}")
    print(f"ソート結果: {sorted_data}")

    print("\n=== k番目に大きい要素 ===")
    data = [3, 2, 1, 5, 6, 4]
    k = 3
    k_largest = find_k_largest(data, k)
    print(f"配列: {data}")
    print(f"{k}番目に大きい要素たち: {sorted(k_largest, reverse=True)}")
