"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

interface ComplexityFunction {
  name: string;
  color: string;
  formula: string;
  calculate: (n: number) => number;
  description: string;
}

const complexityFunctions: ComplexityFunction[] = [
  {
    name: "O(1)",
    color: "#10B981", // green
    formula: "f(n) = 1",
    calculate: (n) => 1,
    description: "定数時間：入力サイズに関係なく一定",
  },
  {
    name: "O(log n)",
    color: "#3B82F6", // blue
    formula: "f(n) = log₂(n)",
    calculate: (n) => Math.log2(Math.max(n, 1)),
    description: "対数時間：効率的な探索アルゴリズム",
  },
  {
    name: "O(n)",
    color: "#F59E0B", // amber
    formula: "f(n) = n",
    calculate: (n) => n,
    description: "線形時間：入力サイズに比例",
  },
  {
    name: "O(n log n)",
    color: "#8B5CF6", // violet
    formula: "f(n) = n × log₂(n)",
    calculate: (n) => n * Math.log2(Math.max(n, 1)),
    description: "線形対数時間：効率的なソートアルゴリズム",
  },
  {
    name: "O(n²)",
    color: "#EF4444", // red
    formula: "f(n) = n²",
    calculate: (n) => n * n,
    description: "二次時間：入力サイズの二乗に比例",
  },
  {
    name: "O(2ⁿ)",
    color: "#DC2626", // dark red
    formula: "f(n) = 2ⁿ",
    calculate: (n) => Math.pow(2, Math.min(n, 20)), // 制限して表示
    description: "指数時間：非常に非効率（小さなnでも爆発的増加）",
  },
];

