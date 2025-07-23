"use client";

import React from "react";
import { basicsMap } from "@/data/basicsMap";

// ビジュアライザーコンポーネントの動的インポート
import CPUArchitectureDemo from "@/components/visualizers/basics/CPUArchitectureDemo";
import LogicalOperationsDemo from "@/components/visualizers/basics/LogicalOperationsDemo";
import NumberSystemsDemo from "@/components/visualizers/basics/NumberSystemsDemo";
import SetTheoryDemo from "@/components/visualizers/basics/SetTheoryDemo";
import MemoryHierarchyDemo from "@/components/visualizers/basics/MemoryHierarchyDemo";
import ProcessThreadDemo from "@/components/visualizers/basics/ProcessThreadDemo";
import ComplexityDemo from "@/components/visualizers/basics/ComplexityDemo";

export const runtime = "edge";

interface BasicsPageProps {
  params: Promise<{
    topicName: string;
  }>;
}

const BasicsPage: React.FC<BasicsPageProps> = ({ params }) => {
  const resolvedParams = React.use(params);
  const { topicName } = resolvedParams;

  const currentTopic = basicsMap[topicName] || basicsMap["cpu-architecture"];

  // ビジュアライザーコンポーネントのマッピング
  const getVisualizer = () => {
    switch (topicName) {
      case "cpu-architecture":
        return <CPUArchitectureDemo />;
      case "logical-operations":
        return <LogicalOperationsDemo />;
      case "number-systems":
        return <NumberSystemsDemo />;
      case "set-theory":
        return <SetTheoryDemo />;
      case "memory-and-storage":
        return <MemoryHierarchyDemo />;
      case "process-thread":
        return <ProcessThreadDemo />;
      case "gpu-architecture":
        return (
          <div className="text-center text-gray-500 py-8">
            <div className="text-6xl mb-4">🖥️</div>
            <p className="text-lg font-medium">GPU並列処理の概念図</p>
            <p className="text-sm mt-2">
              数千のコアが並列して動作する様子を想像してみましょう
            </p>
          </div>
        );
      case "hardware":
        return (
          <div className="text-center text-gray-500 py-8">
            <div className="text-6xl mb-4">🔧</div>
            <p className="text-lg font-medium">ハードウェアコンポーネント図</p>
            <p className="text-sm mt-2">
              CPU、メモリ、ストレージの関係を理解しましょう
            </p>
          </div>
        );
      case "software":
        return (
          <div className="text-center text-gray-500 py-8">
            <div className="text-6xl mb-4">💾</div>
            <p className="text-lg font-medium">ソフトウェア階層構造</p>
            <p className="text-sm mt-2">
              OS、ミドルウェア、アプリケーションの関係
            </p>
          </div>
        );
      case "os-role":
        return (
          <div className="text-center text-gray-500 py-8">
            <div className="text-6xl mb-4">⚙️</div>
            <p className="text-lg font-medium">OS機能の概念図</p>
            <p className="text-sm mt-2">
              プロセス管理、メモリ管理、ファイル管理の役割
            </p>
          </div>
        );
      case "memory-management":
        return (
          <div className="text-center text-gray-500 py-8">
            <div className="text-6xl mb-4">🧠</div>
            <p className="text-lg font-medium">メモリ管理の仕組み</p>
            <p className="text-sm mt-2">仮想メモリとページングの概念</p>
          </div>
        );
      case "complexity":
        return <ComplexityDemo />;
      default:
        return (
          <div className="text-center text-gray-500 py-8">
            <div className="text-6xl mb-4">💡</div>
            <p className="text-lg font-medium">概念的理解のための視覚的説明</p>
            <p className="text-sm mt-2">
              {currentTopic.name}の仕組みを図解で理解しましょう
            </p>
          </div>
        );
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* ページタイトル */}
      <h1 className="text-4xl font-bold mb-6 text-center text-blue-700">
        {currentTopic.name}
      </h1>

      {/* プリズム・デモセクション */}
      <section className="mb-12 bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg border">
        <h2 className="text-2xl font-bold mb-4 text-blue-800">
          🔍 プリズム・デモ：見て、触って、理解する
        </h2>
        <div className="bg-white p-4 rounded-md border-l-4 border-blue-500 mb-4">
          <p className="text-gray-700 leading-relaxed">
            コンピュータサイエンスの基礎概念は、抽象的で理解しにくい場合があります。
            実際の動作や仕組みを視覚的に体験することで、その本質や重要性が直感的に理解できるようになります。
          </p>
        </div>

        {/* 簡単な視覚化エリア */}
        <div className="bg-white p-6 rounded-md border border-gray-200 min-h-[400px]">
          {getVisualizer()}
        </div>

        <div className="mt-4 text-sm text-blue-600">
          <p>
            💡
            この視覚的な理解が、後の「仕組みの解説」や「特徴」セクションの理解に繋がります。
            概念で感じた「なぜ？」の答えを、この後の解説で一緒に見つけていきましょう。
          </p>
        </div>
      </section>

      {/* 導入（一言でいうと） */}
      <section className="mb-8 bg-yellow-50 p-6 rounded-lg border-l-4 border-yellow-400">
        <h2 className="text-2xl font-bold mb-4 text-yellow-800">
          💡 一言でいうと
        </h2>
        <p className="text-lg font-medium text-gray-800 mb-2">
          {currentTopic.description}
        </p>
        <p className="text-gray-700">{currentTopic.features}</p>
      </section>

      {/* 身近な例え話 */}
      <section className="mb-8 bg-green-50 p-6 rounded-lg border-l-4 border-green-400">
        <h2 className="text-2xl font-bold mb-4 text-green-800">
          🌟 身近な例え話
        </h2>
        <p className="text-gray-700 leading-relaxed whitespace-pre-line">
          {currentTopic.example}
        </p>
      </section>

      {/* 仕組みのステップ解説 */}
      <section className="mb-8 bg-purple-50 p-6 rounded-lg border-l-4 border-purple-400">
        <h2 className="text-2xl font-bold mb-4 text-purple-800">
          ⚙️ 仕組みのステップ解説
        </h2>
        <div className="bg-white p-4 rounded-md border">
          <p className="text-gray-700 leading-relaxed whitespace-pre-line">
            {currentTopic.structure}
          </p>
        </div>
      </section>

      {/* 特徴（長所と短所） */}
      <section className="mb-8 bg-red-50 p-6 rounded-lg border-l-4 border-red-400">
        <h2 className="text-2xl font-bold mb-4 text-red-800">
          ⚡ 特徴（長所と短所）
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-white p-4 rounded-md border border-green-200">
            <h3 className="text-lg font-medium mb-2 text-green-700">✅ 長所</h3>
            <p className="text-gray-700">{currentTopic.pros}</p>
          </div>
          <div className="bg-white p-4 rounded-md border border-red-200">
            <h3 className="text-lg font-medium mb-2 text-red-700">⚠️ 短所</h3>
            <p className="text-gray-700">{currentTopic.cons}</p>
          </div>
        </div>

        <div className="bg-white p-4 rounded-md border">
          <h3 className="text-lg font-medium mb-3 text-gray-800">
            🌍 実世界での応用例
          </h3>
          <p className="text-gray-700">{currentTopic.realWorldExample}</p>
        </div>
      </section>

      {/* まとめ */}
      <section className="bg-gray-50 p-6 rounded-lg border">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">📋 まとめ</h2>
        <div className="space-y-3">
          <p className="text-gray-700 leading-relaxed">
            <strong>{currentTopic.name}</strong>は、{currentTopic.description}
          </p>
          <p className="text-gray-700 leading-relaxed">
            {currentTopic.importance}
          </p>
          <p className="text-gray-700 leading-relaxed">
            この理解を深めるために、次のようなトピックも学習することをお勧めします：
          </p>
          <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
            {currentTopic.nextSteps.map((step, index) => (
              <li key={index}>{step}</li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
};

export default BasicsPage;
