import React from "react";
import {
  ScanLine,
  Divide,
  Waves,
  GitCommitVertical,
  Route,
  Star,
} from "lucide-react";
export interface SearchAlgorithmDetails {
  name: string;
  description: string;
  pros: string[];
  cons: string[];
  structure: string;
  timeComplexity: {
    access: string;
    search: string;
    insertion: string;
    deletion: string;
  };
  spaceComplexity: string;
  code: {
    javascript: string;
    python: string;
  };
  icon: React.JSX.Element;
}

export const searchAlgorithmMap: { [key: string]: SearchAlgorithmDetails } = {
  "linear-search": {
    name: "線形探索 (Linear Search)",
    description:
      "線形探索は、データを最初から順番に調べていく最もシンプルで直感的な探索アルゴリズムです。図書館で特定の本を探すとき、書架の左端から右端まで一冊ずつ背表紙を確認していく方法に似ています。効率は良くないかもしれませんが、必ず見つけることができる確実な方法です。",
    pros: [
      "実装が非常に簡単で理解しやすい",
      "データがソートされていなくても使用可能",
      "メモリ使用量が少ない",
      "小さなデータセットでは十分高速",
    ],
    cons: [
      "大きなデータセットでは処理が遅い",
      "データ量に比例して実行時間が増加する",
      "効率的とは言えない探索方法",
    ],
    structure:
      "配列の最初の要素から開始し、現在の要素が探している値と一致するかを確認します。一致した場合はその位置を返し、一致しない場合は次の要素に移動します。最後まで到達しても見つからない場合は、「見つからない」ことを返します。",
    timeComplexity: {
      access: "O(n)",
      search: "O(n)",
      insertion: "O(n)",
      deletion: "O(n)",
    },
    spaceComplexity: "O(1)",
    code: {
      javascript: "/codes/search/linear-search.js",
      python: "/codes/search/linear-search.py",
    },
    icon: <ScanLine />,
  },
  "binary-search": {
    name: "二分探索 (Binary Search)",
    description:
      "ソート済み配列を半分に分けながら効率的に探索する分割統治法のアルゴリズムです。辞書で単語を探すとき、真ん中あたりを開いて目的の単語より前か後かを判断し、該当する半分でまた真ん中を開く方法に似ています。毎回探索範囲が半分になるので、とても効率的です。",
    pros: [
      "大きなデータセットでも非常に高速",
      "探索時間が対数的に増加（O(log n)）",
      "メモリ効率が良い",
      "実装が比較的簡単",
    ],
    cons: [
      "データが事前にソートされている必要がある",
      "ランダムアクセスが可能なデータ構造が必要",
      "データの追加・削除でソートが崩れる可能性",
    ],
    structure:
      "配列の左端（low）と右端（high）を設定し、中央（mid）の値と目的の値を比較します。一致すれば位置を返し、目的の値が小さい場合は右半分を、大きい場合は左半分を除外して探索を続けます。",
    timeComplexity: {
      access: "N/A",
      search: "O(log n)",
      insertion: "N/A",
      deletion: "N/A",
    },
    spaceComplexity: "O(1)",
    code: {
      javascript: "/codes/search/binary-search.js",
      python: "/codes/search/binary-search.py",
    },
    icon: <Divide />,
  },
  bfs: {
    name: "幅優先探索 (Breadth-First Search)",
    description:
      "グラフやツリーを階層ごとに幅方向に探索する基本的なアルゴリズムです。池に石を投げ込んだときの波紋が外側に向かって広がっていく様子に似ています。中心から同じ距離にある点を同時に調べてから、次の距離の点を調べていきます。最短経路探索に利用されます。",
    pros: [
      "最短経路を保証（重みなしグラフ）",
      "すべてのノードを漏れなく探索",
      "デッドロックが発生しない",
      "理解しやすい動作原理",
    ],
    cons: [
      "メモリ使用量が多い（キューの管理）",
      "大きなグラフでは処理が重い",
      "重み付きグラフでは最短経路を保証しない",
    ],
    structure:
      "スタートノードをキューに追加し、訪問済みにします。キューからノードを取り出し、その隣接する未訪問ノードをすべてキューに追加して訪問済みにします。これをキューが空になるまで繰り返します。",
    timeComplexity: {
      access: "N/A",
      search: "O(V + E)",
      insertion: "N/A",
      deletion: "N/A",
    },
    spaceComplexity: "O(V)",
    code: {
      javascript: "/codes/search/bfs.js",
      python: "/codes/search/bfs.py",
    },
    icon: <Waves />,
  },
  dfs: {
    name: "深さ優先探索 (Depth-First Search)",
    description:
      "グラフやツリーを深さ方向に探索し、行き止まりまで進んでから戻る基本的なアルゴリズムです。迷路を探索するとき、一つの道を行き止まりまで進み、引き返して別の道を試す方法に似ています。",
    pros: [
      "メモリ使用量が少ない（スタックベース）",
      "実装が簡単（再帰で自然に表現）",
      "経路の存在確認に適している",
      "バックトラッキングが容易",
    ],
    cons: [
      "最短経路を保証しない",
      "無限ループの可能性（サイクルのあるグラフ）",
      "深い構造でスタックオーバーフローの危険",
    ],
    structure:
      "スタートノードを訪問済みにし、隣接する未訪問ノードを一つ選び、そのノードに対して再帰的にDFSを実行します。すべての隣接ノードを探索し終えたら、前のノードに戻ります。",
    timeComplexity: {
      access: "N/A",
      search: "O(V + E)",
      insertion: "N/A",
      deletion: "N/A",
    },
    spaceComplexity: "O(V)",
    code: {
      javascript: "/codes/search/dfs.js",
      python: "/codes/search/dfs.py",
    },
    icon: <GitCommitVertical />,
  },
  dijkstra: {
    name: "ダイクストラ法 (Dijkstra's Algorithm)",
    description:
      "重み付きグラフで単一始点から全ノードへの最短経路を効率的に求めるアルゴリズムです。道路網で最短ルートを探すカーナビに似ています。確実に到達できる最短距離の場所から順番に、そこを経由したより短いルートがないかを調べて、最短距離を更新していきます。",
    pros: [
      "最短経路を保証（負の重みがない場合）",
      "一度の実行で全ノードへの最短距離が求まる",
      "実用的で効率的なアルゴリズム",
    ],
    cons: [
      "負の重みを持つエッジがあると正しく動作しない",
      "密なグラフでは計算量が大きい",
      "優先度付きキューの実装が必要",
    ],
    structure:
      "全ノードの距離を無限大に初期化（スタートは0）。未確定ノードの中から最小距離のノードを選択し確定済みにします。そのノードの隣接ノードの距離を、より短い経路があれば更新します。これを全ノードが確定するまで繰り返します。",
    timeComplexity: {
      access: "N/A",
      search: "O((V + E) log V)",
      insertion: "N/A",
      deletion: "N/A",
    },
    spaceComplexity: "O(V + E)",
    code: {
      javascript: "/codes/search/dijkstra.js",
      python: "/codes/search/dijkstra.py",
    },
    icon: <Route />,
  },
  "a-star": {
    name: "A* (A-star) アルゴリズム",
    description:
      "ヒューリスティック関数を使用してゴールに向かって効率的に最短経路を探索するアルゴリズムです。目的地への道案内で、現在地からの実距離と目的地への推定直線距離の両方を考慮する方法に似ています。ゴールに向かって賢く探索を進めます。",
    pros: [
      "適切なヒューリスティックで最短経路を保証",
      "ダイクストラ法より効率的",
      "実用的な応用が多い",
    ],
    cons: [
      "ヒューリスティック関数の設計が重要",
      "メモリ使用量が多い",
      "不適切なヒューリスティックで性能低下",
      "実装が複雑",
    ],
    structure:
      "オープンリスト（探索候補）からf値（実コスト+推定コスト）が最小のノードを選択し、クローズドリスト（探索済み）に移動します。ゴールに到達するまで、隣接ノードのコストを計算・更新しながらこのプロセスを繰り返します。",
    timeComplexity: {
      access: "N/A",
      search: "O(b^d)",
      insertion: "N/A",
      deletion: "N/A",
    },
    spaceComplexity: "O(b^d)",
    code: {
      javascript: "/codes/search/a-star.js",
      python: "/codes/search/a-star.py",
    },
    icon: <Star />,
  },
};
