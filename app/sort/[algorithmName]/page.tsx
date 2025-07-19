"use client";

import React, { useState, useEffect, useRef } from "react";
import SortVisualizer from "@/components/SortVisualizer";
import { algorithmMap } from "@/data/algorithmMap";
import CodeBlock from "@/components/CodeBlock";

interface AlgorithmPageProps {
  params: Promise<{
    algorithmName: string;
  }>;
}

const AlgorithmPage: React.FC<AlgorithmPageProps> = ({ params }) => {
  const resolvedParams = React.use(params);
  const { algorithmName } = resolvedParams;
  const [array, setArray] = useState<number[]>([]);
  const [comparingIndices, setComparingIndices] = useState<number[]>([]);
  const [swappingIndices, setSwappingIndices] = useState<number[]>([]);
  const [sortedIndices, setSortedIndices] = useState<number[]>([]);
  const isSortingRef = useRef<boolean>(false);
  const [speed, setSpeed] = useState<number>(50);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const [jsCode, setJsCode] = useState<string>("");
  const [pyCode, setPyCode] = useState<string>("");

  const currentAlgorithm =
    algorithmMap[algorithmName] || algorithmMap["bubble-sort"];

  useEffect(() => {
    const loadCodeFiles = async () => {
      const { code } = currentAlgorithm;

      // ファイルからコードをフェッチ
      const jsCodeResponse = await fetch(code.javascript);
      const jsCodeText = await jsCodeResponse.text();

      const pyCodeResponse = await fetch(code.python);
      const pyCodeText = await pyCodeResponse.text();

      setJsCode(jsCodeText);
      setPyCode(pyCodeText);
    };
    loadCodeFiles();
    generateRandomArray(20);
  }, [algorithmName, currentAlgorithm]);

  const generateRandomArray = (size: number) => {
    const newArray = Array.from(
      { length: size },
      () => Math.floor(Math.random() * 100) + 1
    );
    setArray(newArray);
    setComparingIndices([]);
    setSwappingIndices([]);
    setSortedIndices([]);
    isSortingRef.current = false;
  };

  const resetSort = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    isSortingRef.current = false;
    generateRandomArray(20);
  };

  const startSort = async () => {
    if (!isSortingRef.current) {
      isSortingRef.current = true;
      await currentAlgorithm.sortFunction({
        array,
        setArray,
        setComparingIndices,
        setSwappingIndices,
        setSortedIndices,
        speed,
        isSorting: isSortingRef,
        timeoutRef,
      });
      isSortingRef.current = false;
    }
  };

  const pauseSort = () => {
    isSortingRef.current = false;
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4">
        {decodeURIComponent(algorithmName).replace(/-/g, " ").toUpperCase()}
      </h1>

      <div className="mb-8">
        <SortVisualizer
          array={array}
          comparingIndices={comparingIndices}
          swappingIndices={swappingIndices}
          sortedIndices={sortedIndices}
        />
      </div>

      <div className="flex space-x-4 mb-8">
        <button
          onClick={startSort}
          disabled={isSortingRef.current}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
        >
          ソート開始
        </button>
        <button
          onClick={pauseSort}
          className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
        >
          一時停止
        </button>
        <button
          onClick={resetSort}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        >
          リセット
        </button>
        <input
          type="range"
          min="10"
          max="500"
          value={speed}
          onChange={(e) => setSpeed(Number(e.target.value))}
          className="w-48"
        />
        <span>間隔: {speed}ms</span>
      </div>

      <div className="bg-gray-100 p-4 rounded-md">
        <h2 className="text-2xl font-semibold mb-2">解説</h2>
        <h3 className="text-xl font-medium mb-1">特徴</h3>
        <p>{currentAlgorithm.features}</p>

        <h3 className="text-xl font-medium mb-1 mt-4">計算方法</h3>
        <p>{currentAlgorithm.calculationMethod}</p>

        <h3 className="text-xl font-medium mb-1 mt-4">計算量</h3>
        <p>最良の場合: {currentAlgorithm.complexity.best}</p>
        <p>平均の場合: {currentAlgorithm.complexity.average}</p>
        <p>最悪の場合: {currentAlgorithm.complexity.worst}</p>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-2">コード例</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h3 className="text-xl font-medium mb-2">JavaScript</h3>
            {jsCode && (
              <CodeBlock>
                <code className="language-javascript">{jsCode}</code>
              </CodeBlock>
            )}
          </div>
          <div>
            <h3 className="text-xl font-medium mb-2">Python</h3>
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

export default AlgorithmPage;
