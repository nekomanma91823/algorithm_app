// A* (A-star) アルゴリズム
// ヒューリスティック関数を使用してゴールに向かって効率的に最短経路を探索するアルゴリズム

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
 * ユークリッド距離によるヒューリスティック関数
 * @param {Object} node1 - ノード1の座標 {x, y}
 * @param {Object} node2 - ノード2の座標 {x, y}
 * @returns {number} ユークリッド距離
 */
function euclideanDistance(node1, node2) {
  const dx = node1.x - node2.x;
  const dy = node1.y - node2.y;
  return Math.sqrt(dx * dx + dy * dy);
}

/**
 * マンハッタン距離によるヒューリスティック関数
 * @param {Object} node1 - ノード1の座標 {x, y}
 * @param {Object} node2 - ノード2の座標 {x, y}
 * @returns {number} マンハッタン距離
 */
function manhattanDistance(node1, node2) {
  return Math.abs(node1.x - node2.x) + Math.abs(node1.y - node2.y);
}

/**
 * A*アルゴリズムを実行する関数
 * @param {Object} graph - グラフの隣接リスト表現
 * @param {Object} positions - 各ノードの座標情報
 * @param {string} start - 開始ノード
 * @param {string} goal - 目標ノード
 * @param {Function} heuristic - ヒューリスティック関数
 * @returns {Object} 経路とコスト情報
 */
function aStar(graph, positions, start, goal, heuristic = euclideanDistance) {
  const openList = new PriorityQueue(); // 探索候補のノード
  const closedList = new Set(); // 探索済みのノード
  const gScore = {}; // スタートからの実際のコスト
  const fScore = {}; // f(n) = g(n) + h(n)
  const previous = {}; // 最適経路での前のノード

  // 初期化
  for (const node in graph) {
    gScore[node] = Infinity;
    fScore[node] = Infinity;
    previous[node] = null;
  }

  gScore[start] = 0;
  fScore[start] = heuristic(positions[start], positions[goal]);
  openList.enqueue(start, fScore[start]);

  while (!openList.isEmpty()) {
    const { item: current } = openList.dequeue();

    // ゴールに到達した場合
    if (current === goal) {
      const path = reconstructPath(previous, start, goal);
      return {
        path: path,
        cost: gScore[goal],
        nodesExplored: closedList.size,
      };
    }

    closedList.add(current);

    // 隣接ノードを調べる
    const neighbors = graph[current] || [];
    for (const neighbor of neighbors) {
      const { node: neighborNode, weight } = neighbor;

      // 既に探索済みの場合はスキップ
      if (closedList.has(neighborNode)) {
        continue;
      }

      const tentativeGScore = gScore[current] + weight;

      // より良い経路が見つかった場合
      if (tentativeGScore < gScore[neighborNode]) {
        previous[neighborNode] = current;
        gScore[neighborNode] = tentativeGScore;
        fScore[neighborNode] =
          gScore[neighborNode] +
          heuristic(positions[neighborNode], positions[goal]);

        openList.enqueue(neighborNode, fScore[neighborNode]);
      }
    }
  }

  // 経路が見つからない場合
  return {
    path: [],
    cost: Infinity,
    nodesExplored: closedList.size,
  };
}

/**
 * 経路を復元する関数
 * @param {Object} previous - 前のノードの情報
 * @param {string} start - 開始ノード
 * @param {string} goal - 目標ノード
 * @returns {Array} 経路の配列
 */
function reconstructPath(previous, start, goal) {
  const path = [];
  let current = goal;

  while (current !== null) {
    path.unshift(current);
    current = previous[current];
  }

  return path[0] === start ? path : [];
}

// 使用例
const gridGraph = {
  A: [
    { node: "B", weight: 1 },
    { node: "D", weight: 1 },
  ],
  B: [
    { node: "A", weight: 1 },
    { node: "C", weight: 1 },
    { node: "E", weight: 1 },
  ],
  C: [
    { node: "B", weight: 1 },
    { node: "F", weight: 1 },
  ],
  D: [
    { node: "A", weight: 1 },
    { node: "E", weight: 1 },
    { node: "G", weight: 1 },
  ],
  E: [
    { node: "B", weight: 1 },
    { node: "D", weight: 1 },
    { node: "F", weight: 1 },
    { node: "H", weight: 1 },
  ],
  F: [
    { node: "C", weight: 1 },
    { node: "E", weight: 1 },
    { node: "I", weight: 1 },
  ],
  G: [
    { node: "D", weight: 1 },
    { node: "H", weight: 1 },
  ],
  H: [
    { node: "E", weight: 1 },
    { node: "G", weight: 1 },
    { node: "I", weight: 1 },
  ],
  I: [
    { node: "F", weight: 1 },
    { node: "H", weight: 1 },
  ],
};

