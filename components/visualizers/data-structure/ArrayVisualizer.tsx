"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface ArrayVisualizerProps {}

const ArrayVisualizer: React.FC<ArrayVisualizerProps> = () => {
  const [array, setArray] = useState<number[]>([1, 3, 5, 7, 9]);
  const [inputValue, setInputValue] = useState<string>("");
  const [insertIndex, setInsertIndex] = useState<string>("");
  const [highlightIndex, setHighlightIndex] = useState<number | null>(null);
  const [operation, setOperation] = useState<string>("");
  const [operationType, setOperationType] = useState<"insert" | "overwrite">(
    "insert"
  );

  const handleInsert = () => {
    const value = parseInt(inputValue);
    const index = parseInt(insertIndex);

    if (isNaN(value)) return;

    if (operationType === "overwrite") {
      // 上書き操作
      if (isNaN(index) || index < 0 || index >= array.length) {
        setOperation(
          `無効なインデックスです。0〜${
            array.length - 1
          }の範囲で指定してください`
        );
        setTimeout(() => setOperation(""), 3000);
        return;
      }

      const newArray = [...array];
      const oldValue = newArray[index];
      newArray[index] = value;
      setArray(newArray);
      setOperation(
        `インデックス ${index} の要素 ${oldValue} を ${value} で上書きしました`
      );
    } else {
      // 挿入操作（既存の実装）
      if (isNaN(index) || index < 0 || index > array.length) {
        // 末尾に追加
        setArray([...array, value]);
        setOperation(`要素 ${value} を末尾に追加しました`);
      } else {
        // 指定位置に挿入
        const newArray = [...array];
        newArray.splice(index, 0, value);
        setArray(newArray);
        setOperation(
          `要素 ${value} をインデックス ${index} に挿入しました（既存要素は右にシフト）`
        );
      }
    }

    setInputValue("");
    setInsertIndex("");
    setTimeout(() => setOperation(""), 3000);
  };

  const handleDelete = (index: number) => {
    const deletedValue = array[index];
    const newArray = array.filter((_, i) => i !== index);
    setArray(newArray);
    setOperation(`インデックス ${index} の要素 ${deletedValue} を削除しました`);
    setTimeout(() => setOperation(""), 3000);
  };

  const handleAccess = (index: number) => {
    setHighlightIndex(index);
    setOperation(
      `インデックス ${index} の要素 ${array[index]} にアクセスしました（O(1)）`
    );
    setTimeout(() => {
      setHighlightIndex(null);
      setOperation("");
    }, 2000);
  };

  const handleSearch = () => {
    const value = parseInt(inputValue);
    if (isNaN(value)) return;

    const index = array.indexOf(value);
    if (index !== -1) {
      setHighlightIndex(index);
      setOperation(
        `要素 ${value} をインデックス ${index} で発見しました（線形探索: O(n)）`
      );
    } else {
      setOperation(`要素 ${value} は配列に存在しません`);
    }

    setInputValue("");
    setTimeout(() => {
      setHighlightIndex(null);
      setOperation("");
    }, 3000);
  };

  const resetArray = () => {
    setArray([1, 3, 5, 7, 9]);
    setHighlightIndex(null);
    setOperation("配列をリセットしました");
    setTimeout(() => setOperation(""), 2000);
  };

  return (
    <div className="space-y-6">
      {/* 配列の視覚化 */}
      <div className="bg-white p-6 rounded-lg border">
        <h3 className="text-lg font-semibold mb-4 text-center">配列の可視化</h3>

        <div className="flex flex-wrap justify-center gap-2 mb-4">
          {array.map((value, index) => (
            <div key={index} className="relative">
              <div
                className={`w-16 h-16 border-2 rounded-lg flex items-center justify-center text-lg font-bold cursor-pointer transition-all ${
                  highlightIndex === index
                    ? "bg-blue-200 border-blue-500 shadow-lg scale-110"
                    : "bg-gray-50 border-gray-300 hover:bg-gray-100"
                }`}
                onClick={() => handleAccess(index)}
              >
                {value}
              </div>
              <div className="text-xs text-center mt-1 text-gray-500">
                [{index}]
              </div>
            </div>
          ))}
        </div>

        {/* 操作結果表示 */}
        {operation && (
          <div className="bg-blue-50 border border-blue-200 rounded p-3 text-blue-800 text-center">
            {operation}
          </div>
        )}
      </div>

      {/* コントロールパネル */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* 挿入操作 */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="font-semibold mb-3 text-green-700">
            📥 要素の{operationType === "insert" ? "挿入" : "代入"}
          </h4>

          {/* 操作モード選択 */}
          <div className="mb-4 p-3 bg-white rounded border">
            <p className="text-sm font-medium mb-2">操作モード:</p>
            <div className="flex gap-2">
              <Button
                variant={operationType === "insert" ? "default" : "outline"}
                size="sm"
                onClick={() => setOperationType("insert")}
                className={
                  operationType === "insert"
                    ? "bg-green-600 hover:bg-green-700"
                    : ""
                }
              >
                挿入
              </Button>
              <Button
                variant={operationType === "overwrite" ? "default" : "outline"}
                size="sm"
                onClick={() => setOperationType("overwrite")}
                className={
                  operationType === "overwrite"
                    ? "bg-orange-600 hover:bg-orange-700"
                    : ""
                }
              >
                代入
              </Button>
            </div>
            <p className="text-xs text-gray-600 mt-2">
              {operationType === "insert"
                ? "既存要素を右にシフトして新しい要素を挿入"
                : "指定位置の要素を新しい値で置き換え"}
            </p>
          </div>

          <div className="space-y-2">
            <Input
              type="number"
              placeholder={
                operationType === "insert" ? "挿入する値" : "新しい値"
              }
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
            <Input
              type="number"
              placeholder={
                operationType === "insert"
                  ? "挿入位置（省略で末尾）"
                  : `上書き位置 (0〜${array.length - 1})`
              }
              value={insertIndex}
              onChange={(e) => setInsertIndex(e.target.value)}
            />
            <Button
              onClick={handleInsert}
              className={`w-full ${
                operationType === "insert"
                  ? "bg-green-600 hover:bg-green-700"
                  : "bg-orange-600 hover:bg-orange-700"
              }`}
            >
              {operationType === "insert" ? "🔄 挿入" : "✏️ 上書き"}
            </Button>
          </div>
        </div>

        {/* 検索操作 */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="font-semibold mb-3 text-blue-700">🔍 要素の検索</h4>
          <div className="space-y-2">
            <Input
              type="number"
              placeholder="検索する値"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
            <Button
              onClick={handleSearch}
              className="w-full bg-blue-600 hover:bg-blue-700"
            >
              検索
            </Button>
          </div>
        </div>
      </div>

      {/* 操作説明 */}
      <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
        <h4 className="font-semibold mb-2 text-yellow-800">💡 操作方法</h4>
        <ul className="text-sm text-yellow-700 space-y-1">
          <li>
            • <strong>要素をクリック</strong>:
            インデックスアクセス（O(1)）を体験
          </li>
          <li>
            • <strong>挿入</strong>: 値と位置を指定して要素を追加
          </li>
          <li>
            • <strong>検索</strong>: 値を入力して線形探索を実行
          </li>
          <li>
            • <strong>削除</strong>: 要素を右クリックまたは下のボタンで削除
          </li>
        </ul>
      </div>

      {/* 削除とリセット */}
      <div className="flex gap-2 justify-center">
        <Button onClick={resetArray} variant="outline">
          🔄 リセット
        </Button>
        {array.map((_, index) => (
          <Button
            key={index}
            onClick={() => handleDelete(index)}
            variant="destructive"
            size="sm"
          >
            削除[{index}]
          </Button>
        ))}
      </div>
    </div>
  );
};

export default ArrayVisualizer;
