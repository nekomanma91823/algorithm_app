"use client";

import React, { useState, useEffect } from "react";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import rehypePrettyCode from "rehype-pretty-code";
import CodeBlock from "@/components/CodeBlock";
import Mermaid from "@/components/Mermaid";
import { patternMap } from "@/data/patternMap";
interface PatternPageProps {
  params: Promise<{
    patternName: string;
  }>;
}
type Source = MDXRemoteSerializeResult<
  Record<string, unknown>,
  Record<string, unknown>
>;

const PatternPage: React.FC<PatternPageProps> = ({ params }) => {
  const resolvedParams = React.use(params);
  const { patternName } = resolvedParams;

  const [tsSource, setTsSource] = useState<Source | null>(null);
  const [pySource, setPySource] = useState<Source | null>(null);
  const [activeCodeTab, setActiveCodeTab] = useState<"typescript" | "python">(
    "typescript"
  );
  const [activeInfoTab, setActiveInfoTab] = useState<"explanation" | "code">(
    "explanation"
  );

  const currentPattern = patternMap[patternName] || patternMap["singleton"];

  useEffect(() => {
    const compileSource = async () => {
      if (!currentPattern) return;
      const { code } = currentPattern;

      try {
        const tsCodeResponse = await fetch(code.typescript);
        const tsCode = await tsCodeResponse.text();
        const ts = await serialize(tsCode, {
          mdxOptions: { rehypePlugins: [rehypePrettyCode] },
        });
        setTsSource(ts);
      } catch (e) {
        setTsSource(null);
      }

      try {
        const pyCodeResponse = await fetch(code.python);
        const pyCode = await pyCodeResponse.text();
        const py = await serialize(pyCode, {
          mdxOptions: { rehypePlugins: [rehypePrettyCode] },
        });
        setPySource(py);
      } catch (e) {
        setPySource(null);
      }
    };
    compileSource();
  }, [patternName, currentPattern]);

  const components = {
    pre: CodeBlock,
  };

  if (!currentPattern) {
    return (
      <div className="container mx-auto p-4 md:p-8">Pattern not found.</div>
    );
  }

  return (
    <div className="container mx-auto p-4 md:p-8">
      <h1 className="text-4xl font-extrabold mb-6 text-gray-900 dark:text-white text-center">
        {currentPattern.name}
      </h1>

      <div className="grid grid-cols-1 gap-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6">
          <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">
            図解エリア
          </h2>
          <div className="mb-8 flex justify-center">
            <Mermaid chart={currentPattern.uml} />
          </div>
        </div>

        <div className="flex flex-col space-y-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6">
            <div className="flex border-b border-gray-200 dark:border-gray-700 mb-4">
              <button
                className={`py-2 px-4 text-sm font-medium ${
                  activeInfoTab === "explanation"
                    ? "border-b-2 border-blue-500 text-blue-600 dark:text-blue-400"
                    : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                }`}
                onClick={() => setActiveInfoTab("explanation")}
              >
                解説
              </button>
              <button
                className={`py-2 px-4 text-sm font-medium ${
                  activeInfoTab === "code"
                    ? "border-b-2 border-blue-500 text-blue-600 dark:text-blue-400"
                    : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                }`}
                onClick={() => setActiveInfoTab("code")}
              >
                コード例
              </button>
            </div>

            {activeInfoTab === "explanation" && (
              <div className="space-y-4 text-gray-700 dark:text-gray-300">
                <div>
                  <h3 className="text-xl font-semibold mb-2">一言でいうと</h3>
                  <p>{currentPattern.inANutshell}</p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">目的</h3>
                  <p>{currentPattern.purpose}</p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">例え話</h3>
                  <p>{currentPattern.analogy}</p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">構造</h3>
                  <p>{currentPattern.structure}</p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">メリット</h3>
                  <p>{currentPattern.pros}</p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">デメリット</h3>
                  <p>{currentPattern.cons}</p>
                </div>
              </div>
            )}

            {activeInfoTab === "code" && (
              <div>
                <div className="flex border-b border-gray-200 dark:border-gray-700 mb-4">
                  <button
                    className={`py-2 px-4 text-sm font-medium ${
                      activeCodeTab === "typescript"
                        ? "border-b-2 border-blue-500 text-blue-600 dark:text-blue-400"
                        : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                    }`}
                    onClick={() => setActiveCodeTab("typescript")}
                  >
                    TypeScript
                  </button>
                  <button
                    className={`py-2 px-4 text-sm font-medium ${
                      activeCodeTab === "python"
                        ? "border-b-2 border-blue-500 text-blue-600 dark:text-blue-400"
                        : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                    }`}
                    onClick={() => setActiveCodeTab("python")}
                  >
                    Python
                  </button>
                </div>
                <div className="mt-4">
                  {activeCodeTab === "typescript" && tsSource && (
                    <MDXRemote {...tsSource} components={components} />
                  )}
                  {activeCodeTab === "python" && pySource && (
                    <MDXRemote {...pySource} components={components} />
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatternPage;
