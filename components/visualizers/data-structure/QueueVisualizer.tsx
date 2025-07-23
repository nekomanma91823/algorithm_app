"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const QueueVisualizer: React.FC = () => {
  const [queue, setQueue] = useState<number[]>([1, 2, 3]);
  const [inputValue, setInputValue] = useState<string>("");
  const [operation, setOperation] = useState<string>("");
  const [animating, setAnimating] = useState<boolean>(false);

  const handleEnqueue = () => {
    const value = parseInt(inputValue);
    if (isNaN(value)) return;

    setAnimating(true);
    setOperation(`要素 ${value} をエンキューしています...`);

    setTimeout(() => {
      setQueue([...queue, value]);
      setOperation(`要素 ${value} をキューに追加しました（O(1)）`);
      setAnimating(false);
      setInputValue("");
      setTimeout(() => setOperation(""), 2000);
    }, 500);
  };

  const handleDequeue = () => {
    if (queue.length === 0) {
      setOperation("キューが空です！");
      setTimeout(() => setOperation(""), 2000);
      return;
    }

    const dequeuedValue = queue[0];
    setAnimating(true);
    setOperation(`要素 ${dequeuedValue} をデキューしています...`);

    setTimeout(() => {
      setQueue(queue.slice(1));
      setOperation(`要素 ${dequeuedValue} をキューから取り出しました（O(1)）`);
      setAnimating(false);
      setTimeout(() => setOperation(""), 2000);
    }, 500);
  };

  const handleFront = () => {
    if (queue.length === 0) {
      setOperation("キューが空です！");
      setTimeout(() => setOperation(""), 2000);
      return;
    }

    const frontValue = queue[0];
    setOperation(`キューの先頭要素は ${frontValue} です（O(1)）`);
    setTimeout(() => setOperation(""), 2000);
  };

  const handleRear = () => {
    if (queue.length === 0) {
      setOperation("キューが空です！");
      setTimeout(() => setOperation(""), 2000);
      return;
    }

    const rearValue = queue[queue.length - 1];
    setOperation(`キューの末尾要素は ${rearValue} です（O(1)）`);
    setTimeout(() => setOperation(""), 2000);
  };

  const handleClear = () => {
    setQueue([]);
    setOperation("キューをクリアしました");
    setTimeout(() => setOperation(""), 2000);
  };

  const resetQueue = () => {
    setQueue([1, 2, 3]);
    setOperation("キューをリセットしました");
    setTimeout(() => setOperation(""), 2000);
  };

  return (
    <div className="space-y-6">
      {/* キューの視覚化 */}
      <div className="bg-white p-6 rounded-lg border">
        <h3 className="text-lg font-semibold mb-4 text-center">
          キュー（FIFO）の可視化
        </h3>

        <div className="flex flex-col items-center space-y-4">
          {/* 方向表示 */}
          <div className="flex items-center justify-between w-full max-w-md text-sm text-gray-600">
            <span className="text-blue-600 font-semibold">
              ← デキュー（取り出し）
            </span>
            <span className="text-green-600 font-semibold">
              エンキュー（追加） →
            </span>
          </div>

          {/* キューの要素表示 */}
          <div className="flex items-center space-x-2 min-h-[80px] p-4 bg-gray-50 rounded-lg">
            {/* フロント矢印 */}
            {queue.length > 0 && (
              <div className="text-blue-600 font-bold">←Front</div>
            )}

            {/* キューの要素 */}
            {queue.map((value, index) => (
              <div
                key={index}
                className={`w-16 h-16 border-2 rounded-lg flex items-center justify-center text-lg font-bold transition-all ${
                  index === 0
                    ? "bg-blue-100 border-blue-400 shadow-lg" // フロント要素
                    : index === queue.length - 1
                    ? "bg-green-100 border-green-400" // リア要素
                    : "bg-gray-100 border-gray-300"
                }`}
              >
                {value}
              </div>
            ))}

            {/* 新しい要素が追加される位置 */}
            {animating && (
              <div className="w-16 h-16 border-2 border-dashed border-green-400 rounded-lg flex items-center justify-center bg-green-50 animate-pulse">
                <span className="text-green-600 text-xs">追加中</span>
              </div>
            )}

            {/* リア矢印 */}
            {queue.length > 0 && (
              <div className="text-green-600 font-bold">Rear→</div>
            )}

            {/* キューが空の場合 */}
            {queue.length === 0 && !animating && (
              <div className="w-16 h-16 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center text-gray-400">
                空
              </div>
            )}
          </div>
        </div>

        {/* キュー情報 */}
        <div className="mt-4 text-center space-y-2">
          <div className="text-sm text-gray-600">
            <span className="font-semibold">サイズ:</span> {queue.length}
            {queue.length > 0 && (
              <>
                <span className="ml-4 font-semibold text-blue-600">
                  フロント:
                </span>{" "}
                {queue[0]}
                <span className="ml-4 font-semibold text-green-600">
                  リア:
                </span>{" "}
                {queue[queue.length - 1]}
              </>
            )}
          </div>
          <div className="text-xs text-gray-500">
            先頭（フロント）から取り出し、末尾（リア）に追加
          </div>
        </div>

        {/* 操作結果表示 */}
        {operation && (
          <div className="mt-4 bg-blue-50 border border-blue-200 rounded p-3 text-blue-800 text-center">
            {operation}
          </div>
        )}
      </div>

      {/* コントロールパネル */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Enqueue操作 */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="font-semibold mb-3 text-green-700">
            📥 Enqueue（エンキュー）
          </h4>
          <div className="space-y-2">
            <Input
              type="number"
              placeholder="追加する値"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleEnqueue()}
            />
            <Button
              onClick={handleEnqueue}
              className="w-full bg-green-600 hover:bg-green-700"
              disabled={animating}
            >
              Enqueue
            </Button>
          </div>
        </div>

        {/* Dequeue & 参照操作 */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="font-semibold mb-3 text-blue-700">
            📤 Dequeue & 参照
          </h4>
          <div className="space-y-2">
            <Button
              onClick={handleDequeue}
              className="w-full bg-blue-600 hover:bg-blue-700"
              disabled={animating}
            >
              Dequeue（取り出し）
            </Button>
            <div className="grid grid-cols-2 gap-2">
              <Button
                onClick={handleFront}
                variant="outline"
                size="sm"
                disabled={animating}
              >
                Front
              </Button>
              <Button
                onClick={handleRear}
                variant="outline"
                size="sm"
                disabled={animating}
              >
                Rear
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* 操作説明 */}
      <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
        <h4 className="font-semibold mb-2 text-yellow-800">💡 キューの特徴</h4>
        <ul className="text-sm text-yellow-700 space-y-1">
          <li>
            • <strong>FIFO（First In, First Out）</strong>:
            最初に入れたものが最初に出る
          </li>
          <li>
            • <strong>Enqueue</strong>: キューの後ろに要素を追加（O(1)）
          </li>
          <li>
            • <strong>Dequeue</strong>: キューの前から要素を取り出し（O(1)）
          </li>
          <li>
            • <strong>Front</strong>: キューの前の要素を参照
          </li>
          <li>
            • <strong>Rear</strong>: キューの後ろの要素を参照
          </li>
          <li>
            • <strong>使用例</strong>:
            タスクの待ち行列、BFS、プリンタの印刷キューなど
          </li>
        </ul>
      </div>

      {/* リセットとクリア */}
      <div className="flex gap-2 justify-center">
        <Button onClick={resetQueue} variant="outline">
          🔄 リセット
        </Button>
        <Button onClick={handleClear} variant="destructive">
          🗑️ クリア
        </Button>
      </div>
    </div>
  );
};

export default QueueVisualizer;
