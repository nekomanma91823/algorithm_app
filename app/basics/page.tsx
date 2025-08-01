"use client";

import React from "react";
import Link from "next/link";
import { basicsMap } from "@/data/basicsMap";

export const runtime = "edge";

const BasicsPage: React.FC = () => {
  const basicsTopics = Object.entries(basicsMap);

  return (
    <div className="p-6 max-w-6xl mx-auto bg-background text-foreground">
      {/* ページタイトル */}
      <h1 className="text-4xl font-bold mb-6 text-center text-foreground">
        コンピュータサイエンスの基礎
      </h1>

      {/* 説明 */}
      <section className="mb-12 p-6 rounded-lg bg-card neumorphic-shadow">
        <h2 className="text-2xl font-bold mb-4 text-foreground">
          基礎について
        </h2>
        <p className="text-foreground leading-relaxed mb-4">
          コンピュータサイエンスの基礎は、プログラミングやシステム開発を理解するための土台となる重要な概念です。
          これらの基礎知識をしっかりと身につけることで、より高度な技術への理解が深まります。
        </p>
        <p className="text-foreground leading-relaxed">
          各トピックは身近な例え話と実践的な説明で構成されており、初学者でも分かりやすく学習できるように設計されています。
        </p>
      </section>

      {/* トピック一覧 */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6 text-foreground text-center">
          データ構造一覧
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {basicsTopics.map(([key, basic]) => (
            <Link
              key={key}
              href={`/data-structure/${key}`}
              className="group  p-6 rounded-xl transition-all duration-300 transform hover:-translate-y-1 neumorphic-shadow hover:neumorphic-shadow-inset bg-card text-foreground flex flex-col"
            >
              {/* アイコンとタイトル */}
              <div className="flex items-center mb-3">
                <div className="w-12 h-12 bg-card rounded-lg flex items-center justify-center mr-3 neumorphic-shadow-inset">
                  <span className="text-2xl">{basic.icon}</span>
                </div>
                <h3 className="text-xl font-bold group-hover:text-primary transition-colors">
                  {basic.name}
                </h3>
              </div>

              {/* 説明 */}
              <p className="text-sm mb-4 leading-relaxed">
                {basic.description}
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

      {/* 学習の進め方 */}
      <section className="mt-12 p-6 rounded-lg neumorphic-shadow bg-card">
        <h2 className="text-2xl font-bold mb-4 text-foreground">
          学習の進め方
        </h2>
        <div className="space-y-3 text-foreground">
          <p>
            <strong>1. 順序立てた学習:</strong>{" "}
            まずは「ハードウェア」「ソフトウェア」から始めて、基本的な概念を理解しましょう。
          </p>
          <p>
            <strong>2. 実践的な理解:</strong>{" "}
            各ページの例え話を通じて、抽象的な概念を身近なものに置き換えて理解しましょう。
          </p>
          <p>
            <strong>3. 関連性の把握:</strong>{" "}
            各トピックは相互に関連しています。一つ学んだら、関連する他のトピックも確認しましょう。
          </p>
          <p>
            <strong>4. 実際の応用:</strong>{" "}
            学んだ概念が実際のプログラミングやシステムでどう使われているかを意識しましょう。
          </p>
        </div>
      </section>

      {/* 推奨学習順序 */}
      <section className="mt-8 p-6 rounded-lg neumorphic-shadow bg-card text-foreground">
        <h2 className="text-2xl font-bold mb-4">推奨学習順序</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-medium mb-2">基礎編</h3>
            <ol className="list-decimal list-inside space-y-1">
              <li>ハードウェア</li>
              <li>ソフトウェア</li>
              <li>CPUの仕組み</li>
              <li>メモリとストレージ</li>
            </ol>
          </div>
          <div>
            <h3 className="text-lg font-medium mb-2">応用編</h3>
            <ol className="list-decimal list-inside space-y-1">
              <li>OSの役割</li>
              <li>プロセスとスレッド</li>
              <li>メモリ管理</li>
              <li>数値表現と論理演算</li>
            </ol>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BasicsPage;
