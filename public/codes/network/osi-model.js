// OSI参照モデル - JavaScript実装例
// 各層の基本的な機能をシミュレートするクラス群

// 第7層: アプリケーション層
class ApplicationLayer {
  constructor() {
    this.name = "アプリケーション層";
    this.layer = 7;
  }

  // HTTPリクエストのシミュレーション
  createHttpRequest(method, url, data = null) {
    const request = {
      method,
      url,
      headers: {
        "User-Agent": "OSI-Demo/1.0",
        "Content-Type": "application/json",
      },
      body: data,
      timestamp: new Date().toISOString(),
    };

    console.log(`Layer ${this.layer} (${this.name}): HTTPリクエスト作成`);
    console.log(request);
    return request;
  }
}

// 第6層: プレゼンテーション層
class PresentationLayer {
  constructor() {
    this.name = "プレゼンテーション層";
    this.layer = 6;
  }

  // データの暗号化・エンコーディング
  encodeData(data) {
    console.log(`Layer ${this.layer} (${this.name}): データのエンコーディング`);

    // JSON文字列化（シリアライゼーション）
    const jsonString = JSON.stringify(data);

    // Base64エンコーディング（暗号化のシミュレーション）
    const encoded = btoa(jsonString);

    console.log(`エンコード前: ${jsonString}`);
    console.log(`エンコード後: ${encoded.substring(0, 50)}...`);

    return {
      originalData: data,
      encodedData: encoded,
      encoding: "base64",
      compression: "none",
    };
  }

  // データの復号化・デコーディング
  decodeData(encodedPacket) {
    console.log(`Layer ${this.layer} (${this.name}): データのデコーディング`);

    const decoded = atob(encodedPacket.encodedData);
    const originalData = JSON.parse(decoded);

    console.log(`デコード完了: データを復元しました`);
    return originalData;
  }
}

// 第5層: セッション層
class SessionLayer {
  constructor() {
    this.name = "セッション層";
    this.layer = 5;
    this.sessions = new Map();
  }

  // セッション確立
  establishSession(sessionId) {
    console.log(`Layer ${this.layer} (${this.name}): セッション確立`);

    const session = {
      id: sessionId,
      startTime: new Date(),
      status: "active",
      sequenceNumber: 0,
    };

    this.sessions.set(sessionId, session);
    console.log(`セッションID: ${sessionId} が確立されました`);
    return session;
  }

  // セッション管理
  manageSession(sessionId, data) {
    const session = this.sessions.get(sessionId);
    if (!session) {
      throw new Error(`セッション ${sessionId} が見つかりません`);
    }

    session.sequenceNumber++;
    session.lastActivity = new Date();

    console.log(
      `Session ${sessionId}: シーケンス番号 ${session.sequenceNumber}`
    );

    return {
      sessionInfo: session,
      data: data,
    };
  }
}

// 第4層: トランスポート層
class TransportLayer {
  constructor() {
    this.name = "トランスポート層";
    this.layer = 4;
  }

  // TCP風のセグメント作成
  createTcpSegment(data, sourcePort, destPort, sequenceNum) {
    console.log(`Layer ${this.layer} (${this.name}): TCPセグメント作成`);

    const segment = {
      header: {
        sourcePort,
        destinationPort: destPort,
        sequenceNumber: sequenceNum,
        acknowledgmentNumber: 0,
        flags: {
          ACK: false,
          SYN: false,
          FIN: false,
        },
        windowSize: 65535,
        checksum: this.calculateChecksum(data),
      },
      data: data,
    };

    console.log(
      `TCPセグメント: ${sourcePort} -> ${destPort}, Seq: ${sequenceNum}`
    );
    return segment;
  }

  // 簡単なチェックサム計算
  calculateChecksum(data) {
    let checksum = 0;
    const dataStr = JSON.stringify(data);
    for (let i = 0; i < dataStr.length; i++) {
      checksum += dataStr.charCodeAt(i);
    }
    return checksum % 65536;
  }
}

// 第3層: ネットワーク層
class NetworkLayer {
  constructor() {
    this.name = "ネットワーク層";
    this.layer = 3;
  }

  // IPパケット作成
  createIpPacket(segment, sourceIp, destIp) {
    console.log(`Layer ${this.layer} (${this.name}): IPパケット作成`);

    const packet = {
      header: {
        version: 4,
        headerLength: 20,
        typeOfService: 0,
        totalLength: 20 + JSON.stringify(segment).length,
        identification: Math.floor(Math.random() * 65536),
        flags: 0,
        fragmentOffset: 0,
        timeToLive: 64,
        protocol: 6, // TCP
        headerChecksum: 0,
        sourceAddress: sourceIp,
        destinationAddress: destIp,
      },
      payload: segment,
    };

    console.log(`IPパケット: ${sourceIp} -> ${destIp}`);
    return packet;
  }

  // ルーティングテーブルのシミュレーション
  routePacket(packet) {
    const destIp = packet.header.destinationAddress;
    console.log(`ルーティング: ${destIp} への経路を決定`);

    // 簡単なルーティング判定
    if (destIp.startsWith("192.168.")) {
      return "ローカルネットワーク";
    } else {
      return "デフォルトゲートウェイ";
    }
  }
}

