"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const HashTableVisualizer: React.FC = () => {
  const [table, setTable] = useState<
    Array<Array<{ key: string; value: string }>>
  >(
    Array(8)
      .fill(null)
      .map(() => [] as Array<{ key: string; value: string }>)
  );
  const [inputKey, setInputKey] = useState<string>("");
  const [inputValue, setInputValue] = useState<string>("");
  const [operation, setOperation] = useState<string>("");
  const [highlightIndex, setHighlightIndex] = useState<number | null>(null);

  // 簡単なハッシュ関数（文字列の各文字のASCII値の合計を表のサイズで割った余り）
  const hashFunction = (key: string): number => {
    let hash = 0;
    for (let i = 0; i < key.length; i++) {
      hash += key.charCodeAt(i);
    }
    return hash % table.length;
  };

  const handleInsert = () => {
    if (!inputKey.trim() || !inputValue.trim()) return;

    const index = hashFunction(inputKey);
    const newTable = [...table];

    // 既存のキーをチェック
    const existingIndex = newTable[index].findIndex(
      (item) => item.key === inputKey
    );
    if (existingIndex !== -1) {
      // 既存のキーの値を更新
      newTable[index][existingIndex].value = inputValue;
      setOperation(`キー "${inputKey}" の値を "${inputValue}" に更新しました`);
    } else {
      // 新しいキー・値ペアを追加（チェイン法）
      newTable[index].push({ key: inputKey, value: inputValue });
      setOperation(
        `キー "${inputKey}" を値 "${inputValue}" でハッシュ値 ${index} に挿入しました`
      );
    }

    setTable(newTable);
    setHighlightIndex(index);
    setInputKey("");
    setInputValue("");

    setTimeout(() => {
      setHighlightIndex(null);
      setOperation("");
    }, 3000);
  };

  const handleSearch = () => {
    if (!inputKey.trim()) return;

    const index = hashFunction(inputKey);
    setHighlightIndex(index);

    if (table[index] && table[index].length > 0) {
      const item = table[index].find((item) => item.key === inputKey);
      if (item) {
        setOperation(
          `キー "${inputKey}" の値は "${item.value}" です（ハッシュ値: ${index}）`
        );
      } else {
        setOperation(
          `キー "${inputKey}" は存在しません（ハッシュ値 ${index} の位置に他のキーが存在）`
        );
      }
    } else {
      setOperation(
        `キー "${inputKey}" は存在しません（ハッシュ値 ${index} の位置は空）`
      );
    }

    setInputKey("");
    setTimeout(() => {
      setHighlightIndex(null);
      setOperation("");
    }, 3000);
  };

  const handleDelete = (targetKey: string) => {
    const index = hashFunction(targetKey);
    const newTable = [...table];

    if (newTable[index] && newTable[index].length > 0) {
      const itemIndex = newTable[index].findIndex(
        (item) => item.key === targetKey
      );
      if (itemIndex !== -1) {
        newTable[index].splice(itemIndex, 1);
        setTable(newTable);
        setHighlightIndex(index);
        setOperation(`キー "${targetKey}" を削除しました`);

        setTimeout(() => {
          setHighlightIndex(null);
          setOperation("");
        }, 3000);
      }
    }
  };

  const resetTable = () => {
    setTable(
      Array(8)
        .fill(null)
        .map(() => [] as Array<{ key: string; value: string }>)
    );
    setHighlightIndex(null);
    setOperation("ハッシュテーブルをリセットしました");
    setTimeout(() => setOperation(""), 2000);
  };

  const loadSampleData = () => {
    const sampleData = [
      { key: "apple", value: "red" },
      { key: "banana", value: "yellow" },
      { key: "grape", value: "purple" },
      { key: "orange", value: "orange" },
    ];

    const newTable: Array<Array<{ key: string; value: string }>> = Array(8)
      .fill(null)
      .map(() => [] as Array<{ key: string; value: string }>);
    sampleData.forEach(({ key, value }) => {
      const index = hashFunction(key);
      newTable[index].push({ key, value });
    });

    setTable(newTable);
    setOperation("サンプルデータを読み込みました");
    setTimeout(() => setOperation(""), 2000);
  };

  return (
    <div className="space-y-6">
      {/* ハッシュテーブルの視覚化 */}
      <div className="bg-white p-6 rounded-lg border">
        <h3 className="text-lg font-semibold mb-4 text-center">
          ハッシュテーブルの可視化
        </h3>

        {/* ハッシュ関数の説明 */}
        <div className="mb-4 p-3 bg-gray-50 rounded border text-sm">
          <strong>ハッシュ関数:</strong> hash(key) = (文字のASCII値の合計) %{" "}
          {table.length}
        </div>

        {/* テーブルの表示 */}
        <div className="space-y-2">
          {table.map((bucket, index) => (
            <div
              key={index}
              className={`flex items-center p-3 border rounded-lg transition-all ${
                highlightIndex === index
                  ? "bg-yellow-100 border-yellow-400 shadow-lg"
                  : "bg-gray-50 border-gray-200"
              }`}
            >
              {/* インデックス */}
              <div className="w-12 text-center font-bold text-gray-600">
                [{index}]
              </div>

              {/* バケット内容 */}
              <div className="flex-1 ml-4">
                {bucket && bucket.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {bucket.map((item, itemIndex) => (
                      <div
                        key={itemIndex}
                        className="bg-blue-100 border border-blue-300 rounded px-3 py-1 text-sm flex items-center gap-2"
                      >
                        <span className="font-semibold text-blue-800">
                          {item.key}
                        </span>
                        <span className="text-gray-600">:</span>
                        <span className="text-blue-600">{item.value}</span>
                        <button
                          onClick={() => handleDelete(item.key)}
                          className="ml-2 text-red-500 hover:text-red-700 text-xs"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-gray-400 italic">空</div>
                )}
              </div>

              {/* コリジョン表示 */}
              {bucket && bucket.length > 1 && (
                <div className="text-orange-600 text-sm font-semibold">
                  コリジョン({bucket.length})
                </div>
              )}
            </div>
          ))}
        </div>

        {/* 統計情報 */}
        <div className="mt-4 text-center space-y-2">
          <div className="text-sm text-gray-600">
            <span className="font-semibold">総要素数:</span>{" "}
            {table.reduce((sum, bucket) => sum + bucket.length, 0)}
            <span className="ml-4 font-semibold">空のバケット:</span>{" "}
            {table.filter((bucket) => bucket.length === 0).length}
            <span className="ml-4 font-semibold">コリジョン:</span>{" "}
            {table.filter((bucket) => bucket.length > 1).length}
          </div>
          <div className="text-xs text-gray-500">
            負荷率:{" "}
            {(
              (table.reduce((sum, bucket) => sum + bucket.length, 0) /
                table.length) *
              100
            ).toFixed(1)}
            %
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
        {/* 挿入操作 */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="font-semibold mb-3 text-green-700">📥 要素の挿入</h4>
          <div className="space-y-2">
            <Input
              type="text"
              placeholder="キー"
              value={inputKey}
              onChange={(e) => setInputKey(e.target.value)}
            />
            <Input
              type="text"
              placeholder="値"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
            <Button
              onClick={handleInsert}
              className="w-full bg-green-600 hover:bg-green-700"
            >
              挿入
            </Button>
          </div>
        </div>

        {/* 検索操作 */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="font-semibold mb-3 text-blue-700">🔍 要素の検索</h4>
          <div className="space-y-2">
            <Input
              type="text"
              placeholder="検索するキー"
              value={inputKey}
              onChange={(e) => setInputKey(e.target.value)}
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
        <h4 className="font-semibold mb-2 text-yellow-800">
          💡 ハッシュテーブルの特徴
        </h4>
        <ul className="text-sm text-yellow-700 space-y-1">
          <li>
            • <strong>高速なアクセス</strong>: 平均的に O(1)
            でアクセス、挿入、削除
          </li>
          <li>
            • <strong>ハッシュ関数</strong>: キーを配列のインデックスに変換
          </li>
          <li>
            • <strong>コリジョン</strong>: 異なるキーが同じハッシュ値を持つ場合
          </li>
          <li>
            • <strong>チェイン法</strong>: コリジョンを連結リストで解決
          </li>
          <li>
            • <strong>負荷率</strong>: 要素数 / バケット数（0.75以下が理想的）
          </li>
          <li>
            • <strong>使用例</strong>:
            辞書、データベースのインデックス、キャッシュなど
          </li>
        </ul>
      </div>

      {/* リセットとサンプル */}
      <div className="flex gap-2 justify-center">
        <Button onClick={resetTable} variant="outline">
          🔄 リセット
        </Button>
        <Button onClick={loadSampleData} variant="outline">
          📊 サンプルデータ
        </Button>
      </div>
    </div>
  );
};

export default HashTableVisualizer;
