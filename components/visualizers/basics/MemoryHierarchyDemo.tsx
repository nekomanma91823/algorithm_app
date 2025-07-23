"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface MemoryLevel {
  name: string;
  size: string;
  speed: string;
  cost: string;
  color: string;
  data: string[];
  maxCapacity: number;
}

const MemoryHierarchyDemo: React.FC = () => {
  const [accessPattern, setAccessPattern] = useState<string>("");
  const [accessHistory, setAccessHistory] = useState<string[]>([]);
  const [currentOperation, setCurrentOperation] = useState<string>("待機中");

  const [memoryLevels, setMemoryLevels] = useState<MemoryLevel[]>([
    {
      name: "レジスタ",
      size: "64B",
      speed: "1サイクル",
      cost: "最高",
      color: "bg-red-500",
      data: [],
      maxCapacity: 4,
    },
    {
      name: "L1キャッシュ",
      size: "32KB",
      speed: "1-2サイクル",
      cost: "高",
      color: "bg-orange-500",
      data: [],
      maxCapacity: 8,
    },
    {
      name: "L2キャッシュ",
      size: "256KB",
      speed: "3-10サイクル",
      cost: "中",
      color: "bg-yellow-500",
      data: [],
      maxCapacity: 16,
    },
    {
      name: "メインメモリ",
      size: "8GB",
      speed: "100-300サイクル",
      cost: "低",
      color: "bg-green-500",
      data: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"],
      maxCapacity: 20,
    },
    {
      name: "SSD",
      size: "512GB",
      speed: "10,000+サイクル",
      cost: "最低",
      color: "bg-blue-500",
      data: [
        "A",
        "B",
        "C",
        "D",
        "E",
        "F",
        "G",
        "H",
        "I",
        "J",
        "K",
        "L",
        "M",
        "N",
        "O",
        "P",
        "Q",
        "R",
        "S",
        "T",
      ],
      maxCapacity: 50,
    },
  ]);

  // LRU（Least Recently Used）キャッシュアルゴリズム
  const addToCache = (level: number, data: string) => {
    const newMemoryLevels = [...memoryLevels];
    const currentLevel = newMemoryLevels[level];

    // 既に存在する場合は位置を更新
    if (currentLevel.data.includes(data)) {
      currentLevel.data = currentLevel.data.filter((item) => item !== data);
      currentLevel.data.unshift(data);
    } else {
      // 新しいデータを先頭に追加
      currentLevel.data.unshift(data);

      // 容量を超えた場合は末尾を削除
      if (currentLevel.data.length > currentLevel.maxCapacity) {
        currentLevel.data.pop();
      }
    }

    setMemoryLevels(newMemoryLevels);
  };

  // メモリアクセスシミュレーション
  const accessMemory = (dataItem: string) => {
    if (!dataItem) return;

    let foundLevel = -1;
    let accessTime = 0;

    // 各レベルでデータを検索
    for (let i = 0; i < memoryLevels.length; i++) {
      if (memoryLevels[i].data.includes(dataItem)) {
        foundLevel = i;
        break;
      }
    }

    if (foundLevel === -1) {
      setCurrentOperation(`データ '${dataItem}' が見つかりませんでした`);
      return;
    }

    // アクセス時間の計算（レベルに基づく）
    const accessTimes = [1, 2, 5, 100, 10000];
    accessTime = accessTimes[foundLevel];

    // キャッシュヒット/ミスの処理
    if (foundLevel === 0) {
      setCurrentOperation(
        `キャッシュヒット！ レジスタから '${dataItem}' にアクセス (${accessTime}サイクル)`
      );
    } else {
      setCurrentOperation(
        `キャッシュミス発生。${memoryLevels[foundLevel].name}から '${dataItem}' を取得 (${accessTime}サイクル)`
      );

      // 上位レベルにデータを移動
      for (let i = foundLevel - 1; i >= 0; i--) {
        addToCache(i, dataItem);
      }
    }

    // アクセス履歴を更新
    setAccessHistory((prev) => [dataItem, ...prev.slice(0, 9)]);
  };

  // プリセットアクセスパターン
  const runAccessPattern = (pattern: string[]) => {
    pattern.forEach((item, index) => {
      setTimeout(() => {
        accessMemory(item);
      }, index * 1000);
    });
  };

  return (
    <div className="p-6 bg-white rounded-lg border">
      <h3 className="text-xl font-bold mb-4 text-center">
        メモリ階層シミュレータ
      </h3>

      {/* コントロールパネル */}
      <div className="bg-gray-50 p-4 rounded-lg mb-6">
        <h4 className="font-semibold text-gray-800 mb-3">メモリアクセス</h4>
        <div className="flex gap-2 mb-4">
          <Input
            value={accessPattern}
            onChange={(e) => setAccessPattern(e.target.value.toUpperCase())}
            placeholder="データを入力 (A, B, C, ...)"
            maxLength={1}
            className="w-32"
          />
          <Button
            onClick={() => accessMemory(accessPattern)}
            disabled={!accessPattern}
          >
            アクセス
          </Button>
        </div>

        {/* プリセットパターン */}
        <div className="space-y-2">
          <div className="text-sm font-medium">アクセスパターン例:</div>
          <div className="flex flex-wrap gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={() => runAccessPattern(["A", "B", "C", "A", "B", "A"])}
            >
              順次アクセス
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => runAccessPattern(["A", "B", "A", "C", "A", "B"])}
            >
              局所性あり
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => runAccessPattern(["A", "F", "K", "P", "T", "Z"])}
            >
              ランダムアクセス
            </Button>
          </div>
        </div>
      </div>

      {/* 現在の操作状況 */}
      <div className="bg-blue-50 p-4 rounded-lg mb-6">
        <h4 className="font-semibold text-blue-800 mb-2">現在の状況</h4>
        <div className="text-blue-700">{currentOperation}</div>
      </div>

      {/* メモリ階層の視覚化 */}
      <div className="space-y-4 mb-6">
        <h4 className="font-semibold text-gray-800">メモリ階層</h4>
        {memoryLevels.map((level, index) => (
          <div key={level.name} className="border rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className={`w-4 h-4 rounded ${level.color}`}></div>
                <h5 className="font-semibold">{level.name}</h5>
              </div>
              <div className="text-sm text-gray-500 space-x-4">
                <span>容量: {level.size}</span>
                <span>速度: {level.speed}</span>
                <span>コスト: {level.cost}</span>
              </div>
            </div>

            {/* データ表示 */}
            <div className="min-h-[60px] bg-gray-50 p-3 rounded">
              <div className="flex flex-wrap gap-2">
                {level.data.map((item, itemIndex) => (
                  <div
                    key={itemIndex}
                    className={`px-3 py-1 rounded text-white font-medium ${
                      level.color
                    } ${
                      accessHistory[0] === item ? "ring-2 ring-yellow-400" : ""
                    }`}
                  >
                    {item}
                  </div>
                ))}

                {/* 空きスロット表示 */}
                {Array.from({
                  length: Math.max(0, level.maxCapacity - level.data.length),
                })
                  .slice(0, 10) // 表示制限
                  .map((_, emptyIndex) => (
                    <div
                      key={`empty-${emptyIndex}`}
                      className="px-3 py-1 rounded border border-dashed border-gray-300 text-gray-400"
                    >
                      -
                    </div>
                  ))}
              </div>

              <div className="mt-2 text-xs text-gray-500">
                使用: {level.data.length}/{level.maxCapacity}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* アクセス履歴 */}
      <div className="bg-purple-50 p-4 rounded-lg mb-6">
        <h4 className="font-semibold text-purple-800 mb-3">アクセス履歴</h4>
        <div className="flex flex-wrap gap-2">
          {accessHistory.map((item, index) => (
            <div
              key={index}
              className={`px-3 py-1 rounded border ${
                index === 0
                  ? "bg-purple-500 text-white border-purple-500"
                  : "bg-white text-purple-700 border-purple-300"
              }`}
            >
              {item}
            </div>
          ))}
          {accessHistory.length === 0 && (
            <div className="text-purple-600 text-sm">
              まだアクセスがありません
            </div>
          )}
        </div>
      </div>

      {/* 統計情報 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-green-50 p-4 rounded-lg text-center">
          <div className="text-2xl font-bold text-green-600">
            {accessHistory.length}
          </div>
          <div className="text-sm text-green-800">総アクセス数</div>
        </div>

        <div className="bg-orange-50 p-4 rounded-lg text-center">
          <div className="text-2xl font-bold text-orange-600">
            {Math.round(
              ((memoryLevels[0].data.length + memoryLevels[1].data.length) /
                Math.max(accessHistory.length, 1)) *
                100
            )}
            %
          </div>
          <div className="text-sm text-orange-800">キャッシュヒット率</div>
        </div>

        <div className="bg-blue-50 p-4 rounded-lg text-center">
          <div className="text-2xl font-bold text-blue-600">
            {new Set(accessHistory).size}
          </div>
          <div className="text-sm text-blue-800">ユニークデータ数</div>
        </div>
      </div>

      {/* 説明 */}
      <div className="bg-indigo-50 p-4 rounded-lg">
        <h4 className="font-semibold text-indigo-800 mb-2">メモリ階層の特徴</h4>
        <div className="text-sm text-indigo-700 space-y-2">
          <div>
            <strong>時間的局所性:</strong>{" "}
            最近アクセスしたデータは再びアクセスされる可能性が高い
          </div>
          <div>
            <strong>空間的局所性:</strong>{" "}
            アクセスしたデータの近くのデータもアクセスされる可能性が高い
          </div>
          <div>
            <strong>キャッシュヒット:</strong>{" "}
            高速なメモリでデータが見つかること
          </div>
          <div>
            <strong>キャッシュミス:</strong>{" "}
            低速なメモリからデータを取得する必要があること
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemoryHierarchyDemo;
