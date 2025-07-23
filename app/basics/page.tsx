"use client";

import React from "react";
import Link from "next/link";
import { basicsMap } from "@/data/basicsMap";

export const runtime = "edge";

const BasicsPage: React.FC = () => {
  const basicsTopics = Object.entries(basicsMap);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* ページタイトル */}
      <h1 className="text-4xl font-bold mb-6 text-center text-blue-700">
        コンピュータサイエンスの基礎
      </h1>

      {/* 説明 */}
      <section className="mb-12 bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg border">
        <h2 className="text-2xl font-bold mb-4 text-blue-800">
          🎓 基礎について
        </h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          コンピュータサイエンスの基礎は、プログラミングやシステム開発を理解するための土台となる重要な概念です。
          これらの基礎知識をしっかりと身につけることで、より高度な技術への理解が深まります。
        </p>
        <p className="text-gray-700 leading-relaxed">
          各トピックは身近な例え話と実践的な説明で構成されており、初学者でも分かりやすく学習できるように設計されています。
        </p>
      </section>

      {/* トピック一覧 */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {basicsTopics.map(([key, topic]) => (
          <Link
            key={key}
            href={`/basics/${key}`}
            className="block bg-white p-6 rounded-lg border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all duration-200"
          >
            <div className="mb-4">
              <h3 className="text-xl font-bold text-blue-700 mb-2">
                {topic.name}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {topic.description}
              </p>
            </div>

            <div className="border-t pt-4">
              <p className="text-xs text-gray-500 mb-2">主な特徴:</p>
              <p className="text-sm text-gray-700">
                {topic.features && topic.features.length > 100
                  ? `${topic.features.substring(0, 100)}...`
                  : topic.features || "特徴の情報がありません"}
              </p>
            </div>

            <div className="mt-4 flex items-center text-blue-600 text-sm font-medium">
              詳しく学ぶ
              <svg
                className="ml-1 w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </div>
          </Link>
        ))}
      </section>

      {/* 学習の進め方 */}
      <section className="mt-12 bg-yellow-50 p-6 rounded-lg border-l-4 border-yellow-400">
        <h2 className="text-2xl font-bold mb-4 text-yellow-800">
          📚 学習の進め方
        </h2>
        <div className="space-y-3 text-gray-700">
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
      <section className="mt-8 bg-green-50 p-6 rounded-lg border-l-4 border-green-400">
        <h2 className="text-2xl font-bold mb-4 text-green-800">
          🎯 推奨学習順序
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-medium mb-2 text-green-700">基礎編</h3>
            <ol className="list-decimal list-inside space-y-1 text-gray-700">
              <li>ハードウェア</li>
              <li>ソフトウェア</li>
              <li>CPUの仕組み</li>
              <li>メモリとストレージ</li>
            </ol>
          </div>
          <div>
            <h3 className="text-lg font-medium mb-2 text-green-700">応用編</h3>
            <ol className="list-decimal list-inside space-y-1 text-gray-700">
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
