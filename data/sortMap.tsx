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
interface AlgorithmDetails {
  sortFunction: (props: any) => Promise<void>;
  features: string;
  calculationMethod: string;
  example: string;
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
export const sortAlgorithmMap: { [key: string]: AlgorithmDetails } = {
  "bubble-sort": {
    sortFunction: bubbleSort,
    features:
      "バブルソートは、リストを繰り返し処理し、隣接する要素を比較して、順序が間違っている場合は交換する単純なソートアルゴリズムです。交換が不要になるまでリストの処理が繰り返され、それがリストがソートされたことを示します。",
    calculationMethod:
      "ソート対象のリストを繰り返し処理し、隣接するアイテムの各ペアを比較し、順序が間違っている場合は交換することで機能します。交換が不要になるまでリストの処理が繰り返され、それがリストがソートされたことを示します。",
    example:
      "🫧 身長順に並んでいる生徒の列で、隣同士を比較して高い人が後ろに移動していく様子。大きな泡（高い値）が水面（配列の端）に浮上するように、大きな値が右端に移動します。",
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
    example:
      "カードゲームで手札を整理する時のように、全体を見渡して一番小さい（または大きい）カードを選んで先頭に置き、次に残りから最小のものを選んで2番目に置く作業を繰り返します。",
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
    example:
      "トランプゲームで配られたカードを手札に並べる時のように、新しいカードを受け取るたびに、既にソートされた手札の適切な位置に挿入していく方法です。",
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
    example:
      "大きな本の山を整理する時に、まず小さなグループに分けて、それぞれを整理してから、整理済みのグループ同士を順序を保ちながら合併していく方法です。分割統治戦略の典型例です。",
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
    example:
      "バランスの良い二分法のように、基準値（ピボット）を決めて、それより小さいものと大きいものに分けて、それぞれのグループでも同じことを繰り返す方法です。まるで効率的な仕分け作業のようです。",
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
    example:
      "優先度付きキューのように、常に最も重要（最大/最小）な要素が頂点にある二分木を維持し、頂点から要素を取り出すたびに木構造を再調整して次の最重要要素を頂点に持ってくる仕組みです。",
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
  "counting-sort": {
    sortFunction: countingSort,
    features:
      "カウントソートは、要素が特定の範囲内の整数である場合に機能する非比較ソートアルゴリズムです。",
    calculationMethod:
      "各要素の出現回数をカウントし、そのカウントを配列に格納します。次に、カウント配列を変更して、各要素が最終的なソート済み配列での実際の位置を含むようにします。",
    example:
      "投票の集計のように、各候補者（値）の得票数（出現回数）を数えて、その数に基づいて順序よく並べる方法です。比較ではなく計数に基づくため非常に高速です。",
    complexity: {
      best: "O(n + k)",
      average: "O(n + k)",
      worst: "O(n + k)",
    },
    code: {
      javascript: "/codes/countingSort.js",
      python: "/codes/countingSort.py",
    },
  },
  "radix-sort": {
    sortFunction: radixSort,
    features:
      "基数ソートは、整数を個々の桁に基づいてソートする非比較ソートアルゴリズムです。",
    calculationMethod:
      "各桁（最下位桁から最上位桁まで）を個別にソートするために、カウントソートなどの安定したソートアルゴリズムを使用します。",
    example:
      "郵便番号で手紙を仕分ける時のように、まず一番右の桁で分類し、次に右から2番目の桁で分類し...というように、桁ごとに段階的に整理していく方法です。",
    complexity: {
      best: "O(nk)",
      average: "O(nk)",
      worst: "O(nk)",
    },
    code: {
      javascript: "/codes/radixSort.js",
      python: "/codes/radixSort.py",
    },
  },
  "bucket-sort": {
    sortFunction: bucketSort,
    features:
      "バケットソート（ビンソートとも呼ばれる）は、要素を複数のバケットに分散させるソートアルゴリズムです。各バケットは個別にソートされ、その後、ソートされたバケットが連結されます。",
    calculationMethod:
      "配列の要素をバケットに分散させ、各バケットを個別にソートし（通常は挿入ソートを使用）、最後にバケットを順番に連結します。",
    example:
      "果物を大きさごとに複数のかごに分けて、各かごの中で個別に整理してから、順番にかごを並べて取り出す方法です。範囲を限定することで効率的にソートできます。",
    complexity: {
      best: "O(n + k)",
      average: "O(n + k)",
      worst: "O(n^2)",
    },
    code: {
      javascript: "/codes/bucketSort.js",
      python: "/codes/bucketSort.py",
    },
  },
  "tim-sort": {
    sortFunction: timSort,
    features:
      "ティムソートは、マージソートと挿入ソートを組み合わせたハイブリッドの安定したソートアルゴリズムです。",
    calculationMethod:
      "配列を小さなチャンクに分割し、それらを挿入ソートでソートし、次にマージソートの原則を使用してチャンクをマージします。",
    example:
      "現実世界のデータの特性を活かした賢いソート。既に部分的に整理されている箇所を見つけて活用し、小さな部分は挿入ソート、大きな部分はマージソートで効率的に処理する実用的な手法です。",
    complexity: {
      best: "O(n)",
      average: "O(n log n)",
      worst: "O(n log n)",
    },
    code: {
      javascript: "/codes/timSort.js",
      python: "/codes/timSort.py",
    },
  },
  "intro-sort": {
    sortFunction: introSort,
    features:
      "イントロソートは、クイックソート、ヒープソート、挿入ソートを組み合わせたハイブリッドソートアルゴリズムです。",
    calculationMethod:
      "クイックソートから始まり、再帰の深さが特定のレベルを超えるとヒープソートに切り替わり、小さなパーティションでは挿入ソートを使用します。",
    example:
      "3つの戦略を使い分ける賢いソート。まずクイックソートで高速に処理し、深くなりすぎたらヒープソートで安定性を確保し、小さなデータには挿入ソートで細かく仕上げる適応的手法です。",
    complexity: {
      best: "O(n log n)",
      average: "O(n log n)",
      worst: "O(n log n)",
    },
    code: {
      javascript: "/codes/introSort.js",
      python: "/codes/introSort.py",
    },
  },
  "shell-sort": {
    sortFunction: shellSort,
    features: "シェルソートは、挿入ソートの一般化された形式です。",
    calculationMethod:
      "要素を特定のギャップでソートし、ギャップを徐々に減らして、最終的にギャップが1になると挿入ソートになります。",
    example:
      "歯ブラシで歯を磨くように、まず大きな間隔で荒く整理し、だんだん間隔を狭めて細かく調整していく方法。最終的には隣同士の比較（挿入ソート）で仕上げます。",
    complexity: {
      best: "O(n log n)",
      average: "O(n log^2 n)",
      worst: "O(n log^2 n)",
    },
    code: {
      javascript: "/codes/shellSort.js",
      python: "/codes/shellSort.py",
    },
  },
  "bogo-sort": {
    sortFunction: bogoSort,
    features:
      "ボゴソート（またはパーミュテーションソート、愚かなソート、ストゥージソート）は、ソートアルゴリズムとしては非常に非効率的です。",
    calculationMethod:
      "配列がソートされるまで、配列の順序をランダムにシャッフルし、ソートされているかどうかを確認します。",
    example:
      "サルがタイプライターでシェイクスピアを書くのを待つようなもの。配列をランダムにシャッフルして、たまたま正しく並ぶまで延々と試し続ける、運任せの非効率な方法です。",
    complexity: {
      best: "O(n)",
      average: "O((n+1)!)",
      worst: "無限",
    },
    code: {
      javascript: "/codes/bogoSort.js",
      python: "/codes/bogoSort.py",
    },
  },
};
