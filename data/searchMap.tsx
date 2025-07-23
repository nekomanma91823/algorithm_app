interface SearchAlgorithmDetails {
  title: string;
  oneLineDescription: string;
  demoIntro: string;
  demoBridge: string;
  catchyDescription: string;
  purpose: string;
  analogy: string;
  steps: string[];
  advantages: string[];
  disadvantages: string[];
  complexity: {
    best: string;
    average: string;
    worst: string;
  };
  complexityExplanation: string;
  pseudoCode: string;
  summary: string;
  nextTopics: string[];
  code: {
    javascript: string;
    python: string;
  };
}

export const searchAlgorithmMap: { [key: string]: SearchAlgorithmDetails } = {
  "linear-search": {
    title: "線形探索 (Linear Search)",
    oneLineDescription:
      "データを最初から順番に調べていく最もシンプルで直感的な探索アルゴリズム",
    demoIntro:
      "線形探索は、探している値が見つかるまで配列を一つずつ順番に調べていく手法です。このデモでは、実際に要素が比較される様子を視覚的に確認できます。",
    demoBridge:
      "デモで見たように、線形探索は左から右へと順番に調べていく単純な仕組みです。この観察が、後の計算量や特徴の理解に繋がります。",
    catchyDescription:
      "線形探索は「一つずつ確実に調べる」最もシンプルな探索法です。",
    purpose:
      "どんなデータの並び方でも確実に目的の値を見つけることができ、プログラミングの基本概念として重要な役割を果たします。",
    analogy:
      "図書館で特定の本を探すとき、書架の左端から右端まで一冊ずつ背表紙を確認していく方法に似ています。効率は良くないかもしれませんが、必ず見つけることができる確実な方法です。",
    steps: [
      "配列の最初の要素から開始します",
      "現在の要素が探している値と一致するかを確認します",
      "一致した場合は、その位置（インデックス）を返します",
      "一致しない場合は、次の要素に移動します",
      "配列の最後まで到達しても見つからない場合は、「見つからない」ことを返します",
    ],
    advantages: [
      "実装が非常に簡単で理解しやすい",
      "データがソートされていなくても使用可能",
      "メモリ使用量が少ない",
      "小さなデータセットでは十分高速",
    ],
    disadvantages: [
      "大きなデータセットでは処理が遅い",
      "データ量に比例して実行時間が増加する",
      "効率的とは言えない探索方法",
    ],
    complexity: {
      best: "O(1)",
      average: "O(n)",
      worst: "O(n)",
    },
    complexityExplanation:
      "最良の場合は最初の要素が目的の値の場合（O(1)）、最悪の場合は最後の要素または存在しない値を探す場合（O(n)）、平均的には配列の中央付近で見つかる（O(n)）",
    pseudoCode: `function linearSearch(array, target):
    for i = 0 to length(array) - 1:
        if array[i] == target:
            return i  // 見つかった位置を返す
    return -1  // 見つからない場合`,
    summary:
      "線形探索は最もシンプルで理解しやすい探索アルゴリズムです。効率は良くありませんが、どんなデータでも確実に探索でき、プログラミングの基本概念として重要です。",
    nextTopics: [
      "二分探索で効率的な探索を学ぶ",
      "ハッシュテーブルを使った O(1) 探索",
      "ソートアルゴリズムと組み合わせた最適化",
    ],
    code: {
      javascript: "/codes/search/linear-search.js",
      python: "/codes/search/linear-search.py",
    },
  },
  "binary-search": {
    title: "二分探索 (Binary Search)",
    oneLineDescription:
      "ソート済み配列を半分に分けながら効率的に探索する分割統治法のアルゴリズム",
    demoIntro:
      "二分探索は、ソートされた配列の中央値と目的の値を比較し、探索範囲を半分ずつ絞り込んでいく効率的な手法です。このデモでは、探索範囲がどのように狭まっていくかを確認できます。",
    demoBridge:
      "デモで見たように、二分探索は毎回探索範囲を半分に絞り込む画期的な手法です。この効率的な仕組みが、大きなデータでも高速な探索を可能にします。",
    catchyDescription:
      "二分探索は「半分に分けて素早く見つける」効率性の代名詞です。",
    purpose:
      "ソート済みデータに対して対数時間で探索を行い、大量のデータでも高速処理を実現するために開発されました。",
    analogy:
      "辞書で単語を探すとき、真ん中あたりを開いて目的の単語より前か後かを判断し、該当する半分でまた真ん中を開く方法に似ています。毎回探索範囲が半分になるので、とても効率的です。",
    steps: [
      "配列の左端（low）と右端（high）のインデックスを設定します",
      "中央のインデックス（mid）を計算します：mid = (low + high) / 2",
      "配列[mid]の値と目的の値を比較します",
      "一致した場合は、そのインデックスを返します",
      "目的の値が小さい場合は、右半分を除外（high = mid - 1）",
      "目的の値が大きい場合は、左半分を除外（low = mid + 1）",
      "low > high になるまで手順2-6を繰り返します",
    ],
    advantages: [
      "大きなデータセットでも非常に高速",
      "探索時間が対数的に増加（O(log n)）",
      "メモリ効率が良い",
      "実装が比較的簡単",
    ],
    disadvantages: [
      "データが事前にソートされている必要がある",
      "ランダムアクセスが可能なデータ構造が必要",
      "データの追加・削除でソートが崩れる可能性",
    ],
    complexity: {
      best: "O(1)",
      average: "O(log n)",
      worst: "O(log n)",
    },
    complexityExplanation:
      "最良の場合は中央が目的の値の場合（O(1)）、通常は毎回半分に絞り込むため対数時間（O(log n)）で探索が完了します",
    pseudoCode: `function binarySearch(array, target):
    low = 0
    high = length(array) - 1
    
    while low <= high:
        mid = (low + high) / 2
        if array[mid] == target:
            return mid  // 見つかった位置を返す
        else if array[mid] < target:
            low = mid + 1  // 右半分を探索
        else:
            high = mid - 1  // 左半分を探索
    
    return -1  // 見つからない場合`,
    summary:
      "二分探索は分割統治法を使った効率的な探索アルゴリズムです。ソート済みデータが必要ですが、大量のデータでも対数時間で高速探索が可能です。",
    nextTopics: [
      "分割統治法の他の応用（マージソート、クイックソート）",
      "バイナリサーチツリーでの探索",
      "三分探索や指数探索などの応用",
    ],
    code: {
      javascript: "/codes/search/binary-search.js",
      python: "/codes/search/binary-search.py",
    },
  },
  bfs: {
    title: "幅優先探索 (Breadth-First Search)",
    oneLineDescription:
      "グラフやツリーを階層ごとに幅方向に探索する基本的なアルゴリズム",
    demoIntro:
      "幅優先探索は、スタート地点から同じ距離にあるすべてのノードを先に探索してから、次の距離のノードを探索する手法です。このデモでは、探索が波のように広がっていく様子を確認できます。",
    demoBridge:
      "デモで見たように、BFSは同心円状に探索範囲を広げていく特徴があります。この性質が最短経路探索や階層的な処理に活用されます。",
    catchyDescription:
      "BFSは「波のように広がって確実に見つける」階層的探索の基本です。",
    purpose:
      "グラフやツリー構造で最短経路を見つけたり、階層的な処理を行ったりするために開発されました。",
    analogy:
      "池に石を投げ込んだときの波紋が外側に向かって広がっていく様子に似ています。中心から同じ距離にある点を同時に調べてから、次の距離の点を調べていきます。",
    steps: [
      "スタートノードをキューに追加し、訪問済みにマークします",
      "キューが空でない間、以下を繰り返します",
      "キューから一つのノードを取り出します",
      "そのノードが目的のノードかチェックします",
      "目的のノードでない場合、隣接する未訪問ノードをすべてキューに追加します",
      "追加したノードを訪問済みにマークします",
      "目的のノードが見つかるか、キューが空になるまで続けます",
    ],
    advantages: [
      "最短経路を保証（重みなしグラフ）",
      "すべてのノードを漏れなく探索",
      "デッドロックが発生しない",
      "理解しやすい動作原理",
    ],
    disadvantages: [
      "メモリ使用量が多い（キューの管理）",
      "大きなグラフでは処理が重い",
      "重み付きグラフでは最短経路を保証しない",
    ],
    complexity: {
      best: "O(V + E)",
      average: "O(V + E)",
      worst: "O(V + E)",
    },
    complexityExplanation:
      "Vはノード数、Eはエッジ数を表します。すべてのノードとエッジを一度ずつ訪問するため、グラフのサイズに比例した時間がかかります",
    pseudoCode: `function BFS(graph, start, target):
    queue = [start]
    visited = set([start])
    
    while queue is not empty:
        current = queue.dequeue()
        
        if current == target:
            return true  // 見つかった
        
        for neighbor in graph.neighbors(current):
            if neighbor not in visited:
                visited.add(neighbor)
                queue.enqueue(neighbor)
    
    return false  // 見つからない`,
    summary:
      "BFSは階層的な探索を行う基本的なアルゴリズムです。最短経路探索やレベル順処理に適しており、グラフ理論の基礎として重要です。",
    nextTopics: [
      "深さ優先探索（DFS）との比較",
      "ダイクストラ法による重み付き最短経路",
      "A*アルゴリズムによる効率的な経路探索",
    ],
    code: {
      javascript: "/codes/search/bfs.js",
      python: "/codes/search/bfs.py",
    },
  },
  dfs: {
    title: "深さ優先探索 (Depth-First Search)",
    oneLineDescription:
      "グラフやツリーを深さ方向に探索し、行き止まりまで進んでから戻る基本的なアルゴリズム",
    demoIntro:
      "深さ優先探索は、一つの経路を行き止まりまで探索してから、別の経路を試す手法です。このデモでは、探索が枝分かれした道を深く掘り下げていく様子を確認できます。",
    demoBridge:
      "デモで見たように、DFSは深く潜り込んでから引き返す特徴があります。この性質が迷路の解法やバックトラッキングに活用されます。",
    catchyDescription:
      "DFSは「深く掘り下げて道を見つける」探検的な探索法です。",
    purpose:
      "グラフやツリーの全探索、経路の存在確認、トポロジカルソートなど、構造的な解析を行うために開発されました。",
    analogy:
      "迷路を探索するとき、一つの道を行き止まりまで進み、行き止まりに着いたら引き返して別の道を試す方法に似ています。記憶を頼りに来た道を戻り、まだ試していない道を探します。",
    steps: [
      "スタートノードを訪問済みにマークします",
      "現在のノードが目的のノードかチェックします",
      "目的のノードでない場合、隣接する未訪問ノードを一つ選びます",
      "選んだノードに対して再帰的にDFSを実行します",
      "すべての隣接ノードを探索し終えたら、前のノードに戻ります",
      "目的のノードが見つかるか、すべてのノードを探索するまで続けます",
    ],
    advantages: [
      "メモリ使用量が少ない（スタックベース）",
      "実装が簡単（再帰で自然に表現）",
      "経路の存在確認に適している",
      "バックトラッキングが容易",
    ],
    disadvantages: [
      "最短経路を保証しない",
      "無限ループの可能性（サイクルのあるグラフ）",
      "深い構造でスタックオーバーフローの危険",
      "探索順序が予測しにくい",
    ],
    complexity: {
      best: "O(V + E)",
      average: "O(V + E)",
      worst: "O(V + E)",
    },
    complexityExplanation:
      "Vはノード数、Eはエッジ数を表します。すべてのノードとエッジを一度ずつ訪問するため、グラフのサイズに比例した時間がかかります",
    pseudoCode: `function DFS(graph, current, target, visited):
    visited.add(current)
    
    if current == target:
        return true  // 見つかった
    
    for neighbor in graph.neighbors(current):
        if neighbor not in visited:
            if DFS(graph, neighbor, target, visited):
                return true
    
    return false  // この経路では見つからない`,
    summary:
      "DFSは深さ方向の探索を行う基本的なアルゴリズムです。メモリ効率が良く、経路探索やバックトラッキングに適しており、多くのグラフアルゴリズムの基礎となります。",
    nextTopics: [
      "幅優先探索（BFS）との比較と使い分け",
      "トポロジカルソートへの応用",
      "強連結成分の検出",
    ],
    code: {
      javascript: "/codes/search/dfs.js",
      python: "/codes/search/dfs.py",
    },
  },
  dijkstra: {
    title: "ダイクストラ法 (Dijkstra's Algorithm)",
    oneLineDescription:
      "重み付きグラフで単一始点から全ノードへの最短経路を効率的に求めるアルゴリズム",
    demoIntro:
      "ダイクストラ法は、重み（距離やコスト）がついたグラフで、スタート地点から各地点への最短経路を求める手法です。このデモでは、最短距離が段階的に確定していく様子を確認できます。",
    demoBridge:
      "デモで見たように、ダイクストラ法は確定した最短距離を基に、段階的に他のノードの最短距離を更新していきます。この貪欲な手法が最適解を保証します。",
    catchyDescription:
      "ダイクストラ法は「確実な道から最短を積み重ねる」最適化の名手です。",
    purpose:
      "重み付きグラフにおいて、単一の始点から他のすべてのノードへの最短経路を効率的に求めるために開発されました。",
    analogy:
      "道路網で最短ルートを探すカーナビに似ています。確実に到達できる最短距離の場所から順番に、そこを経由したより短いルートがないかを調べて、最短距離を更新していきます。",
    steps: [
      "すべてのノードの距離を無限大に初期化（スタートノードは0）",
      "未確定ノードの中から最小距離のノードを選択",
      "選択したノードを確定済みにマーク",
      "確定ノードの隣接ノードの距離を更新（より短い経路があれば）",
      "すべてのノードが確定するまで手順2-4を繰り返し",
      "各ノードへの最短距離と経路が確定",
    ],
    advantages: [
      "最短経路を保証（負の重みがない場合）",
      "一度の実行で全ノードへの最短距離が求まる",
      "実用的で効率的なアルゴリズム",
      "グラフの種類を問わず適用可能",
    ],
    disadvantages: [
      "負の重みを持つエッジがあると正しく動作しない",
      "密なグラフでは計算量が大きい",
      "優先度付きキューの実装が必要",
      "メモリ使用量が多い",
    ],
    complexity: {
      best: "O((V + E) log V)",
      average: "O((V + E) log V)",
      worst: "O((V + E) log V)",
    },
    complexityExplanation:
      "Vはノード数、Eはエッジ数を表します。優先度付きキューを使用した場合の計算量で、各ノードの処理にlog Vの時間がかかります",
    pseudoCode: `function dijkstra(graph, start):
    distance = array of infinity, distance[start] = 0
    priority_queue = [(0, start)]
    visited = empty set
    
    while priority_queue is not empty:
        current_dist, current = priority_queue.extract_min()
        
        if current in visited:
            continue
        
        visited.add(current)
        
        for neighbor, weight in graph.neighbors(current):
            new_dist = current_dist + weight
            if new_dist < distance[neighbor]:
                distance[neighbor] = new_dist
                priority_queue.insert((new_dist, neighbor))
    
    return distance`,
    summary:
      "ダイクストラ法は重み付きグラフでの最短経路問題を解く代表的なアルゴリズムです。貪欲法を用いて効率的に最適解を求め、多くの実用的な応用があります。",
    nextTopics: [
      "ベルマン・フォード法による負の重み対応",
      "A*アルゴリズムによる効率化",
      "フロイド・ワーシャル法による全点対最短経路",
    ],
    code: {
      javascript: "/codes/search/dijkstra.js",
      python: "/codes/search/dijkstra.py",
    },
  },
  "a-star": {
    title: "A* (A-star) アルゴリズム",
    oneLineDescription:
      "ヒューリスティック関数を使用してゴールに向かって効率的に最短経路を探索するアルゴリズム",
    demoIntro:
      "A*アルゴリズムは、ゴールまでの推定距離（ヒューリスティック）を活用して、より効率的に最短経路を見つける手法です。このデモでは、ゴールに向かって賢く探索していく様子を確認できます。",
    demoBridge:
      "デモで見たように、A*は単純な距離だけでなく、ゴールへの方向性も考慮して探索を行います。この知的な判断が、効率的な経路発見を可能にします。",
    catchyDescription:
      "A*は「未来を予測して賢く進む」インテリジェントな探索法です。",
    purpose:
      "ゲームAI、経路探索、ロボットナビゲーションなどで、限られた時間内に最短経路を効率的に見つけるために開発されました。",
    analogy:
      "目的地への道案内で、現在地からの正確な距離と目的地への直線距離の両方を考慮する方法に似ています。遠回りでも確実な道より、多少の冒険をしてでもゴールに近づく道を優先します。",
    steps: [
      "オープンリスト（探索候補）にスタートノードを追加",
      "オープンリストからf値（g値 + h値）が最小のノードを選択",
      "選択したノードをクローズドリスト（探索済み）に移動",
      "ゴールに到達した場合は経路を復元して終了",
      "隣接ノードのg値（スタートからの実距離）を計算",
      "h値（ゴールまでの推定距離）を計算してf値を求める",
      "より良い経路が見つかった場合は更新",
      "オープンリストが空になるまで手順2-7を繰り返し",
    ],
    advantages: [
      "適切なヒューリスティックで最短経路を保証",
      "ダイクストラ法より効率的",
      "実用的な応用が多い",
      "柔軟なヒューリスティック設計が可能",
    ],
    disadvantages: [
      "ヒューリスティック関数の設計が重要",
      "メモリ使用量が多い",
      "不適切なヒューリスティックで性能低下",
      "実装が複雑",
    ],
    complexity: {
      best: "O(b^d)",
      average: "O(b^d)",
      worst: "O(b^d)",
    },
    complexityExplanation:
      "bは分岐因子、dは解の深さを表します。ヒューリスティック関数の品質に大きく依存し、良い関数では大幅な効率化が期待できます",
    pseudoCode: `function aStar(graph, start, goal, heuristic):
    open_list = [(f_score(start), start)]
    closed_list = empty set
    g_score = {start: 0}
    
    while open_list is not empty:
        current = open_list.extract_min().node
        
        if current == goal:
            return reconstruct_path(current)
        
        closed_list.add(current)
        
        for neighbor in graph.neighbors(current):
            if neighbor in closed_list:
                continue
            
            tentative_g = g_score[current] + distance(current, neighbor)
            
            if tentative_g < g_score[neighbor]:
                g_score[neighbor] = tentative_g
                f_score = tentative_g + heuristic(neighbor, goal)
                open_list.insert((f_score, neighbor))
    
    return no_path_found`,
    summary:
      "A*アルゴリズムはヒューリスティックを活用した効率的な最短経路探索法です。ゲームAIや実世界のナビゲーションで広く使用され、知的な探索の代表例です。",
    nextTopics: [
      "ヒューリスティック関数の設計方法",
      "IDA*（反復深化A*）による メモリ効率化",
      "ゲームAIでの状態空間探索",
    ],
    code: {
      javascript: "/codes/search/a-star.js",
      python: "/codes/search/a-star.py",
    },
  },
};
