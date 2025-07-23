// 計算量の例：様々なアルゴリズムの時間計算量を実際のコードで確認

// ============================================
// O(1) - 定数時間
// ============================================
function constantTime(arr, index) {
  // 配列の特定インデックスへのアクセス
  // 配列のサイズに関係なく常に同じ時間
  return arr[index];
}

// ============================================
// O(log n) - 対数時間
// ============================================
function binarySearch(arr, target) {
  // 二分探索：ソート済み配列から要素を探す
  let left = 0;
  let right = arr.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);

    if (arr[mid] === target) return mid;
    else if (arr[mid] < target) left = mid + 1;
    else right = mid - 1;
  }

  return -1; // 見つからない場合
}

// ============================================
// O(n) - 線形時間
// ============================================
function linearSearch(arr, target) {
  // 線形探索：配列をひとつずつ確認
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === target) return i;
  }
  return -1;
}

function sumArray(arr) {
  // 配列の合計を計算
  let sum = 0;
  for (let i = 0; i < arr.length; i++) {
    sum += arr[i];
  }
  return sum;
}

// ============================================
// O(n log n) - 線形対数時間
// ============================================
function mergeSort(arr) {
  // マージソート：分割統治法を使った効率的なソート
  if (arr.length <= 1) return arr;

  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid));

  return merge(left, right);
}

function merge(left, right) {
  const result = [];
  let i = 0,
    j = 0;

  while (i < left.length && j < right.length) {
    if (left[i] <= right[j]) {
      result.push(left[i++]);
    } else {
      result.push(right[j++]);
    }
  }

  return result.concat(left.slice(i)).concat(right.slice(j));
}

// ============================================
// O(n²) - 二次時間
// ============================================
function bubbleSort(arr) {
  // バブルソート：隣接要素を比較して交換
  const n = arr.length;

  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        // 要素を交換
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
  }

  return arr;
}

function findPairs(arr) {
  // 全ペアを調べる処理
  const pairs = [];

  for (let i = 0; i < arr.length; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      pairs.push([arr[i], arr[j]]);
    }
  }

  return pairs;
}

// ============================================
// O(2^n) - 指数時間
// ============================================
function fibonacci(n) {
  // フィボナッチ数列（ナイーブな実装）
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

function findSubsets(arr) {
  // 配列のすべての部分集合を生成
  if (arr.length === 0) return [[]];

  const first = arr[0];
  const rest = arr.slice(1);
  const subsetsWithoutFirst = findSubsets(rest);
  const subsetsWithFirst = subsetsWithoutFirst.map((subset) => [
    first,
    ...subset,
  ]);

  return [...subsetsWithoutFirst, ...subsetsWithFirst];
}

// ============================================
// 計算量の比較実験
// ============================================
function complexityComparison() {
  const sizes = [10, 100, 1000];

  console.log("計算量の実行時間比較:");
  console.log("サイズ\tO(1)\tO(log n)\tO(n)\tO(n²)");

  sizes.forEach((n) => {
    // O(1)
    const start1 = performance.now();
    constantTime([1, 2, 3], 0);
    const time1 = performance.now() - start1;

    // O(log n)
    const sortedArr = Array.from({ length: n }, (_, i) => i);
    const start2 = performance.now();
    binarySearch(sortedArr, n - 1);
    const time2 = performance.now() - start2;

    // O(n)
    const start3 = performance.now();
    sumArray(sortedArr);
    const time3 = performance.now() - start3;

    // O(n²) - 小さいサイズのみテスト
    if (n <= 100) {
      const start4 = performance.now();
      bubbleSort([...sortedArr].reverse());
      const time4 = performance.now() - start4;

      console.log(
        `${n}\t${time1.toFixed(3)}\t${time2.toFixed(3)}\t${time3.toFixed(
          3
        )}\t${time4.toFixed(3)}`
      );
    } else {
      console.log(
        `${n}\t${time1.toFixed(3)}\t${time2.toFixed(3)}\t${time3.toFixed(
          3
        )}\t(省略)`
      );
    }
  });
}

// 使用例
const testArray = [64, 34, 25, 12, 22, 11, 90];
console.log("元の配列:", testArray);

console.log("マージソート O(n log n):", mergeSort([...testArray]));
console.log("バブルソート O(n²):", bubbleSort([...testArray]));

console.log("フィボナッチ(10) O(2^n):", fibonacci(10));

// 実行時間の比較
complexityComparison();
