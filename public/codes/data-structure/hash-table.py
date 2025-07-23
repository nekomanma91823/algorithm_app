# ハッシュテーブル (Hash Table) - Python実装


class HashTable:
    """チェイン法を使用したハッシュテーブル実装"""

    def __init__(self, size=10):
        self.size = size
        self.buckets = [[] for _ in range(size)]  # バケット配列
        self.count = 0  # 格納されている要素数

    def _hash(self, key):
        """ハッシュ関数 - 文字列を配列のインデックスに変換"""
        hash_value = 0
        for char in str(key):
            hash_value += ord(char)
        return hash_value % self.size

    def set(self, key, value):
        """キーと値のペアを挿入 - 平均 O(1)"""
        index = self._hash(key)
        bucket = self.buckets[index]

        # 既存のキーがあるかチェック
        for i, (k, v) in enumerate(bucket):
            if k == key:
                bucket[i] = (key, value)  # 値を更新
                return

        # 新しいキーと値を追加
        bucket.append((key, value))
        self.count += 1

        # 負荷率が高くなったらリサイズ
        if self.count > self.size * 0.75:
            self._resize()

    def get(self, key):
        """キーに対応する値を取得 - 平均 O(1)"""
        index = self._hash(key)
        bucket = self.buckets[index]

        for k, v in bucket:
            if k == key:
                return v

        raise KeyError(f"Key '{key}' not found")

    def delete(self, key):
        """キーと値のペアを削除 - 平均 O(1)"""
        index = self._hash(key)
        bucket = self.buckets[index]

        for i, (k, v) in enumerate(bucket):
            if k == key:
                value = bucket.pop(i)[1]
                self.count -= 1
                return value

        raise KeyError(f"Key '{key}' not found")

    def has(self, key):
        """キーが存在するかチェック - 平均 O(1)"""
        try:
            self.get(key)
            return True
        except KeyError:
            return False

    def keys(self):
        """すべてのキーを取得 - O(n)"""
        keys_list = []
        for bucket in self.buckets:
            for k, v in bucket:
                keys_list.append(k)
        return keys_list

    def values(self):
        """すべての値を取得 - O(n)"""
        values_list = []
        for bucket in self.buckets:
            for k, v in bucket:
                values_list.append(v)
        return values_list

    def items(self):
        """すべてのキーと値のペアを取得 - O(n)"""
        items_list = []
        for bucket in self.buckets:
            for k, v in bucket:
                items_list.append((k, v))
        return items_list

    def get_size(self):
        """ハッシュテーブルのサイズ（要素数）を取得 - O(1)"""
        return self.count

    def is_empty(self):
        """ハッシュテーブルが空かチェック - O(1)"""
        return self.count == 0

    def clear(self):
        """ハッシュテーブルをクリア - O(1)"""
        self.buckets = [[] for _ in range(self.size)]
        self.count = 0

    def _resize(self):
        """ハッシュテーブルのサイズを拡張 - O(n)"""
        old_buckets = self.buckets
        self.size *= 2
        self.buckets = [[] for _ in range(self.size)]
        old_count = self.count
        self.count = 0

        # 既存の要素を再ハッシュ
        for bucket in old_buckets:
            for k, v in bucket:
                self.set(k, v)

    def get_load_factor(self):
        """負荷率を計算 - O(1)"""
        return self.count / self.size

    def show_buckets(self):
        """バケットの状態を表示（デバッグ用）"""
        print("Bucket状態:")
        for i, bucket in enumerate(self.buckets):
            if bucket:
                print(f"Bucket {i}: {bucket}")

    def __str__(self):
        """ハッシュテーブルの内容を表示"""
        pairs = []
        for bucket in self.buckets:
            for k, v in bucket:
                pairs.append(f"'{k}': {v}")
        return "{" + ", ".join(pairs) + "}"

    def __getitem__(self, key):
        """dict風のアクセス"""
        return self.get(key)

    def __setitem__(self, key, value):
        """dict風の代入"""
        self.set(key, value)

    def __delitem__(self, key):
        """dict風の削除"""
        self.delete(key)

    def __contains__(self, key):
        """in演算子のサポート"""
        return self.has(key)

    def __len__(self):
        """len()関数のサポート"""
        return self.count


