"use client";

import React from "react";
import Link from "next/link";
import { Search, ArrowRight } from "lucide-react";

const SearchPage: React.FC = () => {
  const searchAlgorithms = [
    {
      title: "線形探索",
      url: "/search/linear-search",
      description: "配列を最初から順番に調べていく最もシンプルな探索アルゴリズム",
      complexity: "O(n)",
      icon: "📍"
    },
    {
      title: "二分探索",
      url: "/search/binary-search",
      description: "ソート済み配列を半分に分けながら効率的に探索するアルゴリズム",
      complexity: "O(log n)",
      icon: "📊"
    },
    {
      title: "幅優先探索 (BFS)",
      url: "/search/bfs",
      description: "グラフやツリーを幅方向に探索する基本的なアルゴリズム",
      complexity: "O(V + E)",
      icon: "🌊"
    },
    {
      title: "深さ優先探索 (DFS)",
      url: "/search/dfs",
      description: "グラフやツリーを深さ方向に探索する基本的なアルゴリズム",
      complexity: "O(V + E)",
      icon: "🕳️"
    },
    {
      title: "ダイクストラ法",
      url: "/search/dijkstra",
      description: "重み付きグラフで最短経路を見つけるアルゴリズム",
      complexity: "O((V + E) log V)",
      icon: "🛤️"
    },
    {
      title: "A* (A-star) アルゴリズム",
      url: "/search/a-star",
      description: "ヒューリスティックを使用した効率的な最短経路探索アルゴリズム",
      complexity: "O(b^d)",
      icon: "⭐"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-6xl mx-auto">
        {/* ヘッダー */}
        <div className="text-center mb-12">
          <div className="flex justify-center items-center mb-4">
            <Search className="w-12 h-12 text-blue-600 mr-3" />
            <h1 className="text-4xl font-bold text-gray-800">探索アルゴリズム</h1>
          </div>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            データの中から目的の情報を効率的に見つけ出すためのアルゴリズムを学びましょう。
            シンプルな線形探索から、グラフ理論を活用した高度な探索まで、様々な手法を視覚的に理解できます。
          </p>
        </div>

        {/* アルゴリズム一覧 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {searchAlgorithms.map((algorithm, index) => (
            <Link href={algorithm.url} key={index}>
              <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 p-6 h-full border border-gray-200 hover:border-blue-300 group">
                <div className="flex items-center mb-4">
                  <span className="text-3xl mr-3">{algorithm.icon}</span>
                  <h3 className="text-xl font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">
                    {algorithm.title}
                  </h3>
                </div>
                
                <p className="text-gray-600 mb-4 leading-relaxed">
                  {algorithm.description}
                </p>
                
                <div className="flex justify-between items-center">
                  <span className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
                    {algorithm.complexity}
                  </span>
                  <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* 学習のコツ */}
        <div className="mt-16 bg-white rounded-xl shadow-md p-8 border border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
            <span className="text-2xl mr-3">💡</span>
            探索アルゴリズム学習のポイント
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-700 mb-3">基本から応用へ</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• まずは線形探索で基本概念を理解</li>
                <li>• 二分探索で効率性の重要性を学習</li>
                <li>• グラフ探索で実践的な応用を体験</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-700 mb-3">視覚化の活用</h3>
              <ul className="space-y-2 text-gray-600">
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
