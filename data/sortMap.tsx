import React from "react";
import {
  Sparkles,
  CheckSquare,
  PanelRightOpen,
  GitMerge,
  GitFork,
  Pyramid,
  ListChecks,
  Columns,
  Container,
  Blend,
  IterationCw,
  AlignVerticalSpaceAround,
  Dices,
} from "lucide-react";

import {
  bubbleSort,
  selectionSort,
  insertionSort,
  mergeSort,
  quickSort,
  heapSort,
  countingSort,
  radixSort,
  bucketSort,
  timSort,
  introSort,
  shellSort,
  bogoSort,
} from "@/utils/sortingAlgorithms";
export interface SortAlgorithmDetails {
  name: string;
  description: string;
  example: string;
  pros: string[];
  cons: string[];
  structure: string[];
  // ソートアルゴリズムの特性に合わせて変更
  timeComplexity: {
    best: string;
    average: string;
    worst: string;
  };
  spaceComplexity: string;
  code: {
    javascript: string;
    python: string;
  };
  icon: React.JSX.Element;
  sortFunction: (props: any) => Promise<void>;
}

export const sortAlgorithmMap: { [key: string]: SortAlgorithmDetails } = {
  "bubble-sort": {
    name: "バブルソート",
    description:
      "隣接する要素を比較して順序が間違っている場合は交換する、最も単純なソートアルゴリズムです。",
    example:
      "大きな泡（値）が水面（配列の端）に浮上するように、大きな値が右端に移動していく様子に似ています。🫧",
    pros: [
      "実装が非常に簡単で理解しやすい。",
      "安定ソートである（同じ値の相対的な順序が保持される）。",
    ],
    cons: [
      "非常に非効率的で、大規模なデータセットには適さない。",
      "最悪の場合、O(n^2)の計算量がかかる。",
    ],
    structure: [
      "配列の最初の要素から隣接する要素を比較します。",
      "左の要素が右の要素より大きい場合（昇順の場合）、それらを交換します。",
      "このプロセスを配列の最後まで繰り返すと、最大の要素が配列の末尾に移動します。",
      "ソート済み部分を除いた残りの配列に対して、ステップ1〜3を繰り返します。",
      "交換が行われなくなるまで、またはすべての要素がソートされるまで繰り返します。",
    ],
    timeComplexity: { best: "O(n)", average: "O(n^2)", worst: "O(n^2)" },
    spaceComplexity: "O(1)",
    code: {
      javascript: "/codes/bubbleSort.js",
      python: "/codes/bubbleSort.py",
    },
    icon: <Sparkles />,
    sortFunction: bubbleSort,
  },
  "selection-sort": {
    name: "選択ソート",
    description:
      "未ソートの部分から最小（または最大）の要素を見つけ、ソート済み部分の末尾に配置していくアルゴリズムです。",
    example:
      "カードゲームで手札を整理する時のように、全体から最小のカードを選んで先頭に置き、次に残りから最小のものを選んで2番目に置く作業を繰り返します。",
    pros: ["実装が簡単。", "データ交換の回数が少ない。"],
    cons: [
      "データ量に関わらず計算量がO(n^2)で非効率。",
      "安定ソートではない。",
    ],
    structure: [
      "未ソートの部分から最小値を探します。",
      "見つかった最小値を、未ソート部分の先頭の要素と交換します。",
      "ソート済み部分の境界を1つ右にずらします。",
      "未ソート部分がなくなるまで、ステップ1〜3を繰り返します。",
    ],
    timeComplexity: { best: "O(n^2)", average: "O(n^2)", worst: "O(n^2)" },
    spaceComplexity: "O(1)",
    code: {
      javascript: "/codes/selectionSort.js",
      python: "/codes/selectionSort.py",
    },
    icon: <CheckSquare />,
    sortFunction: selectionSort,
  },
  "insertion-sort": {
    name: "挿入ソート",
    description:
      "未ソートの部分から要素を1つ取り出し、ソート済み部分の適切な位置に挿入していくアルゴリズムです。",
    example:
      "トランプで配られたカードを手札に並べる時のように、新しいカードを既にソートされた手札の適切な位置に挿入していく方法です。🃏",
    pros: [
      "実装が簡単。",
      "データがほぼソート済みの場合に非常に高速。",
      "安定ソートである。",
    ],
    cons: ["大規模なデータセットには非効率。", "平均計算量がO(n^2)。"],
    structure: [
      "2番目の要素から始め、その要素を「キー」として取り出します。",
      "キーを、それより前のソート済み部分の要素と比較します。",
      "キーより大きい要素を1つずつ右にずらし、適切な位置を見つけます。",
      "見つけた位置にキーを挿入します。",
      "すべての要素がソートされるまで、このプロセスを繰り返します。",
    ],
    timeComplexity: { best: "O(n)", average: "O(n^2)", worst: "O(n^2)" },
    spaceComplexity: "O(1)",
    code: {
      javascript: "/codes/insertionSort.js",
      python: "/codes/insertionSort.py",
    },
    icon: <PanelRightOpen />,
    sortFunction: insertionSort,
  },
  "merge-sort": {
    name: "マージソート",
    description: "分割統治法に基づく効率的なソートアルゴリズムです。",
    example:
      "大きな本の山を整理する時に、まず小さなグループに分けてそれぞれを整理してから、整理済みのグループ同士を順序を保ちながら合併していく方法です。",
    pros: ["常にO(n log n)の計算量で安定的。", "安定ソートである。"],
    cons: ["追加のメモリ領域(O(n))が必要。"],
    structure: [
      "リストが1要素になるまで、再帰的に2つに分割します。",
      "分割されたリストを、2つずつソートしながらマージ（併合）します。",
      "すべてのサブリストが1つのソート済みリストにマージされるまで繰り返します。",
    ],
    timeComplexity: {
      best: "O(n log n)",
      average: "O(n log n)",
      worst: "O(n log n)",
    },
    spaceComplexity: "O(n)",
    code: { javascript: "/codes/mergeSort.js", python: "/codes/mergeSort.py" },
    icon: <GitMerge />,
    sortFunction: mergeSort,
  },
  "quick-sort": {
    name: "クイックソート",
    description: "非常に高速な分割統治アルゴリズムです。",
    example:
      "基準値（ピボット）を決め、それより小さいものと大きいものに分けて、それぞれのグループでも同じことを繰り返す方法です。効率的な仕分け作業のようです。",
    pros: [
      "平均的に非常に高速。",
      "インプレースソート（追加メモリが少ない）。",
    ],
    cons: ["最悪の場合の計算量がO(n^2)。", "安定ソートではない。"],
    structure: [
      "配列から「ピボット」となる要素を1つ選びます。",
      "ピボットより小さい要素を左側、大きい要素を右側に集めて2つのサブ配列に分割します。",
      "2つのサブ配列に対して、再帰的にステップ1〜2を繰り返します。",
      "サブ配列のサイズが1以下になったら、分割を終了します。",
    ],
    timeComplexity: {
      best: "O(n log n)",
      average: "O(n log n)",
      worst: "O(n^2)",
    },
    spaceComplexity: "O(log n)",
    code: { javascript: "/codes/quickSort.js", python: "/codes/quickSort.py" },
    icon: <GitFork />,
    sortFunction: quickSort,
  },
  "heap-sort": {
    name: "ヒープソート",
    description: "ヒープデータ構造を利用したソートアルゴリズムです。",
    example:
      "優先度付きキューのように、常に最も重要な（最大/最小）要素が頂点にある木構造を維持し、頂点から要素を取り出してソート済み部分に配置します。",
    pros: ["常にO(n log n)の計算量。", "インプレースソートである。"],
    cons: ["安定ソートではない。"],
    structure: [
      "入力配列を最大ヒープ（親が子より大きい木構造）に変換します。",
      "ヒープのルート（最大値）を、ヒープの末尾の要素と交換します。",
      "交換後、ヒープのサイズを1つ減らし、ルート要素に対してヒープのプロパティを再維持します（ヒープ化）。",
      "ヒープが空になるまで、ステップ2〜3を繰り返します。",
    ],
    timeComplexity: {
      best: "O(n log n)",
      average: "O(n log n)",
      worst: "O(n log n)",
    },
    spaceComplexity: "O(1)",
    code: { javascript: "/codes/heapSort.js", python: "/codes/heapSort.py" },
    icon: <Pyramid />,
    sortFunction: heapSort,
  },
  "counting-sort": {
    name: "計数ソート",
    description:
      "要素が特定の範囲内の整数である場合に機能する非比較ソートです。",
    example:
      "投票の集計のように、各候補者（値）の得票数（出現回数）を数え、その数に基づいて順序よく並べます。",
    pros: [
      "非常に高速な線形時間(O(n+k))のアルゴリズム。",
      "安定ソートである。",
    ],
    cons: [
      "要素が特定の整数範囲内である必要がある。",
      "範囲が広いと大量のメモリが必要。",
    ],
    structure: [
      "入力配列内の各要素の出現回数を数え、カウント用の配列に記録します。",
      "カウント用配列を修正し、各要素がソート後の配列でどの位置に配置されるべきかを計算します（累積和）。",
      "入力配列を末尾からスキャンし、カウント用配列を参照して新しいソート済み配列に要素を配置します。",
    ],
    timeComplexity: {
      best: "O(n + k)",
      average: "O(n + k)",
      worst: "O(n + k)",
    },
    spaceComplexity: "O(k)",
    code: {
      javascript: "/codes/countingSort.js",
      python: "/codes/countingSort.py",
    },
    icon: <ListChecks />,
    sortFunction: countingSort,
  },
  "radix-sort": {
    name: "基数ソート",
    description: "整数を個々の桁に基づいてソートする非比較ソートです。",
    example:
      "郵便番号で手紙を仕分ける時のように、まず一番右の桁で分類し、次に右から2番目の桁で分類し...というように、桁ごとに段階的に整理していきます。",
    pros: ["高速な線形時間(O(nk))のアルゴリズム。", "安定ソートである。"],
    cons: ["整数や固定長の文字列などに用途が限られる。"],
    structure: [
      "数値の最大桁数を決定します。",
      "最下位桁（1の位）から始め、その桁の値に基づいて数値を安定ソート（通常は計数ソート）します。",
      "次に上位の桁（10の位、100の位...）に移り、同様に安定ソートを適用します。",
      "最上位桁までソートが完了すると、配列全体がソート済みになります。",
    ],
    timeComplexity: { best: "O(nk)", average: "O(nk)", worst: "O(nk)" },
    spaceComplexity: "O(n + k)",
    code: { javascript: "/codes/radixSort.js", python: "/codes/radixSort.py" },
    icon: <Columns />,
    sortFunction: radixSort,
  },
  "bucket-sort": {
    name: "バケットソート",
    description: "要素を複数のバケット（かご）に分散させるソートです。",
    example:
      "果物を大きさごとに複数のかごに分けて、各かごの中で個別に整理してから、順番にかごを並べて取り出す方法です。",
    pros: ["データが一様に分布している場合に非常に高速。"],
    cons: [
      "データ分布に性能が大きく依存する。",
      "最悪の場合の計算量がO(n^2)。",
    ],
    structure: [
      "複数の空のバケット（リスト）を用意します。",
      "元の配列の各要素を、その値に応じて適切なバケットに振り分けます。",
      "各バケットを個別にソートします（通常は挿入ソートなどを使用）。",
      "すべてのバケットを順番に連結して、最終的なソート済み配列を作成します。",
    ],
    timeComplexity: { best: "O(n + k)", average: "O(n + k)", worst: "O(n^2)" },
    spaceComplexity: "O(n + k)",
    code: {
      javascript: "/codes/bucketSort.js",
      python: "/codes/bucketSort.py",
    },
    icon: <Container />,
    sortFunction: bucketSort,
  },
  "tim-sort": {
    name: "ティムソート",
    description:
      "マージソートと挿入ソートを組み合わせたハイブリッドソートです。",
    example:
      "現実世界のデータの特性を活かした賢いソートで、既に部分的に整理されている箇所を見つけて活用し、小さな部分は挿入ソート、大きな部分はマージソートで効率的に処理します。",
    pros: ["現実のデータに対して非常に高速で効率的。", "安定ソートである。"],
    cons: ["実装が他のアルゴリズムより複雑。"],
    structure: [
      "配列を「ラン」と呼ばれる小さな連続した昇順または降順のサブ配列に分割します。",
      "各ランを挿入ソートでソートします（特に小さなランの場合）。",
      "ソート済みのランを、マージソートの要領で効率的にマージしていきます。",
    ],
    timeComplexity: {
      best: "O(n)",
      average: "O(n log n)",
      worst: "O(n log n)",
    },
    spaceComplexity: "O(n)",
    code: { javascript: "/codes/timSort.js", python: "/codes/timSort.py" },
    icon: <Blend />,
    sortFunction: timSort,
  },
  "intro-sort": {
    name: "イントロソート",
    description:
      "クイックソート、ヒープソート、挿入ソートを組み合わせたハイブリッドソートです。",
    example:
      "3つの戦略を使い分け、まずクイックソートで高速に処理し、深くなりすぎたらヒープソートで安定性を確保し、小さなデータには挿入ソートで細かく仕上げる適応的手法です。",
    pros: ["平均的に高速で、かつ最悪の場合もO(n log n)を保証。"],
    cons: ["安定ソートではない。", "実装が複雑。"],
    structure: [
      "クイックソートから開始します。",
      "再帰の深さが一定のレベルを超えた場合、ヒープソートに切り替えて最悪ケースを回避します。",
      "分割されたパーティションが非常に小さくなった場合、挿入ソートに切り替えて効率化します。",
    ],
    timeComplexity: {
      best: "O(n log n)",
      average: "O(n log n)",
      worst: "O(n log n)",
    },
    spaceComplexity: "O(log n)",
    code: { javascript: "/codes/introSort.js", python: "/codes/introSort.py" },
    icon: <IterationCw />,
    sortFunction: introSort,
  },
  "shell-sort": {
    name: "シェルソート",
    description: "挿入ソートを改良したアルゴリズムです。",
    example:
      "まず大きな間隔で荒く整理し、だんだん間隔を狭めて細かく調整していく方法です。最終的には隣同士の比較（挿入ソート）で仕上げます。",
    pros: ["単純なO(n^2)アルゴリズムより高速。"],
    cons: ["安定ソートではない。", "計算量の解析が複雑。"],
    structure: [
      "特定のギャップ（間隔）を設定します。",
      "そのギャップごとに要素をグループ化し、各グループ内で挿入ソートを適用します。",
      "ギャップを徐々に小さくしていき、ステップ2を繰り返します。",
      "最終的にギャップが1になった時、配列全体がほぼソートされた状態になり、最後の挿入ソートが高速に完了します。",
    ],
    timeComplexity: {
      best: "O(n log n)",
      average: "O(n log^2 n)",
      worst: "O(n log^2 n)",
    },
    spaceComplexity: "O(1)",
    code: { javascript: "/codes/shellSort.js", python: "/codes/shellSort.py" },
    icon: <AlignVerticalSpaceAround />,
    sortFunction: shellSort,
  },
  "bogo-sort": {
    name: "ボゴソート",
    description: "ソートアルゴリズムとしては非常に非効率的なものです。",
    example:
      "配列をランダムにシャッフルして、たまたま正しく並ぶまで延々と試し続ける、運任せの非効率な方法です。🐒",
    pros: ["実装が（ある意味で）非常にシンプル。"],
    cons: ["実用的ではない。", "完了が保証されない（最悪の場合）。"],
    structure: [
      "配列がソートされているかどうかを確認します。",
      "ソートされていなければ、配列の要素の順序をランダムにシャッフルします。",
      "再びステップ1に戻り、ソートが完了するまで繰り返します。",
    ],
    timeComplexity: { best: "O(n)", average: "O((n+1)!)", worst: "無限" },
    spaceComplexity: "O(1)",
    code: { javascript: "/codes/bogoSort.js", python: "/codes/bogoSort.py" },
    icon: <Dices />,
    sortFunction: bogoSort,
  },
};