// 第2層: データリンク層
class DataLinkLayer {
  constructor() {
    this.name = "データリンク層";
    this.layer = 2;
  }

  // Ethernetフレーム作成
  createEthernetFrame(packet, sourceMac, destMac) {
    console.log(`Layer ${this.layer} (${this.name}): Ethernetフレーム作成`);

    const frame = {
      header: {
        preamble: "AA AA AA AA AA AA AA AB",
        destinationMAC: destMac,
        sourceMAC: sourceMac,
        etherType: "0x0800", // IPv4
        payload: packet,
        frameCheckSequence: this.calculateFCS(packet),
      },
    };

    console.log(`Ethernetフレーム: ${sourceMac} -> ${destMac}`);
    return frame;
  }

  // フレームチェックシーケンス計算
  calculateFCS(data) {
    // 簡単なCRC32のシミュレーション
    let crc = 0xffffffff;
    const dataStr = JSON.stringify(data);
    for (let i = 0; i < dataStr.length; i++) {
      crc ^= dataStr.charCodeAt(i);
    }
    return (crc >>> 0).toString(16).toUpperCase();
  }
}

// 第1層: 物理層
class PhysicalLayer {
  constructor() {
    this.name = "物理層";
    this.layer = 1;
  }

  // デジタル信号への変換
  transmitFrame(frame) {
    console.log(`Layer ${this.layer} (${this.name}): 物理的な信号送信`);

    const frameData = JSON.stringify(frame);
    const binarySignal = this.convertToBinary(frameData);

    console.log(`データサイズ: ${frameData.length} bytes`);
    console.log(`バイナリ信号: ${binarySignal.substring(0, 50)}...`);

    // 送信シミュレーション
    return this.simulateTransmission(binarySignal);
  }

  // バイナリ変換
  convertToBinary(data) {
    return data
      .split("")
      .map((char) => char.charCodeAt(0).toString(2).padStart(8, "0"))
      .join("");
  }

  // 送信シミュレーション
  simulateTransmission(binarySignal) {
    console.log("物理メディア経由でデータ送信中...");

    // ノイズや遅延のシミュレーション
    const noise = Math.random() > 0.9 ? "1" : "0";
    const delay = Math.floor(Math.random() * 10) + 1;

    return {
      signal: binarySignal,
      noise: noise,
      delay: delay,
      success: Math.random() > 0.05, // 95%の成功率
    };
  }
}

// OSI参照モデルデモンストレーション
class OSIModelDemo {
  constructor() {
    this.applicationLayer = new ApplicationLayer();
    this.presentationLayer = new PresentationLayer();
    this.sessionLayer = new SessionLayer();
    this.transportLayer = new TransportLayer();
    this.networkLayer = new NetworkLayer();
    this.dataLinkLayer = new DataLinkLayer();
    this.physicalLayer = new PhysicalLayer();
  }

  // 完全なデータ送信プロセスのデモ
  async demonstrateDataTransmission() {
    console.log("=== OSI参照モデル データ送信デモ ===\n");

    try {
      // Layer 7: アプリケーション層
      const httpRequest = this.applicationLayer.createHttpRequest(
        "POST",
        "/api/users",
        { name: "Alice", email: "alice@example.com" }
      );
      console.log("");

      // Layer 6: プレゼンテーション層
      const encodedData = this.presentationLayer.encodeData(httpRequest);
      console.log("");

      // Layer 5: セッション層
      const sessionId = "session_" + Math.random().toString(36).substr(2, 9);
      this.sessionLayer.establishSession(sessionId);
      const sessionData = this.sessionLayer.manageSession(
        sessionId,
        encodedData
      );
      console.log("");

      // Layer 4: トランスポート層
      const tcpSegment = this.transportLayer.createTcpSegment(
        sessionData,
        8080,
        80,
        1001
      );
      console.log("");

      // Layer 3: ネットワーク層
      const ipPacket = this.networkLayer.createIpPacket(
        tcpSegment,
        "192.168.1.100",
        "203.0.113.1"
      );
      const route = this.networkLayer.routePacket(ipPacket);
      console.log(`ルーティング先: ${route}`);
      console.log("");

      // Layer 2: データリンク層
      const ethernetFrame = this.dataLinkLayer.createEthernetFrame(
        ipPacket,
        "00:1A:2B:3C:4D:5E",
        "00:5E:4D:3C:2B:1A"
      );
      console.log("");

      // Layer 1: 物理層
      const transmissionResult =
        this.physicalLayer.transmitFrame(ethernetFrame);
      console.log("");

      // 結果表示
      console.log("=== 送信結果 ===");
      console.log(`送信成功: ${transmissionResult.success ? "Yes" : "No"}`);
      console.log(`遅延: ${transmissionResult.delay}ms`);
      console.log(
        `ノイズ検出: ${transmissionResult.noise === "1" ? "Yes" : "No"}`
      );
    } catch (error) {
      console.error("送信エラー:", error.message);
    }
  }
}

// デモ実行
const demo = new OSIModelDemo();
demo.demonstrateDataTransmission();
