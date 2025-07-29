"use client";

import React, { useState, useEffect } from "react";
import { basicsMap } from "@/data/basicsMap";
import { glossary } from "@/data/glossary";
import CodeBlock from "@/components/CodeBlock";

export const runtime = "edge";

interface BasicsPageProps {
  params: Promise<{
    topicName: string;
  }>;
}

const BasicsPage: React.FC<BasicsPageProps> = ({ params }) => {
  const resolvedParams = React.use(params);
  const { topicName } = resolvedParams;
  const [selectedTerm, setSelectedTerm] = useState<string | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const [hoverTimeout, setHoverTimeout] = useState<NodeJS.Timeout | null>(null);

  const currentTopic = basicsMap[topicName] || basicsMap["cpu-architecture"];

  // コンポーネントのクリーンアップ
  useEffect(() => {
    return () => {
      if (hoverTimeout) {
        clearTimeout(hoverTimeout);
      }
    };
  }, [hoverTimeout]);

  // テキスト内の用語をクリック可能にする関数
  const renderTextWithTerms = (text: string) => {
    if (!text) return text;

    let processedText = text;

    // 用語辞書の各用語を検索
    Object.keys(glossary).forEach((term) => {
      const regex = new RegExp(`(${term})`, "g");
      let match;
      const matches: Array<{ term: string; index: number }> = [];

      while ((match = regex.exec(text)) !== null) {
        matches.push({ term: match[1], index: match.index });
      }

      // マッチした用語を後ろから処理（インデックスがずれないように）
      matches.reverse().forEach(({ term: matchedTerm, index }) => {
        processedText =
          processedText.slice(0, index) +
          `TERM_PLACEHOLDER_${Object.keys(glossary).indexOf(
            matchedTerm
          )}_TERM` +
          processedText.slice(index + matchedTerm.length);
      });
    });

    // プレースホルダーを実際のReactコンポーネントに置換
    const parts = processedText.split(/TERM_PLACEHOLDER_(\d+)_TERM/);

    return parts.map((part, index) => {
      if (index % 2 === 1) {
        // プレースホルダー部分
        const termIndex = parseInt(part);
        const term = Object.keys(glossary)[termIndex];
        return (
          <span
            key={`${term}-${index}`}
            className="bg-blue-100 text-blue-800 px-1 rounded cursor-help border-b border-blue-300 hover:bg-blue-200 transition-colors"
            onMouseEnter={(e) => handleTermHover(term, e)}
            onMouseLeave={handleTermLeave}
          >
            {term}
          </span>
        );
      }
      return part;
    });
  };

  // 用語ホバー時の処理
  const handleTermHover = (term: string, event: React.MouseEvent) => {
    // 既存のタイムアウトをクリア
    if (hoverTimeout) {
      clearTimeout(hoverTimeout);
    }

    const rect = (event.target as HTMLElement).getBoundingClientRect();
    setTooltipPosition({
      x: rect.left + rect.width / 2,
      y: rect.top - 10,
    });

    // 少し遅延してツールチップを表示
    const timeout = setTimeout(() => {
      setSelectedTerm(term);
    }, 300);

    setHoverTimeout(timeout);
  };

  // 用語からマウスが離れた時の処理
  const handleTermLeave = () => {
    // ホバータイムアウトをクリア
    if (hoverTimeout) {
      clearTimeout(hoverTimeout);
      setHoverTimeout(null);
    }

    // 少し遅延してツールチップを非表示
    const timeout = setTimeout(() => {
      setSelectedTerm(null);
    }, 200);

    setHoverTimeout(timeout);
  };

  // ツールチップ上でのホバー処理
  const handleTooltipHover = () => {
    // ツールチップ上にマウスがある間は非表示にしない
    if (hoverTimeout) {
      clearTimeout(hoverTimeout);
      setHoverTimeout(null);
    }
  };

  // ツールチップからマウスが離れた時の処理
  const handleTooltipLeave = () => {
    const timeout = setTimeout(() => {
      setSelectedTerm(null);
    }, 200);

    setHoverTimeout(timeout);
  };

  const getVisualizer = () => {
    // basicsには専用のビジュアライザーがないため、汎用的なメッセージを表示
    return (
      <div className="text-center text-gray-500 py-8">
        このトピックのビジュアライザーは準備中です
      </div>
    );
  };

  return (
    <div className="p-6 max-w-6xl mx-auto relative bg-background text-foreground">
      {/* ツールチップ */}
      {selectedTerm && (
        <div
          className="fixed z-[9999] p-3 rounded-lg shadow-lg max-w-xs text-sm pointer-events-none neumorphic-shadow bg-card text-foreground"
          style={{
            left: `${tooltipPosition.x}px`,
            top: `${tooltipPosition.y}px`,
            transform: "translate(-50%, -100%)",
            zIndex: 9999,
          }}
          onMouseEnter={handleTooltipHover}
          onMouseLeave={handleTooltipLeave}
        >
          <div className="relative">
            {glossary[selectedTerm]}
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-background"></div>
          </div>
        </div>
      )}

      {/* ページタイトル */}
      <h1 className="text-4xl font-bold mb-6 text-center text-foreground">
        {currentTopic.name}
      </h1>

      {/* プリズム・デモセクション */}
      <section className="mb-12 p-6 rounded-lg bg-card neumorphic-shadow">
        <h2 className="text-2xl font-bold mb-4 text-foreground">
          プリズム・デモ
        </h2>
        <div className="p-6 rounded-md neumorphic-shadow-inset bg-card min-h-[400px]">
          {getVisualizer()}
        </div>
      </section>

      {/* 概要 */}
      <section className="mb-8 p-6 rounded-lg bg-card neumorphic-shadow">
        <h2 className="text-2xl font-bold mb-4 text-foreground">概要</h2>
        <p className="text-lg font-medium mb-2">
          {renderTextWithTerms(currentTopic.description)}
        </p>
      </section>

      {/* 仕組みのステップ解説 */}
      <section className="mb-8 p-6 rounded-lg bg-card neumorphic-shadow">
        <h2 className="text-2xl font-bold mb-4 text-foreground">
          仕組みのステップ解説
        </h2>
        <div className="rounded-md bg-card">
          <p className="leading-relaxed">
            {renderTextWithTerms(currentTopic.structure)}
          </p>
        </div>
      </section>

      {/* 特徴（長所と短所） */}
      <section className="mb-8 p-6 rounded-lg bg-card neumorphic-shadow">
        <h2 className="text-2xl font-bold mb-4 text-foreground">特徴</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="p-4 rounded-md bg-card">
            <h3 className="text-lg font-medium mb-2 text-foreground">長所</h3>
            <ul className="list-disc list-inside space-y-1 text-foreground">
              {currentTopic.pros?.map((pro, index) => (
                <li key={index}>{renderTextWithTerms(pro)}</li>
              ))}
            </ul>
          </div>
          <div className="p-4 rounded-md bg-card">
            <h3 className="text-lg font-medium mb-2 text-foreground">短所</h3>
            <ul className="list-disc list-inside space-y-1 text-foreground">
              {currentTopic.cons?.map((con, index) => (
                <li key={index}>{renderTextWithTerms(con)}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* 計算量（「計算量」トピックのみ表示） */}
        {currentTopic.timeComplexity && (
          <div className="p-4 rounded-md bg-card">
            <h3 className="text-lg font-medium mb-3 text-foreground">計算量</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div className="text-center">
                <p className="font-medium text-foreground">最良の場合</p>
                <p className="text-lg font-bold">
                  {currentTopic.timeComplexity.best}
                </p>
              </div>
              <div className="text-center">
                <p className="font-medium text-foreground">平均的な場合</p>
                <p className="text-lg font-bold">
                  {currentTopic.timeComplexity.average}
                </p>
              </div>
              <div className="text-center">
                <p className="font-medium text-foreground">最悪の場合</p>
                <p className="text-lg font-bold">
                  {currentTopic.timeComplexity.worst}
                </p>
              </div>
            </div>
            <div className="mt-4 text-center">
              <p className="text-sm text-foreground">
                空間計算量:{" "}
                <span className="font-bold">
                  {currentTopic.spaceComplexity}
                </span>
              </p>
            </div>
            <div className="mt-2 text-xs text-foreground">
              <p>
                {renderTextWithTerms(
                  "💡 計算量とは、データ量が増えた時の処理時間やメモリ使用量の増加率を表します。O(1)は常に一定、O(n)はデータ量に比例、O(log n)はデータ量の対数に比例して増加します。"
                )}
              </p>
            </div>
          </div>
        )}
      </section>

      {/* コード例 */}
      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-2 text-foreground">
          コード例
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="rounded-md">
            {currentTopic.code?.javascript ? (
              <CodeBlock>
                <code className="language-javascript">
                  {currentTopic.code.javascript}
                </code>
              </CodeBlock>
            ) : (
              <div className="text-center text-gray-500 py-8">
                JavaScriptのコード例は準備中です
              </div>
            )}
          </div>
          <div className="rounded-md">
            {currentTopic.code?.python ? (
              <CodeBlock>
                <code className="language-python">
                  {currentTopic.code.python}
                </code>
              </CodeBlock>
            ) : (
              <div className="text-center text-gray-500 py-8">
                Pythonのコード例は準備中です
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BasicsPage;
