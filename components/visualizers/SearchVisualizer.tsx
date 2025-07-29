"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Play, Pause, RotateCcw } from "lucide-react";

interface SearchVisualizerProps {
  algorithmName: string;
}

const SearchVisualizer: React.FC<SearchVisualizerProps> = ({
  algorithmName,
}) => {
  const [array, setArray] = useState<number[]>([]);
  const [target, setTarget] = useState<number>(0);
  const [currentIndex, setCurrentIndex] = useState<number>(-1);
  const [foundIndex, setFoundIndex] = useState<number>(-1);
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [searchComplete, setSearchComplete] = useState<boolean>(false);
  const [speed, setSpeed] = useState<number>(500);
  const searchRef = useRef<boolean>(false);

  // グラフ・ツリー構造用の状態
  const [graph, setGraph] = useState<{ [key: string]: string[] }>({});
  const [nodePositions, setNodePositions] = useState<{
    [key: string]: { x: number; y: number };
  }>({});
  const [visitedNodes, setVisitedNodes] = useState<Set<string>>(new Set());
  const [currentNode, setCurrentNode] = useState<string>("");
  const [targetNode, setTargetNode] = useState<string>("");
  const [queue, setQueue] = useState<string[]>([]);
  const [stack, setStack] = useState<string[]>([]);

  // アルゴリズムタイプの判定
  const isArrayAlgorithm =
    algorithmName === "linear-search" || algorithmName === "binary-search";
  const isGraphAlgorithm = ["bfs", "dfs", "dijkstra", "a-star"].includes(
    algorithmName
  );

  const reset = useCallback(() => {
    setCurrentIndex(-1);
    setFoundIndex(-1);
    setIsSearching(false);
    setSearchComplete(false);
    searchRef.current = false;
  }, []);

  const resetGraph = useCallback(() => {
    setVisitedNodes(new Set());
    setCurrentNode("");
    setQueue([]);
    setStack([]);
    setIsSearching(false);
    setSearchComplete(false);
    searchRef.current = false;
  }, []);

  const generateArray = useCallback(() => {
    let newArray: number[];

    if (algorithmName === "binary-search") {
      // 二分探索用：ソート済み配列
      newArray = Array.from({ length: 15 }, (_, i) => (i + 1) * 2);
    } else {
      // その他：ランダム配列
      newArray = Array.from(
        { length: 15 },
        () => Math.floor(Math.random() * 50) + 1
      );
    }

    setArray(newArray);
    // 確実に配列に含まれる値をターゲットに設定
    const randomIndex = Math.floor(Math.random() * newArray.length);
    setTarget(newArray[randomIndex]);
    reset();
  }, [algorithmName, reset]);

  const generateGraph = useCallback(() => {
    // サンプルグラフの生成（深さ5階層の二分木構造）
    const sampleGraph = {
      // レベル0（ルート）
      A: ["B", "C"],

      // レベル1
      B: ["A", "D", "E"],
      C: ["A", "F", "G"],

      // レベル2
      D: ["B", "H", "I"],
      E: ["B", "J", "K"],
      F: ["C", "L", "M"],
      G: ["C", "N", "O"],

      // レベル3
      H: ["D", "P", "Q"],
      I: ["D", "R", "S"],
      J: ["E", "T", "U"],
      K: ["E", "V", "W"],
      L: ["F", "X", "Y"],
      M: ["F", "Z", "AA"],
      N: ["G", "BB", "CC"],
      O: ["G", "DD", "EE"],

      // レベル4（最深部）
      P: ["H"],
      Q: ["H"],
      R: ["I"],
      S: ["I"],
      T: ["J"],
      U: ["J"],
      V: ["K"],
      W: ["K"],
      X: ["L"],
      Y: ["L"],
      Z: ["M"],
      AA: ["M"],
      BB: ["N"],
      CC: ["N"],
      DD: ["O"],
      EE: ["O"],
    };

    // ノードの位置を計算（バランスの取れた二分木配置）
    const positions = {
      // レベル0（ルート）
      A: { x: 200, y: 30 },

      // レベル1
      B: { x: 120, y: 80 },
      C: { x: 280, y: 80 },

      // レベル2
      D: { x: 80, y: 130 },
      E: { x: 160, y: 130 },
      F: { x: 240, y: 130 },
      G: { x: 320, y: 130 },

      // レベル3
      H: { x: 60, y: 180 },
      I: { x: 100, y: 180 },
      J: { x: 140, y: 180 },
      K: { x: 180, y: 180 },
      L: { x: 220, y: 180 },
      M: { x: 260, y: 180 },
      N: { x: 300, y: 180 },
      O: { x: 340, y: 180 },

      // レベル4（最深部）
      P: { x: 50, y: 230 },
      Q: { x: 70, y: 230 },
      R: { x: 90, y: 230 },
      S: { x: 110, y: 230 },
      T: { x: 130, y: 230 },
      U: { x: 150, y: 230 },
      V: { x: 170, y: 230 },
      W: { x: 190, y: 230 },
      X: { x: 210, y: 230 },
      Y: { x: 230, y: 230 },
      Z: { x: 250, y: 230 },
      AA: { x: 270, y: 230 },
      BB: { x: 290, y: 230 },
      CC: { x: 310, y: 230 },
      DD: { x: 330, y: 230 },
      EE: { x: 350, y: 230 },
    };

    setGraph(sampleGraph);
    setNodePositions(positions);
    setTargetNode("EE"); // 最深部の右端ノードをターゲットに設定
    resetGraph();
  }, [resetGraph]);

  // アルゴリズム別の初期化
  useEffect(() => {
    if (isArrayAlgorithm) {
      generateArray();
    } else if (isGraphAlgorithm) {
      generateGraph();
    }
  }, [
    algorithmName,
    isArrayAlgorithm,
    isGraphAlgorithm,
    generateArray,
    generateGraph,
  ]);

  const sleep = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  const linearSearch = async () => {
    setIsSearching(true);
    setSearchComplete(false);
    searchRef.current = true;

    for (let i = 0; i < array.length; i++) {
      // 探索が停止された場合はループを抜ける
      if (!searchRef.current) break;

      setCurrentIndex(i);
      await sleep(speed);

      if (array[i] === target) {
        setFoundIndex(i);
        setSearchComplete(true);
        setIsSearching(false);
        searchRef.current = false;
        return;
      }
    }

    setSearchComplete(true);
    setIsSearching(false);
    searchRef.current = false;
  };

  const binarySearch = async () => {
    setIsSearching(true);
    setSearchComplete(false);
    searchRef.current = true;

    let left = 0;
    let right = array.length - 1;

    while (left <= right && searchRef.current) {
      const mid = Math.floor((left + right) / 2);
      setCurrentIndex(mid);
      await sleep(speed);

      if (array[mid] === target) {
        setFoundIndex(mid);
        setSearchComplete(true);
        setIsSearching(false);
        searchRef.current = false;
        return;
      } else if (array[mid] < target) {
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }

    setSearchComplete(true);
    setIsSearching(false);
    searchRef.current = false;
  };

  const bfsSearch = async () => {
    setIsSearching(true);
    setSearchComplete(false);
    searchRef.current = true;

    const startNode = "A";
    const visited = new Set<string>();
    const searchQueue = [startNode];

    visited.add(startNode);
    setVisitedNodes(new Set(visited));
    setCurrentNode(startNode);
    setQueue([...searchQueue]);

    while (searchQueue.length > 0 && searchRef.current) {
      const current = searchQueue.shift()!;
      setCurrentNode(current);
      await sleep(speed);

      if (current === targetNode) {
        setSearchComplete(true);
        setIsSearching(false);
        searchRef.current = false;
        return;
      }

      const neighbors = graph[current] || [];
      for (const neighbor of neighbors) {
        if (!visited.has(neighbor)) {
          visited.add(neighbor);
          searchQueue.push(neighbor);
          setVisitedNodes(new Set(visited));
          setQueue([...searchQueue]);
        }
      }
    }

    setSearchComplete(true);
    setIsSearching(false);
    searchRef.current = false;
  };

  const dfsSearch = async () => {
    setIsSearching(true);
    setSearchComplete(false);
    searchRef.current = true;

    const startNode = "A";
    const visited = new Set<string>();
    const searchStack = [startNode];

    setStack([...searchStack]);

    while (searchStack.length > 0 && searchRef.current) {
      const current = searchStack.pop()!;

      if (visited.has(current)) continue;

      visited.add(current);
      setVisitedNodes(new Set(visited));
      setCurrentNode(current);
      setStack([...searchStack]);
      await sleep(speed);

      if (current === targetNode) {
        setSearchComplete(true);
        setIsSearching(false);
        searchRef.current = false;
        return;
      }

      const neighbors = graph[current] || [];
      for (const neighbor of neighbors) {
        if (!visited.has(neighbor)) {
          searchStack.push(neighbor);
        }
      }
      setStack([...searchStack]);
    }

    setSearchComplete(true);
    setIsSearching(false);
    searchRef.current = false;
  };

  const startSearch = () => {
    if (isArrayAlgorithm) {
      reset();
    } else if (isGraphAlgorithm) {
      resetGraph();
    }

    switch (algorithmName) {
      case "linear-search":
        linearSearch();
        break;
      case "binary-search":
        binarySearch();
        break;
      case "bfs":
        bfsSearch();
        break;
      case "dfs":
        dfsSearch();
        break;
      case "dijkstra":
      case "a-star":
        // 今後実装予定
        console.log(`${algorithmName} is not yet implemented`);
        break;
      default:
        linearSearch();
    }
  };

  const stopSearch = () => {
    setIsSearching(false);
    searchRef.current = false;
  };

  // グラフ可視化コンポーネント
  const GraphVisualization = () => (
    <div className="mb-6">
      <div
        className="rounded-lg p-4 relative neumorphic-shadow-inset"
        style={{ height: "300px" }}
      >
        <svg width="400" height="270" className="mx-auto">
          {/* エッジ（線）を描画 */}
          {Object.entries(graph).map(([node, neighbors]) =>
            neighbors.map((neighbor) => {
              const start = nodePositions[node];
              const end = nodePositions[neighbor];
              if (!start || !end) return null;

              return (
                <line
                  key={`${node}-${neighbor}`}
                  x1={start.x}
                  y1={start.y}
                  x2={end.x}
                  y2={end.y}
                  stroke="#9CA3AF"
                  strokeWidth="1.5"
                />
              );
            })
          )}

          {/* ノード（円）を描画 */}
          {Object.entries(nodePositions).map(([node, pos]) => (
            <g key={node}>
              <circle
                cx={pos.x}
                cy={pos.y}
                r="14"
                fill={
                  node === currentNode
                    ? "#FCD34D" // 現在探索中: 黄色
                    : node === targetNode
                    ? "#34D399" // ターゲット: 緑色
                    : visitedNodes.has(node)
                    ? "#93C5FD" // 訪問済み: 青色
                    : "#F3F4F6" // 未訪問: グレー
                }
                stroke={
                  node === currentNode
                    ? "#F59E0B"
                    : node === targetNode
                    ? "#059669"
                    : visitedNodes.has(node)
                    ? "#3B82F6"
                    : "#9CA3AF"
                }
                strokeWidth="2"
                className="transition-all duration-200"
              />
              <text
                x={pos.x}
                y={pos.y + 4}
                textAnchor="middle"
                className="text-xs font-bold fill-gray-800"
              >
                {node}
              </text>
            </g>
          ))}
        </svg>
      </div>
    </div>
  );

  return (
    <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
      {/* コントロール */}
      <div className="flex flex-wrap items-center gap-4 mb-6">
        <Button
          onClick={startSearch}
          disabled={isSearching}
          className="flex items-center gap-2"
        >
          <Play className="w-4 h-4" />
          探索開始
        </Button>

        <Button
          onClick={stopSearch}
          disabled={!isSearching}
          variant="outline"
          className="flex items-center gap-2"
        >
          <Pause className="w-4 h-4" />
          停止
        </Button>

        <Button
          onClick={isArrayAlgorithm ? generateArray : generateGraph}
          disabled={isSearching}
          variant="outline"
          className="flex items-center gap-2"
        >
          <RotateCcw className="w-4 h-4" />
          {isArrayAlgorithm ? "新しい配列" : "新しいグラフ"}
        </Button>

        <div className="flex items-center gap-2">
          <label className="text-sm font-medium">速度:</label>
          <input
            type="range"
            min="100"
            max="1000"
            step="100"
            value={speed}
            onChange={(e) => setSpeed(Number(e.target.value))}
            className="w-24 neumorphic-shadow-inset rounded-lg"
            disabled={isSearching}
          />
          <span className="text-sm text-gray-600">{speed}ms</span>
        </div>
      </div>

      {/* 探索対象 */}
      {isArrayAlgorithm && (
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-sm font-medium">探索対象:</span>
            <input
              type="number"
              value={target}
              onChange={(e) => setTarget(Number(e.target.value))}
              className="w-16 px-2 py-1 rounded text-center neumorphic-shadow-inset"
              disabled={isSearching}
            />
            <span className="text-xs text-gray-500">
              (配列に含まれている: {array.includes(target) ? "はい" : "いいえ"})
            </span>
          </div>
        </div>
      )}

      {isGraphAlgorithm && (
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-sm font-medium">探索対象:</span>
            <select
              value={targetNode}
              onChange={(e) => setTargetNode(e.target.value)}
              className="px-2 py-1 rounded neumorphic-shadow-inset"
              disabled={isSearching}
            >
              {Object.keys(graph).map((node) => (
                <option key={node} value={node}>
                  {node}
                </option>
              ))}
            </select>
            <span className="text-xs text-gray-500">(開始ノード: A)</span>
          </div>
        </div>
      )}

      {/* 可視化エリア */}
      {isArrayAlgorithm && (
        <>
          {/* 配列の可視化 */}
          <div className="mb-6">
            <div className="flex flex-wrap gap-2 justify-center">
              {array.map((value, index) => (
                <div
                  key={index}
                  className={`
                    w-12 h-12 flex items-center justify-center rounded-lg font-bold text-sm neumorphic-shadow
                    ${index === currentIndex ? "neumorphic-shadow-inset" : ""}
                    ${
                      index === foundIndex
                        ? "bg-green-300 border-green-500"
                        : ""
                    }
                    ${
                      value === target && foundIndex === -1
                        ? "bg-blue-100 border-blue-300"
                        : ""
                    }
                    transition-all duration-200
     
                  `}
                >
                  {value}
                </div>
              ))}
            </div>
          </div>

          {/* インデックス表示 */}
          <div className="mb-6">
            <div className="flex flex-wrap gap-2 justify-center">
              {array.map((_, index) => (
                <div
                  key={index}
                  className="w-12 h-6 flex items-center justify-center text-xs text-gray-500"
                >
                  {index}
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {isGraphAlgorithm && (
        <>
          <GraphVisualization />

          {/* キューとスタックの状態表示 */}
          {algorithmName === "bfs" && queue.length > 0 && (
            <div className="mb-4 p-3 rounded-lg neumorphic-shadow">
              <h4 className="text-sm font-semibold mb-2">キューの状態:</h4>
              <div className="flex gap-2">
                {queue.map((node, index) => (
                  <div
                    key={index}
                    className="px-2 py-1 rounded text-sm neumorphic-shadow-inset"
                  >
                    {node}
                  </div>
                ))}
              </div>
            </div>
          )}

          {algorithmName === "dfs" && stack.length > 0 && (
            <div className="mb-4 p-3 rounded-lg neumorphic-shadow">
              <h4 className="text-sm font-semibold mb-2">スタックの状態:</h4>
              <div className="flex gap-2">
                {stack.map((node, index) => (
                  <div
                    key={index}
                    className="px-2 py-1 rounded text-sm neumorphic-shadow-inset"
                  >
                    {node}
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}

      {/* ステータス */}
      <div className="text-center">
        {isSearching && isArrayAlgorithm && (
          <p className="text-blue-600 font-medium">
            探索中... インデックス {currentIndex} を確認中
          </p>
        )}
        {isSearching && isGraphAlgorithm && (
          <p className="text-blue-600 font-medium">
            探索中... ノード {currentNode} を確認中
          </p>
        )}

        {searchComplete && isArrayAlgorithm && foundIndex !== -1 && (
          <p className="text-green-600 font-medium">
            見つかりました！ インデックス {foundIndex} に値 {target} があります
          </p>
        )}
        {searchComplete && isGraphAlgorithm && currentNode === targetNode && (
          <p className="text-green-600 font-medium">
            見つかりました！ ノード {targetNode} に到達しました
          </p>
        )}

        {searchComplete && isArrayAlgorithm && foundIndex === -1 && (
          <p className="text-red-600 font-medium">
            値 {target} は配列内に見つかりませんでした
          </p>
        )}
        {searchComplete && isGraphAlgorithm && currentNode !== targetNode && (
          <p className="text-red-600 font-medium">
            ノード {targetNode} への経路は見つかりませんでした
          </p>
        )}
      </div>

      {/* アルゴリズム固有の説明 */}
      <div className="mt-6 p-4 rounded-lg neumorphic-shadow">
        <h4 className="font-semibold text-blue-800 mb-2">
          {algorithmName === "binary-search"
            ? "二分探索の特徴"
            : algorithmName === "linear-search"
            ? "線形探索の特徴"
            : algorithmName === "bfs"
            ? "幅優先探索の特徴"
            : algorithmName === "dfs"
            ? "深さ優先探索の特徴"
            : `${algorithmName}の特徴`}
        </h4>

        {algorithmName === "binary-search" && (
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• ソート済み配列が必要です</li>
            <li>• 毎回探索範囲を半分に絞り込みます</li>
            <li>• 計算量: O(log n) - 非常に効率的</li>
          </ul>
        )}

        {algorithmName === "linear-search" && (
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• 配列を最初から順番に調べます</li>
            <li>• ソートされていない配列でも動作します</li>
            <li>• 計算量: O(n) - シンプルで確実</li>
          </ul>
        )}

        {algorithmName === "bfs" && (
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• キューを使用して幅方向に探索します</li>
            <li>• 最短経路を保証します（重みなしグラフ）</li>
            <li>• 深さ5段階の木構造で探索順序を可視化</li>
            <li>• 計算量: O(V + E) - Vはノード数、Eはエッジ数</li>
          </ul>
        )}

        {algorithmName === "dfs" && (
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• スタックを使用して深さ方向に探索します</li>
            <li>• メモリ効率が良い（再帰実装可能）</li>
            <li>• 深さ5段階まで一気に探索する様子を確認可能</li>
            <li>• 計算量: O(V + E) - Vはノード数、Eはエッジ数</li>
          </ul>
        )}
      </div>
    </div>
  );
};

export default SearchVisualizer;
