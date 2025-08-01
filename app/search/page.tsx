"use client";

import React from "react";
import Link from "next/link";
import { Search, ArrowRight } from "lucide-react";
import { searchAlgorithmMap } from "@/data/searchMap";

const SearchPage: React.FC = () => {
  const searchTopics = Object.entries(searchAlgorithmMap);

  return (
    <div className="min-h-screen bg-background text-foreground p-6">
      <div className="max-w-6xl mx-auto">
        {/* ヘッダー */}
        <div className="text-center mb-12">
          <div className="flex justify-center items-center mb-4">
            <Search className="w-12 h-12 text-primary mr-3" />
            <h1 className="text-4xl font-bold text-foreground">
              探索アルゴリズム
            </h1>
          </div>
          <p className="text-lg text-foreground max-w-3xl mx-auto">
            データの中から目的の情報を効率的に見つけ出すためのアルゴリズムを学びましょう。
            シンプルな線形探索から、グラフ理論を活用した高度な探索まで、様々な手法を視覚的に理解できます。
          </p>
        </div>

        {/* アルゴリズム一覧 */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-foreground text-center">
            データ構造一覧
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {searchTopics.map(([key, topic]) => (
              <Link
                key={key}
                href={`/search/${key}`}
                className="group  p-6 rounded-xl transition-all duration-300 transform hover:-translate-y-1 neumorphic-shadow hover:neumorphic-shadow-inset bg-card text-foreground flex flex-col"
              >
                {/* アイコンとタイトル */}
                <div className="flex items-center mb-3">
                  <div className="w-12 h-12 bg-card rounded-lg flex items-center justify-center mr-3 neumorphic-shadow-inset">
                    <span className="text-2xl">{topic.icon}</span>
                  </div>
                  <h3 className="text-xl font-bold group-hover:text-primary transition-colors">
                    {topic.name}
                  </h3>
                </div>

                {/* 説明 */}
                <p className="text-sm mb-4 leading-relaxed">
                  {topic.description}
                </p>

                {/* 計算量情報 */}
                <div className="border-t pt-3">
                  <div className="flex justify-between text-xs mb-2">
                    <span>
                      アクセス:{" "}
                      <span className="font-semibold text-primary">
                        {topic.timeComplexity.access}
                      </span>
                    </span>
                    <span>
                      検索:{" "}
                      <span className="font-semibold text-primary">
                        {topic.timeComplexity.search}
                      </span>
                    </span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span>
                      挿入:{" "}
                      <span className="font-semibold text-primary">
                        {topic.timeComplexity.insertion}
                      </span>
                    </span>
                    <span>
                      削除:{" "}
                      <span className="font-semibold text-primary">
                        {topic.timeComplexity.deletion}
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

        {/* 学習のコツ */}
        <div className="mt-16 p-8 neumorphic-shadow bg-card">
          <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center">
            <span className="text-2xl mr-3">💡</span>
            探索アルゴリズム学習のポイント
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-3">
                基本から応用へ
              </h3>
              <ul className="space-y-2 text-foreground">
                <li>• まずは線形探索で基本概念を理解</li>
                <li>• 二分探索で効率性の重要性を学習</li>
                <li>• グラフ探索で実践的な応用を体験</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-3">
                視覚化の活用
              </h3>
              <ul className="space-y-2 text-foreground">
                <li>• インタラクティブなデモで動作を確認</li>
                <li>• ステップごとの状態変化を観察</li>
                <li>• 異なるデータセットでの振る舞いを比較</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
