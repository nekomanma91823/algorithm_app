// トライ木 (Trie) - JavaScript実装

class TrieNode {
  constructor() {
    this.children = {}; // 子ノードを格納
    this.isEndOfWord = false; // 単語の終端かどうか
    this.value = null; // オプション：値を格納
  }
}

class Trie {
  constructor() {
    this.root = new TrieNode();
  }

  // 単語を挿入 - O(m) mは単語の長さ
  insert(word, value = null) {
    let current = this.root;

    for (let char of word) {
      if (!current.children[char]) {
        current.children[char] = new TrieNode();
      }
      current = current.children[char];
    }

    current.isEndOfWord = true;
    if (value !== null) {
      current.value = value;
    }
  }

  // 単語を検索 - O(m)
  search(word) {
    let current = this.root;

    for (let char of word) {
      if (!current.children[char]) {
        return false;
      }
      current = current.children[char];
    }

    return current.isEndOfWord;
  }

  // プレフィックスで始まる単語があるかチェック - O(m)
  startsWith(prefix) {
    let current = this.root;

    for (let char of prefix) {
      if (!current.children[char]) {
        return false;
      }
      current = current.children[char];
    }

    return true;
  }

  // プレフィックスで始まるすべての単語を取得 - O(N)
  getWordsWithPrefix(prefix) {
    let current = this.root;

    // プレフィックスまで移動
    for (let char of prefix) {
      if (!current.children[char]) {
        return [];
      }
      current = current.children[char];
    }

    // プレフィックス以降の文字列を収集
    const words = [];
    this._collectWords(current, prefix, words);
    return words;
  }

  _collectWords(node, currentWord, words) {
    if (node.isEndOfWord) {
      words.push(currentWord);
    }

    for (let char in node.children) {
      this._collectWords(node.children[char], currentWord + char, words);
    }
  }

  // 単語を削除 - O(m)
  delete(word) {
    this._deleteHelper(this.root, word, 0);
  }

  _deleteHelper(node, word, index) {
    if (index === word.length) {
      if (!node.isEndOfWord) {
        return false; // 単語が存在しない
      }
      node.isEndOfWord = false;
      return Object.keys(node.children).length === 0;
    }

    const char = word[index];
    const childNode = node.children[char];

    if (!childNode) {
      return false;
    }

    const shouldDeleteChild = this._deleteHelper(childNode, word, index + 1);

    if (shouldDeleteChild) {
      delete node.children[char];
      return !node.isEndOfWord && Object.keys(node.children).length === 0;
    }

    return false;
  }

  // すべての単語を取得
  getAllWords() {
    const words = [];
    this._collectWords(this.root, "", words);
    return words;
  }

  // トライ木のサイズ（単語数）
  size() {
    return this.getAllWords().length;
  }

  // 空かどうかチェック
  isEmpty() {
    return Object.keys(this.root.children).length === 0;
  }
}

// 使用例
console.log("=== トライ木の基本操作 ===");
const trie = new Trie();

// 単語の挿入
const words = ["cat", "car", "card", "care", "careful", "cats", "dog", "dodge"];
words.forEach((word) => trie.insert(word));

console.log("挿入された単語:", words);

// 単語の検索
console.log("'cat'が存在?", trie.search("cat")); // true
console.log("'ca'が存在?", trie.search("ca")); // false
console.log("'care'が存在?", trie.search("care")); // true

// プレフィックス検索
console.log("'car'で始まる?", trie.startsWith("car")); // true
console.log("'xyz'で始まる?", trie.startsWith("xyz")); // false

// プレフィックスで始まる単語を取得
console.log("'car'で始まる単語:", trie.getWordsWithPrefix("car"));
console.log("'ca'で始まる単語:", trie.getWordsWithPrefix("ca"));

// 自動補完の例
console.log("\n=== 自動補完機能 ===");
function autoComplete(trie, prefix) {
  const suggestions = trie.getWordsWithPrefix(prefix);
  return suggestions.slice(0, 5); // 最大5件まで
}

console.log("'c'の補完:", autoComplete(trie, "c"));
console.log("'car'の補完:", autoComplete(trie, "car"));

// 単語の削除
console.log("\n=== 削除操作 ===");
console.log("削除前のすべての単語:", trie.getAllWords());
trie.delete("cat");
console.log("'cat'削除後:", trie.getAllWords());
console.log("'cat'が存在?", trie.search("cat")); // false
console.log("'cats'が存在?", trie.search("cats")); // true
