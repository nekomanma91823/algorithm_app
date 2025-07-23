// 線形探索 (Linear Search)
// 配列を最初から順番に調べて目的の値を探すアルゴリズム

/**
 * 線形探索を実行する関数
 * @param {number[]} array - 探索対象の配列
 * @param {number} target - 探している値
 * @returns {number} 見つかった場合はインデックス、見つからない場合は-1
 */
function linearSearch(array, target) {
  // 配列の最初から最後まで順番に調べる
  for (let i = 0; i < array.length; i++) {
    // 現在の要素が目的の値と一致するかチェック
    if (array[i] === target) {
      return i; // 見つかった位置（インデックス）を返す
    }
  }

  // ここまで来たら見つからなかった
  return -1; // 見つからないことを示す-1を返す
}

// 使用例
const numbers = [64, 34, 25, 12, 22, 11, 90];
const target = 22;

console.log("配列:", numbers);
console.log("探している値:", target);

const result = linearSearch(numbers, target);

if (result !== -1) {
  console.log(`値 ${target} はインデックス ${result} で見つかりました`);
} else {
  console.log(`値 ${target} は配列内に見つかりませんでした`);
}

/**
 * ステップごとの詳細表示付き線形探索
 * 学習用に各ステップを詳しく表示
 */
function linearSearchDetailed(array, target) {
  console.log("\n=== 線形探索の詳細ステップ ===");
  console.log(`探索対象: [${array.join(", ")}]`);
  console.log(`目的の値: ${target}`);
  console.log("---");

  for (let i = 0; i < array.length; i++) {
    console.log(
      `ステップ ${i + 1}: インデックス ${i} の値 ${array[i]} をチェック`
    );

    if (array[i] === target) {
      console.log(`✓ 一致しました！インデックス ${i} で値 ${target} を発見`);
      return i;
    } else {
      console.log(`✗ 一致しません (${array[i]} ≠ ${target})`);
    }
  }

  console.log("すべての要素をチェックしましたが、見つかりませんでした");
  return -1;
}

// 詳細版の実行例
console.log("\n" + "=".repeat(50));
linearSearchDetailed([10, 23, 45, 70, 11, 15], 70);
