"use client";

import React from "react";
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Database,
  Search,
  GitBranch,
  Network,
  Brain,
  Palette,
} from "lucide-react";
import { sidebarData } from "@/data/sidebarData";

export default function Home() {
  // アイコンと色のマッピング
  const sectionConfig = {
    基礎: {
      description: "コンピュータサイエンスの基本概念",
      url: "/basics",
      icon: BookOpen,
      color: "bg-blue-500",
    },
    データ構造: {
      description: "データの格納と整理のための構造",
      url: "/data-structure",
      icon: Database,
      color: "bg-green-500",
    },
    探索アルゴリズム: {
      description: "効率的なデータ検索手法",
      url: "/search",
      icon: Search,
      color: "bg-purple-500",
    },
    ソートアルゴリズム: {
      description: "データの並び替え手法",
      url: "/sort",
      icon: GitBranch,
      color: "bg-orange-500",
    },
    デザインパターン: {
      description: "再利用可能なソフトウェア設計パターン",
      url: "/design-pattern",
      icon: Palette,
      color: "bg-pink-500",
    },
    ネットワーク: {
      description: "ネットワークとプロトコルの基礎",
      url: "/network",
      icon: Network,
      color: "bg-cyan-500",
    },
    機械学習: {
      description: "AIと機械学習の基本概念",
      url: "/ml",
      icon: Brain,
      color: "bg-indigo-500",
    },
  };

  // sidebarDataから表示用のセクションデータを生成
  const sections = sidebarData.map((sectionData) => {
    const config =
      sectionConfig[sectionData.section as keyof typeof sectionConfig];

    // 主要なトピックを最大4つ取得
    const topics = sectionData.content.slice(0, 4).map((item) => item.title);

    return {
      title: sectionData.section,
      description:
        config?.description || `${sectionData.section}に関する学習内容`,
      url: config?.url || `/${sectionData.section.toLowerCase()}`,
      icon: config?.icon || BookOpen,
      color: config?.color || "bg-gray-500",
      topics: topics,
    };
  });

  return (
    <div className="p-6 max-w-7xl mx-auto bg-background text-foreground">
      {/* ヘッダーセクション */}
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent p-4">
          AlgoPrism
        </h1>
        <p className="text-xl leading-relaxed max-w-3xl mx-auto">
          コンピュータサイエンスの基礎からアルゴリズム、データ構造まで
          <br />
          視覚的でインタラクティブな学習体験を提供します
        </p>
      </div>

      {/* 特徴セクション */}
      <section className="mb-16 p-8 rounded-xl bg-card neumorphic-shadow">
        <h2 className="text-3xl font-bold mb-6 text-center">
          🎯 学習の特徴
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-lg neumorphic-shadow bg-card">
            <h3 className="font-semibold mb-3 text-lg">
              📊 視覚的学習
            </h3>
            <p className="text-sm">
              アニメーションと図解で複雑なアルゴリズムを直感的に理解できます
            </p>
          </div>
          <div className="p-6 rounded-lg neumorphic-shadow bg-card">
            <h3 className="font-semibold mb-3 text-lg">
              🔧 実践的コード
            </h3>
            <p className="text-sm">
              JavaScriptとPythonの両方でサンプルコードを提供し、実装まで学べます
            </p>
          </div>
          <div className="p-6 rounded-lg neumorphic-shadow bg-card">
            <h3 className="font-semibold mb-3 text-lg">
              🎮 インタラクティブ
            </h3>
            <p className="text-sm">
              実際にパラメータを変更して、アルゴリズムの動作を体験できます
            </p>
          </div>
        </div>
      </section>

      {/* メインコンテンツ */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {sections.map((section) => {
          const IconComponent = section.icon;
          return (
            <Link
              key={section.title}
              href={section.url}
              className="group block p-6 rounded-xl transition-all duration-300 transform hover:-translate-y-1 neumorphic-shadow hover:neumorphic-shadow-inset bg-card text-foreground"
            >
              <div className="flex items-center mb-4">
                <div className={`${section.color} p-3 rounded-lg mr-4`}>
                  <IconComponent className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold group-hover:text-blue-600 transition-colors">
                    {section.title}
                  </h3>
                  <p className="text-sm">
                    {section.description}
                  </p>
                </div>
              </div>

              <div className="border-t pt-4 mb-4">
                <h4 className="text-sm font-semibold mb-2">
                  主なトピック:
                </h4>
                <ul className="text-sm space-y-1">
                  {section.topics.map((topic, index) => (
                    <li key={index} className="flex items-center">
                      <span className="w-1 h-1 bg-gray-400 rounded-full mr-2"></span>
                      {topic}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex items-center text-blue-600 font-medium text-sm group-hover:text-blue-700">
                学習を始める
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          );
        })}
      </section>

      {/* フッターメッセージ */}
      <section className="mt-16 text-center">
        <div className="p-8 rounded-xl neumorphic-shadow bg-card text-foreground">
          <h3 className="text-2xl font-bold mb-4">学習を始めましょう！</h3>
          <p className="text-lg opacity-90">
            各セクションから興味のある分野を選んで、アルゴリズムの世界を探索してください。
          </p>
        </div>
      </section>
    </div>
  );
}
