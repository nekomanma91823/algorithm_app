# 連結リスト (Linked List) - Python実装


class Node:
    """ノードクラス：データと次のノードへの参照を持つ"""

    def __init__(self, data):
        self.data = data  # ノードが保持するデータ
        self.next = None  # 次のノードへの参照


class LinkedList:
    """単方向連結リスト"""

    def __init__(self):
        self.head = None  # リストの先頭ノード
        self.size = 0  # リストのサイズ

    def prepend(self, data):
        """リストの先頭に要素を追加 - O(1)"""
        new_node = Node(data)
        new_node.next = self.head
        self.head = new_node
        self.size += 1

    def append(self, data):
        """リストの末尾に要素を追加 - O(n)"""
        new_node = Node(data)

        if not self.head:
            self.head = new_node
        else:
            current = self.head
            while current.next:
                current = current.next
            current.next = new_node
        self.size += 1

    def insert(self, index, data):
        """指定位置に要素を挿入 - O(n)"""
        if index < 0 or index > self.size:
            raise IndexError("Index out of bounds")

        if index == 0:
            self.prepend(data)
            return

        new_node = Node(data)
        current = self.head

        for i in range(index - 1):
            current = current.next

        new_node.next = current.next
        current.next = new_node
        self.size += 1

    def delete(self, index):
        """指定位置の要素を削除 - O(n)"""
        if index < 0 or index >= self.size:
            raise IndexError("Index out of bounds")

        if index == 0:
            data = self.head.data
            self.head = self.head.next
            self.size -= 1
            return data

        current = self.head
        for i in range(index - 1):
            current = current.next

        data = current.next.data
        current.next = current.next.next
        self.size -= 1
        return data

    def get(self, index):
        """指定位置の要素を取得 - O(n)"""
        if index < 0 or index >= self.size:
            raise IndexError("Index out of bounds")

        current = self.head
        for i in range(index):
            current = current.next
        return current.data

    def search(self, data):
        """要素を検索 - O(n)"""
        current = self.head
        index = 0

        while current:
            if current.data == data:
                return index
            current = current.next
            index += 1
        return -1  # 見つからない場合

    def is_empty(self):
        """リストが空かどうかチェック - O(1)"""
        return self.head is None

    def get_size(self):
        """リストのサイズを取得 - O(1)"""
        return self.size

    def to_list(self):
        """リストの内容をPythonのリストとして取得 - O(n)"""
        result = []
        current = self.head

        while current:
            result.append(current.data)
            current = current.next
        return result

    def __str__(self):
        """リストの内容を表示 - O(n)"""
        elements = self.to_list()
        return " -> ".join(map(str, elements)) + " -> None"

    def __len__(self):
        """リストの長さを返す"""
        return self.size

    def clear(self):
        """リストをクリア - O(1)"""
        self.head = None
        self.size = 0


# 使用例
if __name__ == "__main__":
    linked_list = LinkedList()

    # 要素の追加
    linked_list.append(10)
    linked_list.append(20)
    linked_list.append(30)
    print(linked_list)  # 10 -> 20 -> 30 -> None

    # 先頭に要素を追加
    linked_list.prepend(5)
    print(linked_list)  # 5 -> 10 -> 20 -> 30 -> None

    # 指定位置に要素を挿入
    linked_list.insert(2, 15)
    print(linked_list)  # 5 -> 10 -> 15 -> 20 -> 30 -> None

    # 要素の取得
    print(linked_list.get(2))  # 15

    # 要素の検索
    print(linked_list.search(20))  # 3
    print(linked_list.search(100))  # -1

    # 要素の削除
    deleted = linked_list.delete(1)
    print(f"削除された要素: {deleted}")  # 削除された要素: 10
    print(linked_list)  # 5 -> 15 -> 20 -> 30 -> None

    # リストのサイズ
    print(f"リストのサイズ: {len(linked_list)}")  # リストのサイズ: 4

    # リストが空かどうか
    print(f"リストは空: {linked_list.is_empty()}")  # リストは空: False

    # リストをクリア
    linked_list.clear()
    print(f"クリア後: {linked_list}")  # クリア後:  -> None
    print(f"リストは空: {linked_list.is_empty()}")  # リストは空: True