export default function ComplexityDemo() {
  const [inputSize, setInputSize] = useState(10);
  const [selectedFunctions, setSelectedFunctions] = useState<string[]>([
    "O(1)",
    "O(log n)",
    "O(n)",
    "O(n²)",
  ]);
  const [animationStep, setAnimationStep] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const maxValue = Math.max(
    ...complexityFunctions
      .filter((f) => selectedFunctions.includes(f.name))
      .map((f) => f.calculate(inputSize))
  );

  const startAnimation = () => {
    setIsAnimating(true);
    setAnimationStep(0);
    const interval = setInterval(() => {
      setAnimationStep((prev) => {
        if (prev >= inputSize) {
          clearInterval(interval);
          setIsAnimating(false);
          return prev;
        }
        return prev + 1;
      });
    }, 200);
  };

  const toggleFunction = (functionName: string) => {
    setSelectedFunctions((prev) =>
      prev.includes(functionName)
        ? prev.filter((name) => name !== functionName)
        : [...prev, functionName]
    );
  };

  const getBarHeight = (value: number) => {
    return Math.max((value / maxValue) * 300, 2); // 最小2px
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-6 bg-white border rounded-lg shadow">
      <div className="mb-6">
        <h3 className="text-xl font-bold mb-4">計算量の比較デモ</h3>
        <p className="text-gray-600 mb-4">
          異なる計算量のアルゴリズムが、入力サイズの増加に対してどのように実行時間が変化するかを視覚的に確認できます。
        </p>
      </div>

      {/* 入力サイズ制御 */}
      <div className="mb-6">
        <label className="block text-sm font-medium mb-2">
          入力サイズ（n）: {inputSize}
        </label>
        <input
          type="range"
          min="1"
          max="50"
          value={inputSize}
          onChange={(e) => setInputSize(Number(e.target.value))}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
        />
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>1</span>
          <span>25</span>
          <span>50</span>
        </div>
      </div>

      {/* 関数選択 */}
      <div className="mb-6">
        <h4 className="text-lg font-semibold mb-3">表示する計算量</h4>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {complexityFunctions.map((func) => (
            <label
              key={func.name}
              className="flex items-center space-x-2 cursor-pointer"
            >
              <input
                type="checkbox"
                checked={selectedFunctions.includes(func.name)}
                onChange={() => toggleFunction(func.name)}
                className="w-4 h-4"
              />
              <div
                className="w-4 h-4 rounded"
                style={{ backgroundColor: func.color }}
              />
              <span className="text-sm font-medium">{func.name}</span>
            </label>
          ))}
        </div>
      </div>

      {/* グラフ表示 */}
      <div className="mb-6">
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex items-end justify-center space-x-8 h-80">
            {complexityFunctions
              .filter((func) => selectedFunctions.includes(func.name))
              .map((func) => {
                const value = func.calculate(animationStep || inputSize);
                const height = getBarHeight(value);
                return (
                  <div key={func.name} className="flex flex-col items-center">
                    <div className="text-xs text-gray-600 mb-2 min-h-[3rem] flex flex-col justify-end">
                      <div className="font-bold">{func.name}</div>
                      <div className="text-center">
                        {value > 1000000
                          ? `${(value / 1000000).toFixed(1)}M`
                          : value > 1000
                          ? `${(value / 1000).toFixed(1)}K`
                          : Math.round(value * 100) / 100}
                      </div>
                    </div>
                    <div
                      className="w-12 transition-all duration-300 ease-out"
                      style={{
                        height: `${height}px`,
                        backgroundColor: func.color,
                        borderRadius: "4px 4px 0 0",
                      }}
                    />
                    <div className="text-xs text-gray-500 mt-1 text-center">
                      {func.name}
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>

      {/* アニメーション制御 */}
      <div className="mb-6 text-center">
        <Button
          onClick={startAnimation}
          disabled={isAnimating}
          className="mr-4"
        >
          {isAnimating ? "アニメーション中..." : "ステップアニメーション開始"}
        </Button>
        {isAnimating && (
          <span className="text-sm text-gray-600">
            現在の入力サイズ: {animationStep}
          </span>
        )}
      </div>

      {/* 実行時間の表 */}
      <div className="mb-6">
        <h4 className="text-lg font-semibold mb-3">実行時間の比較表</h4>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-4 py-2">計算量</th>
                <th className="border border-gray-300 px-4 py-2">n=10</th>
                <th className="border border-gray-300 px-4 py-2">n=100</th>
                <th className="border border-gray-300 px-4 py-2">n=1000</th>
                <th className="border border-gray-300 px-4 py-2">説明</th>
              </tr>
            </thead>
            <tbody>
              {complexityFunctions.map((func) => (
                <tr
                  key={func.name}
                  className={
                    selectedFunctions.includes(func.name) ? "bg-blue-50" : ""
                  }
                >
                  <td className="border border-gray-300 px-4 py-2 font-medium">
                    <span
                      className="inline-block w-3 h-3 rounded mr-2"
                      style={{ backgroundColor: func.color }}
                    />
                    {func.name}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    {Math.round(func.calculate(10))}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    {func.calculate(100) > 1000000
                      ? `${(func.calculate(100) / 1000000).toFixed(1)}M`
                      : func.calculate(100) > 1000
                      ? `${(func.calculate(100) / 1000).toFixed(1)}K`
                      : Math.round(func.calculate(100))}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    {func.calculate(1000) > 1000000000
                      ? `${(func.calculate(1000) / 1000000000).toFixed(1)}B`
                      : func.calculate(1000) > 1000000
                      ? `${(func.calculate(1000) / 1000000).toFixed(1)}M`
                      : func.calculate(1000) > 1000
                      ? `${(func.calculate(1000) / 1000).toFixed(1)}K`
                      : Math.round(func.calculate(1000))}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-sm">
                    {func.description}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 実用例 */}
      <div className="bg-blue-50 p-4 rounded-lg">
        <h4 className="text-lg font-semibold mb-3">実用例</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <h5 className="font-medium text-green-700 mb-1">
              効率的なアルゴリズム
            </h5>
            <ul className="space-y-1 text-gray-700">
              <li>
                • <strong>O(1)</strong>:
                配列の要素アクセス、ハッシュテーブル検索
              </li>
              <li>
                • <strong>O(log n)</strong>: 二分探索、平衡二分木の操作
              </li>
              <li>
                • <strong>O(n)</strong>: 配列の全走査、線形探索
              </li>
              <li>
                • <strong>O(n log n)</strong>: マージソート、クイックソート
              </li>
            </ul>
          </div>
          <div>
            <h5 className="font-medium text-red-700 mb-1">
              避けるべきアルゴリズム
            </h5>
            <ul className="space-y-1 text-gray-700">
              <li>
                • <strong>O(n²)</strong>: バブルソート、選択ソート
              </li>
              <li>
                • <strong>O(2ⁿ)</strong>: 全組み合わせ探索、ナイーブな再帰
              </li>
              <li>
                • <strong>O(n!)</strong>: 全順列探索、巡回セールスマン問題
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
