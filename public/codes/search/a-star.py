# A* (A-star) アルゴリズム
# ヒューリスティック関数を使用してゴールに向かって効率的に最短経路を探索するアルゴリズム

import heapq
import math


def euclidean_distance(node1, node2):
    """
    ユークリッド距離によるヒューリスティック関数

    Args:
        node1 (dict): ノード1の座標 {'x': x, 'y': y}
        node2 (dict): ノード2の座標 {'x': x, 'y': y}

    Returns:
        float: ユークリッド距離
    """
    dx = node1["x"] - node2["x"]
    dy = node1["y"] - node2["y"]
    return math.sqrt(dx * dx + dy * dy)


def manhattan_distance(node1, node2):
    """
    マンハッタン距離によるヒューリスティック関数

    Args:
        node1 (dict): ノード1の座標 {'x': x, 'y': y}
        node2 (dict): ノード2の座標 {'x': x, 'y': y}

    Returns:
        int: マンハッタン距離
    """
    return abs(node1["x"] - node2["x"]) + abs(node1["y"] - node2["y"])


def a_star(graph, positions, start, goal, heuristic=euclidean_distance):
    """
    A*アルゴリズムを実行する関数

    Args:
        graph (dict): グラフの隣接リスト表現
        positions (dict): 各ノードの座標情報
        start (str): 開始ノード
        goal (str): 目標ノード
        heuristic (function): ヒューリスティック関数

    Returns:
        dict: 経路とコスト情報
    """
    open_list = []  # 探索候補のノード（ヒープ）
    closed_list = set()  # 探索済みのノード
    g_score = {}  # スタートからの実際のコスト
    f_score = {}  # f(n) = g(n) + h(n)
    previous = {}  # 最適経路での前のノード

    # 初期化
    for node in graph:
        g_score[node] = float("inf")
        f_score[node] = float("inf")
        previous[node] = None

    g_score[start] = 0
    f_score[start] = heuristic(positions[start], positions[goal])
    heapq.heappush(open_list, (f_score[start], start))

    while open_list:
        current_f, current = heapq.heappop(open_list)

        # ゴールに到達した場合
        if current == goal:
            path = reconstruct_path(previous, start, goal)
            return {
                "path": path,
                "cost": g_score[goal],
                "nodes_explored": len(closed_list),
            }

        closed_list.add(current)

        # 隣接ノードを調べる
        neighbors = graph.get(current, [])
        for neighbor_info in neighbors:
            neighbor_node = neighbor_info["node"]
            weight = neighbor_info["weight"]

            # 既に探索済みの場合はスキップ
            if neighbor_node in closed_list:
                continue

            tentative_g_score = g_score[current] + weight

            # より良い経路が見つかった場合
            if tentative_g_score < g_score[neighbor_node]:
                previous[neighbor_node] = current
                g_score[neighbor_node] = tentative_g_score
                f_score[neighbor_node] = g_score[neighbor_node] + heuristic(
                    positions[neighbor_node], positions[goal]
                )

                heapq.heappush(open_list, (f_score[neighbor_node], neighbor_node))

    # 経路が見つからない場合
    return {"path": [], "cost": float("inf"), "nodes_explored": len(closed_list)}


def reconstruct_path(previous, start, goal):
    """
    経路を復元する関数

    Args:
        previous (dict): 前のノードの情報
        start (str): 開始ノード
        goal (str): 目標ノード

    Returns:
        list: 経路のリスト
    """
    path = []
    current = goal

    while current is not None:
        path.insert(0, current)
        current = previous[current]

    return path if path and path[0] == start else []


