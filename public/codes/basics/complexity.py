# 計算量の例：様々なアルゴリズムの時間計算量をPythonで確認

import time

# ============================================
# O(1) - 定数時間
# ============================================


def constant_time(arr, index):
    """
    配列の特定インデックスへのアクセス
    配列のサイズに関係なく常に同じ時間
    """
    return arr[index]


# ============================================
# O(log n) - 対数時間
# ============================================


def binary_search(arr, target):
    """
    二分探索：ソート済み配列から要素を探す
    """
    left, right = 0, len(arr) - 1

    while left <= right:
        mid = (left + right) // 2

        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            left = mid + 1
        else:
            right = mid - 1

    return -1  # 見つからない場合


# ============================================
# O(n) - 線形時間
# ============================================


def linear_search(arr, target):
    """
    線形探索：配列をひとつずつ確認
    """
    for i, value in enumerate(arr):
        if value == target:
            return i
    return -1


def sum_array(arr):
    """
    配列の合計を計算
    """
    total = 0
    for num in arr:
        total += num
    return total


# ============================================
# O(n log n) - 線形対数時間
# ============================================


def merge_sort(arr):
    """
    マージソート：分割統治法を使った効率的なソート
    """
    if len(arr) <= 1:
        return arr

    mid = len(arr) // 2
    left = merge_sort(arr[:mid])
    right = merge_sort(arr[mid:])

    return merge(left, right)


def merge(left, right):
    """
    二つのソート済み配列をマージ
    """
    result = []
    i = j = 0

    while i < len(left) and j < len(right):
        if left[i] <= right[j]:
            result.append(left[i])
            i += 1
        else:
            result.append(right[j])
            j += 1

    result.extend(left[i:])
    result.extend(right[j:])
    return result


# ============================================
# O(n²) - 二次時間
# ============================================


def bubble_sort(arr):
    """
    バブルソート：隣接要素を比較して交換
    """
    arr = arr.copy()  # 元の配列を変更しない
    n = len(arr)

    for i in range(n - 1):
        for j in range(n - i - 1):
            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]

    return arr


def find_pairs(arr):
    """
    全ペアを調べる処理
    """
    pairs = []

    for i in range(len(arr)):
        for j in range(i + 1, len(arr)):
            pairs.append((arr[i], arr[j]))

    return pairs


# ============================================
# O(2^n) - 指数時間
# ============================================


def fibonacci(n):
    """
    フィボナッチ数列（ナイーブな実装）
    """
    if n <= 1:
        return n
    return fibonacci(n - 1) + fibonacci(n - 2)


def find_subsets(arr):
    """
    配列のすべての部分集合を生成
    """
    if not arr:
        return [[]]

    first = arr[0]
    rest = arr[1:]
    subsets_without_first = find_subsets(rest)
    subsets_with_first = [[first] + subset for subset in subsets_without_first]

    return subsets_without_first + subsets_with_first


# ============================================
# 改良されたアルゴリズム（動的プログラミング）
# ============================================


def fibonacci_optimized(n, memo={}):
    """
    フィボナッチ数列（メモ化による最適化）
    O(2^n) → O(n) に改善
    """
    if n in memo:
        return memo[n]

    if n <= 1:
        return n

    memo[n] = fibonacci_optimized(n - 1, memo) + fibonacci_optimized(n - 2, memo)
    return memo[n]


# ============================================
# 計算量の比較実験
# ============================================


def complexity_comparison():
    """
    実際の実行時間を測定して計算量を比較
    """
    sizes = [10, 100, 1000]

    print("計算量の実行時間比較:")
    print("サイズ\tO(1)\t\tO(log n)\tO(n)\t\tO(n²)")
    print("-" * 60)

    for n in sizes:
        # テスト用データ準備
        test_array = list(range(n))

        # O(1) - 定数時間
        start = time.perf_counter()
        constant_time(test_array, 0)
        time_o1 = time.perf_counter() - start

        # O(log n) - 対数時間
        start = time.perf_counter()
        binary_search(test_array, n - 1)
        time_olog = time.perf_counter() - start

        # O(n) - 線形時間
        start = time.perf_counter()
        sum_array(test_array)
        time_on = time.perf_counter() - start

        # O(n²) - 二次時間（小さいサイズのみ）
        if n <= 100:
            start = time.perf_counter()
            bubble_sort(test_array[::-1])  # 逆順でソート
            time_on2 = time.perf_counter() - start

            print(f"{n}\t{time_o1:.6f}\t{time_olog:.6f}\t{time_on:.6f}\t{time_on2:.6f}")
        else:
            print(f"{n}\t{time_o1:.6f}\t{time_olog:.6f}\t{time_on:.6f}\t(省略)")


def demonstrate_exponential_growth():
    """
    指数時間の危険性を実演
    """
    print("\n指数時間アルゴリズムの実行時間:")
    print("n\tナイーブ\t最適化")
    print("-" * 30)

    for n in range(5, 36, 5):
        # ナイーブなフィボナッチ（小さい値のみ）
        if n <= 35:
            start = time.perf_counter()
            result1 = fibonacci(n)
            time_naive = time.perf_counter() - start
        else:
            time_naive = float("inf")

        # 最適化されたフィボナッチ
        start = time.perf_counter()
        result2 = fibonacci_optimized(n)
        time_optimized = time.perf_counter() - start

        if time_naive != float("inf"):
            print(f"{n}\t{time_naive:.6f}\t{time_optimized:.6f}")
        else:
            print(f"{n}\t(超時間)\t{time_optimized:.6f}")


# ============================================
# 使用例とテスト
# ============================================


if __name__ == "__main__":
    # テスト用データ
    test_array = [64, 34, 25, 12, 22, 11, 90]
    print("元の配列:", test_array)

    # ソートアルゴリズムの比較
    print("マージソート O(n log n):", merge_sort(test_array))
    print("バブルソート O(n²):", bubble_sort(test_array))

    # フィボナッチ数列
    print("フィボナッチ(10) ナイーブ:", fibonacci(10))
    print("フィボナッチ(10) 最適化:", fibonacci_optimized(10))

    # 実行時間の比較
    complexity_comparison()

    # 指数時間の危険性
    demonstrate_exponential_growth()

    print("\n重要なポイント:")
    print("• O(1), O(log n), O(n), O(n log n) は実用的")
    print("• O(n²) は小〜中規模データまで")
    print("• O(2^n), O(n!) は非常に小さなデータのみ")
    print("• 適切なアルゴリズム選択が重要！")
