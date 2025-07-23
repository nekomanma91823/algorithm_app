# 深さ優先探索 (Depth-First Search - DFS)
# グラフやツリーを深さ方向に探索し、行き止まりまで進んでから戻るアルゴリズム


def dfs_recursive(graph, current, target_node, visited=None):
    """
    深さ優先探索を実行する関数（再帰版）

    Args:
        graph (dict): グラフの隣接リスト表現
        current (str): 現在のノード
        target_node (str): 探している目標ノード
        visited (set): 訪問済みノードのセット

    Returns:
        bool: 見つかった場合はTrue、見つからない場合はFalse
    """
    if visited is None:
        visited = set()

    # 現在のノードを訪問済みにマーク
    visited.add(current)

    # 目標ノードに到達したかチェック
    if current == target_node:
        return True  # 見つかった！

    # 現在のノードの隣接ノードを調べる
    neighbors = graph.get(current, [])
    for neighbor in neighbors:
        # まだ訪問していないノードのみ処理
        if neighbor not in visited:
            # 再帰的に探索
            if dfs_recursive(graph, neighbor, target_node, visited):
                return True  # 見つかった場合は即座に返す

    return False  # この経路では見つからなかった


def dfs_iterative(graph, start, target_node):
    """
    深さ優先探索を実行する関数（反復版）

    Args:
        graph (dict): グラフの隣接リスト表現
        start (str): 開始ノード
        target_node (str): 探している目標ノード

    Returns:
        bool: 見つかった場合はTrue、見つからない場合はFalse
    """
    # スタックと訪問済みセットを初期化
    stack = [start]  # 探索待ちのノードを管理
    visited = set()  # 訪問済みノードを記録

    # スタックが空になるまで探索を続ける
    while stack:
        # スタックの先頭からノードを取り出す
        current = stack.pop()

        # 既に訪問済みの場合はスキップ
        if current in visited:
            continue

        # 現在のノードを訪問済みにマーク
        visited.add(current)

        # 目標ノードに到達したかチェック
        if current == target_node:
            return True  # 見つかった！

        # 現在のノードの隣接ノードをスタックに追加
        neighbors = graph.get(current, [])
        for neighbor in neighbors:
            if neighbor not in visited:
                stack.append(neighbor)

    return False  # 見つからなかった


def dfs_with_path(graph, current, target_node, path=None, visited=None):
    """
    経路も返すDFS

    Args:
        graph (dict): グラフの隣接リスト表現
        current (str): 現在のノード
        target_node (str): 探している目標ノード
        path (list): 現在の経路
        visited (set): 訪問済みノードのセット

    Returns:
        list or None: 経路のリスト、見つからない場合はNone
    """
    if path is None:
        path = []
    if visited is None:
        visited = set()

    # 現在のノードを経路に追加
    path.append(current)
    visited.add(current)

    # 目標ノードに到達したかチェック
    if current == target_node:
        return path.copy()  # 経路のコピーを返す

    # 現在のノードの隣接ノードを調べる
    neighbors = graph.get(current, [])
    for neighbor in neighbors:
        if neighbor not in visited:
            result = dfs_with_path(graph, neighbor, target_node, path, visited)
            if result:
                return result  # 経路が見つかった場合は返す

    # バックトラッキング：経路から現在のノードを削除
    path.pop()
    return None  # この経路では見つからなかった


# 使用例
if __name__ == "__main__":
    graph = {
        "A": ["B", "C"],
        "B": ["A", "D", "E"],
        "C": ["A", "F"],
        "D": ["B"],
        "E": ["B", "F"],
        "F": ["C", "E"],
    }

    print(f"グラフ: {graph}")
    print("A から F への探索:")

    # 再帰版DFS
    found_recursive = dfs_recursive(graph, "A", "F")
    print(f"再帰版で見つかりました: {found_recursive}")

    # 反復版DFS
    found_iterative = dfs_iterative(graph, "A", "F")
    print(f"反復版で見つかりました: {found_iterative}")

    # 経路付きDFS
    path = dfs_with_path(graph, "A", "F")
    print(f"経路: {' → '.join(path) if path else '経路なし'}")


def dfs_detailed(graph, start, target_node):
    """
    ステップごとの詳細表示付きDFS（反復版）
    学習用に各ステップを詳しく表示
    """
    print("\n=== 深さ優先探索の詳細ステップ ===")
    print(f"開始ノード: {start}")
    print(f"目標ノード: {target_node}")
    print("---")

    stack = [start]
    visited = set()
    step = 1

    print(f"初期化: スタック = {stack}, 訪問済み = set()")

    while stack:
        print(f"\nステップ {step}:")
        print(f"  現在のスタック: {stack}")

        current = stack.pop()
        print(f"  取り出したノード: {current}")

        if current in visited:
            print("  既に訪問済みのためスキップ")
            continue

        visited.add(current)
        print(f"  {current} を訪問済みにマーク")

        if current == target_node:
            print(f"  ✓ 目標ノード {target_node} を発見！")
            return True

        neighbors = graph.get(current, [])
        print(f"  隣接ノード: {neighbors}")

        new_nodes = []
        for neighbor in neighbors:
            if neighbor not in visited:
                stack.append(neighbor)
                new_nodes.append(neighbor)

        if new_nodes:
            print(f"  スタックに追加: {new_nodes}")
        print(f"  更新後の訪問済み: {visited}")

        step += 1

    print(f"\n✗ 目標ノード {target_node} は見つかりませんでした")
    return False


# 詳細版の実行例
if __name__ == "__main__":
    print("\n" + "=" * 50)
    dfs_detailed(graph, "A", "F")
