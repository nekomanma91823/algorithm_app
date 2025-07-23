# 線形探索 (Linear Search)
# 配列を最初から順番に調べて目的の値を探すアルゴリズム


def linear_search(array, target):
    """
    線形探索を実行する関数

    Args:
        array (list): 探索対象の配列
        target: 探している値

    Returns:
        int: 見つかった場合はインデックス、見つからない場合は-1
    """
    # 配列の最初から最後まで順番に調べる
    for i in range(len(array)):
        # 現在の要素が目的の値と一致するかチェック
        if array[i] == target:
            return i  # 見つかった位置（インデックス）を返す

    # ここまで来たら見つからなかった
    return -1  # 見つからないことを示す-1を返す


# 使用例
if __name__ == "__main__":
    numbers = [64, 34, 25, 12, 22, 11, 90]
    target = 22

    print(f"配列: {numbers}")
    print(f"探している値: {target}")

    result = linear_search(numbers, target)

    if result != -1:
        print(f"値 {target} はインデックス {result} で見つかりました")
    else:
        print(f"値 {target} は配列内に見つかりませんでした")


def linear_search_detailed(array, target):
    """
    ステップごとの詳細表示付き線形探索
    学習用に各ステップを詳しく表示
    """
    print("\n=== 線形探索の詳細ステップ ===")
    print(f"探索対象: {array}")
    print(f"目的の値: {target}")
    print("---")

    for i in range(len(array)):
        print(f"ステップ {i + 1}: インデックス {i} の値 {array[i]} をチェック")

        if array[i] == target:
            print(f"✓ 一致しました！インデックス {i} で値 {target} を発見")
            return i
        else:
            print(f"✗ 一致しません ({array[i]} ≠ {target})")

    print("すべての要素をチェックしましたが、見つかりませんでした")
    return -1


# 詳細版の実行例
if __name__ == "__main__":
    print("\n" + "=" * 50)
    linear_search_detailed([10, 23, 45, 70, 11, 15], 70)
