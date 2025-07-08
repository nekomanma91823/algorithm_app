"use client";

import React, { useState, useEffect, useRef } from "react";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import rehypePrettyCode from "rehype-pretty-code";
import SortVisualizer from "@/components/SortVisualizer";
import {
  bubbleSort,
  selectionSort,
  insertionSort,
  mergeSort,
  quickSort,
  heapSort,
} from "@/utils/sortingAlgorithms";

interface AlgorithmPageProps {
  params: Promise<{
    algorithmName: string;
  }>;
}

interface AlgorithmDetails {
  sortFunction: (props: any) => Promise<void>;
  features: string;
  calculationMethod: string;
  complexity: {
    best: string;
    average: string;
    worst: string;
  };
  code: {
    javascript: string;
    python: string;
  };
}

const algorithmMap: { [key: string]: AlgorithmDetails } = {
  "bubble-sort": {
    sortFunction: bubbleSort,
    features:
      "バブルソートは、リストを繰り返し処理し、隣接する要素を比較して、順序が間違っている場合は交換する単純なソートアルゴリズムです。交換が不要になるまでリストの処理が繰り返され、それがリストがソートされたことを示します。",
    calculationMethod:
      "ソート対象のリストを繰り返し処理し、隣接するアイテムの各ペアを比較し、順序が間違っている場合は交換することで機能します。交換が不要になるまでリストの処理が繰り返され、それがリストがソートされたことを示します。",
    complexity: {
      best: "O(n)",
      average: "O(n^2)",
      worst: "O(n^2)",
    },
    code: {
      javascript: "/codes/bubbleSort.js",
      python: "/codes/bubbleSort.py",
    },
  },
  "selection-sort": {
    sortFunction: selectionSort,
    features:
      "選択ソートは、インプレース比較ソートアルゴリズムです。入力リストを2つの部分に分割します。左端にすでに構築されたアイテムのソート済みサブリストと、右端に残りの未ソートアイテムのサブリストです。最初は、ソート済みサブリストは空で、未ソートサブリストは入力リスト全体です。",
    calculationMethod:
      "アルゴリズムは、未ソートのサブリストから最小（または最大、ソート順による）の要素を見つけ、それを左端の未ソートの要素と交換し（ソート済みの順序にする）、サブリストの境界を1要素右に移動することで進行します。",
    complexity: {
      best: "O(n^2)",
      average: "O(n^2)",
      worst: "O(n^2)",
    },
    code: {
      javascript: "/codes/selectionSort.js",
      python: "/codes/selectionSort.py",
    },
  },
  "insertion-sort": {
    sortFunction: insertionSort,
    features:
      "挿入ソートは、最終的なソート済み配列（またはリスト）を一度に1つのアイテムずつ構築する単純なソートアルゴリズムです。クイックソート、ヒープソート、マージソートなどのより高度なアルゴリズムよりも、大きなリストでははるかに効率が悪いです。",
    calculationMethod:
      "入力要素を反復処理し、ソート済みの出力リストを成長させます。各反復で、挿入ソートは入力データから1つの要素を削除し、ソート済みリスト内でそれが属する場所を見つけてそこに挿入します。入力要素がなくなるまで繰り返します。",
    complexity: {
      best: "O(n)",
      average: "O(n^2)",
      worst: "O(n^2)",
    },
    code: {
      javascript: "/codes/insertionSort.js",
      python: "/codes/insertionSort.py",
    },
  },
  "merge-sort": {
    sortFunction: mergeSort,
    features:
      "マージソートは、効率的で汎用の比較ベースのソートアルゴリズムです。ほとんどの実装では安定したソートが生成されます。つまり、等しい要素の順序はソートされた出力で保持されます。",
    calculationMethod:
      "概念的には、マージソートは次のように機能します。未ソートのリストを、それぞれが1つの要素を含むn個のサブリストに分割します（1つの要素のリストはソート済みと見なされます）。サブリストを繰り返しマージして、新しいソート済みのサブリストを生成し、サブリストが1つだけ残るまで続けます。これがソート済みのリストになります。",
    complexity: {
      best: "O(n log n)",
      average: "O(n log n)",
      worst: "O(n log n)",
    },
    code: {
      javascript: "/codes/mergeSort.js",
      python: "/codes/mergeSort.py",
    },
  },
  "quick-sort": {
    sortFunction: quickSort,
    features:
      "クイックソートは効率的なソートアルゴリズムです。1959年にトニー・ホーアによって開発され、1961年に公開されました。現在でもソートに一般的に使用されるアルゴリズムです。適切に実装されると、マージソートやヒープソートの約2〜3倍高速になる可能性があります。",
    calculationMethod:
      "クイックソートは分割統治アルゴリズムです。配列から「ピボット」要素を選択し、他の要素をピボットより小さいか大きいかに応じて2つのサブ配列に分割することで機能します。その後、サブ配列は再帰的にソートされます。これはインプレースで実行でき、ソートを実行するために必要な追加のメモリ量はごくわずかです。",
    complexity: {
      best: "O(n log n)",
      average: "O(n log n)",
      worst: "O(n^2)",
    },
    code: {
      javascript: "/codes/quickSort.js",
      python: "/codes/quickSort.py",
    },
  },
  "heap-sort": {
    sortFunction: heapSort,
    features:
      "ヒープソートは比較ベースのソートアルゴリズムです。ヒープソートは、改良された選択ソートと考えることができます。そのアルゴリズムと同様に、入力をソート済み領域と未ソート領域に分割し、最大の要素を抽出してソート済み領域に移動することで、未ソート領域を繰り返し縮小します。",
    calculationMethod:
      "このアルゴリズムでは、入力配列からヒープデータ構造を構築し、ヒープから最大要素（常にルートにある）を繰り返し抽出し、それを配列の末尾に移動してから、残りの要素でヒープを再構築します。",
    complexity: {
      best: "O(n log n)",
      average: "O(n log n)",
      worst: "O(n log n)",
    },
    code: {
      javascript: "/codes/heapSort.js",
      python: "/codes/heapSort.py",
    },
  },
};

type Source = MDXRemoteSerializeResult<
  Record<string, unknown>,
  Record<string, unknown>
>;

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

  const [jsSource, setJsSource] = useState<Source | null>(null);
  const [pySource, setPySource] = useState<Source | null>(null);

  const currentAlgorithm =
    algorithmMap[algorithmName] || algorithmMap["bubble-sort"];

  useEffect(() => {
    const compileSource = async () => {
      const { code } = currentAlgorithm;

      // ファイルからコードをフェッチ
      const jsCodeResponse = await fetch(code.javascript);
      const jsCode = await jsCodeResponse.text();

      const pyCodeResponse = await fetch(code.python);
      const pyCode = await pyCodeResponse.text();

      const js = await serialize(jsCode, {
        mdxOptions: { rehypePlugins: [rehypePrettyCode] },
      });
      const py = await serialize(pyCode, {
        mdxOptions: { rehypePlugins: [rehypePrettyCode] },
      });
      setJsSource(js);
      setPySource(py);
    };
    compileSource();
    generateRandomArray(20);
  }, [algorithmName]);

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
            {jsSource && <MDXRemote {...jsSource} />}
          </div>
          <div>
            <h3 className="text-xl font-medium mb-2">Python</h3>
            {pySource && <MDXRemote {...pySource} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlgorithmPage;
