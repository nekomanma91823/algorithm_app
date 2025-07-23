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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-6xl mx-auto p-6">
        {/* ヘッダー */}
        <div className="bg-white rounded-xl shadow-md p-8 mb-8 border border-gray-200">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            {currentAlgorithm.title}
          </h1>
          <p className="text-lg text-gray-600">
            {currentAlgorithm.oneLineDescription}
          </p>
        </div>

        {/* プリズム・デモ */}
        <div className="bg-white rounded-xl shadow-md p-8 mb-8 border border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
            <span className="text-2xl mr-3">🔍</span>
            プリズム・デモ：見て、触って、理解する
          </h2>
          <p className="text-gray-600 mb-6">{currentAlgorithm.demoIntro}</p>

          <SearchVisualizer algorithmName={algorithmName} />

          <p className="text-gray-600 mt-4">{currentAlgorithm.demoBridge}</p>
        </div>

        {/* 導入（一言でいうと） */}
        <div className="bg-white rounded-xl shadow-md p-8 mb-8 border border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
            <span className="text-2xl mr-3">💡</span>
            導入（一言でいうと）
          </h2>
          <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-lg">
            <p className="text-lg font-semibold text-blue-800 mb-3">
              {currentAlgorithm.catchyDescription}
            </p>
            <p className="text-gray-700">{currentAlgorithm.purpose}</p>
          </div>
        </div>

        {/* 身近な例え話 */}
        <div className="bg-white rounded-xl shadow-md p-8 mb-8 border border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
            <span className="text-2xl mr-3">🏠</span>
            身近な例え話
          </h2>
          <div className="bg-green-50 border border-green-200 rounded-lg p-6">
            <p className="text-gray-700 leading-relaxed">
              {currentAlgorithm.analogy}
            </p>
          </div>
        </div>

        {/* 仕組みのステップ解説 */}
        <div className="bg-white rounded-xl shadow-md p-8 mb-8 border border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
            <span className="text-2xl mr-3">⚙️</span>
            仕組みのステップ解説
          </h2>
          <div className="space-y-4">
            {currentAlgorithm.steps.map((step: string, index: number) => (
              <div key={index} className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold">
                  {index + 1}
                </div>
                <div className="flex-1">
                  <p className="text-gray-700 leading-relaxed">{step}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 特徴（長所と短所） */}
        <div className="bg-white rounded-xl shadow-md p-8 mb-8 border border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
            <span className="text-2xl mr-3">⚖️</span>
            特徴（長所と短所）
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-green-700 mb-3 flex items-center">
                <span className="mr-2">👍</span>長所
              </h3>
              <ul className="space-y-2">
                {currentAlgorithm.advantages.map(
                  (advantage: string, index: number) => (
                    <li key={index} className="flex items-start">
                      <span className="text-green-500 mr-2 mt-1">•</span>
                      <span className="text-gray-700">{advantage}</span>
                    </li>
                  )
                )}
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-red-700 mb-3 flex items-center">
                <span className="mr-2">👎</span>短所
              </h3>
              <ul className="space-y-2">
                {currentAlgorithm.disadvantages.map(
                  (disadvantage: string, index: number) => (
                    <li key={index} className="flex items-start">
                      <span className="text-red-500 mr-2 mt-1">•</span>
                      <span className="text-gray-700">{disadvantage}</span>
                    </li>
                  )
                )}
              </ul>
            </div>
          </div>

          {/* 計算量 */}
          <div className="mt-6 bg-gray-50 rounded-lg p-4">
            <h4 className="text-lg font-semibold text-gray-800 mb-3">計算量</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center">
                <p className="text-sm text-gray-600">最良の場合</p>
                <p className="text-lg font-bold text-green-600">
                  {currentAlgorithm.complexity.best}
                </p>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-600">平均的な場合</p>
                <p className="text-lg font-bold text-yellow-600">
                  {currentAlgorithm.complexity.average}
                </p>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-600">最悪の場合</p>
                <p className="text-lg font-bold text-red-600">
                  {currentAlgorithm.complexity.worst}
                </p>
              </div>
            </div>
            <p className="text-sm text-gray-600 mt-4">
              {currentAlgorithm.complexityExplanation}
            </p>
          </div>
        </div>

        {/* 疑似コード */}
        <div className="bg-white rounded-xl shadow-md p-8 mb-8 border border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
            <span className="text-2xl mr-3">📝</span>
            疑似コード
          </h2>
          <div className="bg-gray-50 rounded-lg p-6">
            <pre className="text-sm text-gray-800 leading-relaxed whitespace-pre-wrap">
              {currentAlgorithm.pseudoCode}
            </pre>
          </div>
        </div>

        {/* ソースコード */}
        <div className="bg-white rounded-xl shadow-md p-8 mb-8 border border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
            <span className="text-2xl mr-3">💻</span>
            ソースコード
          </h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-700 mb-3">
                JavaScript
              </h3>
              <CodeBlock>
                <code className="language-javascript">{jsCode}</code>
              </CodeBlock>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-700 mb-3">
                Python
              </h3>
              <CodeBlock>
                <code className="language-python">{pyCode}</code>
              </CodeBlock>
            </div>
          </div>
        </div>

        {/* まとめ */}
        <div className="bg-white rounded-xl shadow-md p-8 border border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
            <span className="text-2xl mr-3">📚</span>
            まとめ
          </h2>
          <div className="space-y-4">
            <p className="text-gray-700 leading-relaxed">
              {currentAlgorithm.summary}
            </p>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-blue-800 mb-3">
                次に学ぶべきトピック
              </h3>
              <ul className="space-y-2">
                {currentAlgorithm.nextTopics.map(
                  (topic: string, index: number) => (
                    <li key={index} className="flex items-start">
                      <span className="text-blue-500 mr-2 mt-1">•</span>
                      <span className="text-gray-700">{topic}</span>
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
