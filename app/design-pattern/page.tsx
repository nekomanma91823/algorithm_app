"use client";

import React from "react";
import Link from "next/link";
import { Layers, ArrowRight } from "lucide-react";
import { patternMap } from "@/data/patternMap";

const DesignPatternPage: React.FC = () => {
  const designPatterns = Object.entries(patternMap);

  return (
    <div className="min-h-screen bg-background text-foreground p-6">
      <div className="max-w-6xl mx-auto">
        {/* ヘッダー */}
        <div className="text-center mb-12">
          <div className="flex justify-center items-center mb-4">
            <Layers className="w-12 h-12 text-primary mr-3" />
            <h1 className="text-4xl font-bold text-foreground">
              デザインパターン
            </h1>
          </div>
          <p className="text-lg text-foreground max-w-3xl mx-auto">
            ソフトウェア設計で繰り返し現れる問題に対する、再利用可能な解決策を学びましょう。
            オブジェクト指向設計の原則に基づいた、効果的なコードの構造化を探求します。
          </p>
        </div>

        {/* パターン一覧 */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-foreground text-center">
            データ構造一覧
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {designPatterns.map(([key, pattern]) => (
              <Link
                key={key}
                href={`/data-structure/${pattern.name}`}
                className="group  p-6 rounded-xl transition-all duration-300 transform hover:-translate-y-1 neumorphic-shadow hover:neumorphic-shadow-inset bg-card text-foreground flex flex-col"
              >
                {/* アイコンとタイトル */}
                <div className="flex items-center mb-3">
                  <div className="w-12 h-12 bg-card rounded-lg flex items-center justify-center mr-3 neumorphic-shadow-inset">
                    <span className="text-2xl">{pattern.icon}</span>
                  </div>
                  <h3 className="text-xl font-bold group-hover:text-primary transition-colors">
                    {pattern.name}
                  </h3>
                </div>

                {/* 説明 */}
                <p className="text-sm mb-4 leading-relaxed">
                  {pattern.description}
                </p>

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
            デザインパターン学習のポイント
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-3">
                分類で理解する
              </h3>
              <ul className="space-y-2 text-foreground">
                <li>• 生成: オブジェクトの作り方</li>
                <li>• 構造: クラスやオブジェクトの組み合わせ方</li>
                <li>• 振る舞い: オブジェクト間の連携方法</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-3">
                実践で学ぶ
              </h3>
              <ul className="space-y-2 text-foreground">
                <li>• 各パターンのサンプルコードを読む</li>
                <li>• 自分のコードに適用してみる</li>
                <li>• パターンが解決する問題を意識する</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DesignPatternPage;
