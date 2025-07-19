"use client";

import React, { useState } from "react";

interface LayerData {
  name: string;
  color: string;
  role: string;
  protocols: string;
  dataUnit: string;
  description: string;
}

const OSISimulator: React.FC = () => {
  const [message, setMessage] = useState("こんにちは！");
  const [isSimulating, setIsSimulating] = useState(false);
  const [currentLayer, setCurrentLayer] = useState(-1);
  const [packetContent, setPacketContent] = useState<string[]>([]);
  const [explanation, setExplanation] = useState(
    "メッセージを入力して「送信」ボタンを押してください。"
  );
  const [showModal, setShowModal] = useState(false);
  const [selectedLayer, setSelectedLayer] = useState<LayerData | null>(null);
  const [phase, setPhase] = useState<
    "idle" | "sending" | "transmitting" | "receiving" | "complete"
  >("idle");

  const layersData: LayerData[] = [
    {
      name: "第7層: アプリケーション層",
      color: "bg-red-500",
      role: "ユーザーが直接触れるサービスを提供",
      protocols: "HTTP, FTP, SMTP, DNS",
      dataUnit: "データ",
      description:
        "ユーザーが実際に使用するアプリケーション（ブラウザ、メールソフトなど）が動作する層です。",
    },
    {
      name: "第6層: プレゼンテーション層",
      color: "bg-orange-500",
      role: "データの表現形式（文字コード等）を統一、暗号化/復号",
      protocols: "SSL/TLS, JPEG, GIF",
      dataUnit: "データ",
      description: "データの形式変換、暗号化、圧縮などを行います。",
    },
    {
      name: "第5層: セッション層",
      color: "bg-yellow-500",
      role: "通信の開始から終了までを管理（コネクション確立・切断）",
      protocols: "NetBIOS, RPC",
      dataUnit: "データ",
      description: "通信セッションの確立、管理、終了を制御します。",
    },
    {
      name: "第4層: トランスポート層",
      color: "bg-green-500",
      role: "データの信頼性を確保し、通信相手にデータを届ける",
      protocols: "TCP, UDP",
      dataUnit: "セグメント",
      description: "データの信頼性確保とエラー訂正、フロー制御を行います。",
    },
    {
      name: "第3層: ネットワーク層",
      color: "bg-blue-500",
      role: "宛先までの最適な経路を選択（ルーティング）、IPアドレスを付与",
      protocols: "IP, ICMP",
      dataUnit: "パケット",
      description: "IPアドレスを使用してデータの配送経路を決定します。",
    },
    {
      name: "第2層: データリンク層",
      color: "bg-indigo-500",
      role: "隣接する機器間の通信を制御、MACアドレスを付与",
      protocols: "Ethernet, Wi-Fi, PPP",
      dataUnit: "フレーム",
      description:
        "MACアドレスを使用して直接接続された機器間の通信を制御します。",
    },
    {
      name: "第1層: 物理層",
      color: "bg-purple-500",
      role: "データを電気信号や光信号に変換して物理メディアに流す",
      protocols: "イーサネットケーブル, 光ファイバー",
      dataUnit: "ビット",
      description:
        "デジタルデータを物理的な信号（電気、光、電波）に変換します。",
    },
  ];

  const sleep = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  const getLayerStyle = (index: number, side: "sender" | "receiver") => {
    const layer = layersData[index];
    const isActive =
      currentLayer === index &&
      ((side === "sender" && phase === "sending") ||
        (side === "receiver" && phase === "receiving"));

    const colorMap: { [key: string]: string } = {
      "bg-red-500": "#ef4444",
      "bg-orange-500": "#f97316",
      "bg-yellow-500": "#eab308",
      "bg-green-500": "#22c55e",
      "bg-blue-500": "#3b82f6",
      "bg-indigo-500": "#6366f1",
      "bg-purple-500": "#a855f7",
    };

    return {
      backgroundColor: isActive ? colorMap[layer.color] || "#6b7280" : "",
      borderLeftColor: isActive
        ? colorMap[layer.color] || "#6b7280"
        : "transparent",
      transform: isActive ? "scale(1.05)" : "scale(1)",
      boxShadow: isActive ? `0 0 20px ${colorMap[layer.color]}40` : "none",
      color: isActive ? "white" : "",
      transition: "all 0.3s ease-in-out",
    };
  };

  // const getHeaderColor = (headerNumber: string) => {
  //   const layerIndex = 7 - parseInt(headerNumber.charAt(1));
  //   const layer = layersData[layerIndex];
  //   return layer.color;
  // };

  const resetSimulation = () => {
    setIsSimulating(false);
    setCurrentLayer(-1);
    setPacketContent([]);
    setExplanation("メッセージを入力して「送信」ボタンを押してください。");
    setPhase("idle");
  };

  const startSimulation = async () => {
    if (isSimulating) return;

    setIsSimulating(true);
    setPacketContent([message]);
    setPhase("sending");

    // 送信側（カプセル化）
    for (let i = 0; i < layersData.length; i++) {
      const layer = layersData[i];
      setCurrentLayer(i);
      setExplanation(`${layer.name}: ${layer.role}`);

      await sleep(1500);

      // ヘッダーを追加（アプリケーション層以外）
      if (i > 0) {
        setPacketContent((prev) => [`H${7 - i}`, ...prev]);
        await sleep(500);
      }
    }

    // ネットワーク転送
    setPhase("transmitting");
    setCurrentLayer(-1);
    setExplanation("データを物理層で信号に変換し、ネットワークに送信します...");
    await sleep(2000);

    // 受信側（非カプセル化）
    setPhase("receiving");
    for (let i = layersData.length - 1; i >= 0; i--) {
      const layer = layersData[i];
      setCurrentLayer(i);
      setExplanation(
        `${layer.name}: ヘッダー情報を読み取り、データを取り出します。`
      );

      await sleep(1500);

      // ヘッダーを除去（アプリケーション層以外）
      if (i > 0) {
        setPacketContent((prev) => prev.slice(1));
        await sleep(500);
      }
    }

    setPhase("complete");
    setCurrentLayer(-1);
    setExplanation(
      `完了！受信者にメッセージ「${message}」が正しく届きました。`
    );
    setIsSimulating(false);
  };

  const openModal = (layer: LayerData) => {
    setSelectedLayer(layer);
    setShowModal(true);
  };

  return (
    <div className="w-full">
      {/* 操作パネル */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg mb-8">
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full flex-grow bg-gray-100 dark:bg-gray-700 border-2 border-transparent focus:border-blue-500 focus:ring-0 rounded-lg px-4 py-2"
            placeholder="送信するメッセージを入力..."
            disabled={isSimulating}
          />
          <button
            onClick={startSimulation}
            disabled={isSimulating}
            className={`w-full sm:w-auto font-bold py-2 px-6 rounded-lg transition-colors duration-300 ${
              isSimulating
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            } text-white`}
          >
            {isSimulating ? "送信中..." : "送信"}
          </button>
          <button
            onClick={resetSimulation}
            disabled={isSimulating}
            className={`w-full sm:w-auto font-bold py-2 px-6 rounded-lg transition-colors duration-300 ${
              isSimulating
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-gray-500 hover:bg-gray-600"
            } text-white`}
          >
            リセット
          </button>
        </div>
      </div>

      {/* メインの表示エリア */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* 送信側 */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
          <h2 className="text-2xl font-bold text-center mb-4">
            送信側 (あなた)
          </h2>
          <div className="space-y-2">
            {layersData.map((layer, index) => (
              <div
                key={`sender-${index}`}
                onClick={() => openModal(layer)}
                className="layer-box border-l-8 p-3 rounded-lg bg-gray-200 dark:bg-gray-700 cursor-pointer transition-all duration-300"
                style={getLayerStyle(index, "sender")}
              >
                <p className="font-bold text-sm">{layer.name}</p>
              </div>
            ))}
          </div>
        </div>

        {/* データ表示エリア */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
          <h2 className="text-2xl font-bold text-center mb-4">データの中身</h2>
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg min-h-[200px] flex items-center justify-center">
            {packetContent.length === 0 ? (
              <p className="text-gray-500">ここにデータが表示されます</p>
            ) : (
              <div className="w-full">
                <div className="flex flex-wrap gap-2 justify-center items-center">
                  {packetContent.map((item, index) => {
                    // ヘッダーの場合は色分け
                    if (item.startsWith("H")) {
                      const layerIndex = 7 - parseInt(item.charAt(1));
                      const layer = layersData[layerIndex];
                      const colorMap: { [key: string]: string } = {
                        "bg-red-500": "#ef4444",
                        "bg-orange-500": "#f97316",
                        "bg-yellow-500": "#eab308",
                        "bg-green-500": "#22c55e",
                        "bg-blue-500": "#3b82f6",
                        "bg-indigo-500": "#6366f1",
                        "bg-purple-500": "#a855f7",
                      };
                      return (
                        <div
                          key={index}
                          className="p-3 rounded-lg text-center text-sm font-semibold shadow-md transition-all duration-300 text-white border-2"
                          style={{
                            backgroundColor: colorMap[layer.color] || "#6b7280",
                            borderColor: colorMap[layer.color] || "#6b7280",
                            transform:
                              phase === "transmitting"
                                ? "scale(1.1)"
                                : "scale(1)",
                            animation:
                              phase === "transmitting"
                                ? "pulse 1s infinite"
                                : "none",
                          }}
                        >
                          {item}
                        </div>
                      );
                    } else {
                      // データ部分は虹色グラデーション
                      return (
                        <div
                          key={index}
                          className="p-3 rounded-lg text-center text-sm font-semibold shadow-md transition-all duration-300 border-2 border-red-300 dark:border-red-600"
                          style={{
                            background: "linear-gradient(90deg, #f87171)",
                            color: "#fff",
                            transform:
                              phase === "transmitting"
                                ? "scale(1.1)"
                                : "scale(1)",
                            animation:
                              phase === "transmitting"
                                ? "pulse 1s infinite"
                                : "none",
                          }}
                        >
                          📝 データ: &quot;{item}&quot;
                        </div>
                      );
                    }
                  })}
                </div>
                {phase === "transmitting" && (
                  <div className="mt-4 text-center">
                    <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                    <p className="mt-2 text-sm text-gray-500">
                      ネットワーク転送中...
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
          <div className="mt-4 text-center text-gray-600 dark:text-gray-400 min-h-[6em] flex items-center justify-center">
            <p>{explanation}</p>
          </div>
        </div>

        {/* 受信側 */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
          <h2 className="text-2xl font-bold text-center mb-4">
            受信側 (サーバー)
          </h2>
          <div className="space-y-2">
            {layersData.map((layer, index) => (
              <div
                key={`receiver-${index}`}
                onClick={() => openModal(layer)}
                className="layer-box border-l-8 p-3 rounded-lg bg-gray-200 dark:bg-gray-700 cursor-pointer transition-all duration-300"
                style={getLayerStyle(index, "receiver")}
              >
                <p className="font-bold text-sm">{layer.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 詳細説明モーダル */}
      {showModal && selectedLayer && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 max-w-2xl w-full">
            <h3 className="text-2xl font-bold mb-4">{selectedLayer.name}</h3>
            <p className="mb-4">{selectedLayer.description}</p>
            <p className="mb-2">
              <strong>データ単位:</strong> {selectedLayer.dataUnit}
            </p>
            <p className="mb-2">
              <strong>主な役割:</strong> {selectedLayer.role}
            </p>
            <p className="mb-4">
              <strong>プロトコル例:</strong> {selectedLayer.protocols}
            </p>
            <button
              onClick={() => setShowModal(false)}
              className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"
            >
              閉じる
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default OSISimulator;
