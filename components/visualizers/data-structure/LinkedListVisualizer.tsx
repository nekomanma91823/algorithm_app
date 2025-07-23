"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Node {
  value: number;
  next: Node | null;
}

interface LinkedListVisualizerProps {}

const LinkedListVisualizer: React.FC<LinkedListVisualizerProps> = () => {
  const [list, setList] = useState<number[]>([1, 2, 3, 4]);
  const [inputValue, setInputValue] = useState<string>("");
  const [insertIndex, setInsertIndex] = useState<string>("");
  const [operation, setOperation] = useState<string>("");
  const [highlightIndex, setHighlightIndex] = useState<number | null>(null);

  const handleInsertAtHead = () => {
    const value = parseInt(inputValue);
    if (isNaN(value)) return;

    setList([value, ...list]);
    setOperation(`要素 ${value} を先頭に挿入しました（O(1)）`);
    setInputValue("");
    setTimeout(() => setOperation(""), 3000);
  };

  const handleInsertAtTail = () => {
    const value = parseInt(inputValue);
    if (isNaN(value)) return;

    setList([...list, value]);
    setOperation(`要素 ${value} を末尾に挿入しました（O(n)）`);
    setInputValue("");
    setTimeout(() => setOperation(""), 3000);
  };

  const handleInsertAtIndex = () => {
    const value = parseInt(inputValue);
    const index = parseInt(insertIndex);

    if (isNaN(value) || isNaN(index) || index < 0 || index > list.length)
      return;

    const newList = [...list];
    newList.splice(index, 0, value);
    setList(newList);
    setOperation(
      `要素 ${value} をインデックス ${index} に挿入しました（O(n)）`
    );
    setInputValue("");
    setInsertIndex("");
    setTimeout(() => setOperation(""), 3000);
  };

  const handleDeleteAtIndex = (index: number) => {
    const deletedValue = list[index];
    const newList = list.filter((_, i) => i !== index);
    setList(newList);
    setOperation(
      `インデックス ${index} の要素 ${deletedValue} を削除しました（O(n)）`
    );
    setTimeout(() => setOperation(""), 3000);
  };

  const handleSearch = () => {
    const value = parseInt(inputValue);
    if (isNaN(value)) return;

    const index = list.indexOf(value);
    if (index !== -1) {
      setHighlightIndex(index);
      setOperation(
        `要素 ${value} をインデックス ${index} で発見しました（O(n)）`
      );
    } else {
      setOperation(`要素 ${value} はリストに存在しません`);
    }

    setInputValue("");
    setTimeout(() => {
      setHighlightIndex(null);
      setOperation("");
    }, 3000);
  };

  const resetList = () => {
    setList([1, 2, 3, 4]);
    setHighlightIndex(null);
    setOperation("連結リストをリセットしました");
    setTimeout(() => setOperation(""), 2000);
  };

  const handleTraverse = () => {
    setOperation("リストを順次訪問中...");
    list.forEach((_, index) => {
      setTimeout(() => {
        setHighlightIndex(index);
        if (index === list.length - 1) {
          setTimeout(() => {
            setHighlightIndex(null);
            setOperation("リストの走査が完了しました（O(n)）");
            setTimeout(() => setOperation(""), 2000);
          }, 500);
        }
      }, index * 600);
    });
  };

  return (
    <div className="space-y-6">
      {/* 連結リストの視覚化 */}
      <div className="bg-white p-6 rounded-lg border">
        <h3 className="text-lg font-semibold mb-4 text-center">
          連結リストの可視化
        </h3>

        <div className="flex items-center justify-center space-x-2 overflow-x-auto pb-4">
          {/* HEAD ポインタ */}
          <div className="flex flex-col items-center">
            <div className="text-sm font-semibold text-blue-600 mb-1">HEAD</div>
            <div className="w-2 h-8 bg-blue-500 rounded"></div>
          </div>

          <div className="text-blue-500 text-xl">→</div>

          {list.map((value, index) => (
            <React.Fragment key={index}>
              {/* ノード */}
              <div
                className={`relative border-2 rounded-lg p-4 transition-all ${
                  highlightIndex === index
                    ? "bg-yellow-200 border-yellow-500 shadow-lg scale-110"
                    : "bg-gray-50 border-gray-300 hover:bg-gray-100"
                }`}
              >
                {/* ノードの構造 */}
                <div className="flex">
                  {/* データ部分 */}
                  <div className="w-12 h-12 border border-gray-400 rounded-l flex items-center justify-center bg-white font-bold">
                    {value}
                  </div>
                  {/* ポインタ部分 */}
                  <div className="w-8 h-12 border border-gray-400 border-l-0 rounded-r flex items-center justify-center bg-blue-50">
                    <span className="text-blue-600 text-sm">→</span>
                  </div>
                </div>

                {/* インデックス表示 */}
                <div className="text-xs text-center mt-1 text-gray-500">
                  [{index}]
                </div>

                {/* 削除ボタン */}
                <button
                  onClick={() => handleDeleteAtIndex(index)}
                  className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white rounded-full text-xs hover:bg-red-600"
                >
                  ×
                </button>
              </div>

              {/* 矢印（最後の要素以外） */}
              {index < list.length - 1 && (
                <div className="text-blue-500 text-xl">→</div>
              )}
            </React.Fragment>
          ))}

          {/* NULL ポインタ */}
          <div className="flex flex-col items-center">
            <div className="text-sm font-semibold text-gray-500 mb-1">NULL</div>
            <div className="w-8 h-8 border-2 border-gray-400 rounded bg-gray-200 flex items-center justify-center">
              <span className="text-gray-500 text-xs">∅</span>
            </div>
          </div>
        </div>

        {/* リスト情報 */}
        <div className="mt-4 text-center">
          <div className="text-sm text-gray-600">
            <span className="font-semibold">ノード数:</span> {list.length}
            {list.length > 0 && (
              <>
                <span className="ml-4 font-semibold">先頭:</span> {list[0]}
                <span className="ml-4 font-semibold">末尾:</span>{" "}
                {list[list.length - 1]}
              </>
            )}
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
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* 先頭挿入 */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="font-semibold mb-3 text-green-700">📥 先頭に挿入</h4>
          <div className="space-y-2">
            <Input
              type="number"
              placeholder="値"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
            <Button
              onClick={handleInsertAtHead}
              className="w-full bg-green-600 hover:bg-green-700"
              size="sm"
            >
              先頭挿入
            </Button>
          </div>
        </div>

        {/* 任意位置挿入 */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="font-semibold mb-3 text-blue-700">📍 任意位置挿入</h4>
          <div className="space-y-2">
            <Input
              type="number"
              placeholder="値"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
            <Input
              type="number"
              placeholder="位置"
              value={insertIndex}
              onChange={(e) => setInsertIndex(e.target.value)}
            />
            <Button
              onClick={handleInsertAtIndex}
              className="w-full bg-blue-600 hover:bg-blue-700"
              size="sm"
            >
              挿入
            </Button>
          </div>
        </div>

        {/* 末尾挿入 */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="font-semibold mb-3 text-purple-700">📤 末尾に挿入</h4>
          <div className="space-y-2">
            <Input
              type="number"
              placeholder="値"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
            <Button
              onClick={handleInsertAtTail}
              className="w-full bg-purple-600 hover:bg-purple-700"
              size="sm"
            >
              末尾挿入
            </Button>
          </div>
        </div>
      </div>

      {/* 操作ボタン */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="font-semibold mb-3 text-orange-700">🔍 検索</h4>
          <div className="space-y-2">
            <Input
              type="number"
              placeholder="検索する値"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
            <Button onClick={handleSearch} variant="outline" className="w-full">
              検索
            </Button>
          </div>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="font-semibold mb-3 text-indigo-700">🚶 走査</h4>
          <div className="space-y-2">
            <p className="text-sm text-gray-600">リスト全体を順次訪問</p>
            <Button
              onClick={handleTraverse}
              variant="outline"
              className="w-full"
            >
              走査開始
            </Button>
          </div>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="font-semibold mb-3 text-gray-700">🔄 リセット</h4>
          <div className="space-y-2">
            <p className="text-sm text-gray-600">初期状態に戻す</p>
            <Button onClick={resetList} variant="outline" className="w-full">
              リセット
            </Button>
          </div>
        </div>
      </div>

      {/* 操作説明 */}
      <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
        <h4 className="font-semibold mb-2 text-yellow-800">
          💡 連結リストの特徴
        </h4>
        <ul className="text-sm text-yellow-700 space-y-1">
          <li>
            • <strong>動的サイズ</strong>: 実行時にサイズを変更可能
          </li>
          <li>
            • <strong>メモリ効率</strong>: 必要な分だけメモリを使用
          </li>
          <li>
            • <strong>先頭挿入</strong>: O(1) - 高速
          </li>
          <li>
            • <strong>任意位置操作</strong>: O(n) - 順次アクセスが必要
          </li>
          <li>
            • <strong>ランダムアクセス不可</strong>:
            配列と異なりインデックスで直接アクセスできない
          </li>
        </ul>
      </div>
    </div>
  );
};

export default LinkedListVisualizer;
