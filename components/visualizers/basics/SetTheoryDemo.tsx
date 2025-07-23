"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// interface SetOperationResult {
//   name: string;
//   symbol: string;
//   result: string[];
//   description: string;
// }

const SetTheoryDemo: React.FC = () => {
  const [setA, setSetA] = useState<string[]>(["1", "2", "3", "4", "5"]);
  const [setB, setSetB] = useState<string[]>(["4", "5", "6", "7", "8"]);
  const [inputA, setInputA] = useState<string>("");
  const [inputB, setInputB] = useState<string>("");
  const [selectedOperation, setSelectedOperation] = useState<string>("union");
  const [showVennDiagram, setShowVennDiagram] = useState<boolean>(true);

  // 集合演算の実装
  const operations = {
    union: {
      name: "和集合",
      symbol: "∪",
      func: (a: string[], b: string[]) => Array.from(new Set([...a, ...b])),
      description: "AまたはBに含まれる要素",
    },
    intersection: {
      name: "積集合",
      symbol: "∩",
      func: (a: string[], b: string[]) => a.filter((x) => b.includes(x)),
      description: "AかつBに含まれる要素",
    },
    difference: {
      name: "差集合",
      symbol: "−",
      func: (a: string[], b: string[]) => a.filter((x) => !b.includes(x)),
      description: "AにあるがBにない要素",
    },
    symmetricDifference: {
      name: "対称差",
      symbol: "⊕",
      func: (a: string[], b: string[]) => {
        const aOnly = a.filter((x) => !b.includes(x));
        const bOnly = b.filter((x) => !a.includes(x));
        return [...aOnly, ...bOnly];
      },
      description: "どちらか一方にのみ含まれる要素",
    },
  };

  const currentOp = operations[selectedOperation as keyof typeof operations];
  const result = currentOp.func(setA, setB);

  // ベン図の要素分類
  const aOnly = setA.filter((x) => !setB.includes(x));
  const bOnly = setB.filter((x) => !setA.includes(x));
  const both = setA.filter((x) => setB.includes(x));

  // 要素追加
  const addToSetA = () => {
    if (inputA && !setA.includes(inputA)) {
      setSetA([...setA, inputA]);
      setInputA("");
    }
  };

  const addToSetB = () => {
    if (inputB && !setB.includes(inputB)) {
      setSetB([...setB, inputB]);
      setInputB("");
    }
  };

  // 要素削除
  const removeFromSetA = (element: string) => {
    setSetA(setA.filter((x) => x !== element));
  };

  const removeFromSetB = (element: string) => {
    setSetB(setB.filter((x) => x !== element));
  };

  // 部分集合関係のチェック
  const isASubsetOfB = setA.every((x) => setB.includes(x));
  const isBSubsetOfA = setB.every((x) => setA.includes(x));

  return (
    <div className="p-6 bg-white rounded-lg border">
      <h3 className="text-xl font-bold mb-4 text-center">
        集合演算ビジュアライザー
      </h3>

      {/* 集合の編集 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* 集合A */}
        <div className="bg-blue-50 p-4 rounded-lg">
          <h4 className="font-semibold text-blue-800 mb-3">集合A</h4>
          <div className="flex gap-2 mb-3">
            <Input
              value={inputA}
              onChange={(e) => setInputA(e.target.value)}
              placeholder="要素を追加"
              onKeyPress={(e) => e.key === "Enter" && addToSetA()}
            />
            <Button onClick={addToSetA} size="sm">
              追加
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {setA.map((element, index) => (
              <div
                key={index}
                className="bg-blue-200 px-3 py-1 rounded-full flex items-center gap-2"
              >
                <span className="font-medium">{element}</span>
                <button
                  onClick={() => removeFromSetA(element)}
                  className="text-blue-800 hover:text-blue-900 font-bold"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
          <div className="mt-2 text-sm text-blue-600">
            要素数: {setA.length}
          </div>
        </div>

        {/* 集合B */}
        <div className="bg-red-50 p-4 rounded-lg">
          <h4 className="font-semibold text-red-800 mb-3">集合B</h4>
          <div className="flex gap-2 mb-3">
            <Input
              value={inputB}
              onChange={(e) => setInputB(e.target.value)}
              placeholder="要素を追加"
              onKeyPress={(e) => e.key === "Enter" && addToSetB()}
            />
            <Button onClick={addToSetB} size="sm">
              追加
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {setB.map((element, index) => (
              <div
                key={index}
                className="bg-red-200 px-3 py-1 rounded-full flex items-center gap-2"
              >
                <span className="font-medium">{element}</span>
                <button
                  onClick={() => removeFromSetB(element)}
                  className="text-red-800 hover:text-red-900 font-bold"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
          <div className="mt-2 text-sm text-red-600">要素数: {setB.length}</div>
        </div>
      </div>

      {/* 演算選択 */}
      <div className="bg-gray-50 p-4 rounded-lg mb-6">
        <h4 className="font-semibold text-gray-800 mb-3">集合演算を選択</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {Object.entries(operations).map(([key, op]) => (
            <Button
              key={key}
              variant={selectedOperation === key ? "default" : "outline"}
              onClick={() => setSelectedOperation(key)}
              className="text-sm"
            >
              {op.name} ({op.symbol})
            </Button>
          ))}
        </div>
      </div>

      {/* ベン図表示切り替え */}
      <div className="text-center mb-4">
        <Button
          onClick={() => setShowVennDiagram(!showVennDiagram)}
          variant="outline"
        >
          {showVennDiagram ? "ベン図を隠す" : "ベン図を表示"}
        </Button>
      </div>

      {/* ベン図 */}
      {showVennDiagram && (
        <div className="bg-gray-50 p-6 rounded-lg mb-6">
          <h4 className="font-semibold text-gray-800 mb-4 text-center">
            ベン図
          </h4>
          <div
            className="relative mx-auto"
            style={{ width: "400px", height: "300px" }}
          >
            {/* SVGベン図 */}
            <svg width="400" height="300" className="absolute inset-0">
              {/* 集合A（左の円） */}
              <circle
                cx="150"
                cy="150"
                r="80"
                fill="rgba(59, 130, 246, 0.3)"
                stroke="rgb(59, 130, 246)"
                strokeWidth="2"
              />

              {/* 集合B（右の円） */}
              <circle
                cx="250"
                cy="150"
                r="80"
                fill="rgba(239, 68, 68, 0.3)"
                stroke="rgb(239, 68, 68)"
                strokeWidth="2"
              />

              {/* ラベル */}
              <text
                x="120"
                y="100"
                textAnchor="middle"
                className="font-bold text-blue-600"
              >
                A
              </text>
              <text
                x="280"
                y="100"
                textAnchor="middle"
                className="font-bold text-red-600"
              >
                B
              </text>
            </svg>

            {/* 要素の配置 */}
            <div className="absolute inset-0">
              {/* A のみの要素 */}
              {aOnly.map((element, index) => (
                <div
                  key={`a-${index}`}
                  className="absolute bg-blue-500 text-white px-2 py-1 rounded text-sm font-medium"
                  style={{
                    left: `${100 + (index % 3) * 20}px`,
                    top: `${130 + Math.floor(index / 3) * 25}px`,
                  }}
                >
                  {element}
                </div>
              ))}

              {/* B のみの要素 */}
              {bOnly.map((element, index) => (
                <div
                  key={`b-${index}`}
                  className="absolute bg-red-500 text-white px-2 py-1 rounded text-sm font-medium"
                  style={{
                    left: `${270 + (index % 3) * 20}px`,
                    top: `${130 + Math.floor(index / 3) * 25}px`,
                  }}
                >
                  {element}
                </div>
              ))}

              {/* 共通要素 */}
              {both.map((element, index) => (
                <div
                  key={`both-${index}`}
                  className="absolute bg-purple-500 text-white px-2 py-1 rounded text-sm font-medium"
                  style={{
                    left: `${190 + (index % 2) * 20}px`,
                    top: `${130 + Math.floor(index / 2) * 25}px`,
                  }}
                >
                  {element}
                </div>
              ))}
            </div>
          </div>

          {/* ベン図の説明 */}
          <div className="grid grid-cols-3 gap-4 mt-4 text-sm">
            <div className="text-center">
              <div className="bg-blue-500 text-white px-3 py-1 rounded mb-2 inline-block">
                Aのみ
              </div>
              <div>{aOnly.length > 0 ? `{${aOnly.join(", ")}}` : "∅"}</div>
            </div>
            <div className="text-center">
              <div className="bg-purple-500 text-white px-3 py-1 rounded mb-2 inline-block">
                A ∩ B
              </div>
              <div>{both.length > 0 ? `{${both.join(", ")}}` : "∅"}</div>
            </div>
            <div className="text-center">
              <div className="bg-red-500 text-white px-3 py-1 rounded mb-2 inline-block">
                Bのみ
              </div>
              <div>{bOnly.length > 0 ? `{${bOnly.join(", ")}}` : "∅"}</div>
            </div>
          </div>
        </div>
      )}

      {/* 演算結果 */}
      <div className="bg-green-50 p-4 rounded-lg mb-6">
        <h4 className="font-semibold text-green-800 mb-3">
          演算結果: A {currentOp.symbol} B
        </h4>
        <div className="bg-white p-4 rounded border">
          <div className="text-lg font-mono mb-2">
            {`{${setA.join(", ")}} ${currentOp.symbol} {${setB.join(
              ", "
            )}} = {${result.join(", ")}}`}
          </div>
          <div className="text-sm text-green-700">{currentOp.description}</div>
          <div className="mt-2 text-sm text-gray-600">
            結果の要素数: {result.length}
          </div>
        </div>
      </div>

      {/* 部分集合関係 */}
      <div className="bg-purple-50 p-4 rounded-lg mb-6">
        <h4 className="font-semibold text-purple-800 mb-3">集合の関係</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div
            className={`p-3 rounded ${
              isASubsetOfB
                ? "bg-green-100 text-green-800"
                : "bg-gray-100 text-gray-600"
            }`}
          >
            <div className="font-medium">A ⊆ B (AはBの部分集合)</div>
            <div className="text-xs mt-1">
              {isASubsetOfB ? "成立" : "成立しない"}
            </div>
          </div>
          <div
            className={`p-3 rounded ${
              isBSubsetOfA
                ? "bg-green-100 text-green-800"
                : "bg-gray-100 text-gray-600"
            }`}
          >
            <div className="font-medium">B ⊆ A (BはAの部分集合)</div>
            <div className="text-xs mt-1">
              {isBSubsetOfA ? "成立" : "成立しない"}
            </div>
          </div>
        </div>
      </div>

      {/* プリセット例 */}
      <div className="bg-yellow-50 p-4 rounded-lg">
        <h4 className="font-semibold text-yellow-800 mb-3">実用例</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Button
            variant="outline"
            onClick={() => {
              setSetA(["数学", "物理", "化学"]);
              setSetB(["数学", "プログラミング", "英語"]);
            }}
            className="text-sm"
          >
            履修科目の例
          </Button>
          <Button
            variant="outline"
            onClick={() => {
              setSetA(["犬", "猫", "鳥"]);
              setSetB(["猫", "魚", "ハムスター"]);
            }}
            className="text-sm"
          >
            ペットの例
          </Button>
          <Button
            variant="outline"
            onClick={() => {
              setSetA(["JavaScript", "Python", "Java"]);
              setSetB(["Python", "C++", "Go"]);
            }}
            className="text-sm"
          >
            プログラミング言語の例
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SetTheoryDemo;
