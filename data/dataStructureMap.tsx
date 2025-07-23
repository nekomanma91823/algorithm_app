export interface DataStructureConfig {
  name: string;
  description: string;
  features: string;
  example: string;
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
}

export const dataStructureMap: { [key: string]: DataStructureConfig } = {
  "array": {
    name: "配列",
    description: "同じ型のデータを連続したメモリ領域に格納するデータ構造",
    features: "インデックスによる高速なアクセスが可能。しかし、挿入や削除時に要素をシフトする必要がある。",
    example: "本棚のように、番号が付いた棚に本を順番に並べるイメージ。どの番号の本でもすぐに取り出せます。",
    structure: "要素がメモリ上で連続して配置され、各要素にはインデックス（添字）でアクセスします。",
    timeComplexity: {
      access: "O(1)",
      search: "O(n)",
      insertion: "O(n)",
      deletion: "O(n)"
    },
    spaceComplexity: "O(n)",
    code: {
      javascript: "/codes/data-structure/array.js",
      python: "/codes/data-structure/array.py"
    }
  },
  "linked-list": {
    name: "連結リスト",
    description: "各要素（ノード）が次の要素への参照を持つデータ構造",
    features: "動的なサイズ変更が可能で、挿入・削除が効率的。しかし、ランダムアクセスができない。",
    example: "数珠つなぎの電車のように、各車両が次の車両への連結器を持っているイメージ。",
    structure: "各ノードがデータと次のノードへのポインタを持ち、チェーン状に連結されています。",
    timeComplexity: {
      access: "O(n)",
      search: "O(n)",
      insertion: "O(1)",
      deletion: "O(1)"
    },
    spaceComplexity: "O(n)",
    code: {
      javascript: "/codes/data-structure/linked-list.js",
      python: "/codes/data-structure/linked-list.py"
    }
  },
  "stack": {
    name: "スタック",
    description: "LIFO（Last In, First Out）方式でデータを管理するデータ構造",
    features: "最後に追加した要素を最初に取り出す。関数呼び出しやブラウザの戻るボタンなどに使用される。",
    example: "本を積み重ねた状態。一番上の本しか取り出せず、新しい本も一番上にしか置けません。",
    structure: "要素の追加（push）と削除（pop）がスタックの上（top）でのみ行われます。",
    timeComplexity: {
      access: "O(n)",
      search: "O(n)",
      insertion: "O(1)",
      deletion: "O(1)"
    },
    spaceComplexity: "O(n)",
    code: {
      javascript: "/codes/data-structure/stack.js",
      python: "/codes/data-structure/stack.py"
    }
  },
  "queue": {
    name: "キュー",
    description: "FIFO（First In, First Out）方式でデータを管理するデータ構造",
    features: "最初に追加した要素を最初に取り出す。プリンタのジョブ管理やタスクスケジューリングに使用される。",
    example: "コンビニのレジ待ちの列。最初に並んだ人が最初にサービスを受けられます。",
    structure: "要素の追加（enqueue）は後端（rear）で、削除（dequeue）は前端（front）で行われます。",
    timeComplexity: {
      access: "O(n)",
      search: "O(n)",
      insertion: "O(1)",
      deletion: "O(1)"
    },
    spaceComplexity: "O(n)",
    code: {
      javascript: "/codes/data-structure/queue.js",
      python: "/codes/data-structure/queue.py"
    }
  },
  "hash-table": {
    name: "ハッシュテーブル",
    description: "キーと値のペアを効率的に格納・検索するデータ構造",
    features: "平均的にO(1)での検索・挿入・削除が可能。ハッシュ関数の衝突処理が重要。",
    example: "辞書のように、単語（キー）をすぐに意味（値）に変換できるシステム。",
    structure: "ハッシュ関数でキーを配列のインデックスに変換し、そこに値を格納します。",
    timeComplexity: {
      access: "O(1)",
      search: "O(1)",
      insertion: "O(1)",
      deletion: "O(1)"
    },
    spaceComplexity: "O(n)",
    code: {
      javascript: "/codes/data-structure/hash-table.js",
      python: "/codes/data-structure/hash-table.py"
    }
  },
  "binary-search-tree": {
    name: "二分探索木",
    description: "各ノードが最大2つの子を持ち、左の子<親<右の子の関係を満たす木構造",
    features: "検索・挿入・削除が平均O(log n)で実行可能。しかし、バランスが崩れると性能が劣化する。",
    example: "家系図のような木構造で、左の子は親より小さく、右の子は親より大きい値を持つ。",
    structure: "各ノードが左右の子ノードへのポインタを持ち、二分探索の性質を満たします。",
    timeComplexity: {
      access: "O(log n)",
      search: "O(log n)",
      insertion: "O(log n)",
      deletion: "O(log n)"
    },
    spaceComplexity: "O(n)",
    code: {
      javascript: "/codes/data-structure/binary-search-tree.js",
      python: "/codes/data-structure/binary-search-tree.py"
    }
  },
  "heap": {
    name: "ヒープ",
    description: "親ノードが子ノードより大きい（または小さい）完全二分木",
    features: "最大値（または最小値）の取得がO(1)、挿入・削除がO(log n)で実行可能。優先度キューの実装に使用。",
    example: "会社の組織図で、上司は必ず部下より給料が高い（最大ヒープの場合）という構造。",
    structure: "完全二分木の性質を持ち、配列で効率的に表現できます。",
    timeComplexity: {
      access: "O(n)",
      search: "O(n)",
      insertion: "O(log n)",
      deletion: "O(log n)"
    },
    spaceComplexity: "O(n)",
    code: {
      javascript: "/codes/data-structure/heap.js",
      python: "/codes/data-structure/heap.py"
    }
  },
  "graph": {
    name: "グラフ",
    description: "ノード（頂点）とエッジ（辺）から構成されるデータ構造",
    features: "複雑な関係性を表現可能。ソーシャルネットワーク、地図、ネットワーク分析などに応用される。",
    example: "SNSの友達関係や電車の路線図のように、点（駅）と線（路線）で構成されたネットワーク。",
    structure: "隣接リストや隣接行列で表現され、様々なアルゴリズムの基盤となります。",
    timeComplexity: {
      access: "O(V + E)",
      search: "O(V + E)",
      insertion: "O(1)",
      deletion: "O(V + E)"
    },
    spaceComplexity: "O(V + E)",
    code: {
      javascript: "/codes/data-structure/graph.js",
      python: "/codes/data-structure/graph.py"
    }
  },
  "trie": {
    name: "トライ木",
    description: "文字列の集合を効率的に格納・検索するための木構造",
    features: "文字列の長さをmとすると、検索・挿入・削除がO(m)で実行可能。自動補完機能などに使用。",
    example: "辞書の目次のように、文字を一つずつ辿って単語を見つける仕組み。",
    structure: "各ノードが文字を表し、根から葉への経路が単語を形成します。",
    timeComplexity: {
      access: "O(m)",
      search: "O(m)",
      insertion: "O(m)",
      deletion: "O(m)"
    },
    spaceComplexity: "O(ALPHABET_SIZE * N * M)",
    code: {
      javascript: "/codes/data-structure/trie.js",
      python: "/codes/data-structure/trie.py"
    }
  },
  "avl-tree": {
    name: "AVL木",
    description: "自動的にバランスを保つ二分探索木",
    features: "左右の部分木の高さの差が最大1に保たれる。常にO(log n)の性能を保証。",
    example: "シーソーのように、常に左右のバランスが取れている二分探索木。",
    structure: "各ノードがバランス因子を持ち、回転操作でバランスを維持します。",
    timeComplexity: {
      access: "O(log n)",
      search: "O(log n)",
      insertion: "O(log n)",
      deletion: "O(log n)"
    },
    spaceComplexity: "O(n)",
    code: {
      javascript: "/codes/data-structure/avl-tree.js",
      python: "/codes/data-structure/avl-tree.py"
    }
  },
  "b-tree": {
    name: "B木",
    description: "データベースやファイルシステムで使用される多分木",
    features: "各ノードが複数のキーを持ち、ディスクアクセスを最小化。大量のデータを効率的に管理。",
    example: "図書館の分類システムのように、階層的に情報を整理して検索を効率化する仕組み。",
    structure: "各ノードが複数のキーと子ノードを持ち、常にバランスが保たれます。",
    timeComplexity: {
      access: "O(log n)",
      search: "O(log n)",
      insertion: "O(log n)",
      deletion: "O(log n)"
    },
    spaceComplexity: "O(n)",
    code: {
      javascript: "/codes/data-structure/b-tree.js",
      python: "/codes/data-structure/b-tree.py"
    }
  }
};
