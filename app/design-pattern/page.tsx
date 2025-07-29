"use client";

import React from "react";
import Link from "next/link";
import { Layers, ArrowRight } from "lucide-react";
import { patternMap } from "@/data/patternMap";

const DesignPatternPage: React.FC = () => {
  const designPatterns = Object.entries(patternMap).map(([id, data]) => ({
    id,
    ...data,
  }));

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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {designPatterns.map((pattern) => (
            <Link href={`/design-pattern/${pattern.id}`} key={pattern.id}>
              <div className="p-6 rounded-xl neumorphic-shadow bg-card hover:neumorphic-shadow-inset transition-all duration-300 h-full group">
                <div className="flex items-center mb-4">
                  <div className="text-3xl mr-4">{pattern.icon}</div>
                  <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
                    {pattern.name}
                  </h3>
                </div>

                <p className="text-foreground mb-4 leading-relaxed">
                  {pattern.description}
                </p>

                <div className="flex justify-between items-center">
                  <span className="text-primary text-sm font-medium px-3 py-1 rounded-full neumorphic-shadow-inset bg-card">
                    構造化
                  </span>
                  <ArrowRight className="w-5 h-5 text-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                </div>
              </div>
            </Link>
          ))}
        </div>

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
