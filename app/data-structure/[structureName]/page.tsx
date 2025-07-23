"use client";

import React, { useState, useEffect } from "react";
import { dataStructureMap } from "@/data/dataStructureMap";
import CodeBlock from "@/components/CodeBlock";
import { glossary } from "@/data/glossary";

// ビジュアライザーコンポーネントの動的インポート
import ArrayVisualizer from "@/components/visualizers/data-structure/ArrayVisualizer";
import LinkedListVisualizer from "@/components/visualizers/data-structure/LinkedListVisualizer";
import StackVisualizer from "@/components/visualizers/data-structure/StackVisualizer";
import QueueVisualizer from "@/components/visualizers/data-structure/QueueVisualizer";
import HashTableVisualizer from "@/components/visualizers/data-structure/HashTableVisualizer";
import BSTVisualizer from "@/components/visualizers/data-structure/BSTVisualizer";
import HeapVisualizer from "@/components/visualizers/data-structure/HeapVisualizer";
import GraphVisualizer from "@/components/visualizers/data-structure/GraphVisualizer";

export const runtime = "edge";
interface DataStructurePageProps {
  params: Promise<{
    structureName: string;
  }>;
}

const DataStructurePage: React.FC<DataStructurePageProps> = ({ params }) => {
  const resolvedParams = React.use(params);
  const { structureName } = resolvedParams;
  const [jsCode, setJsCode] = useState<string>("");
  const [pyCode, setPyCode] = useState<string>("");
  const [tooltip, setTooltip] = useState<{
    text: string;
    x: number;
    y: number;
  } | null>(null);
  const [hoverTimeout, setHoverTimeout] = useState<NodeJS.Timeout | null>(null);

  const currentStructure =
    dataStructureMap[structureName] || dataStructureMap["array"];

  // デバッグ: glossary の内容確認
  console.log("Glossary keys:", Object.keys(glossary));
  console.log("Sample glossary entry:", glossary["メモリ"]);

  // 用語をハイライトしてホバー機能を追加する関数
  const renderTextWithTerms = (text: string) => {
    const terms = Object.keys(glossary);
    let result: React.ReactNode[] = [];
    let remaining = text;
    let index = 0;

    while (remaining.length > 0) {
      let foundTerm: string = "";
      let foundIndex = -1;

      // 最も早く見つかる用語を探す
      terms.forEach((term) => {
        const termIndex = remaining.toLowerCase().indexOf(term.toLowerCase());
        if (termIndex !== -1 && (foundIndex === -1 || termIndex < foundIndex)) {
          foundTerm = term;
          foundIndex = termIndex;
        }
      });

      if (foundTerm && foundIndex !== -1) {
        // 用語の前のテキストを追加
        if (foundIndex > 0) {
          result.push(
            <span key={`text-${index}`}>
              {remaining.substring(0, foundIndex)}
            </span>
          );
          index++;
        }

        // 用語をハイライト表示
        const currentTerm = foundTerm; // クロージャーのために変数をキャプチャ
        result.push(
          <span
            key={`term-${index}`}
            className="bg-blue-100 text-blue-800 px-1 rounded cursor-help border-b border-blue-300 hover:bg-blue-200 transition-colors"
            onMouseEnter={(e) => {
              if (hoverTimeout) clearTimeout(hoverTimeout);
              const timeout = setTimeout(() => {
                if (e.currentTarget && currentTerm) {
                  console.log("Term found:", currentTerm);
                  console.log("Glossary entry:", glossary[currentTerm]);
                  const rect = e.currentTarget.getBoundingClientRect();
                  const tooltipY =
                    rect.top > 100 ? rect.top - 10 : rect.bottom + 10;
                  setTooltip({
                    text:
                      glossary[currentTerm] ||
                      `${currentTerm} の説明が見つかりません`,
                    x: rect.left + rect.width / 2,
                    y: tooltipY,
                  });
                  console.log("Tooltip set:", {
                    text: glossary[currentTerm],
                    x: rect.left + rect.width / 2,
                    y: tooltipY,
                    rectTop: rect.top,
                    rectBottom: rect.bottom,
                  });
                }
              }, 100); // 遅延を短縮
              setHoverTimeout(timeout);
            }}
            onMouseLeave={() => {
              if (hoverTimeout) clearTimeout(hoverTimeout);
              const timeout = setTimeout(() => {
                setTooltip(null);
              }, 200);
              setHoverTimeout(timeout);
            }}
          >
            {foundTerm}
          </span>
        );
        index++;

        // 処理済みの部分を削除
        remaining = remaining.substring(foundIndex + foundTerm.length);
      } else {
        // 用語が見つからない場合、残りのテキストをすべて追加
        result.push(<span key={`text-${index}`}>{remaining}</span>);
        break;
      }
    }

    return result.length > 0 ? result : text;
  };

  // ビジュアライザーコンポーネントのマッピング
  const getVisualizer = () => {
    switch (structureName) {
      case "array":
        return <ArrayVisualizer />;
      case "linked-list":
        return <LinkedListVisualizer />;
      case "stack":
        return <StackVisualizer />;
      case "queue":
        return <QueueVisualizer />;
      case "hash-table":
        return <HashTableVisualizer />;
      case "binary-search-tree":
        return <BSTVisualizer />;
      case "heap":
        return <HeapVisualizer />;
      case "graph":
        return <GraphVisualizer />;
      case "trie":
        return (
          <div className="text-center text-gray-500 py-8">
            トライ木ビジュアライザーは準備中です
          </div>
        );
      case "avl-tree":
        return (
          <div className="text-center text-gray-500 py-8">
            AVL木ビジュアライザーは準備中です
          </div>
        );
      case "b-tree":
        return (
          <div className="text-center text-gray-500 py-8">
            B木ビジュアライザーは準備中です
          </div>
        );
      default:
        return (
          <div className="text-center text-gray-500 py-8">
            ビジュアライザーが見つかりません
          </div>
        );
    }
  };

  useEffect(() => {
    const loadCodeFiles = async () => {
      try {
        const { code } = currentStructure;

        // JavaScriptコードの読み込み
        const jsCodeResponse = await fetch(code.javascript);
        const jsCodeText = await jsCodeResponse.text();

        // Pythonコードの読み込み
        const pyCodeResponse = await fetch(code.python);
        const pyCodeText = await pyCodeResponse.text();

        setJsCode(jsCodeText);
        setPyCode(pyCodeText);
      } catch (error) {
        console.error("Failed to load code files:", error);
        setJsCode("// コードファイルが見つかりません");
        setPyCode("# コードファイルが見つかりません");
      }
    };
    loadCodeFiles();
  }, [structureName, currentStructure]);

  return (
    <div className="p-6 max-w-6xl mx-auto relative">
      {/* ツールチップ */}
      {tooltip && (
        <div
          className="fixed z-[9999] bg-gray-800 text-white p-3 rounded-lg shadow-lg max-w-xs text-sm pointer-events-none border border-gray-600"
          style={{
            left: `${tooltip.x}px`,
            top: `${tooltip.y}px`,
            transform:
              tooltip.y > 100
                ? "translate(-50%, -100%)"
                : "translate(-50%, 10px)",
            zIndex: 9999,
          }}
        >
          <div className="relative">
            {tooltip.text}
            {tooltip.y > 100 ? (
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-800"></div>
            ) : (
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-b-4 border-transparent border-b-gray-800"></div>
            )}
          </div>
        </div>
      )}

      {/* ページタイトル */}
      <h1 className="text-4xl font-bold mb-6 text-center text-blue-700">
        {currentStructure.name}
      </h1>

      {/* プリズム・デモセクション */}
      <section className="mb-12 bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg border">
        <h2 className="text-2xl font-bold mb-4 text-blue-800">
          🔍 プリズム・デモ：見て、触って、理解する
        </h2>
        <div className="bg-white p-4 rounded-md border-l-4 border-blue-500 mb-4">
          <p className="text-gray-700 leading-relaxed">
            {renderTextWithTerms(
              "データ構造は、文字や図だけでは理解しにくい概念です。実際にデータがどのように格納され、操作されるかを視覚的に体験することで、その仕組みや特徴が直感的に理解できるようになります。"
            )}
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
            デモで感じた「なぜ？」の答えを、この後の解説で一緒に見つけていきましょう。
          </p>
        </div>
      </section>

      {/* 導入（一言でいうと） */}
      <section className="mb-8 bg-yellow-50 p-6 rounded-lg border-l-4 border-yellow-400">
        <h2 className="text-2xl font-bold mb-4 text-yellow-800">
          💡 一言でいうと
        </h2>
        <p className="text-lg font-medium text-gray-800 mb-2">
          {renderTextWithTerms(currentStructure.description)}
        </p>
        <p className="text-gray-700">
          {renderTextWithTerms(currentStructure.features)}
        </p>
      </section>

      {/* 身近な例え話 */}
      <section className="mb-8 bg-green-50 p-6 rounded-lg border-l-4 border-green-400">
        <h2 className="text-2xl font-bold mb-4 text-green-800">
          🌟 身近な例え話
        </h2>
        <p className="text-gray-700 leading-relaxed">
          {renderTextWithTerms(currentStructure.example)}
        </p>
      </section>

      {/* 仕組みのステップ解説 */}
      <section className="mb-8 bg-purple-50 p-6 rounded-lg border-l-4 border-purple-400">
        <h2 className="text-2xl font-bold mb-4 text-purple-800">
          ⚙️ 仕組みのステップ解説
        </h2>
        <div className="bg-white p-4 rounded-md border">
          <p className="text-gray-700 leading-relaxed">
            {renderTextWithTerms(currentStructure.structure)}
          </p>
        </div>
      </section>

      {/* 疑似コード */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">📝 疑似コード</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-xl font-medium mb-3 text-blue-700">
              JavaScript
            </h3>
            {jsCode && (
              <CodeBlock>
                <code className="language-javascript">{jsCode}</code>
              </CodeBlock>
            )}
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-xl font-medium mb-3 text-green-700">Python</h3>
            {pyCode && (
              <CodeBlock>
                <code className="language-python">{pyCode}</code>
              </CodeBlock>
            )}
          </div>
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
            <p className="text-gray-700">
              {renderTextWithTerms(currentStructure.features)}
            </p>
          </div>
          <div className="bg-white p-4 rounded-md border border-red-200">
            <h3 className="text-lg font-medium mb-2 text-red-700">⚠️ 短所</h3>
            <p className="text-gray-700">
              {renderTextWithTerms(
                "実装によっては複雑になる場合があり、メモリ使用量が多くなることがあります。"
              )}
            </p>
          </div>
        </div>

        <div className="bg-white p-4 rounded-md border">
          <h3 className="text-lg font-medium mb-3 text-gray-800">📊 計算量</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div className="text-center">
              <p className="font-medium text-blue-600">アクセス</p>
              <p className="text-lg font-bold">
                {currentStructure.timeComplexity.access}
              </p>
            </div>
            <div className="text-center">
              <p className="font-medium text-green-600">検索</p>
              <p className="text-lg font-bold">
                {currentStructure.timeComplexity.search}
              </p>
            </div>
            <div className="text-center">
              <p className="font-medium text-orange-600">挿入</p>
              <p className="text-lg font-bold">
                {currentStructure.timeComplexity.insertion}
              </p>
            </div>
            <div className="text-center">
              <p className="font-medium text-red-600">削除</p>
              <p className="text-lg font-bold">
                {currentStructure.timeComplexity.deletion}
              </p>
            </div>
          </div>
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600">
              空間計算量:{" "}
              <span className="font-bold">
                {currentStructure.spaceComplexity}
              </span>
            </p>
          </div>
          <div className="mt-2 text-xs text-gray-500">
            <p>
              {renderTextWithTerms(
                "💡 計算量とは、データ量が増えた時の処理時間やメモリ使用量の増加率を表します。O(1)は常に一定、O(n)はデータ量に比例、O(log n)はデータ量の対数に比例して増加します。"
              )}
            </p>
          </div>
        </div>
      </section>

      {/* まとめ */}
      <section className="bg-gray-50 p-6 rounded-lg border">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">📋 まとめ</h2>
        <div className="space-y-3">
          <p className="text-gray-700 leading-relaxed">
            <strong>{currentStructure.name}</strong>は、
            {renderTextWithTerms(currentStructure.description.toLowerCase())}
            です。
            {renderTextWithTerms(currentStructure.example)}
          </p>
          <p className="text-gray-700 leading-relaxed">
            {renderTextWithTerms(
              "この理解を深めるために、次のようなトピックも学習することをお勧めします："
            )}
          </p>
          <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
            <li>{renderTextWithTerms("他のデータ構造との比較と使い分け")}</li>
            <li>{renderTextWithTerms("実際のプログラミングでの応用例")}</li>
            <li>{renderTextWithTerms("アルゴリズムとの組み合わせ")}</li>
            <li>{renderTextWithTerms("パフォーマンスの最適化技術")}</li>
          </ul>
        </div>
      </section>
    </div>
  );
};

export default DataStructurePage;
