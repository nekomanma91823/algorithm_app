"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const HeapVisualizer: React.FC = () => {
  const [heap, setHeap] = useState<number[]>([90, 80, 70, 40, 30, 20, 10]);
  const [inputValue, setInputValue] = useState<string>("");
  const [operation, setOperation] = useState<string>("");
  const [highlightIndex, setHighlightIndex] = useState<number | null>(null);
  const [heapType, setHeapType] = useState<"max" | "min">("max");

  // ヒープの親・子のインデックス計算
  const parentIndex = (i: number) => Math.floor((i - 1) / 2);
  const leftChildIndex = (i: number) => 2 * i + 1;
  const rightChildIndex = (i: number) => 2 * i + 2;

  // 値の交換
  const swap = (arr: number[], i: number, j: number) => {
    [arr[i], arr[j]] = [arr[j], arr[i]];
  };

  // ヒープ条件のチェック
  const isValidHeap = (arr: number[], isMaxHeap: boolean) => {
    return (a: number, b: number) => (isMaxHeap ? a >= b : a <= b);
  };

  // ヒープの上方向への修正
  const heapifyUp = (arr: number[], index: number, isMaxHeap: boolean) => {
    const compare = isValidHeap(arr, isMaxHeap);
    while (index > 0) {
      const parentIdx = parentIndex(index);
      if (compare(arr[parentIdx], arr[index])) break;
      swap(arr, index, parentIdx);
      index = parentIdx;
    }
  };

  // ヒープの下方向への修正
  const heapifyDown = (arr: number[], index: number, isMaxHeap: boolean) => {
    const compare = isValidHeap(arr, isMaxHeap);
    const length = arr.length;

    while (true) {
      let targetIndex = index;
      const leftIdx = leftChildIndex(index);
      const rightIdx = rightChildIndex(index);

      if (leftIdx < length && !compare(arr[targetIndex], arr[leftIdx])) {
        targetIndex = leftIdx;
      }

      if (rightIdx < length && !compare(arr[targetIndex], arr[rightIdx])) {
        targetIndex = rightIdx;
      }

      if (targetIndex === index) break;

      swap(arr, index, targetIndex);
      index = targetIndex;
    }
  };

  const handleInsert = () => {
    const value = parseInt(inputValue);
    if (isNaN(value)) return;

    const newHeap = [...heap, value];
    heapifyUp(newHeap, newHeap.length - 1, heapType === "max");

    setHeap(newHeap);
    setHighlightIndex(newHeap.length - 1);
    setOperation(
      `値 ${value} を挿入しました（最後に追加後、上方向にヒープ化）`
    );
    setInputValue("");

    setTimeout(() => {
      setHighlightIndex(null);
      setOperation("");
    }, 3000);
  };

  const handleExtract = () => {
    if (heap.length === 0) {
      setOperation("ヒープが空です！");
      setTimeout(() => setOperation(""), 2000);
      return;
    }

    const rootValue = heap[0];
    const newHeap = [...heap];

    // 最後の要素を根に移動
    newHeap[0] = newHeap[newHeap.length - 1];
    newHeap.pop();

    // 下方向にヒープ化
    if (newHeap.length > 0) {
      heapifyDown(newHeap, 0, heapType === "max");
    }

    setHeap(newHeap);
    setOperation(
      `根の値 ${rootValue} を取り出しました（最後の要素を根に移動後、下方向にヒープ化）`
    );

    setTimeout(() => setOperation(""), 3000);
  };

  const handleHeapSort = () => {
    const sortedArray: number[] = [];
    const tempHeap = [...heap];

    while (tempHeap.length > 0) {
      // 根を取り出し
      sortedArray.push(tempHeap[0]);

      // 最後の要素を根に移動
      tempHeap[0] = tempHeap[tempHeap.length - 1];
      tempHeap.pop();

      // 下方向にヒープ化
      if (tempHeap.length > 0) {
        heapifyDown(tempHeap, 0, heapType === "max");
      }
    }

    setOperation(
      `ソート結果: ${sortedArray.join(", ")} (${
        heapType === "max" ? "降順" : "昇順"
      })`
    );
    setTimeout(() => setOperation(""), 5000);
  };

  const toggleHeapType = () => {
    const newType = heapType === "max" ? "min" : "max";
    setHeapType(newType);

    // 既存のヒープを新しい型に変換
    const newHeap = [...heap];
    for (let i = Math.floor(newHeap.length / 2) - 1; i >= 0; i--) {
      heapifyDown(newHeap, i, newType === "max");
    }

    setHeap(newHeap);
    setOperation(`${newType === "max" ? "最大" : "最小"}ヒープに変換しました`);
    setTimeout(() => setOperation(""), 3000);
  };

  const resetHeap = () => {
    setHeap([90, 80, 70, 40, 30, 20, 10]);
    setHeapType("max");
    setHighlightIndex(null);
    setOperation("ヒープをリセットしました");
    setTimeout(() => setOperation(""), 2000);
  };

  // ヒープの配列表現からツリー構造をレンダリング
  const renderHeapLevel = (startIndex: number, levelSize: number) => {
    const elements: React.JSX.Element[] = [];

    for (let i = 0; i < levelSize && startIndex + i < heap.length; i++) {
      const index = startIndex + i;
      const value = heap[index];
      const isRoot = index === 0;
      const isHighlighted = highlightIndex === index;

      elements.push(
        <div
          key={index}
          className={`relative w-12 h-12 rounded-full border-2 flex items-center justify-center font-bold text-sm transition-all ${
            isHighlighted
              ? "bg-yellow-200 border-yellow-500 shadow-lg scale-110"
              : isRoot
              ? `${
                  heapType === "max"
                    ? "bg-red-100 border-red-400"
                    : "bg-blue-100 border-blue-400"
                }`
              : "bg-gray-100 border-gray-300 hover:bg-gray-200"
          }`}
          onClick={() => {
            setHighlightIndex(index);
            const parentIdx = parentIndex(index);
            const leftIdx = leftChildIndex(index);
            const rightIdx = rightChildIndex(index);

            let info = `インデックス ${index}, 値: ${value}`;
            if (index > 0)
              info += `, 親: ${heap[parentIdx]} (index ${parentIdx})`;
            if (leftIdx < heap.length)
              info += `, 左の子: ${heap[leftIdx]} (index ${leftIdx})`;
            if (rightIdx < heap.length)
              info += `, 右の子: ${heap[rightIdx]} (index ${rightIdx})`;

            setOperation(info);
            setTimeout(() => {
              setHighlightIndex(null);
              setOperation("");
            }, 4000);
          }}
        >
          {value}
          <div className="absolute -bottom-6 text-xs text-gray-500">
            [{index}]
          </div>
        </div>
      );
    }

    return <div className="flex justify-center space-x-4 mb-8">{elements}</div>;
  };

  const renderHeapTree = () => {
    if (heap.length === 0) {
      return (
        <div className="text-center text-gray-500 py-8">ヒープが空です</div>
      );
    }

    const levels: React.JSX.Element[] = [];
    let currentIndex = 0;
    let level = 0;

    while (currentIndex < heap.length) {
      const levelSize = Math.pow(2, level);
      levels.push(renderHeapLevel(currentIndex, levelSize));
      currentIndex += levelSize;
      level++;
    }

    return <div>{levels}</div>;
  };

  return (
    <div className="space-y-6">
      {/* ヒープの視覚化 */}
      <div className="p-6 rounded-lg neumorphic-shadow">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">
            {heapType === "max" ? "最大" : "最小"}ヒープの可視化
          </h3>
          <Button
            onClick={toggleHeapType}
            variant="outline"
          >
            {heapType === "max" ? "最小ヒープ" : "最大ヒープ"}に変換
          </Button>
        </div>

        {/* ツリー形式表示 */}
        <div className="mb-6">{renderHeapTree()}</div>

        {/* 配列表現 */}
        <div className="p-4 rounded neumorphic-shadow-inset">
          <h4 className="text-sm font-semibold mb-2">
            配列表現:
          </h4>
          <div className="flex flex-wrap gap-2">
            {heap.map((value, index) => (
              <div
                key={index}
                className={`w-12 h-8 rounded flex items-center justify-center text-sm font-medium neumorphic-shadow ${
                  highlightIndex === index
                    ? "neumorphic-shadow-inset"
                    : ""
                }`}
              >
                {value}
              </div>
            ))}
          </div>
          <div className="text-xs mt-2">
            ヒープ性質: 親ノード {heapType === "max" ? "≥" : "≤"} 子ノード
          </div>
        </div>

        {/* 操作結果表示 */}
        {operation && (
          <div className="mt-4 p-3 rounded text-center neumorphic-shadow">
            {operation}
          </div>
        )}
      </div>

      {/* コントロールパネル */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* 挿入操作 */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="font-semibold mb-3 text-green-700">📥 要素の挿入</h4>
          <div className="space-y-2">
            <Input
              type="number"
              placeholder="挿入する値"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleInsert()}
            />
            <Button
              onClick={handleInsert}
              className="w-full bg-green-600 hover:bg-green-700"
            >
              挿入
            </Button>
          </div>
        </div>

        {/* 抽出操作 */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="font-semibold mb-3 text-red-700">📤 根の抽出</h4>
          <div className="space-y-2">
            <p className="text-sm text-gray-600">
              {heapType === "max" ? "最大値" : "最小値"}を取り出します
            </p>
            <Button
              onClick={handleExtract}
              className="w-full bg-red-600 hover:bg-red-700"
            >
              抽出
            </Button>
          </div>
        </div>
      </div>

      {/* ヒープソート */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <h4 className="font-semibold mb-3 text-purple-700">🔄 ヒープソート</h4>
        <div className="space-y-2">
          <p className="text-sm text-gray-600">
            ヒープを使って配列を{heapType === "max" ? "降順" : "昇順"}
            にソートします
          </p>
          <Button
            onClick={handleHeapSort}
            variant="outline"
            className="bg-purple-50"
          >
            ソート実行
          </Button>
        </div>
      </div>

      {/* 操作説明 */}
      <div className="p-4 rounded-lg neumorphic-shadow">
        <h4 className="font-semibold mb-2">
          💡 ヒープの特徴
        </h4>
        <ul className="text-sm space-y-1">
          <li>
            • <strong>完全二分木</strong>: 最下段以外はすべて埋まっている
          </li>
          <li>
            • <strong>ヒープ条件</strong>:
            親ノードが子ノードより大きい（最大ヒープ）または小さい（最小ヒープ）
          </li>
          <li>
            • <strong>挿入</strong>: 最後に追加後、上方向にヒープ化 O(log n)
          </li>
          <li>
            • <strong>抽出</strong>: 根を取り出し、下方向にヒープ化 O(log n)
          </li>
          <li>
            • <strong>配列実装</strong>: 親 i の子は 2i+1, 2i+2
          </li>
          <li>
            • <strong>使用例</strong>:
            優先度付きキュー、ヒープソート、スケジューリングなど
          </li>
        </ul>
      </div>

      {/* リセット */}
      <div className="flex justify-center">
        <Button onClick={resetHeap} variant="outline">
          🔄 リセット
        </Button>
      </div>
    </div>
  );
};

export default HeapVisualizer;