# 使用例
if __name__ == "__main__":
    grid_graph = {
        "A": [{"node": "B", "weight": 1}, {"node": "D", "weight": 1}],
        "B": [
            {"node": "A", "weight": 1},
            {"node": "C", "weight": 1},
            {"node": "E", "weight": 1},
        ],
        "C": [{"node": "B", "weight": 1}, {"node": "F", "weight": 1}],
        "D": [
            {"node": "A", "weight": 1},
            {"node": "E", "weight": 1},
            {"node": "G", "weight": 1},
        ],
        "E": [
            {"node": "B", "weight": 1},
            {"node": "D", "weight": 1},
            {"node": "F", "weight": 1},
            {"node": "H", "weight": 1},
        ],
        "F": [
            {"node": "C", "weight": 1},
            {"node": "E", "weight": 1},
            {"node": "I", "weight": 1},
        ],
        "G": [{"node": "D", "weight": 1}, {"node": "H", "weight": 1}],
        "H": [
            {"node": "E", "weight": 1},
            {"node": "G", "weight": 1},
            {"node": "I", "weight": 1},
        ],
        "I": [{"node": "F", "weight": 1}, {"node": "H", "weight": 1}],
    }

    node_positions = {
        "A": {"x": 0, "y": 0},
        "B": {"x": 1, "y": 0},
        "C": {"x": 2, "y": 0},
        "D": {"x": 0, "y": 1},
        "E": {"x": 1, "y": 1},
        "F": {"x": 2, "y": 1},
        "G": {"x": 0, "y": 2},
        "H": {"x": 1, "y": 2},
        "I": {"x": 2, "y": 2},
    }

    print("グリッドグラフ:")
    print("A-B-C")
    print("| | |")
    print("D-E-F")
    print("| | |")
    print("G-H-I")

    print("\nA から I への最短経路探索:")

    # ユークリッド距離でのA*
    result_euclidean = a_star(grid_graph, node_positions, "A", "I", euclidean_distance)
    print(f"ユークリッド距離: {result_euclidean}")

    # マンハッタン距離でのA*
    result_manhattan = a_star(grid_graph, node_positions, "A", "I", manhattan_distance)
    print(f"マンハッタン距離: {result_manhattan}")


def a_star_detailed(graph, positions, start, goal, heuristic=euclidean_distance):
    """
    ステップごとの詳細表示付きA*
    学習用に各ステップを詳しく表示
    """
    print("\n=== A*アルゴリズムの詳細ステップ ===")
    print(f"開始ノード: {start}, 目標ノード: {goal}")
    print("---")

    open_list = []
    closed_list = set()
    g_score = {}
    f_score = {}
    previous = {}

    # 初期化
    for node in graph:
        g_score[node] = float("inf")
        f_score[node] = float("inf")
        previous[node] = None

    g_score[start] = 0
    f_score[start] = heuristic(positions[start], positions[goal])
    heapq.heappush(open_list, (f_score[start], start))

    print("初期化:")
    print(
        f"  {start}: g={g_score[start]}, h={f_score[start]:.2f}, f={f_score[start]:.2f}"
    )
    print("---")

    step = 1
    while open_list:
        current_f, current = heapq.heappop(open_list)

        print(f"ステップ {step}:")
        print(f"  選択されたノード: {current} (f={current_f:.2f})")

        if current == goal:
            print(f"  ✓ ゴール {goal} に到達！")
            path = reconstruct_path(previous, start, goal)
            return {
                "path": path,
                "cost": g_score[goal],
                "nodes_explored": len(closed_list),
            }

        closed_list.add(current)
        print(f"  {current} をクローズドリストに追加")

        neighbors = graph.get(current, [])
        neighbor_nodes = [n["node"] for n in neighbors]
        print(f"  隣接ノード: {', '.join(neighbor_nodes)}")

        for neighbor_info in neighbors:
            neighbor_node = neighbor_info["node"]
            weight = neighbor_info["weight"]

            if neighbor_node in closed_list:
                print(f"    {neighbor_node}: 既にクローズド済み")
                continue

            tentative_g_score = g_score[current] + weight
            h = heuristic(positions[neighbor_node], positions[goal])
            f = tentative_g_score + h

            print(f"    {neighbor_node}: g={tentative_g_score}, h={h:.2f}, f={f:.2f}")

            if tentative_g_score < g_score[neighbor_node]:
                print("      より良い経路を発見！")
                previous[neighbor_node] = current
                g_score[neighbor_node] = tentative_g_score
                f_score[neighbor_node] = f
                heapq.heappush(open_list, (f, neighbor_node))

        print("---")
        step += 1

    print("経路が見つかりませんでした")
    return {"path": [], "cost": float("inf"), "nodes_explored": len(closed_list)}


# 詳細版の実行例
if __name__ == "__main__":
    print("\n" + "=" * 50)
    a_star_detailed(grid_graph, node_positions, "A", "I", manhattan_distance)
