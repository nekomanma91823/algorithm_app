# ダイクストラ法 (Dijkstra's Algorithm)
# 重み付きグラフで単一始点から全ノードへの最短経路を効率的に求めるアルゴリズム

import heapq


def dijkstra(graph, start):
    """
    ダイクストラ法を実行する関数

    Args:
        graph (dict): 重み付きグラフの隣接リスト表現
        start (str): 開始ノード

    Returns:
        tuple: (distances, previous) - 各ノードへの最短距離と前のノードの情報
    """
    # 初期化
    distances = {}  # 各ノードへの最短距離
    previous = {}  # 最短経路での前のノード
    pq = []  # 優先度付きキュー（ヒープ）

    # すべてのノードの距離を無限大に初期化
    for node in graph:
        distances[node] = float("inf")
        previous[node] = None

    # 開始ノードの距離を0に設定
    distances[start] = 0
    heapq.heappush(pq, (0, start))

    # 優先度付きキューが空になるまで処理
    while pq:
        current_distance, current_node = heapq.heappop(pq)

        # 既により短い経路が見つかっている場合はスキップ
        if current_distance > distances[current_node]:
            continue

        # 現在のノードの隣接ノードを調べる
        neighbors = graph.get(current_node, [])
        for neighbor_info in neighbors:
            neighbor_node = neighbor_info["node"]
            weight = neighbor_info["weight"]
            distance = distances[current_node] + weight

            # より短い経路が見つかった場合は更新
            if distance < distances[neighbor_node]:
                distances[neighbor_node] = distance
                previous[neighbor_node] = current_node
                heapq.heappush(pq, (distance, neighbor_node))

    return distances, previous


def reconstruct_path(previous, start, target):
    """
    最短経路を復元する関数

    Args:
        previous (dict): 前のノードの情報
        start (str): 開始ノード
        target (str): 目標ノード

    Returns:
        list: 最短経路のリスト
    """
    path = []
    current = target

    while current is not None:
        path.insert(0, current)
        current = previous[current]

    # 開始ノードから到達可能かチェック
    return path if path and path[0] == start else []


# 使用例
if __name__ == "__main__":
    weighted_graph = {
        "A": [{"node": "B", "weight": 4}, {"node": "C", "weight": 2}],
        "B": [
            {"node": "A", "weight": 4},
            {"node": "C", "weight": 1},
            {"node": "D", "weight": 5},
        ],
        "C": [
            {"node": "A", "weight": 2},
            {"node": "B", "weight": 1},
            {"node": "D", "weight": 8},
            {"node": "E", "weight": 10},
        ],
        "D": [
            {"node": "B", "weight": 5},
            {"node": "C", "weight": 8},
            {"node": "E", "weight": 2},
        ],
        "E": [{"node": "C", "weight": 10}, {"node": "D", "weight": 2}],
    }

    print(f"重み付きグラフ: {weighted_graph}")
    print("A から各ノードへの最短経路:")

    distances, previous = dijkstra(weighted_graph, "A")
    print(f"最短距離: {distances}")

    # 各ノードへの最短経路を表示
    for node in distances:
        if node != "A":
            path = reconstruct_path(previous, "A", node)
            distance = distances[node]
            print(f"A → {node}: {' → '.join(path)} (距離: {distance})")


def dijkstra_detailed(graph, start):
    """
    ステップごとの詳細表示付きダイクストラ法
    学習用に各ステップを詳しく表示
    """
    print("\n=== ダイクストラ法の詳細ステップ ===")
    print(f"開始ノード: {start}")
    print("---")

    distances = {}
    previous = {}
    visited = set()
    pq = []

    # 初期化
    for node in graph:
        distances[node] = float("inf")
        previous[node] = None
    distances[start] = 0
    heapq.heappush(pq, (0, start))

    print("初期化:")
    print(f"  距離: {distances}")
    print("---")

    step = 1
    while pq:
        current_distance, current_node = heapq.heappop(pq)

        print(f"ステップ {step}:")
        print(f"  処理中のノード: {current_node} (距離: {current_distance})")

        if current_node in visited:
            print("  既に処理済みのためスキップ")
            continue

        visited.add(current_node)
        print(f"  {current_node} を確定")

        neighbors = graph.get(current_node, [])
        neighbor_info = [f"{n['node']}(重み:{n['weight']})" for n in neighbors]
        print(f"  隣接ノード: {', '.join(neighbor_info)}")

        for neighbor_info in neighbors:
            neighbor_node = neighbor_info["node"]
            weight = neighbor_info["weight"]
            distance = distances[current_node] + weight

            print(
                f"    {neighbor_node}: {distances[current_node]} + {weight} = {distance}"
            )

            if distance < distances[neighbor_node]:
                print(
                    f"      より短い経路を発見！ {distances[neighbor_node]} → {distance}"
                )
                distances[neighbor_node] = distance
                previous[neighbor_node] = current_node
                heapq.heappush(pq, (distance, neighbor_node))
            else:
                print(f"      既存の経路の方が短い ({distances[neighbor_node]})")

        print(f"  更新後の距離: {distances}")
        print("---")
        step += 1

    return distances, previous


# 詳細版の実行例
if __name__ == "__main__":
    print("\n" + "=" * 50)
    dijkstra_detailed(weighted_graph, "A")
