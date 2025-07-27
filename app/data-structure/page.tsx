"use client";

import React from "react";
import Link from "next/link";
import { dataStructureMap } from "@/data/dataStructureMap";

const DataStructurePage: React.FC = () => {
  // データ構造のキーと情報を取得
  const dataStructures = Object.entries(dataStructureMap);

  return (
    <div className="p-6 max-w-6xl mx-auto bg-background text-foreground">
      {/* ページタイトル */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4 text-foreground">
          データ構造の学習
        </h1>
        <p className="text-lg text-gray-600 leading-relaxed">
          プログラミングにおける基本的なデータ構造を視覚的に学習できます。
          <br />
          各データ構造の特徴や使用例を理解し、適切な場面で活用できるようになりましょう。
        </p>
      </div>

      {/* 学習の進め方 */}
      <section className="mb-12 p-6 rounded-lg bg-card neumorphic-shadow">
        <h2 className="text-2xl font-bold mb-4 text-foreground">
          📚 学習の進め方
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-4 rounded-lg neumorphic-shadow-inset bg-card">
            <h3 className="font-semibold mb-2 text-foreground">1. プリズム・デモ</h3>
            <p className="text-sm">
              実際にデータ構造を操作して、動作を視覚的に理解します
            </p>
          </div>
          <div className="p-4 rounded-lg neumorphic-shadow-inset bg-card">
            <h3 className="font-semibold mb-2 text-foreground">2. 仕組みの理解</h3>
            <p className="text-sm">
              なぜそのような動作をするのか、内部構造を学びます
            </p>
          </div>
          <div className="p-4 rounded-lg neumorphic-shadow-inset bg-card">
            <h3 className="font-semibold mb-2 text-foreground">3. 実装練習</h3>
            <p className="text-sm">
              JavaScriptとPythonのコード例を参考に実装してみます
            </p>
          </div>
        </div>
      </section>

      {/* データ構造一覧 */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6 text-foreground text-center">
          📊 データ構造一覧
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {dataStructures.map(([key, structure]) => (
            <Link
              key={key}
              href={`/data-structure/${key}`}
              className="group block p-6 rounded-xl transition-all duration-300 transform hover:-translate-y-1 neumorphic-shadow hover:neumorphic-shadow-inset bg-card text-foreground"
            >
              {/* アイコンとタイトル */}
              <div className="flex items-center mb-3">
                <div className="w-12 h-12 bg-card rounded-lg flex items-center justify-center mr-3 neumorphic-shadow-inset">
                  <span className="text-2xl">📊</span>
                </div>
                <h3 className="text-xl font-bold group-hover:text-primary transition-colors">
                  {structure.name}
                </h3>
              </div>

              {/* 説明 */}
              <p className="text-sm mb-4 leading-relaxed">
                {structure.description}
              </p>

              {/* 計算量情報 */}
              <div className="border-t pt-3">
                <div className="flex justify-between text-xs mb-2">
                  <span>アクセス: <span className="font-semibold text-primary">{structure.timeComplexity.access}</span></span>
                  <span>検索: <span className="font-semibold text-primary">{structure.timeComplexity.search}</span></span>
                </div>
                <div className="flex justify-between text-xs">
                  <span>挿入: <span className="font-semibold text-primary">{structure.timeComplexity.insertion}</span></span>
                  <span>削除: <span className="font-semibold text-primary">{structure.timeComplexity.deletion}</span></span>
                </div>
              </div>

              {/* ホバー時のメッセージ */}
              <div className="mt-4 text-center">
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
          💡 効果的な学習のヒント
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold mb-2 text-foreground">基本から順番に</h3>
            <ul className="text-sm space-y-1 list-disc ml-4">
              <li><strong>配列</strong> → <strong>連結リスト</strong> → <strong>スタック・キュー</strong></li>
              <li><strong>ハッシュテーブル</strong> → <strong>二分探索木</strong></li>
              <li><strong>ヒープ</strong> → <strong>グラフ</strong> → <strong>高度な木構造</strong></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-2 text-foreground">実践的な学習</h3>
            <ul className="text-sm space-y-1 list-disc ml-4">
              <li>デモで実際に操作してみる</li>
              <li>なぜその操作が必要かを考える</li>
              <li>コード例を実際に動かしてみる</li>
              <li>他のデータ構造との違いを比較する</li>
            </ul>
          </div>
        </div>
      </section>

      {/* フッター */}
      <div className="mt-12 text-center text-foreground text-sm">
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