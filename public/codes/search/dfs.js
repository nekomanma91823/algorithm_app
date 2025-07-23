// 深さ優先探索 (Depth-First Search - DFS)
// グラフやツリーを深さ方向に探索し、行き止まりまで進んでから戻るアルゴリズム

/**
 * 深さ優先探索を実行する関数（再帰版）
 * @param {Object} graph - グラフの隣接リスト表現
 * @param {string} current - 現在のノード
 * @param {string} target - 探している目標ノード
 * @param {Set} visited - 訪問済みノードのセット
 * @returns {boolean} 見つかった場合はtrue、見つからない場合はfalse
 */
function dfsRecursive(graph, current, target, visited = new Set()) {
  // 現在のノードを訪問済みにマーク
  visited.add(current);

  // 目標ノードに到達したかチェック
  if (current === target) {
    return true; // 見つかった！
  }

  // 現在のノードの隣接ノードを調べる
  const neighbors = graph[current] || [];
  for (const neighbor of neighbors) {
    // まだ訪問していないノードのみ処理
    if (!visited.has(neighbor)) {
      // 再帰的に探索
      if (dfsRecursive(graph, neighbor, target, visited)) {
        return true; // 見つかった場合は即座に返す
      }
    }
  }

  return false; // この経路では見つからなかった
}

/**
 * 深さ優先探索を実行する関数（反復版）
 * @param {Object} graph - グラフの隣接リスト表現
 * @param {string} start - 開始ノード
 * @param {string} target - 探している目標ノード
 * @returns {boolean} 見つかった場合はtrue、見つからない場合はfalse
 */
function dfsIterative(graph, start, target) {
  // スタックと訪問済みセットを初期化
  const stack = [start]; // 探索待ちのノードを管理
  const visited = new Set(); // 訪問済みノードを記録

  // スタックが空になるまで探索を続ける
  while (stack.length > 0) {
    // スタックの先頭からノードを取り出す
    const current = stack.pop();

    // 既に訪問済みの場合はスキップ
    if (visited.has(current)) {
      continue;
    }

    // 現在のノードを訪問済みにマーク
    visited.add(current);

    // 目標ノードに到達したかチェック
    if (current === target) {
      return true; // 見つかった！
    }

    // 現在のノードの隣接ノードをスタックに追加
    const neighbors = graph[current] || [];
    for (const neighbor of neighbors) {
      if (!visited.has(neighbor)) {
        stack.push(neighbor);
      }
    }
  }

  return false; // 見つからなかった
}

/**
 * 経路も返すDFS
 * @param {Object} graph - グラフの隣接リスト表現
 * @param {string} current - 現在のノード
 * @param {string} target - 探している目標ノード
 * @param {Array} path - 現在の経路
 * @param {Set} visited - 訪問済みノードのセット
 * @returns {Array|null} 経路の配列、見つからない場合はnull
 */
function dfsWithPath(graph, current, target, path = [], visited = new Set()) {
  // 現在のノードを経路に追加
  path.push(current);
  visited.add(current);

  // 目標ノードに到達したかチェック
  if (current === target) {
    return [...path]; // 経路のコピーを返す
  }

  // 現在のノードの隣接ノードを調べる
  const neighbors = graph[current] || [];
  for (const neighbor of neighbors) {
    if (!visited.has(neighbor)) {
      const result = dfsWithPath(graph, neighbor, target, path, visited);
      if (result) {
        return result; // 経路が見つかった場合は返す
      }
    }
  }

  // バックトラッキング：経路から現在のノードを削除
  path.pop();
  return null; // この経路では見つからなかった
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

// 再帰版DFS
const foundRecursive = dfsRecursive(graph, "A", "F");
console.log("再帰版で見つかりました:", foundRecursive);

// 反復版DFS
const foundIterative = dfsIterative(graph, "A", "F");
console.log("反復版で見つかりました:", foundIterative);

// 経路付きDFS
const path = dfsWithPath(graph, "A", "F");
console.log("経路:", path ? path.join(" → ") : "経路なし");

/**
 * ステップごとの詳細表示付きDFS（反復版）
 * 学習用に各ステップを詳しく表示
 */
function dfsDetailed(graph, start, target) {
  console.log("\n=== 深さ優先探索の詳細ステップ ===");
  console.log(`開始ノード: ${start}`);
  console.log(`目標ノード: ${target}`);
  console.log("---");

  const stack = [start];
  const visited = new Set();
  let step = 1;

  console.log(`初期化: スタック = [${stack.join(", ")}], 訪問済み = {}`);

  while (stack.length > 0) {
    console.log(`\nステップ ${step}:`);
    console.log(`  現在のスタック: [${stack.join(", ")}]`);

    const current = stack.pop();
    console.log(`  取り出したノード: ${current}`);

    if (visited.has(current)) {
      console.log(`  既に訪問済みのためスキップ`);
      continue;
    }

    visited.add(current);
    console.log(`  ${current} を訪問済みにマーク`);

    if (current === target) {
      console.log(`  ✓ 目標ノード ${target} を発見！`);
      return true;
    }

    const neighbors = graph[current] || [];
    console.log(`  隣接ノード: [${neighbors.join(", ")}]`);

    const newNodes = [];
    for (const neighbor of neighbors) {
      if (!visited.has(neighbor)) {
        stack.push(neighbor);
        newNodes.push(neighbor);
      }
    }

    if (newNodes.length > 0) {
      console.log(`  スタックに追加: [${newNodes.join(", ")}]`);
    }
    console.log(`  更新後の訪問済み: {${Array.from(visited).join(", ")}}`);

    step++;
  }

  console.log(`\n✗ 目標ノード ${target} は見つかりませんでした`);
  return false;
}

// 詳細版の実行例
console.log("\n" + "=".repeat(50));
dfsDetailed(graph, "A", "F");
