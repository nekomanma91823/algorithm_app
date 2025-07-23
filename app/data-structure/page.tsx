"use client";

import React from "react";
import Link from "next/link";
import { dataStructureMap } from "@/data/dataStructureMap";

const DataStructurePage: React.FC = () => {
  // データ構造のキーと情報を取得
  const dataStructures = Object.entries(dataStructureMap);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* ページタイトル */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4 text-blue-700">
          データ構造の学習
        </h1>
        <p className="text-lg text-gray-600 leading-relaxed">
          プログラミングにおける基本的なデータ構造を視覚的に学習できます。
          <br />
          各データ構造の特徴や使用例を理解し、適切な場面で活用できるようになりましょう。
        </p>
      </div>

      {/* 学習の進め方 */}
      <section className="mb-12 bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg border">
        <h2 className="text-2xl font-bold mb-4 text-blue-800">
          📚 学習の進め方
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-4 rounded-lg border-l-4 border-blue-400">
            <h3 className="font-semibold mb-2 text-blue-700">1. プリズム・デモ</h3>
            <p className="text-sm text-gray-600">
              実際にデータ構造を操作して、動作を視覚的に理解します
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg border-l-4 border-green-400">
            <h3 className="font-semibold mb-2 text-green-700">2. 仕組みの理解</h3>
            <p className="text-sm text-gray-600">
              なぜそのような動作をするのか、内部構造を学びます
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg border-l-4 border-purple-400">
            <h3 className="font-semibold mb-2 text-purple-700">3. 実装練習</h3>
            <p className="text-sm text-gray-600">
              JavaScriptとPythonのコード例を参考に実装してみます
            </p>
          </div>
        </div>
      </section>

      {/* データ構造一覧 */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
          📊 データ構造一覧
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {dataStructures.map(([key, structure]) => (
            <Link
              key={key}
              href={`/data-structure/${key}`}
              className="group block"
            >
              <div className="bg-white rounded-lg border shadow-sm hover:shadow-md transition-all duration-200 p-6 h-full hover:border-blue-300 group-hover:scale-105">
                {/* アイコンとタイトル */}
                <div className="flex items-center mb-3">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-3 group-hover:bg-blue-200 transition-colors">
                    <span className="text-2xl">📊</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 group-hover:text-blue-700 transition-colors">
                    {structure.name}
                  </h3>
                </div>

                {/* 説明 */}
                <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                  {structure.description}
                </p>

                {/* 計算量情報 */}
                <div className="border-t pt-3">
                  <div className="flex justify-between text-xs text-gray-500 mb-2">
                    <span>アクセス: <span className="font-semibold text-blue-600">{structure.timeComplexity.access}</span></span>
                    <span>検索: <span className="font-semibold text-green-600">{structure.timeComplexity.search}</span></span>
                  </div>
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>挿入: <span className="font-semibold text-orange-600">{structure.timeComplexity.insertion}</span></span>
                    <span>削除: <span className="font-semibold text-red-600">{structure.timeComplexity.deletion}</span></span>
                  </div>
                </div>

                {/* ホバー時のメッセージ */}
                <div className="mt-4 text-center">
                  <span className="text-sm text-blue-600 group-hover:text-blue-700 font-medium">
                    クリックして学習を開始 →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 学習のヒント */}
      <section className="bg-yellow-50 p-6 rounded-lg border border-yellow-200">
        <h2 className="text-xl font-bold mb-4 text-yellow-800">
          💡 効果的な学習のヒント
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold mb-2 text-yellow-700">基本から順番に</h3>
            <ul className="text-sm text-yellow-700 space-y-1 list-disc ml-4">
              <li><strong>配列</strong> → <strong>連結リスト</strong> → <strong>スタック・キュー</strong></li>
              <li><strong>ハッシュテーブル</strong> → <strong>二分探索木</strong></li>
              <li><strong>ヒープ</strong> → <strong>グラフ</strong> → <strong>高度な木構造</strong></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-2 text-yellow-700">実践的な学習</h3>
            <ul className="text-sm text-yellow-700 space-y-1 list-disc ml-4">
              <li>デモで実際に操作してみる</li>
              <li>なぜその操作が必要かを考える</li>
              <li>コード例を実際に動かしてみる</li>
              <li>他のデータ構造との違いを比較する</li>
            </ul>
          </div>
        </div>
      </section>

      {/* フッター */}
      <div className="mt-12 text-center text-gray-500 text-sm">
        <p>
          各データ構造の詳細な説明とインタラクティブなデモで学習を深めましょう。
          <br />
          質問や疑問があれば、それぞれのページで実際に操作しながら理解を深めてください。
        </p>
      </div>
    </div>
  );
};

export default DataStructurePage;