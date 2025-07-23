// ハッシュテーブル (Hash Table) - JavaScript実装

class HashTable {
  constructor(size = 10) {
    this.size = size;
    this.buckets = new Array(size); // バケット配列
    this.count = 0; // 格納されている要素数

    // 各バケットを配列で初期化（チェイン法用）
    for (let i = 0; i < size; i++) {
      this.buckets[i] = [];
    }
  }

  // ハッシュ関数 - 文字列を配列のインデックスに変換
  _hash(key) {
    let hash = 0;
    for (let i = 0; i < key.length; i++) {
      hash += key.charCodeAt(i);
    }
    return hash % this.size;
  }

  // キーと値のペアを挿入 - 平均 O(1)
  set(key, value) {
    const index = this._hash(key);
    const bucket = this.buckets[index];

    // 既存のキーがあるかチェック
    for (let i = 0; i < bucket.length; i++) {
      if (bucket[i][0] === key) {
        bucket[i][1] = value; // 値を更新
        return;
      }
    }

    // 新しいキーと値を追加
    bucket.push([key, value]);
    this.count++;

    // 負荷率が高くなったらリサイズ
    if (this.count > this.size * 0.75) {
      this._resize();
    }
  }

  // キーに対応する値を取得 - 平均 O(1)
  get(key) {
    const index = this._hash(key);
    const bucket = this.buckets[index];

    for (let i = 0; i < bucket.length; i++) {
      if (bucket[i][0] === key) {
        return bucket[i][1];
      }
    }

    return undefined; // キーが見つからない場合
  }

  // キーと値のペアを削除 - 平均 O(1)
  delete(key) {
    const index = this._hash(key);
    const bucket = this.buckets[index];

    for (let i = 0; i < bucket.length; i++) {
      if (bucket[i][0] === key) {
        const value = bucket[i][1];
        bucket.splice(i, 1);
        this.count--;
        return value;
      }
    }

    return undefined; // キーが見つからない場合
  }

  // キーが存在するかチェック - 平均 O(1)
  has(key) {
    return this.get(key) !== undefined;
  }

  // すべてのキーを取得 - O(n)
  keys() {
    const keys = [];
    for (let bucket of this.buckets) {
      for (let [key, value] of bucket) {
        keys.push(key);
      }
    }
    return keys;
  }

  // すべての値を取得 - O(n)
  values() {
    const values = [];
    for (let bucket of this.buckets) {
      for (let [key, value] of bucket) {
        values.push(value);
      }
    }
    return values;
  }

  // ハッシュテーブルのサイズ（要素数）を取得 - O(1)
  getSize() {
    return this.count;
  }

  // ハッシュテーブルが空かチェック - O(1)
  isEmpty() {
    return this.count === 0;
  }

  // ハッシュテーブルをクリア - O(1)
  clear() {
    for (let i = 0; i < this.size; i++) {
      this.buckets[i] = [];
    }
    this.count = 0;
  }

  // ハッシュテーブルのサイズを拡張 - O(n)
  _resize() {
    const oldBuckets = this.buckets;
    this.size *= 2;
    this.buckets = new Array(this.size);
    this.count = 0;

    // 新しいバケットを初期化
    for (let i = 0; i < this.size; i++) {
      this.buckets[i] = [];
    }

    // 既存の要素を再ハッシュ
    for (let bucket of oldBuckets) {
      for (let [key, value] of bucket) {
        this.set(key, value);
      }
    }
  }

  // ハッシュテーブルの内容を表示 - O(n)
  toString() {
    const pairs = [];
    for (let bucket of this.buckets) {
      for (let [key, value] of bucket) {
        pairs.push(`${key}: ${value}`);
      }
    }
    return `{${pairs.join(", ")}}`;
  }

  // 負荷率を計算 - O(1)
  getLoadFactor() {
    return this.count / this.size;
  }

  // バケットの状態を表示（デバッグ用）
  showBuckets() {
    console.log("Bucket状態:");
    for (let i = 0; i < this.buckets.length; i++) {
      if (this.buckets[i].length > 0) {
        console.log(`Bucket ${i}: ${JSON.stringify(this.buckets[i])}`);
      }
    }
  }
}

// 使用例とハッシュテーブルの応用例

// 基本的な使用例
console.log("=== 基本的なハッシュテーブル操作 ===");
const hashTable = new HashTable(5);

// 要素の追加
hashTable.set("name", "田中太郎");
hashTable.set("age", 25);
hashTable.set("city", "東京");
hashTable.set("hobby", "プログラミング");

console.log(hashTable.toString());
console.log("サイズ:", hashTable.getSize());

// 要素の取得
console.log("名前:", hashTable.get("name"));
console.log("年齢:", hashTable.get("age"));

// キーの存在チェック
console.log("emailキーは存在する?", hashTable.has("email"));

// 要素の削除
console.log("削除された値:", hashTable.delete("hobby"));
console.log(hashTable.toString());

// すべてのキーと値を取得
console.log("すべてのキー:", hashTable.keys());
console.log("すべての値:", hashTable.values());

// バケットの状態を確認
hashTable.showBuckets();

// 応用例1: 単語の出現回数をカウント
console.log("\n=== 単語の出現回数カウント ===");
function countWords(text) {
  const wordCount = new HashTable();
  const words = text.toLowerCase().split(/\s+/);

  for (let word of words) {
    const count = wordCount.get(word) || 0;
    wordCount.set(word, count + 1);
  }

  return wordCount;
}

const text =
  "この文章には同じ単語が複数回出現します この文章を解析して単語の出現回数を数えます";
const wordCounter = countWords(text);
console.log("単語の出現回数:");
console.log(wordCounter.toString());

// 応用例2: キャッシュシステム
console.log("\n=== シンプルなキャッシュシステム ===");
class SimpleCache {
  constructor(maxSize = 5) {
    this.cache = new HashTable(maxSize);
    this.accessOrder = []; // LRU用のアクセス順序
    this.maxSize = maxSize;
  }

  get(key) {
    const value = this.cache.get(key);
    if (value !== undefined) {
      // アクセス順序を更新
      this._updateAccessOrder(key);
      console.log(`キャッシュヒット: ${key} = ${value}`);
      return value;
    }
    console.log(`キャッシュミス: ${key}`);
    return null;
  }

  set(key, value) {
    // キャッシュが満杯の場合、最も古いアイテムを削除
    if (this.cache.getSize() >= this.maxSize && !this.cache.has(key)) {
      const oldestKey = this.accessOrder.shift();
      this.cache.delete(oldestKey);
      console.log(`キャッシュから削除: ${oldestKey}`);
    }

    this.cache.set(key, value);
    this._updateAccessOrder(key);
    console.log(`キャッシュに追加: ${key} = ${value}`);
  }

  _updateAccessOrder(key) {
    // キーを順序リストから削除してから末尾に追加
    const index = this.accessOrder.indexOf(key);
    if (index > -1) {
      this.accessOrder.splice(index, 1);
    }
    this.accessOrder.push(key);
  }

  showCache() {
    console.log("現在のキャッシュ:", this.cache.toString());
    console.log("アクセス順序:", this.accessOrder);
  }
}

const cache = new SimpleCache(3);
cache.set("user1", "田中");
cache.set("user2", "佐藤");
cache.set("user3", "鈴木");
cache.showCache();

cache.get("user1"); // キャッシュヒット
cache.set("user4", "高橋"); // user2が削除される
cache.showCache();
