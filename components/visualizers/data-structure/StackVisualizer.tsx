"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const StackVisualizer: React.FC = () => {
  const [stack, setStack] = useState<number[]>([1, 2, 3]);
  const [inputValue, setInputValue] = useState<string>("");
  const [operation, setOperation] = useState<string>("");
  const [animating, setAnimating] = useState<boolean>(false);

  const handlePush = () => {
    const value = parseInt(inputValue);
    if (isNaN(value)) return;

    setAnimating(true);
    setOperation(`要素 ${value} をプッシュしています...`);

    setTimeout(() => {
      setStack([...stack, value]);
      setOperation(`要素 ${value} をスタックにプッシュしました（O(1)）`);
      setAnimating(false);
      setInputValue("");
      setTimeout(() => setOperation(""), 2000);
    }, 500);
  };

  const handlePop = () => {
    if (stack.length === 0) {
      setOperation("スタックが空です！");
      setTimeout(() => setOperation(""), 2000);
      return;
    }

    const poppedValue = stack[stack.length - 1];
    setAnimating(true);
    setOperation(`要素 ${poppedValue} をポップしています...`);

    setTimeout(() => {
      setStack(stack.slice(0, -1));
      setOperation(`要素 ${poppedValue} をスタックからポップしました（O(1)）`);
      setAnimating(false);
      setTimeout(() => setOperation(""), 2000);
    }, 500);
  };

  const handlePeek = () => {
    if (stack.length === 0) {
      setOperation("スタックが空です！");
      setTimeout(() => setOperation(""), 2000);
      return;
    }

    const topValue = stack[stack.length - 1];
    setOperation(`スタックトップの要素は ${topValue} です（O(1)）`);
    setTimeout(() => setOperation(""), 2000);
  };

  const handleClear = () => {
    setStack([]);
    setOperation("スタックをクリアしました");
    setTimeout(() => setOperation(""), 2000);
  };

  const resetStack = () => {
    setStack([1, 2, 3]);
    setOperation("スタックをリセットしました");
    setTimeout(() => setOperation(""), 2000);
  };

  return (
    <div className="space-y-6">
      {/* スタックの視覚化 */}
      <div className="p-6 rounded-lg neumorphic-shadow">
        <h3 className="text-lg font-semibold mb-4 text-center">
          スタック（LIFO）の可視化
        </h3>

        <div className="flex flex-col-reverse items-center space-y-reverse space-y-2 min-h-[300px] justify-end">
          {/* 新しい要素が追加される位置の表示 */}
          {animating && (
            <div className="w-20 h-12 border-2 border-dashed rounded-lg flex items-center justify-center animate-pulse neumorphic-shadow-inset">
              <span className="text-sm">追加中...</span>
            </div>
          )}

          {/* スタックの要素 */}
          {stack.map((value, index) => (
            <div
              key={index}
              className={`w-20 h-12 rounded-lg flex items-center justify-center text-lg font-bold transition-all neumorphic-shadow ${
                index === stack.length - 1
                  ? "neumorphic-shadow-inset" // トップ要素
                  : ""
              }`}
            >
              {value}
            </div>
          ))}

          {/* スタックが空の場合 */}
          {stack.length === 0 && !animating && (
            <div className="w-20 h-12 border-2 border-dashed rounded-lg flex items-center justify-center neumorphic-shadow-inset">
              空
            </div>
          )}
        </div>

        {/* スタック情報 */}
        <div className="mt-4 text-center space-y-2">
          <div className="text-sm">
            <span className="font-semibold">サイズ:</span> {stack.length}
            {stack.length > 0 && (
              <>
                <span className="ml-4 font-semibold">トップ:</span>{" "}
                {stack[stack.length - 1]}
              </>
            )}
          </div>
          <div className="text-xs">
            ↑ トップ（最後に追加された要素が最初に取り出される）
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
        {/* Push操作 */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="font-semibold mb-3 text-green-700">
            📥 Push（プッシュ）
          </h4>
          <div className="space-y-2">
            <Input
              type="number"
              placeholder="追加する値"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handlePush()}
            />
            <Button
              onClick={handlePush}
              className="w-full bg-green-600 hover:bg-green-700"
              disabled={animating}
            >
              Push
            </Button>
          </div>
        </div>

        {/* Pop & Peek操作 */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="font-semibold mb-3 text-red-700">📤 Pop & Peek</h4>
          <div className="space-y-2">
            <Button
              onClick={handlePop}
              className="w-full bg-red-600 hover:bg-red-700"
              disabled={animating}
            >
              Pop（取り出し）
            </Button>
            <Button
              onClick={handlePeek}
              variant="outline"
              className="w-full"
              disabled={animating}
            >
              Peek（参照）
            </Button>
          </div>
        </div>
      </div>

      {/* 操作説明 */}
      <div className="p-4 rounded-lg neumorphic-shadow">
        <h4 className="font-semibold mb-2">
          💡 スタックの特徴
        </h4>
        <ul className="text-sm space-y-1">
          <li>
            • <strong>LIFO（Last In, First Out）</strong>:
            最後に入れたものが最初に出る
          </li>
          <li>
            • <strong>Push</strong>: スタックの上に要素を追加（O(1)）
          </li>
          <li>
            • <strong>Pop</strong>: スタックの上から要素を取り出し（O(1)）
          </li>
          <li>
            • <strong>Peek</strong>: スタックの上の要素を参照（取り出さない）
          </li>
          <li>
            • <strong>使用例</strong>: 関数の呼び出し、undo機能、式の評価など
          </li>
        </ul>
      </div>

      {/* リセットとクリア */}
      <div className="flex gap-2 justify-center">
        <Button onClick={resetStack} variant="outline">
          🔄 リセット
        </Button>
        <Button onClick={handleClear} variant="destructive">
          🗑️ クリア
        </Button>
      </div>
    </div>
  );
};

export default StackVisualizer;
