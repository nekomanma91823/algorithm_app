"use client";

import React, { useState } from "react";

interface LayerDetail {
  layer: number;
  name: string;
  color: string;
  description: string;
  functions: string[];
  protocols: string[];
  dataUnit: string;
  examples: string[];
  analogy: string;
}

const OSILayerGuide: React.FC = () => {
  const [selectedLayer, setSelectedLayer] = useState<number>(7);

  const layersData: LayerDetail[] = [
    {
      layer: 7,
      name: "アプリケーション層",
      color: "bg-red-500",
      description:
        "ユーザーが直接操作するアプリケーションソフトウェアが動作する層です。ネットワークサービスの入り口となります。",
      functions: [
        "ファイル転送",
        "電子メール",
        "Webブラウジング",
        "リモートログイン",
        "ドメイン名解決",
      ],
      protocols: [
        "HTTP/HTTPS",
        "FTP",
        "SMTP",
        "POP3",
        "IMAP",
        "DNS",
        "SSH",
        "Telnet",
      ],
      dataUnit: "データ",
      examples: [
        "Webブラウザでウェブサイトを閲覧",
        "メールクライアントでメール送受信",
        "FTPクライアントでファイル転送",
      ],
      analogy:
        "郵便局の窓口カウンター。お客さん（ユーザー）が直接やり取りする場所。",
    },
    {
      layer: 6,
      name: "プレゼンテーション層",
      color: "bg-orange-500",
      description:
        "データの表現形式を統一し、暗号化や圧縮などのデータ変換を行う層です。",
      functions: [
        "データの暗号化・復号化",
        "データの圧縮・伸張",
        "文字コードの変換",
        "画像・音声の形式変換",
      ],
      protocols: ["SSL/TLS", "JPEG", "GIF", "PNG", "MP3", "MPEG"],
      dataUnit: "データ",
      examples: [
        "HTTPS通信でのSSL暗号化",
        "JPEG画像の圧縮",
        "UTF-8文字エンコーディング",
      ],
      analogy:
        "郵便局の翻訳・暗号化部門。手紙を相手が理解できる形式に変換し、必要に応じて暗号化。",
    },
    {
      layer: 5,
      name: "セッション層",
      color: "bg-yellow-500",
      description:
        "通信セッションの確立、管理、終了を制御し、対話を管理する層です。",
      functions: [
        "セッションの確立・終了",
        "対話制御（半二重・全二重）",
        "チェックポイント機能",
        "再同期",
      ],
      protocols: ["NetBIOS", "RPC", "SQL", "NFS"],
      dataUnit: "データ",
      examples: [
        "データベースへのログインセッション",
        "リモートプロシージャコール",
        "ファイル共有セッション",
      ],
      analogy:
        "郵便局の受付管理。誰がいつから手続きを開始し、いつ終了するかを管理。",
    },
    {
      layer: 4,
      name: "トランスポート層",
      color: "bg-green-500",
      description:
        "エンドツーエンドの信頼性のある通信を提供し、データの完全性を保証する層です。",
      functions: [
        "エラー検出・訂正",
        "フロー制御",
        "再送制御",
        "ポート番号による識別",
      ],
      protocols: ["TCP", "UDP", "SCTP"],
      dataUnit: "セグメント",
      examples: [
        "Webブラウザ（ポート80/443）",
        "メール送信（ポート25）",
        "DNSクエリ（ポート53）",
      ],
      analogy:
        "郵便局の品質管理部門。手紙が確実に届くように管理し、紛失した場合は再送。",
    },
    {
      layer: 3,
      name: "ネットワーク層",
      color: "bg-blue-500",
      description:
        "異なるネットワーク間でのデータ配送とルーティングを行う層です。",
      functions: [
        "ルーティング（経路制御）",
        "IPアドレス管理",
        "パケット転送",
        "ネットワーク間接続",
      ],
      protocols: ["IP", "ICMP", "ARP", "OSPF", "BGP"],
      dataUnit: "パケット",
      examples: [
        "ルーターによるパケット転送",
        "IPアドレスによる宛先識別",
        "インターネット経由の通信",
      ],
      analogy: "郵便局の配送計画部門。どの経路で手紙を送るのが最適かを決定。",
    },
    {
      layer: 2,
      name: "データリンク層",
      color: "bg-indigo-500",
      description:
        "直接接続された機器間での信頼性のあるデータ転送を行う層です。",
      functions: [
        "フレーム同期",
        "エラー検出",
        "MACアドレス管理",
        "メディアアクセス制御",
      ],
      protocols: ["Ethernet", "Wi-Fi", "PPP", "Frame Relay"],
      dataUnit: "フレーム",
      examples: [
        "LANケーブルでの通信",
        "Wi-Fi通信",
        "スイッチによるフレーム転送",
      ],
      analogy: "郵便局の地域配送部門。隣接する郵便局間で確実に手紙を受け渡し。",
    },
    {
      layer: 1,
      name: "物理層",
      color: "bg-purple-500",
      description:
        "デジタルデータを物理的な信号に変換し、物理メディア上で伝送する層です。",
      functions: ["電気信号変換", "光信号変換", "無線信号変換", "物理的接続"],
      protocols: ["イーサネットケーブル", "光ファイバー", "無線", "Bluetooth"],
      dataUnit: "ビット",
      examples: [
        "LANケーブルでの電気信号",
        "光ファイバーでの光信号",
        "Wi-Fiでの無線信号",
      ],
      analogy:
        "郵便局の輸送手段。トラック、飛行機、船など実際に手紙を運ぶ物理的な手段。",
    },
  ];

  const currentLayer = layersData.find(
    (layer) => layer.layer === selectedLayer
  );

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
      <h3 className="text-2xl font-bold text-center mb-6">
        OSI 7階層 詳細ガイド
      </h3>

      {/* 層選択ボタン */}
      <div className="grid grid-cols-1 md:grid-cols-7 gap-2 mb-8">
        {layersData.map((layer) => (
          <button
            key={layer.layer}
            onClick={() => setSelectedLayer(layer.layer)}
            className={`p-3 rounded-lg font-bold text-white text-sm transition-all ${
              selectedLayer === layer.layer
                ? `${layer.color} scale-105 shadow-lg`
                : `${layer.color} opacity-70 hover:opacity-90`
            }`}
          >
            第{layer.layer}層<br />
            {layer.name}
          </button>
        ))}
      </div>

      {/* 選択された層の詳細 */}
      {currentLayer && (
        <div className="space-y-6">
          <div className="text-center">
            <h4
              className={`text-3xl font-bold text-white p-4 rounded-lg ${currentLayer.color} inline-block`}
            >
              第{currentLayer.layer}層: {currentLayer.name}
            </h4>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <h5 className="text-lg font-semibold mb-2 text-gray-700 dark:text-gray-300">
                  📝 概要
                </h5>
                <p className="text-gray-600 dark:text-gray-400">
                  {currentLayer.description}
                </p>
              </div>

              <div>
                <h5 className="text-lg font-semibold mb-2 text-gray-700 dark:text-gray-300">
                  🎯 主な機能
                </h5>
                <ul className="list-disc list-inside space-y-1 text-gray-600 dark:text-gray-400">
                  {currentLayer.functions.map((func, index) => (
                    <li key={index}>{func}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h5 className="text-lg font-semibold mb-2 text-gray-700 dark:text-gray-300">
                  💭 郵便局での例え
                </h5>
                <p className="text-gray-600 dark:text-gray-400 italic">
                  {currentLayer.analogy}
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h5 className="text-lg font-semibold mb-2 text-gray-700 dark:text-gray-300">
                  🌐 プロトコル例
                </h5>
                <div className="flex flex-wrap gap-2">
                  {currentLayer.protocols.map((protocol, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-200 rounded-full text-sm"
                    >
                      {protocol}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h5 className="text-lg font-semibold mb-2 text-gray-700 dark:text-gray-300">
                  📦 データ単位
                </h5>
                <span
                  className={`px-4 py-2 text-white rounded-lg font-bold ${currentLayer.color}`}
                >
                  {currentLayer.dataUnit}
                </span>
              </div>

              <div>
                <h5 className="text-lg font-semibold mb-2 text-gray-700 dark:text-gray-300">
                  💡 実用例
                </h5>
                <ul className="list-disc list-inside space-y-1 text-gray-600 dark:text-gray-400">
                  {currentLayer.examples.map((example, index) => (
                    <li key={index}>{example}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OSILayerGuide;
