// import { Calendar, Home, Inbox, Search, Settings } from "lucide-react";
export const sidebarData = [
  // =============================================
  // 基本（コンピュータサイエンスの基礎）
  // =============================================
  {
    section: "基礎",
    content: [
      { title: "CPUの仕組み", url: "/basics/cpu-architecture" },
      { title: "GPUの仕組み", url: "/basics/gpu-architecture" },
      { title: "メモリとストレージ", url: "/basics/memory-and-storage" },
      { title: "ハードウェア", url: "/basics/hardware" },
      { title: "ソフトウェア", url: "/basics/software" },
      { title: "OSの役割", url: "/basics/os-role" },
      { title: "プロセスとスレッド", url: "/basics/process-thread" },
      { title: "メモリ管理", url: "/basics/memory-management" },
      { title: "論理演算", url: "/basics/logical-operations" },
      { title: "2進数と16進数", url: "/basics/number-systems" },
      { title: "集合", url: "/basics/set-theory" },
      { title: "計算量", url: "/basics/complexity" },
    ],
  },
  // =============================================
  // データ構造
  // =============================================
  {
    section: "データ構造",
    content: [
      { title: "配列", url: "/data-structure/array" },
      { title: "連結リスト", url: "/data-structure/linked-list" },
      { title: "スタック", url: "/data-structure/stack" },
      { title: "キュー", url: "/data-structure/queue" },
      { title: "ハッシュテーブル", url: "/data-structure/hash-table" },
      { title: "二分探索木", url: "/data-structure/binary-search-tree" },
      { title: "ヒープ", url: "/data-structure/heap" },
      { title: "グラフ", url: "/data-structure/graph" },
      { title: "トライ木", url: "/data-structure/trie" },
      { title: "AVL木", url: "/data-structure/avl-tree" },
      { title: "B木", url: "/data-structure/b-tree" },
    ],
  },
  // =============================================
  // 探索アルゴリズム
  // =============================================
  {
    section: "探索アルゴリズム",
    content: [
      { title: "線形探索", url: "/search/linear-search" },
      { title: "二分探索", url: "/search/binary-search" },
      { title: "幅優先探索 (BFS)", url: "/search/bfs" },
      { title: "深さ優先探索 (DFS)", url: "/search/dfs" },
      { title: "ダイクストラ法", url: "/search/dijkstra" },
      { title: "A* (A-star) アルゴリズム", url: "/search/a-star" },
    ],
  },
  // =============================================
  // ソートアルゴリズム
  // =============================================
  {
    section: "ソートアルゴリズム",
    content: [
      { title: "バブルソート", url: "/sort/bubble-sort" },
      { title: "選択ソート", url: "/sort/selection-sort" },
      { title: "挿入ソート", url: "/sort/insertion-sort" },
      { title: "シェルソート", url: "/sort/shell-sort" },
      { title: "マージソート", url: "/sort/merge-sort" },
      { title: "クイックソート", url: "/sort/quick-sort" },
      { title: "ヒープソート", url: "/sort/heap-sort" },
      { title: "カウントソート", url: "/sort/counting-sort" },
      { title: "基数ソート", url: "/sort/radix-sort" },
      { title: "バケットソート", url: "/sort/bucket-sort" },
      { title: "ティムソート", url: "/sort/tim-sort" },
      { title: "イントロソート", url: "/sort/intro-sort" },
      { title: "ボゴソート", url: "/sort/bogo-sort" },
    ],
  },
  // =============================================
  // デザインパターン
  // =============================================
  {
    section: "デザインパターン",
    content: [
      // 生成に関するパターン
      { title: "Singleton", url: "/design-pattern/singleton" },
      { title: "Factory Method", url: "/design-pattern/factory-method" },
      { title: "Abstract Factory", url: "/design-pattern/abstract-factory" },
      { title: "Builder", url: "/design-pattern/builder" },
      { title: "Prototype", url: "/design-pattern/prototype" },
      // 構造に関するパターン
      { title: "Adapter", url: "/design-pattern/adapter" },
      { title: "Bridge", url: "/design-pattern/bridge" },
      { title: "Composite", url: "/design-pattern/composite" },
      { title: "Decorator", url: "/design-pattern/decorator" },
      { title: "Facade", url: "/design-pattern/facade" },
      { title: "Flyweight", url: "/design-pattern/flyweight" },
      { title: "Proxy", url: "/design-pattern/proxy" },
      // 振る舞いに関するパターン
      {
        title: "Chain of Responsibility",
        url: "/design-pattern/chain-of-responsibility",
      },
      { title: "Command", url: "/design-pattern/command" },
      { title: "Interpreter", url: "/design-pattern/interpreter" },
      { title: "Iterator", url: "/design-pattern/iterator" },
      { title: "Mediator", url: "/design-pattern/mediator" },
      { title: "Memento", url: "/design-pattern/memento" },
      { title: "Observer", url: "/design-pattern/observer" },
      { title: "State", url: "/design-pattern/state" },
      { title: "Strategy", url: "/design-pattern/strategy" },
      { title: "Template Method", url: "/design-pattern/template-method" },
      { title: "Visitor", url: "/design-pattern/visitor" },
    ],
  },
  // =============================================
  // 機械学習
  // =============================================
  // {
  //   section: "機械学習",
  //   content: [
  //     { title: "線形回帰", url: "/ml/linear-regression" },
  //     { title: "ロジスティック回帰", url: "/ml/logistic-regression" },
  //     { title: "k-近傍法 (k-NN)", url: "/ml/k-nearest-neighbors" },
  //     { title: "サポートベクターマシン (SVM)", url: "/ml/svm" },
  //     { title: "決定木", url: "/ml/decision-tree" },
  //     { title: "ニューラルネットワーク", url: "/ml/neural-network" },
  //     { title: "勾配降下法", url: "/ml/gradient-descent" },
  //     { title: "k-Means クラスタリング", url: "/ml/k-means-clustering" },
  //   ],
  // },
  // =============================================
  // ネットワーク
  // =============================================
  // {
  //   section: "ネットワーク",
  //   content: [
  //     { title: "OSI参照モデル", url: "/network/osi-model" },
  //     { title: "TCP/IPモデル", url: "/network/tcp-ip-model" },
  //     { title: "3ウェイハンドシェイク", url: "/network/3-way-handshake" },
  //     { title: "DNSの名前解決", url: "/network/dns-resolution" },
  //     { title: "HTTP/HTTPS 通信", url: "/network/http-https" },
  //     { title: "IPアドレスとサブネット", url: "/network/ip-subnet" },
  //   ],
  // },
  // =============================================
  // データベース
  // =============================================
  // {
  //   section: "データベース",
  //   content: [
  //     { title: "SQL Joins", url: "/db/sql-joins" },
  //     { title: "インデックス (B-Tree)", url: "/db/indexing" },
  //     { title: "正規化", url: "/db/normalization" },
  //     { title: "トランザクション (ACID特性)", url: "/db/transaction-acid" },
  //   ],
  // },
  // =============================================
  // セキュリティ
  // =============================================
  // {
  //   section: "セキュリティ",
  //   content: [
  //     { title: "ハッシュ化", url: "/security/hashing" },
  //     { title: "共通鍵暗号と公開鍵暗号", url: "/security/encryption" },
  //     { title: "クロスサイトスクリプティング (XSS)", url: "/security/xss" },
  //     { title: "SQLインジェクション", url: "/security/sql-injection" },
  //   ],
  // },
  // =============================================
  // バージョン管理
  // =============================================
  // {
  //   section: "バージョン管理",
  //   content: [
  //     {
  //       title: "Gitの基本（リポジトリ, コミット）",
  //       url: "/version-control/git-basics",
  //     },
  //     {
  //       title: "ブランチの分岐とマージ",
  //       url: "/version-control/branch-and-merge",
  //     },
  //     { title: "リベースの仕組み", url: "/version-control/rebase" },
  //     { title: "競合（コンフリクト）の解決", url: "/version-control/conflict" },
  //   ],
  // },
  // =============================================
  // コンテナ技術
  // =============================================
  // {
  //   section: "コンテナ技術",
  //   content: [
  //     { title: "Dockerとは？", url: "/container/what-is-docker" },
  //     { title: "イメージとコンテナ", url: "/container/image-vs-container" },
  //     { title: "Dockerfileの仕組み", url: "/container/dockerfile" },
  //     { title: "Docker Compose", url: "/container/docker-compose" },
  //   ],
  // },
  // =============================================
  // Webの仕組み
  // =============================================
  // {
  //   section: "Webの仕組み",
  //   content: [
  //     { title: "ブラウザのレンダリング", url: "/web/browser-rendering" },
  //     { title: "イベントループ", url: "/web/event-loop" },
  //   ],
  // },
  // =============================================
  // 正規表現
  // =============================================
  // {
  //   section: "正規表現",
  //   content: [
  //     { title: "正規表現とは？", url: "/regex/what-is-regex" },
  //     { title: "メタ文字と量指定子", url: "/regex/meta-and-quantifiers" },
  //     { title: "グループ化とキャプチャ", url: "/regex/grouping-and-capturing" },
  //   ],
  // },
];
