"use client";

import React, { useState, useEffect } from "react";
import CodeBlock from "@/components/CodeBlock";
import Mermaid from "@/components/Mermaid";
import { patternMap } from "@/data/patternMap";

export const runtime = "edge";
interface PatternPageProps {
  params: Promise<{
    patternName: string;
  }>;
}

const PatternPage: React.FC<PatternPageProps> = ({ params }) => {
  const resolvedParams = React.use(params);
  const { patternName } = resolvedParams;

  const [jsCode, setJsCode] = useState<string>("");
  const [pyCode, setPyCode] = useState<string>("");

  const currentPattern = patternMap[patternName] || patternMap["singleton"];

  useEffect(() => {
    const loadCodeFiles = async () => {
      if (!currentPattern) return;
      const { code } = currentPattern;

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
  }, [patternName, currentPattern]);

  if (!currentPattern) {
    return (
      <div className="container mx-auto p-4 md:p-8">Pattern not found.</div>
    );
  }

  return (
    <div className="container mx-auto p-4 md:p-8 bg-background text-foreground">
      <h1 className="text-4xl font-extrabold mb-6 text-center text-foreground">
        {currentPattern.name}
      </h1>

      <div className="grid grid-cols-1 gap-8">
        <div className="p-6 rounded-lg neumorphic-shadow bg-card">
          <h2 className="text-2xl font-bold mb-4 text-foreground">
            図解エリア
          </h2>
          <div className="mb-8 flex justify-center">
            <Mermaid chart={currentPattern.uml} />
          </div>
        </div>

        <div className="flex flex-col space-y-8">
          <div className="p-6 rounded-lg neumorphic-shadow bg-card">
            <div className="space-y-4 text-foreground">
              <div>
                <h3 className="text-xl font-semibold mb-2 text-foreground">一言でいうと</h3>
                <p>{currentPattern.inANutshell}</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2 text-foreground">目的</h3>
                <p>{currentPattern.purpose}</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2 text-foreground">例え話</h3>
                <p>{currentPattern.analogy}</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2 text-foreground">構造</h3>
                <p>{currentPattern.structure}</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2 text-foreground">メリット</h3>
                <p>{currentPattern.pros}</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2 text-foreground">デメリット</h3>
                <p>{currentPattern.cons}</p>
              </div>
            </div>
            <div className="mt-8">
              <h2 className="text-2xl font-semibold mb-2 text-foreground">コード例</h2>
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

export default PatternPage;
