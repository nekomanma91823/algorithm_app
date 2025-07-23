# 二分探索 (Binary Search)
# ソート済み配列を半分に分けながら効率的に探索するアルゴリズム


def binary_search(array, target):
    """
    二分探索を実行する関数

    Args:
        array (list): ソート済みの探索対象配列
        target: 探している値

    Returns:
        int: 見つかった場合はインデックス、見つからない場合は-1
    """
    left = 0  # 探索範囲の左端
    right = len(array) - 1  # 探索範囲の右端

    # 探索範囲が有効な間は繰り返す
    while left <= right:
        # 中央のインデックスを計算
        mid = (left + right) // 2

        # 中央の値が目的の値と一致するかチェック
        if array[mid] == target:
            return mid  # 見つかった位置を返す
        # 中央の値が目的の値より小さい場合
        elif array[mid] < target:
            left = mid + 1  # 右半分を探索範囲にする
        # 中央の値が目的の値より大きい場合
        else:
            right = mid - 1  # 左半分を探索範囲にする

    # ここまで来たら見つからなかった
    return -1  # 見つからないことを示す-1を返す


# 使用例
if __name__ == "__main__":
    sorted_numbers = [1, 3, 5, 7, 9, 11, 13, 15, 17, 19]
    target = 11

    print(f"ソート済み配列: {sorted_numbers}")
    print(f"探している値: {target}")

    result = binary_search(sorted_numbers, target)

    if result != -1:
        print(f"値 {target} はインデックス {result} で見つかりました")
    else:
        print(f"値 {target} は配列内に見つかりませんでした")


def binary_search_detailed(array, target):
    """
    ステップごとの詳細表示付き二分探索
    学習用に各ステップを詳しく表示
    """
    print("\n=== 二分探索の詳細ステップ ===")
    print(f"探索対象: {array}")
    print(f"目的の値: {target}")
    print("---")

    left = 0
    right = len(array) - 1
    step = 1

    while left <= right:
        mid = (left + right) // 2

        print(f"ステップ {step}:")
        print(f"  探索範囲: インデックス {left} ～ {right}")
        print(f"  中央インデックス: {mid} (値: {array[mid]})")

        if array[mid] == target:
            print(f"  ✓ 一致しました！インデックス {mid} で値 {target} を発見")
            return mid
        elif array[mid] < target:
            print(f"  {array[mid]} < {target} なので、右半分を探索")
            left = mid + 1
        else:
            print(f"  {array[mid]} > {target} なので、左半分を探索")
            right = mid - 1

        step += 1
        print("---")

    print("探索範囲がなくなりました。値は見つかりませんでした")
    return -1


# 詳細版の実行例
if __name__ == "__main__":
    print("\n" + "=" * 50)
    binary_search_detailed([2, 5, 8, 12, 16, 23, 38, 45, 67, 78], 23)
