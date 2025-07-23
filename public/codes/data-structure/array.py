# 配列 (Array) - Python実装


class Array:
    def __init__(self, size=10):
        """配列を初期化"""
        self.data = [None] * size  # 固定サイズの配列を作成
        self.length = 0  # 現在の要素数
        self.capacity = size  # 配列の容量

    def get(self, index):
        """要素へのアクセス - O(1)"""
        if index < 0 or index >= self.length:
            raise IndexError("Index out of bounds")
        return self.data[index]

    def set(self, index, value):
        """要素の設定 - O(1)"""
        if index < 0 or index >= self.length:
            raise IndexError("Index out of bounds")
        self.data[index] = value

    def push(self, value):
        """末尾に要素を追加 - O(1) amortized"""
        if self.length >= self.capacity:
            self._resize()  # 容量が足りない場合は配列を拡張
        self.data[self.length] = value
        self.length += 1

    def pop(self):
        """末尾から要素を削除 - O(1)"""
        if self.length == 0:
            raise IndexError("Array is empty")
        value = self.data[self.length - 1]
        self.length -= 1
        return value

    def insert(self, index, value):
        """指定位置に要素を挿入 - O(n)"""
        if index < 0 or index > self.length:
            raise IndexError("Index out of bounds")

        if self.length >= self.capacity:
            self._resize()

        # 要素を右にシフト
        for i in range(self.length, index, -1):
            self.data[i] = self.data[i - 1]

        self.data[index] = value
        self.length += 1

    def delete(self, index):
        """指定位置の要素を削除 - O(n)"""
        if index < 0 or index >= self.length:
            raise IndexError("Index out of bounds")

        value = self.data[index]

        # 要素を左にシフト
        for i in range(index, self.length - 1):
            self.data[i] = self.data[i + 1]

        self.length -= 1
        return value

    def search(self, value):
        """要素の検索 - O(n)"""
        for i in range(self.length):
            if self.data[i] == value:
                return i  # 見つかった場合はインデックスを返す
        return -1  # 見つからない場合は-1を返す

    def _resize(self):
        """配列の容量を拡張 - O(n)"""
        new_capacity = self.capacity * 2
        new_data = [None] * new_capacity

        # 既存の要素をコピー
        for i in range(self.length):
            new_data[i] = self.data[i]

        self.data = new_data
        self.capacity = new_capacity

    def __str__(self):
        """配列の内容を表示"""
        elements = [str(self.data[i]) for i in range(self.length)]
        return f"[{', '.join(elements)}]"

    def __len__(self):
        """配列の長さを返す"""
        return self.length


# 使用例
if __name__ == "__main__":
    my_array = Array(5)

    # 要素の追加
    my_array.push(10)
    my_array.push(20)
    my_array.push(30)
    print(my_array)  # [10, 20, 30]

    # 要素へのアクセス
    print(my_array.get(1))  # 20

    # 要素の挿入
    my_array.insert(1, 15)
    print(my_array)  # [10, 15, 20, 30]

    # 要素の削除
    deleted_value = my_array.delete(2)
    print(f"削除された値: {deleted_value}")  # 削除された値: 20
    print(my_array)  # [10, 15, 30]

    # 要素の検索
    print(my_array.search(15))  # 1
    print(my_array.search(100))  # -1

    # 配列の長さ
    print(f"配列の長さ: {len(my_array)}")  # 配列の長さ: 3
