"use client";

import React, { useState, useEffect } from "react";
import { basicsMap } from "@/data/basicsMap";
import { glossary } from "@/data/glossary";

export const runtime = "edge";

// 用語辞書

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
            className="text-blue-600 hover:text-blue-800 cursor-pointer underline decoration-dotted hover:decoration-solid transition-colors"
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

  return (
    <div className="p-6 max-w-6xl mx-auto relative">
      {/* ページタイトル */}
      <h1 className="text-4xl font-bold mb-6 text-center text-blue-700">
        {currentTopic.name}
      </h1>

      {/* 導入（一言でいうと） */}
      <section className="mb-8 bg-yellow-50 p-6 rounded-lg border-l-4 border-yellow-400">
        <h2 className="text-2xl font-bold mb-4 text-yellow-800">
          💡 一言でいうと
        </h2>
        <p className="text-lg font-medium text-gray-800 mb-2">
          {renderTextWithTerms(currentTopic.description)}
        </p>
        <div className="text-gray-700">
          {renderTextWithTerms(
            currentTopic.overview || currentTopic.example || ""
          )}
        </div>
      </section>

      {/* キーポイント */}
      <section className="mb-8 bg-blue-50 p-6 rounded-lg border-l-4 border-blue-400">
        <h2 className="text-2xl font-bold mb-4 text-blue-800">
          🔑 重要なポイント
        </h2>
        <div className="space-y-3">
          {currentTopic.keyPoints?.map((point, index) => (
            <div
              key={index}
              className="bg-white p-4 rounded-md border-l-4 border-blue-200"
            >
              <p className="text-gray-700 leading-relaxed">
                {renderTextWithTerms(point)}
              </p>
            </div>
          )) || (
            <div className="bg-white p-4 rounded-md border-l-4 border-blue-200">
              <p className="text-gray-700 leading-relaxed">
                {renderTextWithTerms(
                  currentTopic.features || "キーポイントを読み込み中..."
                )}
              </p>
            </div>
          )}
        </div>
      </section>

      {/* 詳しい説明 */}
      <section className="mb-8 bg-green-50 p-6 rounded-lg border-l-4 border-green-400">
        <h2 className="text-2xl font-bold mb-4 text-green-800">
          📚 詳しい説明
        </h2>
        <div className="bg-white p-4 rounded-md border">
          <p className="text-gray-700 leading-relaxed whitespace-pre-line">
            {renderTextWithTerms(
              currentTopic.detailedExplanation ||
                currentTopic.structure ||
                "詳細説明を読み込み中..."
            )}
          </p>
        </div>
      </section>

      {/* ビジュアライザー */}
      {/* <section className="mb-8 bg-indigo-50 p-6 rounded-lg border-l-4 border-indigo-400">
        <h2 className="text-2xl font-bold mb-4 text-indigo-800">
          🎮 インタラクティブデモ
        </h2>
        <div className="bg-white p-4 rounded-md border">{getVisualizer()}</div>
      </section> */}

      {/* 実世界での応用例 */}
      <section className="mb-8 bg-purple-50 p-6 rounded-lg border-l-4 border-purple-400">
        <h2 className="text-2xl font-bold mb-4 text-purple-800">
          🌍 実世界での応用例
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {currentTopic.realWorldExamples?.map((example, index) => (
            <div key={index} className="bg-white p-4 rounded-md border">
              <p className="text-gray-700">{renderTextWithTerms(example)}</p>
            </div>
          )) || (
            <div className="bg-white p-4 rounded-md border col-span-full">
              <p className="text-gray-700">
                {renderTextWithTerms(
                  currentTopic.realWorldExample || "応用例を読み込み中..."
                )}
              </p>
            </div>
          )}
        </div>
      </section>

      {/* なぜ重要なのか */}
      <section className="mb-8 bg-red-50 p-6 rounded-lg border-l-4 border-red-400">
        <h2 className="text-2xl font-bold mb-4 text-red-800">
          ⚡ なぜ重要なのか
        </h2>
        <div className="bg-white p-4 rounded-md border">
          <p className="text-gray-700 leading-relaxed">
            {renderTextWithTerms(currentTopic.importance)}
          </p>
        </div>
      </section>

      {/* 次のステップ */}
      <section className="bg-gray-50 p-6 rounded-lg border">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">
          � 次に学ぶべきトピック
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {currentTopic.nextSteps?.map((step, index) => (
            <div
              key={index}
              className="bg-white p-3 rounded-md border border-gray-200"
            >
              <p className="text-gray-700 text-sm">
                {renderTextWithTerms(step)}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ツールチップ */}
      {selectedTerm && (
        <>
          {/* ツールチップ */}
          <div
            className="fixed z-50 bg-white border-2 border-blue-300 rounded-lg shadow-lg p-4 max-w-sm pointer-events-auto"
            style={{
              left: `${tooltipPosition.x}px`,
              top: `${tooltipPosition.y}px`,
              transform: "translate(-50%, -100%)",
            }}
            onMouseEnter={handleTooltipHover}
            onMouseLeave={handleTooltipLeave}
          >
            <div className="flex items-start justify-between mb-2">
              <h3 className="text-lg font-bold text-blue-700">
                {selectedTerm}
              </h3>
              <button
                onClick={() => setSelectedTerm(null)}
                className="text-gray-400 hover:text-gray-600 ml-2"
              >
                ✕
              </button>
            </div>
            <p className="text-gray-700 text-sm leading-relaxed">
              {glossary[selectedTerm]}
            </p>

            {/* 矢印 */}
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-t-8 border-transparent border-t-blue-300" />
          </div>
        </>
      )}
    </div>
  );
};

export default BasicsPage;
