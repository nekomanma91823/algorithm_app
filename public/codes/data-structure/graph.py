# グラフ (Graph) - Python実装

from collections import defaultdict, deque


class Graph:
    """隣接リスト表現のグラフ"""

    def __init__(self, is_directed=False):
        self.adjacency_list = defaultdict(list)  # 隣接リスト
        self.is_directed = is_directed  # 有向グラフかどうか

    def add_vertex(self, vertex):
        """頂点を追加 - O(1)"""
        if vertex not in self.adjacency_list:
            self.adjacency_list[vertex] = []

    def add_edge(self, vertex1, vertex2, weight=1):
        """辺を追加 - O(1)"""
        # 頂点が存在しない場合は追加
        self.add_vertex(vertex1)
        self.add_vertex(vertex2)

        # 辺を追加
        self.adjacency_list[vertex1].append({"vertex": vertex2, "weight": weight})

        # 無向グラフの場合は逆方向の辺も追加
        if not self.is_directed:
            self.adjacency_list[vertex2].append({"vertex": vertex1, "weight": weight})

    def remove_edge(self, vertex1, vertex2):
        """辺を削除 - O(V)"""
        if vertex1 in self.adjacency_list:
            self.adjacency_list[vertex1] = [
                edge
                for edge in self.adjacency_list[vertex1]
                if edge["vertex"] != vertex2
            ]

        if not self.is_directed and vertex2 in self.adjacency_list:
            self.adjacency_list[vertex2] = [
                edge
                for edge in self.adjacency_list[vertex2]
                if edge["vertex"] != vertex1
            ]

    def remove_vertex(self, vertex):
        """頂点を削除 - O(V + E)"""
        if vertex not in self.adjacency_list:
            return

        # 他の頂点からこの頂点への辺を削除
        for v in self.adjacency_list:
            self.adjacency_list[v] = [
                edge for edge in self.adjacency_list[v] if edge["vertex"] != vertex
            ]

        # 頂点を削除
        del self.adjacency_list[vertex]

    def get_neighbors(self, vertex):
        """頂点の隣接頂点を取得 - O(1)"""
        return self.adjacency_list.get(vertex, [])

    def get_vertices(self):
        """すべての頂点を取得 - O(V)"""
        return list(self.adjacency_list.keys())

    def has_edge(self, vertex1, vertex2):
        """辺が存在するかチェック - O(V)"""
        if vertex1 not in self.adjacency_list:
            return False
        return any(edge["vertex"] == vertex2 for edge in self.adjacency_list[vertex1])

    def dfs(self, start_vertex, visited=None, result=None):
        """深さ優先探索 (DFS) - O(V + E)"""
        if visited is None:
            visited = set()
        if result is None:
            result = []

        visited.add(start_vertex)
        result.append(start_vertex)

        neighbors = self.get_neighbors(start_vertex)
        for edge in neighbors:
            if edge["vertex"] not in visited:
                self.dfs(edge["vertex"], visited, result)

        return result

    def bfs(self, start_vertex):
        """幅優先探索 (BFS) - O(V + E)"""
        visited = set()
        queue = deque([start_vertex])
        result = []

        visited.add(start_vertex)

        while queue:
            current_vertex = queue.popleft()
            result.append(current_vertex)

            neighbors = self.get_neighbors(current_vertex)
            for edge in neighbors:
                if edge["vertex"] not in visited:
                    visited.add(edge["vertex"])
                    queue.append(edge["vertex"])

        return result

    def shortest_path(self, start_vertex, end_vertex):
        """最短経路（BFS使用、重みなし） - O(V + E)"""
        visited = set()
        queue = deque([{"vertex": start_vertex, "path": [start_vertex]}])
        visited.add(start_vertex)

        while queue:
            current = queue.popleft()
            current_vertex = current["vertex"]
            path = current["path"]

            if current_vertex == end_vertex:
                return path

            neighbors = self.get_neighbors(current_vertex)
            for edge in neighbors:
                if edge["vertex"] not in visited:
                    visited.add(edge["vertex"])
                    queue.append(
                        {"vertex": edge["vertex"], "path": path + [edge["vertex"]]}
                    )

        return None  # パスが見つからない場合

    def has_cycle(self):
        """サイクルの検出（有向グラフ用） - O(V + E)"""
        visited = set()
        recursion_stack = set()

        for vertex in self.get_vertices():
            if vertex not in visited:
                if self._has_cycle_dfs(vertex, visited, recursion_stack):
                    return True

        return False

    def _has_cycle_dfs(self, vertex, visited, recursion_stack):
        """サイクル検出のDFSヘルパー関数"""
        visited.add(vertex)
        recursion_stack.add(vertex)

        neighbors = self.get_neighbors(vertex)
        for edge in neighbors:
            neighbor = edge["vertex"]
            if neighbor not in visited:
                if self._has_cycle_dfs(neighbor, visited, recursion_stack):
                    return True
            elif neighbor in recursion_stack:
                return True

        recursion_stack.remove(vertex)
        return False

    def topological_sort(self):
        """トポロジカルソート（有向非循環グラフ用） - O(V + E)"""
        if not self.is_directed:
            raise ValueError("Topological sort is only for directed graphs")

        visited = set()
        stack = []

        for vertex in self.get_vertices():
            if vertex not in visited:
                self._topological_sort_dfs(vertex, visited, stack)

        return stack[::-1]  # 逆順にして返す

    def _topological_sort_dfs(self, vertex, visited, stack):
        """トポロジカルソートのDFSヘルパー関数"""
        visited.add(vertex)

        neighbors = self.get_neighbors(vertex)
        for edge in neighbors:
            if edge["vertex"] not in visited:
                self._topological_sort_dfs(edge["vertex"], visited, stack)

        stack.append(vertex)

    def display(self):
        """グラフの情報を表示"""
        for vertex, edges in self.adjacency_list.items():
            edge_list = []
            for edge in edges:
                if edge["weight"] != 1:
                    edge_list.append(f"{edge['vertex']}({edge['weight']})")
                else:
                    edge_list.append(edge["vertex"])
            print(f"{vertex} -> [{', '.join(edge_list)}]")

    def get_vertex_count(self):
        """頂点数を取得 - O(1)"""
        return len(self.adjacency_list)

    def get_edge_count(self):
        """辺数を取得 - O(V)"""
        count = sum(len(edges) for edges in self.adjacency_list.values())
        return count if self.is_directed else count // 2

    def is_connected(self):
        """グラフが連結かチェック - O(V + E)"""
        if self.get_vertex_count() == 0:
            return True

        vertices = self.get_vertices()
        visited = self.dfs(vertices[0])

        return len(visited) == len(vertices)

    def clear(self):
        """グラフをクリア - O(1)"""
        self.adjacency_list.clear()

    def __str__(self):
        """グラフの文字列表現"""
        result = []
        for vertex, edges in self.adjacency_list.items():
            edge_strs = [
                (
                    f"{edge['vertex']}({edge['weight']})"
                    if edge["weight"] != 1
                    else edge["vertex"]
                )
                for edge in edges
            ]
            result.append(f"{vertex}: {edge_strs}")
        return "\n".join(result)


