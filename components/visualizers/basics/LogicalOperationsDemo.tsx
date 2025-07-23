"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

interface LogicalOperation {
  name: string;
  symbol: string;
  func: (a: boolean, b: boolean) => boolean;
  description: string;
}

const LogicalOperationsDemo: React.FC = () => {
  const [inputA, setInputA] = useState<boolean>(true);
  const [inputB, setInputB] = useState<boolean>(false);
  const [selectedOperation, setSelectedOperation] = useState<string>("AND");
  const [showTruthTable, setShowTruthTable] = useState<boolean>(false);

  const operations: LogicalOperation[] = [
    {
      name: "AND",
      symbol: "∧",
      func: (a, b) => a && b,
      description: "両方が真の時のみ真",
    },
    {
      name: "OR",
      symbol: "∨",
      func: (a, b) => a || b,
      description: "どちらかが真なら真",
    },
    {
      name: "XOR",
      symbol: "⊕",
      func: (a, b) => (a || b) && !(a && b),
      description: "どちらか一方だけが真の時に真",
    },
    {
      name: "NAND",
      symbol: "↑",
      func: (a, b) => !(a && b),
      description: "ANDの否定",
    },
    {
      name: "NOR",
      symbol: "↓",
      func: (a, b) => !(a || b),
      description: "ORの否定",
    },
  ];

  const currentOp = operations.find((op) => op.name === selectedOperation)!;
  const result = currentOp.func(inputA, inputB);

  // 真理値表の生成
  const generateTruthTable = (operation: LogicalOperation) => {
    const inputs = [
      [false, false],
      [false, true],
      [true, false],
      [true, true],
    ];

    return inputs.map(([a, b]) => ({
      a,
      b,
      result: operation.func(a, b),
    }));
  };

  // NOT演算（単項演算）
  const notA = !inputA;
  const notB = !inputB;

  return (
    <div className="p-6 bg-white rounded-lg border">
      <h3 className="text-xl font-bold mb-4 text-center">
        論理演算シミュレータ
      </h3>

      {/* 入力選択 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-blue-50 p-4 rounded-lg">
          <h4 className="font-semibold text-blue-800 mb-3">入力値</h4>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-medium">入力A:</span>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant={inputA ? "default" : "outline"}
                  onClick={() => setInputA(true)}
                  className={inputA ? "bg-green-500 hover:bg-green-600" : ""}
                >
                  TRUE
                </Button>
                <Button
                  size="sm"
                  variant={!inputA ? "default" : "outline"}
                  onClick={() => setInputA(false)}
                  className={!inputA ? "bg-red-500 hover:bg-red-600" : ""}
                >
                  FALSE
                </Button>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-medium">入力B:</span>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant={inputB ? "default" : "outline"}
                  onClick={() => setInputB(true)}
                  className={inputB ? "bg-green-500 hover:bg-green-600" : ""}
                >
                  TRUE
                </Button>
                <Button
                  size="sm"
                  variant={!inputB ? "default" : "outline"}
                  onClick={() => setInputB(false)}
                  className={!inputB ? "bg-red-500 hover:bg-red-600" : ""}
                >
                  FALSE
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-green-50 p-4 rounded-lg">
          <h4 className="font-semibold text-green-800 mb-3">演算選択</h4>
          <div className="grid grid-cols-2 gap-2">
            {operations.map((op) => (
              <Button
                key={op.name}
                size="sm"
                variant={selectedOperation === op.name ? "default" : "outline"}
                onClick={() => setSelectedOperation(op.name)}
                className="text-xs"
              >
                {op.name} ({op.symbol})
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* 視覚的な論理ゲート表現 */}
      <div className="bg-gray-50 p-6 rounded-lg mb-6">
        <h4 className="font-semibold text-gray-800 mb-4 text-center">
          論理ゲート
        </h4>
        <div className="flex items-center justify-center">
          <div className="flex items-center space-x-4">
            {/* 入力A */}
            <div className="text-center">
              <div
                className={`w-16 h-8 rounded-lg flex items-center justify-center text-white font-bold ${
                  inputA ? "bg-green-500" : "bg-red-500"
                }`}
              >
                A: {inputA ? "1" : "0"}
              </div>
            </div>

            {/* 演算子 */}
            <div className="text-center">
              <div className="w-20 h-12 bg-blue-100 border-2 border-blue-400 rounded-lg flex items-center justify-center">
                <span className="font-bold text-blue-800">
                  {currentOp.symbol}
                </span>
              </div>
              <div className="text-xs text-blue-600 mt-1">{currentOp.name}</div>
            </div>

            {/* 入力B */}
            <div className="text-center">
              <div
                className={`w-16 h-8 rounded-lg flex items-center justify-center text-white font-bold ${
                  inputB ? "bg-green-500" : "bg-red-500"
                }`}
              >
                B: {inputB ? "1" : "0"}
              </div>
            </div>

            {/* 矢印 */}
            <div className="text-2xl text-gray-400">→</div>

            {/* 結果 */}
            <div className="text-center">
              <div
                className={`w-20 h-12 rounded-lg flex items-center justify-center text-white font-bold text-lg ${
                  result ? "bg-green-600" : "bg-red-600"
                }`}
              >
                {result ? "1" : "0"}
              </div>
              <div className="text-xs text-gray-600 mt-1">結果</div>
            </div>
          </div>
        </div>

        {/* 数式表現 */}
        <div className="text-center mt-4 p-3 bg-white rounded border">
          <span className="font-mono text-lg">
            {inputA ? "TRUE" : "FALSE"} {currentOp.symbol}{" "}
            {inputB ? "TRUE" : "FALSE"} = {result ? "TRUE" : "FALSE"}
          </span>
        </div>
      </div>

      {/* NOT演算（単項演算） */}
      <div className="bg-purple-50 p-4 rounded-lg mb-6">
        <h4 className="font-semibold text-purple-800 mb-3">NOT演算（否定）</h4>
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center">
            <div className="mb-2">NOT A</div>
            <div
              className={`w-16 h-8 mx-auto rounded-lg flex items-center justify-center text-white font-bold ${
                notA ? "bg-green-500" : "bg-red-500"
              }`}
            >
              {notA ? "1" : "0"}
            </div>
          </div>
          <div className="text-center">
            <div className="mb-2">NOT B</div>
            <div
              className={`w-16 h-8 mx-auto rounded-lg flex items-center justify-center text-white font-bold ${
                notB ? "bg-green-500" : "bg-red-500"
              }`}
            >
              {notB ? "1" : "0"}
            </div>
          </div>
        </div>
      </div>

      {/* 真理値表 */}
      <div className="text-center mb-4">
        <Button
          onClick={() => setShowTruthTable(!showTruthTable)}
          variant="outline"
        >
          {showTruthTable ? "真理値表を隠す" : "真理値表を表示"}
        </Button>
      </div>

      {showTruthTable && (
        <div className="bg-indigo-50 p-4 rounded-lg">
          <h4 className="font-semibold text-indigo-800 mb-3">
            {currentOp.name}の真理値表
          </h4>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-indigo-100">
                  <th className="p-2 border">A</th>
                  <th className="p-2 border">B</th>
                  <th className="p-2 border">A {currentOp.symbol} B</th>
                </tr>
              </thead>
              <tbody>
                {generateTruthTable(currentOp).map((row, index) => (
                  <tr
                    key={index}
                    className={
                      inputA === row.a && inputB === row.b
                        ? "bg-yellow-100 font-bold"
                        : "bg-white"
                    }
                  >
                    <td className="p-2 border text-center">
                      {row.a ? "TRUE" : "FALSE"}
                    </td>
                    <td className="p-2 border text-center">
                      {row.b ? "TRUE" : "FALSE"}
                    </td>
                    <td
                      className={`p-2 border text-center font-bold ${
                        row.result ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {row.result ? "TRUE" : "FALSE"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-2 text-xs text-indigo-600">
            {currentOp.description}
          </div>
        </div>
      )}

      {/* 説明 */}
      <div className="mt-4 p-4 bg-yellow-50 rounded-lg">
        <h4 className="font-semibold text-yellow-800 mb-2">日常生活での例</h4>
        <div className="text-sm text-yellow-700 space-y-2">
          <div>
            <strong>AND:</strong> 「雨が降っている AND 傘を持っている」→
            外出する
          </div>
          <div>
            <strong>OR:</strong> 「現金がある OR クレジットカードがある」→
            買い物できる
          </div>
          <div>
            <strong>NOT:</strong> 「NOT 忙しい」→ 映画を見る
          </div>
          <div>
            <strong>XOR:</strong> 「コーヒー XOR 紅茶」→ どちらか一つだけ選ぶ
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogicalOperationsDemo;