const nodePositions = {
  A: { x: 0, y: 0 },
  B: { x: 1, y: 0 },
  C: { x: 2, y: 0 },
  D: { x: 0, y: 1 },
  E: { x: 1, y: 1 },
  F: { x: 2, y: 1 },
  G: { x: 0, y: 2 },
  H: { x: 1, y: 2 },
  I: { x: 2, y: 2 },
};

console.log("グリッドグラフ:");
console.log("A-B-C");
console.log("| | |");
console.log("D-E-F");
console.log("| | |");
console.log("G-H-I");

console.log("\nA から I への最短経路探索:");

// ユークリッド距離でのA*
const resultEuclidean = aStar(
  gridGraph,
  nodePositions,
  "A",
  "I",
  euclideanDistance
);
console.log("ユークリッド距離:", resultEuclidean);

// マンハッタン距離でのA*
const resultManhattan = aStar(
  gridGraph,
  nodePositions,
  "A",
  "I",
  manhattanDistance
);
console.log("マンハッタン距離:", resultManhattan);

/**
 * ステップごとの詳細表示付きA*
 * 学習用に各ステップを詳しく表示
 */
function aStarDetailed(
  graph,
  positions,
  start,
  goal,
  heuristic = euclideanDistance
) {
  console.log("\n=== A*アルゴリズムの詳細ステップ ===");
  console.log(`開始ノード: ${start}, 目標ノード: ${goal}`);
  console.log("---");

  const openList = new PriorityQueue();
  const closedList = new Set();
  const gScore = {};
  const fScore = {};
  const previous = {};

  // 初期化
  for (const node in graph) {
    gScore[node] = Infinity;
    fScore[node] = Infinity;
    previous[node] = null;
  }

  gScore[start] = 0;
  fScore[start] = heuristic(positions[start], positions[goal]);
  openList.enqueue(start, fScore[start]);

  console.log("初期化:");
  console.log(
    `  ${start}: g=${gScore[start]}, h=${fScore[start]}, f=${fScore[start]}`
  );
  console.log("---");

  let step = 1;
  while (!openList.isEmpty()) {
    const { item: current, priority } = openList.dequeue();

    console.log(`ステップ ${step}:`);
    console.log(`  選択されたノード: ${current} (f=${priority})`);

    if (current === goal) {
      console.log(`  ✓ ゴール ${goal} に到達！`);
      const path = reconstructPath(previous, start, goal);
      return {
        path: path,
        cost: gScore[goal],
        nodesExplored: closedList.size,
      };
    }

    closedList.add(current);
    console.log(`  ${current} をクローズドリストに追加`);

    const neighbors = graph[current] || [];
    console.log(`  隣接ノード: ${neighbors.map((n) => n.node).join(", ")}`);

    for (const neighbor of neighbors) {
      const { node: neighborNode, weight } = neighbor;

      if (closedList.has(neighborNode)) {
        console.log(`    ${neighborNode}: 既にクローズド済み`);
        continue;
      }

      const tentativeGScore = gScore[current] + weight;
      const h = heuristic(positions[neighborNode], positions[goal]);
      const f = tentativeGScore + h;

      console.log(
        `    ${neighborNode}: g=${tentativeGScore}, h=${h.toFixed(
          2
        )}, f=${f.toFixed(2)}`
      );

      if (tentativeGScore < gScore[neighborNode]) {
        console.log(`      より良い経路を発見！`);
        previous[neighborNode] = current;
        gScore[neighborNode] = tentativeGScore;
        fScore[neighborNode] = f;
        openList.enqueue(neighborNode, f);
      }
    }

    console.log("---");
    step++;
  }

  console.log("経路が見つかりませんでした");
  return {
    path: [],
    cost: Infinity,
    nodesExplored: closedList.size,
  };
}

// 詳細版の実行例
console.log("\n" + "=".repeat(50));
aStarDetailed(gridGraph, nodePositions, "A", "I", manhattanDistance);