# 使用例
if __name__ == "__main__":
    print("=== 無向グラフの操作 ===")
    undirected_graph = Graph(is_directed=False)

    # 頂点と辺の追加
    undirected_graph.add_edge("A", "B")
    undirected_graph.add_edge("A", "C")
    undirected_graph.add_edge("B", "D")
    undirected_graph.add_edge("C", "D")
    undirected_graph.add_edge("D", "E")

    print("グラフの構造:")
    undirected_graph.display()

    print(f"頂点数: {undirected_graph.get_vertex_count()}")
    print(f"辺数: {undirected_graph.get_edge_count()}")

    # 探索
    print(f"DFS (Aから): {undirected_graph.dfs('A')}")
    print(f"BFS (Aから): {undirected_graph.bfs('A')}")

    # 最短経路
    print(f"最短経路 A→E: {undirected_graph.shortest_path('A', 'E')}")

    # 連結性チェック
    print(f"グラフは連結? {undirected_graph.is_connected()}")

    print("\n=== 有向グラフの操作 ===")
    directed_graph = Graph(is_directed=True)

    # 有向グラフの構築
    directed_graph.add_edge("A", "B")
    directed_graph.add_edge("B", "C")
    directed_graph.add_edge("C", "D")
    directed_graph.add_edge("A", "C")

    print("有向グラフの構造:")
    directed_graph.display()

    # サイクル検出
    print(f"サイクルあり? {directed_graph.has_cycle()}")

    # トポロジカルソート
    try:
        print(f"トポロジカルソート: {directed_graph.topological_sort()}")
    except ValueError as e:
        print(f"エラー: {e}")

    # サイクルのある有向グラフ
    cyclic_graph = Graph(is_directed=True)
    cyclic_graph.add_edge("A", "B")
    cyclic_graph.add_edge("B", "C")
    cyclic_graph.add_edge("C", "A")

    print("\nサイクルのあるグラフ:")
    cyclic_graph.display()
    print(f"サイクルあり? {cyclic_graph.has_cycle()}")

    # 重み付きグラフの例
    print("\n=== 重み付きグラフ ===")
    weighted_graph = Graph(is_directed=False)
    weighted_graph.add_edge("A", "B", 4)
    weighted_graph.add_edge("A", "C", 2)
    weighted_graph.add_edge("B", "C", 1)
    weighted_graph.add_edge("C", "D", 5)

    print("重み付きグラフの構造:")
    weighted_graph.display()
