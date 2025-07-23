// ダイクストラ法 (Dijkstra's Algorithm)
// 重み付きグラフで単一始点から全ノードへの最短経路を効率的に求めるアルゴリズム

/**
 * 簡単な優先度付きキュー（最小ヒープ）の実装
 */
class PriorityQueue {
  constructor() {
    this.queue = [];
  }

  enqueue(item, priority) {
    this.queue.push({ item, priority });
    this.queue.sort((a, b) => a.priority - b.priority);
  }

  dequeue() {
    return this.queue.shift();
  }

  isEmpty() {
    return this.queue.length === 0;
  }
}

/**
 * ダイクストラ法を実行する関数
 * @param {Object} graph - 重み付きグラフの隣接リスト表現
 * @param {string} start - 開始ノード
 * @returns {Object} 各ノードへの最短距離と前のノードの情報
 */
function dijkstra(graph, start) {
  // 初期化
  const distances = {}; // 各ノードへの最短距離
  const previous = {}; // 最短経路での前のノード
  const pq = new PriorityQueue(); // 優先度付きキュー

  // すべてのノードの距離を無限大に初期化
  for (const node in graph) {
    distances[node] = Infinity;
    previous[node] = null;
  }

  // 開始ノードの距離を0に設定
  distances[start] = 0;
  pq.enqueue(start, 0);

  // 優先度付きキューが空になるまで処理
  while (!pq.isEmpty()) {
    const { item: currentNode } = pq.dequeue();

    // 現在のノードの隣接ノードを調べる
    const neighbors = graph[currentNode] || [];
    for (const neighbor of neighbors) {
      const { node: neighborNode, weight } = neighbor;
      const distance = distances[currentNode] + weight;

      // より短い経路が見つかった場合は更新
      if (distance < distances[neighborNode]) {
        distances[neighborNode] = distance;
        previous[neighborNode] = currentNode;
        pq.enqueue(neighborNode, distance);
      }
    }
  }

  return { distances, previous };
}

/**
 * 最短経路を復元する関数
 * @param {Object} previous - 前のノードの情報
 * @param {string} start - 開始ノード
 * @param {string} target - 目標ノード
 * @returns {Array} 最短経路の配列
 */
function reconstructPath(previous, start, target) {
  const path = [];
  let current = target;

  while (current !== null) {
    path.unshift(current);
    current = previous[current];
  }

  // 開始ノードから到達可能かチェック
  return path[0] === start ? path : [];
}

// 使用例
const weightedGraph = {
  A: [
    { node: "B", weight: 4 },
    { node: "C", weight: 2 },
  ],
  B: [
    { node: "A", weight: 4 },
    { node: "C", weight: 1 },
    { node: "D", weight: 5 },
  ],
  C: [
    { node: "A", weight: 2 },
    { node: "B", weight: 1 },
    { node: "D", weight: 8 },
    { node: "E", weight: 10 },
  ],
  D: [
    { node: "B", weight: 5 },
    { node: "C", weight: 8 },
    { node: "E", weight: 2 },
  ],
  E: [
    { node: "C", weight: 10 },
    { node: "D", weight: 2 },
  ],
};

console.log("重み付きグラフ:", weightedGraph);
console.log("A から各ノードへの最短経路:");

const result = dijkstra(weightedGraph, "A");
console.log("最短距離:", result.distances);

// 各ノードへの最短経路を表示
for (const node in result.distances) {
  if (node !== "A") {
    const path = reconstructPath(result.previous, "A", node);
    const distance = result.distances[node];
    console.log(`A → ${node}: ${path.join(" → ")} (距離: ${distance})`);
  }
}

/**
 * ステップごとの詳細表示付きダイクストラ法
 * 学習用に各ステップを詳しく表示
 */
function dijkstraDetailed(graph, start) {
  console.log("\n=== ダイクストラ法の詳細ステップ ===");
  console.log(`開始ノード: ${start}`);
  console.log("---");

  const distances = {};
  const previous = {};
  const visited = new Set();
  const pq = new PriorityQueue();

  // 初期化
  for (const node in graph) {
    distances[node] = Infinity;
    previous[node] = null;
  }
  distances[start] = 0;
  pq.enqueue(start, 0);

  console.log("初期化:");
  console.log(`  距離: ${JSON.stringify(distances, null, 2)}`);
  console.log("---");

  let step = 1;
  while (!pq.isEmpty()) {
    const { item: currentNode, priority: currentDistance } = pq.dequeue();

    console.log(`ステップ ${step}:`);
    console.log(`  処理中のノード: ${currentNode} (距離: ${currentDistance})`);

    if (visited.has(currentNode)) {
      console.log(`  既に処理済みのためスキップ`);
      continue;
    }

    visited.add(currentNode);
    console.log(`  ${currentNode} を確定`);

    const neighbors = graph[currentNode] || [];
    console.log(
      `  隣接ノード: ${neighbors
        .map((n) => `${n.node}(重み:${n.weight})`)
        .join(", ")}`
    );

    for (const neighbor of neighbors) {
      const { node: neighborNode, weight } = neighbor;
      const distance = distances[currentNode] + weight;

      console.log(
        `    ${neighborNode}: ${distances[currentNode]} + ${weight} = ${distance}`
      );

      if (distance < distances[neighborNode]) {
        console.log(
          `      より短い経路を発見！ ${distances[neighborNode]} → ${distance}`
        );
        distances[neighborNode] = distance;
        previous[neighborNode] = currentNode;
        pq.enqueue(neighborNode, distance);
      } else {
        console.log(`      既存の経路の方が短い (${distances[neighborNode]})`);
      }
    }

    console.log(`  更新後の距離: ${JSON.stringify(distances, null, 2)}`);
    console.log("---");
    step++;
  }

  return { distances, previous };
}

// 詳細版の実行例
console.log("\n" + "=".repeat(50));
dijkstraDetailed(weightedGraph, "A");
