import React from "react";
import {
  List,
  Link,
  Slack,
  ListOrdered,
  Hash,
  GitGraph,
  Mountain,
  Network,
  TextSearch,
  Database,
} from "lucide-react";

export interface DataStructureConfig {
  name: string;
  description: string;
  pros: string[];
  cons: string[];
  structure: string;
  example: string;
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

export const dataStructureMap: { [key: string]: DataStructureConfig } = {
  array: {
    name: "配列",
    description:
      "同じ型のデータを連続したメモリ領域に格納するデータ構造です。昔はサイズが固定で動的な拡張が難しかったですが、最近では動的配列（ArrayListなど）でこの問題を解決しています。",
    example:
      "本棚に並べられた本のように、決まった番号（インデックス）の棚に直接アクセスできます。",
    pros: ["インデックスによる高速なアクセスが可能。"],
    cons: ["挿入や削除時に要素をシフトする必要がある。"],
    structure:
      "要素がメモリ上で連続して配置され、各要素にはインデックス（添字）でアクセスします。",
    timeComplexity: {
      access: "O(1)",
      search: "O(n)",
      insertion: "O(n)",
      deletion: "O(n)",
    },
    spaceComplexity: "O(n)",
    code: {
      javascript: "/codes/data-structure/array.js",
      python: "/codes/data-structure/array.py",
    },
    icon: <List />,
  },
  "linked-list": {
    name: "連結リスト",
    description:
      "各要素（ノード）が次の要素への参照（ポインタ）を持つことで、数珠つなぎにデータを格納するデータ構造です。",
    example:
      "宝探しゲームのヒントのように、現在の場所にあるヒントが次の場所を指し示しているのをたどっていく様子に似ています。",
    pros: ["動的なサイズ変更が可能で、挿入・削除が効率的。"],
    cons: [
      "ランダムアクセスができない。",
      "**各要素がポインタを持つため、余分なメモリを消費する。**",
    ],
    structure:
      "各ノードがデータと次のノードへのポインタを持ち、チェーン状に連結されています。",
    timeComplexity: {
      access: "O(n)",
      search: "O(n)",
      insertion: "O(1)",
      deletion: "O(1)",
    },
    spaceComplexity: "O(n)",
    code: {
      javascript: "/codes/data-structure/linked-list.js",
      python: "/codes/data-structure/linked-list.py",
    },
    icon: <Link />,
  },
  stack: {
    name: "スタック",
    description:
      "LIFO（Last In, First Out）方式、つまり「後入れ先出し」でデータを管理するデータ構造です。",
    example:
      "積み重ねた本や皿のように、一番上に置いたものからしか取り出すことができません。",
    pros: [
      "実装がシンプルで、メモリ使用量が予測しやすい。",
      "関数呼び出しの管理や構文解析など、再帰的な処理の実現に適している。",
    ],
    cons: ["特定の要素（先頭以外）へのアクセスができない。"],
    structure:
      "要素の追加（push）と削除（pop）がスタックの同じ端（top）でのみ行われます。",
    timeComplexity: {
      access: "O(n)",
      search: "O(n)",
      insertion: "O(1)",
      deletion: "O(1)",
    },
    spaceComplexity: "O(n)",
    code: {
      javascript: "/codes/data-structure/stack.js",
      python: "/codes/data-structure/stack.py",
    },
    icon: <Slack />,
  },
  queue: {
    name: "キュー",
    description:
      "FIFO（First In, First Out）方式、つまり「先入れ先出し」でデータを管理するデータ構造です。",
    example:
      "コンビニのレジ待ちの列のように、最初に並んだ人が最初にサービスを受けられます。",
    pros: [
      "実装がシンプルで、処理の順序性を保証できる。",
      "タスクスケジューリングや非同期処理など、公平なリソース割り当てに適している。",
    ],
    cons: ["特定の要素（先頭や末尾以外）へのアクセスができない。"],
    structure:
      "要素の追加（enqueue）は後端（rear）で、削除（dequeue）は前端（front）で行われます。",
    timeComplexity: {
      access: "O(n)",
      search: "O(n)",
      insertion: "O(1)",
      deletion: "O(1)",
    },
    spaceComplexity: "O(n)",
    code: {
      javascript: "/codes/data-structure/queue.js",
      python: "/codes/data-structure/queue.py",
    },
    icon: <ListOrdered />,
  },
  "hash-table": {
    name: "ハッシュテーブル",
    description: "キーと値のペアを効率的に格納・検索するためのデータ構造です。",
    example:
      "辞書のように、単語（キー）を引けばすぐにその意味（値）が見つかる仕組みに似ています。",
    pros: ["平均的にO(1)という非常に高速な検索・挿入・削除が可能。"],
    cons: [
      "ハッシュの衝突により、最悪の場合パフォーマンスがO(n)に低下する。",
      "要素の順序が保持されない。",
      "ハッシュ関数の設計が性能に大きく影響する。",
    ],
    structure:
      "ハッシュ関数でキーを配列のインデックスに変換し、そこに値を格納します。",
    timeComplexity: {
      access: "O(1) (平均)",
      search: "O(1) (平均)",
      insertion: "O(1) (平均)",
      deletion: "O(1) (平均)",
    },
    spaceComplexity: "O(n)",
    code: {
      javascript: "/codes/data-structure/hash-table.js",
      python: "/codes/data-structure/hash-table.py",
    },
    icon: <Hash />,
  },
  "binary-search-tree": {
    name: "二分探索木",
    description:
      "各ノードが最大2つの子を持ち、「左の子 < 親 < 右の子」の関係を満たすように構成された木構造です。",
    example:
      "図書館の蔵書検索システムのように、カテゴリを辿って効率的に目的の本を探し出す仕組みに似ています。",
    pros: ["検索・挿入・削除が平均O(log n)で実行可能。"],
    cons: ["バランスが崩れると性能が劣化する。"],
    structure:
      "各ノードが左右の子ノードへのポインタを持ち、二分探索の性質を満たします。",
    timeComplexity: {
      access: "O(log n) (平均)",
      search: "O(log n) (平均)",
      insertion: "O(log n) (平均)",
      deletion: "O(log n) (平均)",
    },
    spaceComplexity: "O(n)",
    code: {
      javascript: "/codes/data-structure/binary-search-tree.js",
      python: "/codes/data-structure/binary-search-tree.py",
    },
    icon: <GitGraph />,
  },
  heap: {
    name: "ヒープ",
    description:
      "親ノードが常に子ノードより大きい（または小さい）値を持つように構成された完全二分木です。",
    example:
      "会社の組織図で、上司は必ず部下より給料が高い（最大ヒープの場合）というような、階層的な順序関係を持つ構造に似ています。",
    pros: [
      "ヒープの根の最大値（または最小値）の取得がO(1)。",
      "挿入・削除がO(log n)で実行可能。",
      "優先度キューの実装に使用。",
    ],
    cons: ["根以外の特定の値を探索するのはO(n)かかり、効率が悪い。"],
    structure:
      "完全二分木の性質を持ち、親ノードと子ノードの関係がヒープ条件を満たします。",
    timeComplexity: {
      access: "O(1)",
      search: "O(n)",
      insertion: "O(log n)",
      deletion: "O(log n)",
    },
    spaceComplexity: "O(n)",
    code: {
      javascript: "/codes/data-structure/heap.js",
      python: "/codes/data-structure/heap.py",
    },
    icon: <Mountain />,
  },
  graph: {
    name: "グラフ",
    description:
      "ノード（頂点）とそれらを結ぶエッジ（辺）から構成される、関係性を表現するためのデータ構造です。",
    example:
      "SNSの友達関係や電車の路線図のように、点（人や駅）とそれらを繋ぐ線（関係や路線）で構成されたネットワークを表します。",
    pros: [
      "複雑な関係性を表現可能。",
      "ソーシャルネットワーク、地図、ネットワーク分析などに応用される。",
    ],
    cons: [
      "構造が自由なため、アルゴリズムの実装が複雑になりやすい。",
      "隣接行列で表現する場合、メモリ消費が大きくなる(O(V²))。",
    ],
    structure:
      "隣接リストや隣接行列で表現され、様々なアルゴリズムの基盤となります。（隣接リスト表現で、BFS/DFSによる走査を想定）",
    timeComplexity: {
      access: "O(V + E)",
      search: "O(V + E)",
      insertion: "O(1)",
      deletion: "O(V + E)",
    },
    spaceComplexity: "O(V + E)",
    code: {
      javascript: "/codes/data-structure/graph.js",
      python: "/codes/data-structure/graph.py",
    },
    icon: <Network />,
  },
  trie: {
    name: "トライ木",
    description:
      "文字列の集合を効率的に格納・検索するために特化した木構造です。",
    example:
      "辞書の目次のように、先頭の文字から一文字ずつ辿っていくことで、目的の単語を高速に見つけ出す仕組みに似ています。",
    pros: [
      "文字列の長さをmとすると、検索・挿入・削除がO(m)で実行可能。",
      "自動補完機能などに使用。",
    ],
    cons: [
      "各ノードが子ノードへのポインタを多数持つため、メモリ消費量が非常に大きくなる可能性がある。",
    ],
    structure: "各ノードが文字を表し、根から葉への経路が単語を形成します。",
    timeComplexity: {
      access: "O(m)",
      search: "O(m)",
      insertion: "O(m)",
      deletion: "O(m)",
    },
    spaceComplexity: "O(文字セットサイズ * ノード数)",
    code: {
      javascript: "/codes/data-structure/trie.js",
      python: "/codes/data-structure/trie.py",
    },
    icon: <TextSearch />,
  },
  "avl-tree": {
    name: "AVL木",
    description:
      "挿入や削除が行われるたびに、自動的に木のバランスを保つように調整される二分探索木です。",
    example:
      "シーソーのように、常に左右のバランスが取れている状態を維持する二分探索木と考えることができます。",
    pros: [
      "左右の部分木の高さの差が最大1に保たれる。",
      "常にO(log n)の性能を保証。",
    ],
    cons: [
      "バランスを維持するための回転操作が複雑で、挿入・削除の定数倍コストが大きい。",
    ],
    structure: "各ノードがバランス因子を持ち、回転操作でバランスを維持します。",
    timeComplexity: {
      access: "O(log n)",
      search: "O(log n)",
      insertion: "O(log n)",
      deletion: "O(log n)",
    },
    spaceComplexity: "O(n)",
    code: {
      javascript: "/codes/data-structure/avl-tree.js",
      python: "/codes/data-structure/avl-tree.py",
    },
    icon: <GitGraph />,
  },
  "b-tree": {
    name: "B木",
    description:
      "データベースやファイルシステムで、大量のデータを効率的に扱うために使用される多分木（一つのノードが多数の子を持つ木）です。",
    example:
      "巨大な図書館の多層的な目録のように、大量の情報を効率的に整理し、素早く目的の情報にアクセスする仕組みに似ています。",
    pros: [
      "各ノードが複数のキーを持ち、ディスクアクセスを最小化。",
      "大量のデータを効率的に管理。",
    ],
    cons: [
      "実装が非常に複雑である。",
      "ノード内のデータが増えると、メモリ消費が大きくなる。",
    ],
    structure:
      "各ノードが複数のキーと子ノードを持ち、常にバランスが保たれます。",
    timeComplexity: {
      access: "O(log n)",
      search: "O(log n)",
      insertion: "O(log n)",
      deletion: "O(log n)",
    },
    spaceComplexity: "O(n)",
    code: {
      javascript: "/codes/data-structure/b-tree.js",
      python: "/codes/data-structure/b-tree.py",
    },
    icon: <Database />,
  },
};
