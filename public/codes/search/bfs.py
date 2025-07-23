# 幅優先探索 (Breadth-First Search - BFS)
# グラフやツリーを階層ごとに幅方向に探索するアルゴリズム

from collections import deque


def bfs(graph, start, target):
    """
    幅優先探索を実行する関数

    Args:
        graph (dict): グラフの隣接リスト表現
        start (str): 開始ノード
        target (str): 探している目標ノード

    Returns:
        bool: 見つかった場合はTrue、見つからない場合はFalse
    """
    # キューと訪問済みセットを初期化
    queue = deque([start])  # 探索待ちのノードを管理
    visited = set([start])  # 訪問済みノードを記録

    # キューが空になるまで探索を続ける
    while queue:
        # キューの先頭からノードを取り出す
        current = queue.popleft()

        # 目標ノードに到達したかチェック
        if current == target:
            return True  # 見つかった！

        # 現在のノードの隣接ノードを調べる
        neighbors = graph.get(current, [])
        for neighbor in neighbors:
            # まだ訪問していないノードのみ処理
            if neighbor not in visited:
                visited.add(neighbor)  # 訪問済みにマーク
                queue.append(neighbor)  # キューに追加

    return False  # 見つからなかった


def bfs_with_path(graph, start, target):
    """
    最短経路も返すBFS

    Args:
        graph (dict): グラフの隣接リスト表現
        start (str): 開始ノード
        target (str): 探している目標ノード

    Returns:
        list or None: 最短経路のリスト、見つからない場合はNone
    """
    queue = deque([(start, [start])])  # ノードと経路をペアで管理
    visited = set([start])

    while queue:
        current, path = queue.popleft()

        if current == target:
            return path  # 経路を返す

        neighbors = graph.get(current, [])
        for neighbor in neighbors:
            if neighbor not in visited:
                visited.add(neighbor)
                queue.append((neighbor, path + [neighbor]))  # 経路に追加

    return None  # 経路が存在しない


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

    # 単純な探索
    found = bfs(graph, "A", "F")
    print(f"見つかりました: {found}")

    # 経路付き探索
    path = bfs_with_path(graph, "A", "F")
    print(f"最短経路: {' → '.join(path) if path else '経路なし'}")


def bfs_detailed(graph, start, target):
    """
    ステップごとの詳細表示付きBFS
    学習用に各ステップを詳しく表示
    """
    print("\n=== 幅優先探索の詳細ステップ ===")
    print(f"開始ノード: {start}")
    print(f"目標ノード: {target}")
    print("---")

    queue = deque([start])
    visited = set([start])
    step = 1

    print(f"初期化: キュー = {list(queue)}, 訪問済み = {visited}")

    while queue:
        print(f"\nステップ {step}:")
        print(f"  現在のキュー: {list(queue)}")

        current = queue.popleft()
        print(f"  探索中のノード: {current}")

        if current == target:
            print(f"  ✓ 目標ノード {target} を発見！")
            return True

        neighbors = graph.get(current, [])
        print(f"  隣接ノード: {neighbors}")

        new_nodes = []
        for neighbor in neighbors:
            if neighbor not in visited:
                visited.add(neighbor)
                queue.append(neighbor)
                new_nodes.append(neighbor)

        if new_nodes:
            print(f"  キューに追加: {new_nodes}")
        print(f"  更新後の訪問済み: {visited}")

        step += 1

    print(f"\n✗ 目標ノード {target} は見つかりませんでした")
    return False


# 詳細版の実行例
if __name__ == "__main__":
    print("\n" + "=" * 50)
    bfs_detailed(graph, "A", "F")
