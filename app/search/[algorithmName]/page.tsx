"use client";

import React, { useState, useEffect } from "react";
import { searchAlgorithmMap } from "@/data/searchMap";
import CodeBlock from "@/components/CodeBlock";
import SearchVisualizer from "@/components/visualizers/SearchVisualizer";
import { glossary } from "@/data/glossary";

export const runtime = "edge";
interface SearchPageProps {
  params: Promise<{
    algorithmName: string;
  }>;
}

const SearchAlgorithmPage: React.FC<SearchPageProps> = ({ params }) => {
  const resolvedParams = React.use(params);
  const { algorithmName } = resolvedParams;
  const [jsCode, setJsCode] = useState<string>("");
  const [pyCode, setPyCode] = useState<string>("");
  const [tooltip, setTooltip] = useState<{
    text: string;
    x: number;
    y: number;
  } | null>(null);
  const [hoverTimeout, setHoverTimeout] = useState<NodeJS.Timeout | null>(null);

  const currentAlgorithm =
    searchAlgorithmMap[algorithmName] || searchAlgorithmMap["linear-search"];

  // 用語をハイライトしてホバー機能を追加する関数
  const renderTextWithTerms = (text: string) => {
    const terms = Object.keys(glossary);
    const result: React.ReactNode[] = [];
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

  const getVisualizer = () => {
    return <SearchVisualizer algorithmName={algorithmName} />;
  };

  useEffect(() => {
    const loadCodeFiles = async () => {
      const { code } = currentAlgorithm;

      try {
        // ファイルからコードをフェッチ
        const jsCodeResponse = await fetch(code.javascript);
        const jsCodeText = await jsCodeResponse.text();

        const pyCodeResponse = await fetch(code.python);
        const pyCodeText = await pyCodeResponse.text();

        setJsCode(jsCodeText);
        setPyCode(pyCodeText);
      } catch (error) {
        console.error("コードファイルの読み込みに失敗しました:", error);
        setJsCode("// コードファイルが見つかりませんでした");
        setPyCode("# コードファイルが見つかりませんでした");
      }
    };
    loadCodeFiles();
  }, [algorithmName, currentAlgorithm]);

  return (
    <div className="p-6 max-w-6xl mx-auto relative bg-background text-foreground">
      {/* ツールチップ */}
      {tooltip && (
        <div
          className="fixed z-[9999] p-3 rounded-lg shadow-lg max-w-xs text-sm pointer-events-none neumorphic-shadow bg-card text-foreground"
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
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-background"></div>
            ) : (
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-b-4 border-transparent border-b-background"></div>
            )}
          </div>
        </div>
      )}

      {/* ページタイトル */}
      <h1 className="text-4xl font-bold mb-6 text-center text-foreground">
        {currentAlgorithm.name}
      </h1>

      {/* プリズム・デモセクション */}
      <section className="mb-12 p-6 rounded-lg bg-card neumorphic-shadow">
        <h2 className="text-2xl font-bold mb-4 text-foreground">
          プリズム・デモ
        </h2>
        <div className="p-6 rounded-md  bg-card min-h-[400px]">
          {getVisualizer()}
        </div>
      </section>

      {/* 概要 */}
      <section className="mb-8 p-6 rounded-lg bg-card neumorphic-shadow">
        <h2 className="text-2xl font-bold mb-4 text-foreground">概要</h2>
        <p className="text-lg font-medium mb-2">
          {renderTextWithTerms(currentAlgorithm.description)}
        </p>
      </section>

      {/* 仕組みのステップ解説 */}
      <section className="mb-8 p-6 rounded-lg bg-card neumorphic-shadow">
        <h2 className="text-2xl font-bold mb-4 text-foreground">
          仕組みのステップ解説
        </h2>
        <div className=" rounded-md  bg-card">
          <p className="leading-relaxed">
            {renderTextWithTerms(currentAlgorithm.structure)}
          </p>
        </div>
      </section>

      {/* 特徴（長所と短所） */}
      <section className="mb-8 p-6 rounded-lg bg-card neumorphic-shadow">
        <h2 className="text-2xl font-bold mb-4 text-foreground">特徴</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="p-4 rounded-md  bg-card">
            <h3 className="text-lg font-medium mb-2 text-foreground">長所</h3>
            <ul className="list-disc list-inside space-y-1 text-foreground">
              {currentAlgorithm.pros.map((pro, index) => (
                <li key={index}>{renderTextWithTerms(pro)}</li>
              ))}
            </ul>
          </div>
          <div className="p-4 rounded-md  bg-card">
            <h3 className="text-lg font-medium mb-2 text-foreground">短所</h3>
            <ul className="list-disc list-inside space-y-1 text-foreground">
              {currentAlgorithm.cons.map((con, index) => (
                <li key={index}>{renderTextWithTerms(con)}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="p-4 rounded-md bg-card">
          <h3 className="text-lg font-medium mb-3 text-foreground">計算量</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div className="text-center">
              <p className="font-medium text-foreground">アクセス</p>
              <p className="text-lg font-bold">
                {currentAlgorithm.timeComplexity.access}
              </p>
            </div>
            <div className="text-center">
              <p className="font-medium text-foreground">検索</p>
              <p className="text-lg font-bold">
                {currentAlgorithm.timeComplexity.search}
              </p>
            </div>
            <div className="text-center">
              <p className="font-medium text-foreground">挿入</p>
              <p className="text-lg font-bold">
                {currentAlgorithm.timeComplexity.insertion}
              </p>
            </div>
            <div className="text-center">
              <p className="font-medium text-foreground">削除</p>
              <p className="text-lg font-bold">
                {currentAlgorithm.timeComplexity.deletion}
              </p>
            </div>
          </div>
          <div className="mt-4 text-center">
            <p className="text-sm text-foreground">
              空間計算量:{" "}
              <span className="font-bold">
                {currentAlgorithm.spaceComplexity}
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
      </section>

      {/* コード例 */}
      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-2 text-foreground">
          コード例
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="rounded-md">
            {jsCode && (
              <CodeBlock>
                <code className="language-javascript">{jsCode}</code>
              </CodeBlock>
            )}
          </div>
          <div className="rounded-md">
            {pyCode && (
              <CodeBlock>
                <code className="language-python">{pyCode}</code>
              </CodeBlock>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchAlgorithmPage;
