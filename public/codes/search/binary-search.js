// 二分探索 (Binary Search)
// ソート済み配列を半分に分けながら効率的に探索するアルゴリズム

/**
 * 二分探索を実行する関数
 * @param {number[]} array - ソート済みの探索対象配列
 * @param {number} target - 探している値
 * @returns {number} 見つかった場合はインデックス、見つからない場合は-1
 */
function binarySearch(array, target) {
  let left = 0; // 探索範囲の左端
  let right = array.length - 1; // 探索範囲の右端

  // 探索範囲が有効な間は繰り返す
  while (left <= right) {
    // 中央のインデックスを計算
    const mid = Math.floor((left + right) / 2);

    // 中央の値が目的の値と一致するかチェック
    if (array[mid] === target) {
      return mid; // 見つかった位置を返す
    }
    // 中央の値が目的の値より小さい場合
    else if (array[mid] < target) {
      left = mid + 1; // 右半分を探索範囲にする
    }
    // 中央の値が目的の値より大きい場合
    else {
      right = mid - 1; // 左半分を探索範囲にする
    }
  }

  // ここまで来たら見つからなかった
  return -1; // 見つからないことを示す-1を返す
}

// 使用例
const sortedNumbers = [1, 3, 5, 7, 9, 11, 13, 15, 17, 19];
const target = 11;

console.log("ソート済み配列:", sortedNumbers);
console.log("探している値:", target);

const result = binarySearch(sortedNumbers, target);

if (result !== -1) {
  console.log(`値 ${target} はインデックス ${result} で見つかりました`);
} else {
  console.log(`値 ${target} は配列内に見つかりませんでした`);
}

/**
 * ステップごとの詳細表示付き二分探索
 * 学習用に各ステップを詳しく表示
 */
function binarySearchDetailed(array, target) {
  console.log("\n=== 二分探索の詳細ステップ ===");
  console.log(`探索対象: [${array.join(", ")}]`);
  console.log(`目的の値: ${target}`);
  console.log("---");

  let left = 0;
  let right = array.length - 1;
  let step = 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);

    console.log(`ステップ ${step}:`);
    console.log(`  探索範囲: インデックス ${left} ～ ${right}`);
    console.log(`  中央インデックス: ${mid} (値: ${array[mid]})`);

    if (array[mid] === target) {
      console.log(
        `  ✓ 一致しました！インデックス ${mid} で値 ${target} を発見`
      );
      return mid;
    } else if (array[mid] < target) {
      console.log(`  ${array[mid]} < ${target} なので、右半分を探索`);
      left = mid + 1;
    } else {
      console.log(`  ${array[mid]} > ${target} なので、左半分を探索`);
      right = mid - 1;
    }

    step++;
    console.log("---");
  }

  console.log("探索範囲がなくなりました。値は見つかりませんでした");
  return -1;
}

// 詳細版の実行例
console.log("\n" + "=".repeat(50));
binarySearchDetailed([2, 5, 8, 12, 16, 23, 38, 45, 67, 78], 23);