def count_words(text):
    """単語の出現回数をカウント"""
    word_count = HashTable()
    words = text.lower().split()

    for word in words:
        # 句読点を除去
        word = word.strip('.,!?;:"()[]{}')
        if word:
            current_count = 0
            try:
                current_count = word_count.get(word)
            except KeyError:
                pass
            word_count.set(word, current_count + 1)

    return word_count


class SimpleCache:
    """シンプルなキャッシュシステム（LRU方式）"""

    def __init__(self, max_size=5):
        self.cache = HashTable(max_size)
        self.access_order = []  # LRU用のアクセス順序
        self.max_size = max_size

    def get(self, key):
        """キャッシュから値を取得"""
        try:
            value = self.cache.get(key)
            self._update_access_order(key)
            print(f"キャッシュヒット: {key} = {value}")
            return value
        except KeyError:
            print(f"キャッシュミス: {key}")
            return None

    def set(self, key, value):
        """キャッシュに値を設定"""
        # キャッシュが満杯の場合、最も古いアイテムを削除
        if self.cache.get_size() >= self.max_size and key not in self.cache:
            oldest_key = self.access_order.pop(0)
            self.cache.delete(oldest_key)
            print(f"キャッシュから削除: {oldest_key}")

        self.cache.set(key, value)
        self._update_access_order(key)
        print(f"キャッシュに追加: {key} = {value}")

    def _update_access_order(self, key):
        """アクセス順序を更新"""
        if key in self.access_order:
            self.access_order.remove(key)
        self.access_order.append(key)

    def show_cache(self):
        """現在のキャッシュ状態を表示"""
        print(f"現在のキャッシュ: {self.cache}")
        print(f"アクセス順序: {self.access_order}")


# 使用例
if __name__ == "__main__":
    print("=== 基本的なハッシュテーブル操作 ===")
    hash_table = HashTable(5)

    # 要素の追加
    hash_table.set("name", "田中太郎")
    hash_table.set("age", 25)
    hash_table.set("city", "東京")
    hash_table.set("hobby", "プログラミング")

    print(hash_table)
    print(f"サイズ: {hash_table.get_size()}")

    # 要素の取得
    print(f"名前: {hash_table.get('name')}")
    print(f"年齢: {hash_table.get('age')}")

    # キーの存在チェック
    print(f"emailキーは存在する? {'email' in hash_table}")

    # 要素の削除
    deleted_value = hash_table.delete("hobby")
    print(f"削除された値: {deleted_value}")
    print(hash_table)

    # すべてのキーと値を取得
    print(f"すべてのキー: {hash_table.keys()}")
    print(f"すべての値: {hash_table.values()}")

    # バケットの状態を確認
    hash_table.show_buckets()

    # 応用例1: 単語の出現回数カウント
    print("\n=== 単語の出現回数カウント ===")
    text = "この文章には同じ単語が複数回出現します この文章を解析して単語の出現回数を数えます"
    word_counter = count_words(text)
    print("単語の出現回数:")
    print(word_counter)

    # 応用例2: キャッシュシステム
    print("\n=== シンプルなキャッシュシステム ===")
    cache = SimpleCache(3)
    cache.set("user1", "田中")
    cache.set("user2", "佐藤")
    cache.set("user3", "鈴木")
    cache.show_cache()

    cache.get("user1")  # キャッシュヒット
    cache.set("user4", "高橋")  # user2が削除される
    cache.show_cache()

    # dict風の操作
    print("\n=== dict風の操作 ===")
    ht = HashTable()
    ht["key1"] = "value1"
    ht["key2"] = "value2"
    print(f"ht['key1'] = {ht['key1']}")
    print(f"'key2' in ht: {'key2' in ht}")
    print(f"len(ht): {len(ht)}")
    del ht["key1"]
    print(f"削除後: {ht}")
