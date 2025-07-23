# キュー (Queue) - Python実装

from collections import deque


class Queue:
    """FIFO（First In, First Out）方式のキュー実装"""

    def __init__(self):
        self.items = []  # キューの要素を格納するリスト
        self.front = 0  # キューの先頭を示すインデックス

    def enqueue(self, element):
        """要素をキューに追加（エンキュー） - O(1)"""
        self.items.append(element)

    def dequeue(self):
        """キューから要素を取り出し（デキュー） - O(1) amortized"""
        if self.is_empty():
            raise IndexError("Queue is empty")

        element = self.items[self.front]
        self.front += 1

        # メモリ効率のため、時々リストを再構築
        if self.front > len(self.items) // 2:
            self.items = self.items[self.front :]
            self.front = 0

        return element

    def peek(self):
        """キューの先頭の要素を確認（フロント） - O(1)"""
        if self.is_empty():
            raise IndexError("Queue is empty")
        return self.items[self.front]

    def is_empty(self):
        """キューが空かどうかチェック - O(1)"""
        return self.front >= len(self.items)

    def size(self):
        """キューのサイズを取得 - O(1)"""
        return len(self.items) - self.front

    def __str__(self):
        """キューの内容を表示 - O(n)"""
        if self.is_empty():
            return "Queue is empty"

        elements = self.items[self.front :]
        return "Front -> " + " -> ".join(map(str, elements)) + " <- Rear"

    def clear(self):
        """キューをクリア - O(1)"""
        self.items = []
        self.front = 0

    def to_list(self):
        """キューの内容をリストとして取得 - O(n)"""
        return self.items[self.front :]


class CircularQueue:
    """サイズ固定の循環キュー"""

    def __init__(self, capacity=10):
        self.items = [None] * capacity
        self.capacity = capacity
        self.front = 0
        self.rear = 0
        self.count = 0

    def enqueue(self, element):
        """要素を追加 - O(1)"""
        if self.is_full():
            raise OverflowError("Queue is full")

        self.items[self.rear] = element
        self.rear = (self.rear + 1) % self.capacity
        self.count += 1

    def dequeue(self):
        """要素を取り出し - O(1)"""
        if self.is_empty():
            raise IndexError("Queue is empty")

        element = self.items[self.front]
        self.front = (self.front + 1) % self.capacity
        self.count -= 1
        return element

    def is_full(self):
        """キューが満杯かチェック - O(1)"""
        return self.count == self.capacity

    def is_empty(self):
        """キューが空かチェック - O(1)"""
        return self.count == 0

    def size(self):
        """キューのサイズ - O(1)"""
        return self.count


class OptimizedQueue:
    """dequeを使用した効率的なキュー実装"""

    def __init__(self):
        self.items = deque()

    def enqueue(self, element):
        """要素を追加 - O(1)"""
        self.items.append(element)

    def dequeue(self):
        """要素を取り出し - O(1)"""
        if self.is_empty():
            raise IndexError("Queue is empty")
        return self.items.popleft()

    def peek(self):
        """先頭要素を確認 - O(1)"""
        if self.is_empty():
            raise IndexError("Queue is empty")
        return self.items[0]

    def is_empty(self):
        """空かチェック - O(1)"""
        return len(self.items) == 0

    def size(self):
        """サイズ取得 - O(1)"""
        return len(self.items)


def bfs_simulation(graph, start):
    """幅優先探索（BFS）のシミュレーション"""
    queue = Queue()
    visited = set()
    result = []

    queue.enqueue(start)
    visited.add(start)

    while not queue.is_empty():
        current = queue.dequeue()
        result.append(current)

        # 隣接ノードをキューに追加
        for neighbor in graph.get(current, []):
            if neighbor not in visited:
                visited.add(neighbor)
                queue.enqueue(neighbor)

    return result


class TaskScheduler:
    """タスクスケジューラー"""

    def __init__(self):
        self.task_queue = Queue()

    def add_task(self, task):
        """タスクを追加"""
        self.task_queue.enqueue(task)
        print(f"タスク追加: {task}")

    def execute_next(self):
        """次のタスクを実行"""
        if self.task_queue.is_empty():
            print("実行するタスクがありません")
            return None

        task = self.task_queue.dequeue()
        print(f"タスク実行: {task}")
        return task

    def show_pending_tasks(self):
        """待機中のタスクを表示"""
        print("待機中のタスク:", self.task_queue.to_list())


# 使用例
if __name__ == "__main__":
    print("=== 基本的なキュー操作 ===")
    queue = Queue()

    # 要素の追加
    queue.enqueue(10)
    queue.enqueue(20)
    queue.enqueue(30)
    print(queue)  # Front -> 10 -> 20 -> 30 <- Rear

    # 先頭の要素を確認
    print(f"先頭の要素: {queue.peek()}")  # 先頭の要素: 10

    # 要素の取り出し
    print(f"デキュー: {queue.dequeue()}")  # デキュー: 10
    print(f"デキュー: {queue.dequeue()}")  # デキュー: 20
    print(queue)  # Front -> 30 <- Rear

    # キューのサイズ
    print(f"サイズ: {queue.size()}")  # サイズ: 1

    # 応用例1: BFSシミュレーション
    print("\n=== BFSシミュレーション ===")
    graph = {
        "A": ["B", "C"],
        "B": ["A", "D", "E"],
        "C": ["A", "F"],
        "D": ["B"],
        "E": ["B", "F"],
        "F": ["C", "E"],
    }

    bfs_result = bfs_simulation(graph, "A")
    print(f"BFS訪問順序: {bfs_result}")

    # 応用例2: タスクスケジューラー
    print("\n=== タスクスケジューラー ===")
    scheduler = TaskScheduler()
    scheduler.add_task("メール送信")
    scheduler.add_task("データ処理")
    scheduler.add_task("レポート生成")
    scheduler.show_pending_tasks()
    scheduler.execute_next()
    scheduler.execute_next()
    scheduler.show_pending_tasks()

    # 効率的なキューの例
    print("\n=== 効率的なキュー（deque使用） ===")
    opt_queue = OptimizedQueue()
    opt_queue.enqueue("First")
    opt_queue.enqueue("Second")
    print(f"先頭: {opt_queue.peek()}")
    print(f"取り出し: {opt_queue.dequeue()}")
    print(f"サイズ: {opt_queue.size()}")
