// 幅優先探索 (Breadth-First Search - BFS)
// グラフやツリーを階層ごとに幅方向に探索するアルゴリズム

/**
 * 幅優先探索を実行する関数
 * @param {Object} graph - グラフの隣接リスト表現
 * @param {string} start - 開始ノード
 * @param {string} target - 探している目標ノード
 * @returns {boolean} 見つかった場合はtrue、見つからない場合はfalse
 */
function bfs(graph, start, target) {
  // キューと訪問済みセットを初期化
  const queue = [start]; // 探索待ちのノードを管理
  const visited = new Set([start]); // 訪問済みノードを記録

  // キューが空になるまで探索を続ける
  while (queue.length > 0) {
    // キューの先頭からノードを取り出す
    const current = queue.shift();

    // 目標ノードに到達したかチェック
    if (current === target) {
      return true; // 見つかった！
    }

    // 現在のノードの隣接ノードを調べる
    const neighbors = graph[current] || [];
    for (const neighbor of neighbors) {
      // まだ訪問していないノードのみ処理
      if (!visited.has(neighbor)) {
        visited.add(neighbor); // 訪問済みにマーク
        queue.push(neighbor); // キューに追加
      }
    }
  }

  return false; // 見つからなかった
}

/**
 * 最短経路も返すBFS
 * @param {Object} graph - グラフの隣接リスト表現
 * @param {string} start - 開始ノード
 * @param {string} target - 探している目標ノード
 * @returns {Array|null} 最短経路の配列、見つからない場合はnull
 */
function bfsWithPath(graph, start, target) {
  const queue = [{ node: start, path: [start] }]; // ノードと経路をペアで管理
  const visited = new Set([start]);

  while (queue.length > 0) {
    const { node: current, path } = queue.shift();

    if (current === target) {
      return path; // 経路を返す
    }

    const neighbors = graph[current] || [];
    for (const neighbor of neighbors) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push({
          node: neighbor,
          path: [...path, neighbor], // 経路に追加
        });
      }
    }
  }

  return null; // 経路が存在しない
}

// 使用例
const graph = {
  A: ["B", "C"],
  B: ["A", "D", "E"],
  C: ["A", "F"],
  D: ["B"],
  E: ["B", "F"],
  F: ["C", "E"],
};

console.log("グラフ:", graph);
console.log("A から F への探索:");

// 単純な探索
const found = bfs(graph, "A", "F");
console.log("見つかりました:", found);

// 経路付き探索
const path = bfsWithPath(graph, "A", "F");
console.log("最短経路:", path ? path.join(" → ") : "経路なし");

/**
 * ステップごとの詳細表示付きBFS
 * 学習用に各ステップを詳しく表示
 */
function bfsDetailed(graph, start, target) {
  console.log("\n=== 幅優先探索の詳細ステップ ===");
  console.log(`開始ノード: ${start}`);
  console.log(`目標ノード: ${target}`);
  console.log("---");

  const queue = [start];
  const visited = new Set([start]);
  let step = 1;

  console.log(
    `初期化: キュー = [${queue.join(", ")}], 訪問済み = {${Array.from(
      visited
    ).join(", ")}}`
  );

  while (queue.length > 0) {
    console.log(`\nステップ ${step}:`);
    console.log(`  現在のキュー: [${queue.join(", ")}]`);

    const current = queue.shift();
    console.log(`  探索中のノード: ${current}`);

    if (current === target) {
      console.log(`  ✓ 目標ノード ${target} を発見！`);
      return true;
    }

    const neighbors = graph[current] || [];
    console.log(`  隣接ノード: [${neighbors.join(", ")}]`);

    const newNodes = [];
    for (const neighbor of neighbors) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push(neighbor);
        newNodes.push(neighbor);
      }
    }

    if (newNodes.length > 0) {
      console.log(`  キューに追加: [${newNodes.join(", ")}]`);
    }
    console.log(`  更新後の訪問済み: {${Array.from(visited).join(", ")}}`);

    step++;
  }

  console.log(`\n✗ 目標ノード ${target} は見つかりませんでした`);
  return false;
}

// 詳細版の実行例
console.log("\n" + "=".repeat(50));
bfsDetailed(graph, "A", "F");
