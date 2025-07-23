// グラフ (Graph) - JavaScript実装

// 隣接リスト表現のグラフ
class Graph {
  constructor(isDirected = false) {
    this.adjacencyList = new Map(); // 隣接リスト
    this.isDirected = isDirected; // 有向グラフかどうか
  }

  // 頂点を追加 - O(1)
  addVertex(vertex) {
    if (!this.adjacencyList.has(vertex)) {
      this.adjacencyList.set(vertex, []);
    }
  }

  // 辺を追加 - O(1)
  addEdge(vertex1, vertex2, weight = 1) {
    // 頂点が存在しない場合は追加
    this.addVertex(vertex1);
    this.addVertex(vertex2);

    // 辺を追加
    this.adjacencyList.get(vertex1).push({ vertex: vertex2, weight });

    // 無向グラフの場合は逆方向の辺も追加
    if (!this.isDirected) {
      this.adjacencyList.get(vertex2).push({ vertex: vertex1, weight });
    }
  }

  // 辺を削除 - O(V)
  removeEdge(vertex1, vertex2) {
    if (this.adjacencyList.has(vertex1)) {
      this.adjacencyList.set(
        vertex1,
        this.adjacencyList
          .get(vertex1)
          .filter((edge) => edge.vertex !== vertex2)
      );
    }

    if (!this.isDirected && this.adjacencyList.has(vertex2)) {
      this.adjacencyList.set(
        vertex2,
        this.adjacencyList
          .get(vertex2)
          .filter((edge) => edge.vertex !== vertex1)
      );
    }
  }

  // 頂点を削除 - O(V + E)
  removeVertex(vertex) {
    if (!this.adjacencyList.has(vertex)) return;

    // 他の頂点からこの頂点への辺を削除
    for (let [v, edges] of this.adjacencyList) {
      this.adjacencyList.set(
        v,
        edges.filter((edge) => edge.vertex !== vertex)
      );
    }

    // 頂点を削除
    this.adjacencyList.delete(vertex);
  }

  // 頂点の隣接頂点を取得 - O(1)
  getNeighbors(vertex) {
    return this.adjacencyList.get(vertex) || [];
  }

  // すべての頂点を取得 - O(V)
  getVertices() {
    return Array.from(this.adjacencyList.keys());
  }

  // 辺が存在するかチェック - O(V)
  hasEdge(vertex1, vertex2) {
    if (!this.adjacencyList.has(vertex1)) return false;
    return this.adjacencyList
      .get(vertex1)
      .some((edge) => edge.vertex === vertex2);
  }

  // 深さ優先探索 (DFS) - O(V + E)
  dfs(startVertex, visited = new Set(), result = []) {
    visited.add(startVertex);
    result.push(startVertex);

    const neighbors = this.getNeighbors(startVertex);
    for (let edge of neighbors) {
      if (!visited.has(edge.vertex)) {
        this.dfs(edge.vertex, visited, result);
      }
    }

    return result;
  }

  // 幅優先探索 (BFS) - O(V + E)
  bfs(startVertex) {
    const visited = new Set();
    const queue = [startVertex];
    const result = [];

    visited.add(startVertex);

    while (queue.length > 0) {
      const currentVertex = queue.shift();
      result.push(currentVertex);

      const neighbors = this.getNeighbors(currentVertex);
      for (let edge of neighbors) {
        if (!visited.has(edge.vertex)) {
          visited.add(edge.vertex);
          queue.push(edge.vertex);
        }
      }
    }

    return result;
  }

  // 最短経路（BFS使用、重みなし） - O(V + E)
  shortestPath(startVertex, endVertex) {
    const visited = new Set();
    const queue = [{ vertex: startVertex, path: [startVertex] }];
    visited.add(startVertex);

    while (queue.length > 0) {
      const { vertex: currentVertex, path } = queue.shift();

      if (currentVertex === endVertex) {
        return path;
      }

      const neighbors = this.getNeighbors(currentVertex);
      for (let edge of neighbors) {
        if (!visited.has(edge.vertex)) {
          visited.add(edge.vertex);
          queue.push({
            vertex: edge.vertex,
            path: [...path, edge.vertex],
          });
        }
      }
    }

    return null; // パスが見つからない場合
  }

