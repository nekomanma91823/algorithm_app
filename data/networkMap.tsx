export interface NetworkTopic {
  name: string;
  inANutshell: string;
  purpose: string;
  analogy: string;
  structure: string;
  pros: string;
  cons: string;
  uml: string;
  code: {
    javascript: string;
    python: string;
  };
}

export const networkMap: { [key: string]: NetworkTopic } = {
  "osi-model": {
    name: "OSI参照モデル",
    inANutshell:
      "ネットワーク通信を7つの階層に分けて整理した標準的な概念モデル",
    purpose:
      "異なるベンダーのネットワーク機器やソフトウェアが相互に通信できるよう、ネットワーク機能を階層化して標準化する",
    analogy:
      "郵便配達システムのように、手紙を書く人から最終的に受け取る人まで、各段階で専門的な役割を持つ担当者がリレー形式で処理を行う",
    structure:
      "7つの階層（物理層、データリンク層、ネットワーク層、トランスポート層、セッション層、プレゼンテーション層、アプリケーション層）で構成され、各層は特定の機能を担当",
    pros: "標準化により相互運用性が向上、トラブルシューティングが容易、ネットワーク設計の指針となる、教育・理解しやすい",
    cons: "実際のネットワーク実装とは異なる場合がある、複雑すぎる場合もある、TCP/IPモデルの方が実用的",
    uml: `graph TD
    A[アプリケーション層<br/>Layer 7<br/>HTTP, SMTP, FTP] --> B[プレゼンテーション層<br/>Layer 6<br/>暗号化, 圧縮, データ変換]
    B --> C[セッション層<br/>Layer 5<br/>セッション管理, 対話制御]
    C --> D[トランスポート層<br/>Layer 4<br/>TCP, UDP, 信頼性制御]
    D --> E[ネットワーク層<br/>Layer 3<br/>IP, ルーティング]
    E --> F[データリンク層<br/>Layer 2<br/>Ethernet, フレーム制御]
    F --> G[物理層<br/>Layer 1<br/>電気信号, 光信号, 無線]
    
    subgraph "データの流れ"
        H[アプリケーションデータ] --> I[ヘッダー追加]
        I --> J[カプセル化]
        J --> K[物理的な信号]
    end`,
    code: {
      javascript: "/codes/network/osi-model.js",
      python: "/codes/network/osi-model.py",
    },
  },
};
