"use client";

import React, { useState, useEffect } from "react";
import CodeBlock from "@/components/CodeBlock";
import Mermaid from "@/components/Mermaid";
import OSISimulator from "@/components/OSISimulator";
import OSILayerGuide from "@/components/OSILayerGuide";
import OSIQuiz from "@/components/OSIQuiz";
import { networkMap } from "@/data/networkMap";

const OSIModelPage: React.FC = () => {
  const [jsCode, setJsCode] = useState<string>("");
  const [pyCode, setPyCode] = useState<string>("");

  const currentTopic = networkMap["osi-model"];

  useEffect(() => {
    const loadCodeFiles = async () => {
      if (!currentTopic) return;
      const { code } = currentTopic;

      try {
        const jsCodeResponse = await fetch(code.javascript);
        const jsCodeText = await jsCodeResponse.text();
        setJsCode(jsCodeText);
      } catch {
        setJsCode("");
      }

      try {
        const pyCodeResponse = await fetch(code.python);
        const pyCodeText = await pyCodeResponse.text();
        setPyCode(pyCodeText);
      } catch {
        setPyCode("");
      }
    };
    loadCodeFiles();
  }, [currentTopic]);

  if (!currentTopic) {
    return (
      <div className="container mx-auto p-4 md:p-8">
        Network topic not found.
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 md:p-8 bg-background text-foreground">
      <h1 className="text-4xl font-extrabold mb-6 text-center text-foreground">
        {currentTopic.name}
      </h1>

      <p className="text-center text-lg text-foreground mb-8">
        データの送信プロセスをステップ・バイ・ステップで体験しよう
      </p>

      {/* インタラクティブシミュレーター */}
      <div className="mb-12">
        <h2 className="text-3xl font-bold mb-6 text-foreground text-center">
          🔬 インタラクティブシミュレーター
        </h2>
        <OSISimulator />
      </div>

      {/* 詳細ガイド */}
      <div className="mb-12">
        <h2 className="text-3xl font-bold mb-6 text-foreground text-center">
          📚 7階層 詳細ガイド
        </h2>
        <OSILayerGuide />
      </div>

      {/* 理解度チェック */}
      <div className="mb-12">
        <h2 className="text-3xl font-bold mb-6 text-foreground text-center">
          🧠 理解度チェック
        </h2>
        <OSIQuiz />
      </div>

      <div className="grid grid-cols-1 gap-8">
        <div className="p-6 rounded-lg neumorphic-shadow bg-card">
          <h2 className="text-2xl font-bold mb-4 text-foreground">
            ネットワーク構造図
          </h2>
          <div className="mb-8 flex justify-center">
            <Mermaid chart={currentTopic.uml} />
          </div>
        </div>

        <div className="flex flex-col space-y-8">
          <div className="p-6 rounded-lg neumorphic-shadow bg-card">
            <div className="space-y-4 text-foreground">
              <div>
                <h3 className="text-xl font-semibold mb-2 text-foreground">一言でいうと</h3>
                <p>{currentTopic.inANutshell}</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2 text-foreground">目的</h3>
                <p>{currentTopic.purpose}</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2 text-foreground">例え話</h3>
                <p>{currentTopic.analogy}</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2 text-foreground">構造</h3>
                <p>{currentTopic.structure}</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2 text-foreground">メリット</h3>
                <p>{currentTopic.pros}</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2 text-foreground">デメリット</h3>
                <p>{currentTopic.cons}</p>
              </div>
            </div>
            <div className="mt-8">
              <h2 className="text-2xl font-semibold mb-2 text-foreground">実装例</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-md neumorphic-shadow bg-card">
                  <h3 className="text-xl font-medium mb-2 text-foreground">JavaScript</h3>
                  {jsCode && (
                    <CodeBlock>
                      <code className="language-javascript">{jsCode}</code>
                    </CodeBlock>
                  )}
                </div>
                <div className="p-4 rounded-md neumorphic-shadow bg-card">
                  <h3 className="text-xl font-medium mb-2 text-foreground">Python</h3>
                  {pyCode && (
                    <CodeBlock>
                      <code className="language-python">{pyCode}</code>
                    </CodeBlock>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OSIModelPage;
