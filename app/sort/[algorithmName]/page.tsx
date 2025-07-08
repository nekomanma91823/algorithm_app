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
      javascript: `
\`\`\`javascript
function bubbleSort(arr) {
  let n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
  }
  return arr;
}
\`\`\`
`,
      python: `
\`\`\`python
def bubble_sort(arr):
    n = len(arr)
    for i in range(n):
        for j in range(0, n - i - 1):
            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
    return arr
\`\`\`
`,
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
      javascript: `
\`\`\`javascript
function selectionSort(arr) {
  let n = arr.length;
  for (let i = 0; i < n; i++) {
    let minIdx = i;
    for (let j = i + 1; j < n; j++) {
      if (arr[j] < arr[minIdx]) {
        minIdx = j;
      }
    }
    [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
  }
  return arr;
}
\`\`\`
`,
      python: `
\`\`\`python
def selection_sort(arr):
    n = len(arr)
    for i in range(n):
        min_idx = i
        for j in range(i + 1, n):
            if arr[j] < arr[min_idx]:
                min_idx = j
        arr[i], arr[min_idx] = arr[min_idx], arr[i]
    return arr
\`\`\`
`,
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
      javascript: `
\`\`\`javascript
function insertionSort(arr) {
  let n = arr.length;
  for (let i = 1; i < n; i++) {
    let current = arr[i];
    let j = i - 1;
    while (j > -1 && current < arr[j]) {
      arr[j + 1] = arr[j];
      j--;
    }
    arr[j + 1] = current;
  }
  return arr;
}
\`\`\`
`,
      python: `
\`\`\`python
def insertion_sort(arr):
    for i in range(1, len(arr)):
        key = arr[i]
        j = i - 1
        while j >= 0 and key < arr[j]:
            arr[j + 1] = arr[j]
            j -= 1
        arr[j + 1] = key
    return arr
\`\`\`
`,
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
      javascript: `
\`\`\`javascript
function mergeSort(arr) {
  if (arr.length <= 1) {
    return arr;
  }
  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid));
  return merge(left, right);
}

function merge(left, right) {
  let resultArray = [], leftIndex = 0, rightIndex = 0;
  while (leftIndex < left.length && rightIndex < right.length) {
    if (left[leftIndex] < right[rightIndex]) {
      resultArray.push(left[leftIndex]);
      leftIndex++;
    } else {
      resultArray.push(right[rightIndex]);
      rightIndex++;
    }
  }
  return resultArray
    .concat(left.slice(leftIndex))
    .concat(right.slice(rightIndex));
}
\`\`\`
`,
      python: `
\`\`\`python
def merge_sort(arr):
    if len(arr) > 1:
        mid = len(arr) // 2
        L = arr[:mid]
        R = arr[mid:]
        merge_sort(L)
        merge_sort(R)
        i = j = k = 0
        while i < len(L) and j < len(R):
            if L[i] < R[j]:
                arr[k] = L[i]
                i += 1
            else:
                arr[k] = R[j]
                j += 1
            k += 1
        while i < len(L):
            arr[k] = L[i]
            i += 1
            k += 1
        while j < len(R):
            arr[k] = R[j]
            j += 1
            k += 1
    return arr
\`\`\`
`,
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
      javascript: `
\`\`\`javascript
function quickSort(arr, low, high) {
  if (low < high) {
    let pi = partition(arr, low, high);
    quickSort(arr, low, pi - 1);
    quickSort(arr, pi + 1, high);
  }
  return arr;
}

function partition(arr, low, high) {
  let pivot = arr[high];
  let i = low - 1;
  for (let j = low; j < high; j++) {
    if (arr[j] < pivot) {
      i++;
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }
  [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
  return i + 1;
}
\`\`\`
`,
      python: `
\`\`\`python
def quick_sort(arr):
    if len(arr) <= 1:
        return arr
    pivot = arr[len(arr) // 2]
    left = [x for x in arr if x < pivot]
    middle = [x for x in arr if x == pivot]
    right = [x for x in arr if x > pivot]
    return quick_sort(left) + middle + quick_sort(right)
\`\`\`
`,
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
      javascript: `
\`\`\`javascript
function heapSort(arr) {
  let n = arr.length;
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    heapify(arr, n, i);
  }
  for (let i = n - 1; i > 0; i--) {
    [arr[0], arr[i]] = [arr[i], arr[0]];
    heapify(arr, i, 0);
  }
  return arr;
}

function heapify(arr, n, i) {
  let largest = i;
  let left = 2 * i + 1;
  let right = 2 * i + 2;
  if (left < n && arr[left] > arr[largest]) {
    largest = left;
  }
  if (right < n && arr[right] > arr[largest]) {
    largest = right;
  }
  if (largest !== i) {
    [arr[i], arr[largest]] = [arr[largest], arr[i]];
    heapify(arr, n, largest);
  }
}
\`\`\`
`,
      python: `
\`\`\`python
def heap_sort(arr):
    n = len(arr)
    for i in range(n // 2 - 1, -1, -1):
        heapify(arr, n, i)
    for i in range(n - 1, 0, -1):
        arr[i], arr[0] = arr[0], arr[i]
        heapify(arr, i, 0)
    return arr

def heapify(arr, n, i):
    largest = i
    l = 2 * i + 1
    r = 2 * i + 2
    if l < n and arr[i] < arr[l]:
        largest = l
    if r < n and arr[largest] < arr[r]:
        largest = r
    if largest != i:
        arr[i], arr[largest] = arr[largest], arr[i]
        heapify(arr, n, largest)
\`\`\`
`,
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
      const js = await serialize(code.javascript, {
        mdxOptions: { rehypePlugins: [rehypePrettyCode] },
      });
      const py = await serialize(code.python, {
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
