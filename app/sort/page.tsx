"use client";

import React from "react";
import Link from "next/link";
import { sortAlgorithmMap } from "@/data/sortMap";
import { BarChart3 } from "lucide-react";

const SortPage: React.FC = () => {
  // ソートアルゴリズムのキーと情報を取得
  const sortAlgorithms = Object.entries(sortAlgorithmMap);

  return (
    <div className="p-6 max-w-6xl mx-auto bg-background text-foreground">
      {/* ページタイトル */}
      <div className="text-center mb-12">
        <div className="flex justify-center items-center mb-4">
          <BarChart3 className="w-12 h-12 text-primary mr-3" />
          <h1 className="text-4xl font-bold text-foreground">
            ソートアルゴリズム
          </h1>
        </div>
        <p className="text-lg text-gray-600 leading-relaxed">
          データを特定の順序に並べ替えるためのアルゴリズムを学びましょう。
          <br />
          基本的なソートから、効率的な高度なソートまで、様々な手法を視覚的に理解できます。
        </p>
      </div>

      {/* アルゴリズム一覧 */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6 text-foreground text-center">
          ソートアルゴリズム一覧
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortAlgorithms.map(([key, algorithm]) => (
            <Link
              key={key}
              href={`/sort/${key}`}
              className="group p-6 rounded-xl transition-all duration-300 transform hover:-translate-y-1 neumorphic-shadow hover:neumorphic-shadow-inset bg-card text-foreground flex flex-col"
            >
              {/* アイコンとタイトル */}
              <div className="flex items-center mb-3">
                <div className="w-12 h-12 bg-card rounded-lg flex items-center justify-center mr-3 neumorphic-shadow-inset">
                  <span className="text-2xl">{algorithm.icon}</span>
                </div>
                <h3 className="text-xl font-bold group-hover:text-primary transition-colors">
                  {algorithm.name}
                </h3>
              </div>

              {/* 説明 */}
              <p className="text-sm mb-4 leading-relaxed flex-grow">
                {algorithm.description}
              </p>

              {/* 計算量情報 */}
              <div className="border-t pt-3 text-xs space-y-2">
                <div className="flex justify-between">
                  <span>
                    最良:{" "}
                    <span className="font-semibold text-primary">
                      {algorithm.timeComplexity.best}
                    </span>
                  </span>
                  <span>
                    平均:{" "}
                    <span className="font-semibold text-primary">
                      {algorithm.timeComplexity.average}
                    </span>
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>
                    最悪:{" "}
                    <span className="font-semibold text-primary">
                      {algorithm.timeComplexity.worst}
                    </span>
                  </span>
                  <span>
                    空間:{" "}
                    <span className="font-semibold text-primary">
                      {algorithm.spaceComplexity}
                    </span>
                  </span>
                </div>
              </div>

              {/* ホバー時のメッセージ */}
              <div className="mt-auto pt-4 text-center">
                <span className="text-sm text-primary group-hover:text-primary font-medium">
                  クリックして学習を開始 →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 学習のヒント */}
      <section className="p-6 rounded-lg bg-card neumorphic-shadow">
        <h2 className="text-xl font-bold mb-4 text-foreground">
          効果的な学習のヒント
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold mb-2 text-foreground">
              計算量を意識する
            </h3>
            <ul className="text-sm space-y-1 list-disc ml-4">
              <li>O(n²) と O(n log n) の違いを理解する</li>
              <li>データ量が増えた際のパフォーマンスを想像する</li>
              <li>最善・平均・最悪ケースを考慮する</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-2 text-foreground">
              安定性を知る
            </h3>
            <ul className="text-sm space-y-1 list-disc ml-4">
              <li>同じ値の要素の順序が保たれるか（安定ソート）</li>
              <li>マージソートは安定、クイックソートは不安定</li>
              <li>安定性が重要になるケースを考える</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SortPage;