  // サイクルの検出（有向グラフ用） - O(V + E)
  hasCycle() {
    const visited = new Set();
    const recursionStack = new Set();

    for (let vertex of this.getVertices()) {
      if (!visited.has(vertex)) {
        if (this._hasCycleDFS(vertex, visited, recursionStack)) {
          return true;
        }
      }
    }

    return false;
  }

  _hasCycleDFS(vertex, visited, recursionStack) {
    visited.add(vertex);
    recursionStack.add(vertex);

    const neighbors = this.getNeighbors(vertex);
    for (let edge of neighbors) {
      if (!visited.has(edge.vertex)) {
        if (this._hasCycleDFS(edge.vertex, visited, recursionStack)) {
          return true;
        }
      } else if (recursionStack.has(edge.vertex)) {
        return true;
      }
    }

    recursionStack.delete(vertex);
    return false;
  }

  // トポロジカルソート（有向非循環グラフ用） - O(V + E)
  topologicalSort() {
    if (!this.isDirected) {
      throw new Error("Topological sort is only for directed graphs");
    }

    const visited = new Set();
    const stack = [];

    for (let vertex of this.getVertices()) {
      if (!visited.has(vertex)) {
        this._topologicalSortDFS(vertex, visited, stack);
      }
    }

    return stack.reverse();
  }

  _topologicalSortDFS(vertex, visited, stack) {
    visited.add(vertex);

    const neighbors = this.getNeighbors(vertex);
    for (let edge of neighbors) {
      if (!visited.has(edge.vertex)) {
        this._topologicalSortDFS(edge.vertex, visited, stack);
      }
    }

    stack.push(vertex);
  }

  // グラフの情報を表示
  display() {
    for (let [vertex, edges] of this.adjacencyList) {
      const edgeList = edges
        .map((edge) =>
          edge.weight !== 1 ? `${edge.vertex}(${edge.weight})` : edge.vertex
        )
        .join(", ");
      console.log(`${vertex} -> [${edgeList}]`);
    }
  }

  // 頂点数を取得 - O(1)
  getVertexCount() {
    return this.adjacencyList.size;
  }

  // 辺数を取得 - O(V)
  getEdgeCount() {
    let count = 0;
    for (let edges of this.adjacencyList.values()) {
      count += edges.length;
    }
    return this.isDirected ? count : count / 2;
  }

  // グラフが連結かチェック - O(V + E)
  isConnected() {
    if (this.getVertexCount() === 0) return true;

    const vertices = this.getVertices();
    const visited = this.dfs(vertices[0]);

    return visited.length === vertices.length;
  }

  // グラフをクリア - O(1)
  clear() {
    this.adjacencyList.clear();
  }
}

// 使用例
console.log("=== 無向グラフの操作 ===");
const undirectedGraph = new Graph(false);

// 頂点と辺の追加
undirectedGraph.addEdge("A", "B");
undirectedGraph.addEdge("A", "C");
undirectedGraph.addEdge("B", "D");
undirectedGraph.addEdge("C", "D");
undirectedGraph.addEdge("D", "E");

console.log("グラフの構造:");
undirectedGraph.display();

console.log("頂点数:", undirectedGraph.getVertexCount());
console.log("辺数:", undirectedGraph.getEdgeCount());

// 探索
console.log("DFS (Aから):", undirectedGraph.dfs("A"));
console.log("BFS (Aから):", undirectedGraph.bfs("A"));

// 最短経路
console.log("最短経路 A→E:", undirectedGraph.shortestPath("A", "E"));

// 連結性チェック
console.log("グラフは連結?", undirectedGraph.isConnected());

console.log("\n=== 有向グラフの操作 ===");
const directedGraph = new Graph(true);

// 有向グラフの構築
directedGraph.addEdge("A", "B");
directedGraph.addEdge("B", "C");
directedGraph.addEdge("C", "D");
directedGraph.addEdge("A", "C");

console.log("有向グラフの構造:");
directedGraph.display();

// サイクル検出
console.log("サイクルあり?", directedGraph.hasCycle());

// トポロジカルソート
try {
  console.log("トポロジカルソート:", directedGraph.topologicalSort());
} catch (error) {
  console.log("エラー:", error.message);
}

// サイクルのある有向グラフ
const cyclicGraph = new Graph(true);
cyclicGraph.addEdge("A", "B");
cyclicGraph.addEdge("B", "C");
cyclicGraph.addEdge("C", "A");

console.log("\nサイクルのあるグラフ:");
cyclicGraph.display();
console.log("サイクルあり?", cyclicGraph.hasCycle());
