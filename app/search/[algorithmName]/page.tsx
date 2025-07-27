"use client";

import React, { useState, useEffect } from "react";
import { searchAlgorithmMap } from "@/data/searchMap";
import CodeBlock from "@/components/CodeBlock";
import SearchVisualizer from "@/components/visualizers/SearchVisualizer";

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

  const currentAlgorithm =
    searchAlgorithmMap[algorithmName] || searchAlgorithmMap["linear-search"];

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
    <div className="min-h-screen bg-background text-foreground">
      <div className="max-w-6xl mx-auto p-6">
        {/* ヘッダー */}
        <div className="p-8 mb-8 neumorphic-shadow bg-card">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            {currentAlgorithm.title}
          </h1>
          <p className="text-lg text-gray-600">
            {currentAlgorithm.oneLineDescription}
          </p>
        </div>

        {/* プリズム・デモ */}
        <div className="p-8 mb-8 neumorphic-shadow bg-card">
          <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center">
            <span className="text-2xl mr-3">🔍</span>
            プリズム・デモ：見て、触って、理解する
          </h2>
          <p className="text-foreground mb-6">{currentAlgorithm.demoIntro}</p>

          <SearchVisualizer algorithmName={algorithmName} />

          <p className="text-foreground mt-4">{currentAlgorithm.demoBridge}</p>
        </div>

        {/* 導入（一言でいうと） */}
        <div className="p-8 mb-8 neumorphic-shadow bg-card">
          <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center">
            <span className="text-2xl mr-3">💡</span>
            導入（一言でいうと）
          </h2>
          <div className="p-6 rounded-lg neumorphic-shadow-inset bg-card">
            <p className="text-lg font-semibold text-foreground mb-3">
              {currentAlgorithm.catchyDescription}
            </p>
            <p className="text-foreground">{currentAlgorithm.purpose}</p>
          </div>
        </div>

        {/* 身近な例え話 */}
        <div className="p-8 mb-8 neumorphic-shadow bg-card">
          <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center">
            <span className="text-2xl mr-3">🏠</span>
            身近な例え話
          </h2>
          <div className="p-6 rounded-lg neumorphic-shadow-inset bg-card">
            <p className="text-foreground leading-relaxed">
              {currentAlgorithm.analogy}
            </p>
          </div>
        </div>

        {/* 仕組みのステップ解説 */}
        <div className="p-8 mb-8 neumorphic-shadow bg-card">
          <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center">
            <span className="text-2xl mr-3">⚙️</span>
            仕組みのステップ解説
          </h2>
          <div className="space-y-4">
            {currentAlgorithm.steps.map((step: string, index: number) => (
              <div key={index} className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold neumorphic-shadow-inset">
                  {index + 1}
                </div>
                <div className="flex-1">
                  <p className="text-foreground leading-relaxed">{step}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 特徴（長所と短所） */}
        <div className="p-8 mb-8 neumorphic-shadow bg-card">
          <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center">
            <span className="text-2xl mr-3">⚖️</span>
            特徴（長所と短所）
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-4 rounded-md neumorphic-shadow-inset bg-card">
              <h3 className="text-lg font-semibold text-foreground mb-3 flex items-center">
                <span className="mr-2">👍</span>長所
              </h3>
              <ul className="space-y-2">
                {currentAlgorithm.advantages.map(
                  (advantage: string, index: number) => (
                    <li key={index} className="flex items-start">
                      <span className="text-primary mr-2 mt-1">•</span>
                      <span className="text-foreground">{advantage}</span>
                    </li>
                  )
                )}
              </ul>
            </div>
            <div className="p-4 rounded-md neumorphic-shadow-inset bg-card">
              <h3 className="text-lg font-semibold text-foreground mb-3 flex items-center">
                <span className="mr-2">👎</span>短所
              </h3>
              <ul className="space-y-2">
                {currentAlgorithm.disadvantages.map(
                  (disadvantage: string, index: number) => (
                    <li key={index} className="flex items-start">
                      <span className="text-primary mr-2 mt-1">•</span>
                      <span className="text-foreground">{disadvantage}</span>
                    </li>
                  )
                )}
              </ul>
            </div>
          </div>

          {/* 計算量 */}
          <div className="mt-6 p-4 rounded-lg neumorphic-shadow-inset bg-card">
            <h4 className="text-lg font-semibold text-foreground mb-3">
              計算量
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center">
                <p className="text-sm text-foreground">最良の場合</p>
                <p className="text-lg font-bold text-primary">
                  {currentAlgorithm.complexity.best}
                </p>
              </div>
              <div className="text-center">
                <p className="text-sm text-foreground">平均的な場合</p>
                <p className="text-lg font-bold text-primary">
                  {currentAlgorithm.complexity.average}
                </p>
              </div>
              <div className="text-center">
                <p className="text-sm text-foreground">最悪の場合</p>
                <p className="text-lg font-bold text-primary">
                  {currentAlgorithm.complexity.worst}
                </p>
              </div>
            </div>
            <p className="text-sm text-foreground mt-4">
              {currentAlgorithm.complexityExplanation}
            </p>
          </div>
        </div>

        {/* 疑似コード */}
        <div className="p-8 mb-8 neumorphic-shadow bg-card">
          <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center">
            <span className="text-2xl mr-3">📝</span>
            疑似コード
          </h2>
          <div className="p-6 rounded-lg neumorphic-shadow-inset bg-card">
            <pre className="text-sm leading-relaxed whitespace-pre-wrap">
              {currentAlgorithm.pseudoCode}
            </pre>
          </div>
        </div>

        {/* ソースコード */}
        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-2 text-foreground">
            コード例
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="rounded-md  ">
              {jsCode && (
                <CodeBlock>
                  <code className="language-javascript">{jsCode}</code>
                </CodeBlock>
              )}
            </div>
            <div className="rounded-md ">
              {pyCode && (
                <CodeBlock>
                  <code className="language-python">{pyCode}</code>
                </CodeBlock>
              )}
            </div>
          </div>
        </div>

        {/* まとめ */}
        <div className="p-8 neumorphic-shadow bg-card">
          <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center">
            <span className="text-2xl mr-3">📚</span>
            まとめ
          </h2>
          <div className="space-y-4">
            <p className="text-foreground leading-relaxed">
              {currentAlgorithm.summary}
            </p>
            <div className="p-6 rounded-lg neumorphic-shadow-inset bg-card">
              <h3 className="text-lg font-semibold text-foreground mb-3">
                次に学ぶべきトピック
              </h3>
              <ul className="space-y-2">
                {currentAlgorithm.nextTopics.map(
                  (topic: string, index: number) => (
                    <li key={index} className="flex items-start">
                      <span className="text-primary mr-2 mt-1">•</span>
                      <span className="text-foreground">{topic}</span>
                    </li>
                  )
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchAlgorithmPage;
