# トライ木 (Trie) - Python実装


class TrieNode:
    """トライ木のノードクラス"""

    def __init__(self):
        self.children = {}  # 子ノードを格納
        self.is_end_of_word = False  # 単語の終端かどうか
        self.value = None  # オプション：値を格納


class Trie:
    """トライ木（前置木）の実装"""

    def __init__(self):
        self.root = TrieNode()

    def insert(self, word, value=None):
        """単語を挿入 - O(m) mは単語の長さ"""
        current = self.root

        for char in word:
            if char not in current.children:
                current.children[char] = TrieNode()
            current = current.children[char]

        current.is_end_of_word = True
        if value is not None:
            current.value = value

    def search(self, word):
        """単語を検索 - O(m)"""
        current = self.root

        for char in word:
            if char not in current.children:
                return False
            current = current.children[char]

        return current.is_end_of_word

    def starts_with(self, prefix):
        """プレフィックスで始まる単語があるかチェック - O(m)"""
        current = self.root

        for char in prefix:
            if char not in current.children:
                return False
            current = current.children[char]

        return True

    def get_words_with_prefix(self, prefix):
        """プレフィックスで始まるすべての単語を取得 - O(N)"""
        current = self.root

        # プレフィックスまで移動
        for char in prefix:
            if char not in current.children:
                return []
            current = current.children[char]

        # プレフィックス以降の文字列を収集
        words = []
        self._collect_words(current, prefix, words)
        return words

    def _collect_words(self, node, current_word, words):
        """単語を収集する再帰的ヘルパー関数"""
        if node.is_end_of_word:
            words.append(current_word)

        for char, child_node in node.children.items():
            self._collect_words(child_node, current_word + char, words)

    def delete(self, word):
        """単語を削除 - O(m)"""
        self._delete_helper(self.root, word, 0)

    def _delete_helper(self, node, word, index):
        """削除のヘルパー関数"""
        if index == len(word):
            if not node.is_end_of_word:
                return False  # 単語が存在しない
            node.is_end_of_word = False
            return len(node.children) == 0

        char = word[index]
        child_node = node.children.get(char)

        if not child_node:
            return False

        should_delete_child = self._delete_helper(child_node, word, index + 1)

        if should_delete_child:
            del node.children[char]
            return not node.is_end_of_word and len(node.children) == 0

        return False

    def get_all_words(self):
        """すべての単語を取得"""
        words = []
        self._collect_words(self.root, "", words)
        return words

    def size(self):
        """トライ木のサイズ（単語数）"""
        return len(self.get_all_words())

    def is_empty(self):
        """空かどうかチェック"""
        return len(self.root.children) == 0

    def __contains__(self, word):
        """in演算子のサポート"""
        return self.search(word)

    def __len__(self):
        """len()関数のサポート"""
        return self.size()


def auto_complete(trie_tree, prefix, max_suggestions=5):
    """自動補完機能"""
    suggestions = trie_tree.get_words_with_prefix(prefix)
    return suggestions[:max_suggestions]  # 最大指定件数まで


# 使用例
if __name__ == "__main__":
    print("=== トライ木の基本操作 ===")
    trie = Trie()

    # 単語の挿入
    words = ["cat", "car", "card", "care", "careful", "cats", "dog", "dodge"]
    for word in words:
        trie.insert(word)

    print(f"挿入された単語: {words}")

    # 単語の検索
    print(f"'cat'が存在? {'cat' in trie}")  # True
    print(f"'ca'が存在? {'ca' in trie}")  # False
    print(f"'care'が存在? {'care' in trie}")  # True

    # プレフィックス検索
    print(f"'car'で始まる? {trie.starts_with('car')}")  # True
    print(f"'xyz'で始まる? {trie.starts_with('xyz')}")  # False

    # プレフィックスで始まる単語を取得
    print(f"'car'で始まる単語: {trie.get_words_with_prefix('car')}")
    print(f"'ca'で始まる単語: {trie.get_words_with_prefix('ca')}")

    # 自動補完の例
    print("\n=== 自動補完機能 ===")
    print(f"'c'の補完: {auto_complete(trie, 'c')}")
    print(f"'car'の補完: {auto_complete(trie, 'car')}")

    # トライ木の統計
    print(f"\nトライ木のサイズ: {len(trie)}")
    print(f"すべての単語: {trie.get_all_words()}")

    # 単語の削除
    print("\n=== 削除操作 ===")
    print(f"削除前のすべての単語: {trie.get_all_words()}")
    trie.delete("cat")
    print(f"'cat'削除後: {trie.get_all_words()}")
    print(f"'cat'が存在? {'cat' in trie}")  # False
    print(f"'cats'が存在? {'cats' in trie}")  # True

    # 値付きトライ木の例
    print("\n=== 値付きトライ木 ===")
    dictionary = Trie()
    dictionary.insert("apple", "りんご")
    dictionary.insert("application", "アプリケーション")
    dictionary.insert("apply", "適用する")

    # 値を取得するには、search後にノードを辿る必要がある
    # 簡単のため、ここでは基本的な検索のみ示す
    print(f"'apple'が辞書にある? {'apple' in dictionary}")
    print(f"'app'で始まる単語: {dictionary.get_words_with_prefix('app')}")
