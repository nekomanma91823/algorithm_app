# OSI参照モデル - Python実装例
# 各層の基本的な機能をシミュレートするクラス群

import json
import base64
import hashlib
import random
from datetime import datetime
from typing import Dict, Any, Optional


# 第7層: アプリケーション層
class ApplicationLayer:
    def __init__(self):
        self.name = "アプリケーション層"
        self.layer = 7

    def create_http_request(
        self, method: str, url: str, data: Optional[Dict] = None
    ) -> Dict:
        """HTTPリクエストのシミュレーション"""
        request = {
            "method": method,
            "url": url,
            "headers": {
                "User-Agent": "OSI-Demo/1.0",
                "Content-Type": "application/json",
            },
            "body": data,
            "timestamp": datetime.now().isoformat(),
        }

        print(f"Layer {self.layer} ({self.name}): HTTPリクエスト作成")
        print(json.dumps(request, indent=2, ensure_ascii=False))
        return request


# 第6層: プレゼンテーション層
class PresentationLayer:
    def __init__(self):
        self.name = "プレゼンテーション層"
        self.layer = 6

    def encode_data(self, data: Dict) -> Dict:
        """データの暗号化・エンコーディング"""
        print(f"Layer {self.layer} ({self.name}): データのエンコーディング")

        # JSON文字列化（シリアライゼーション）
        json_string = json.dumps(data, ensure_ascii=False)

        # Base64エンコーディング（暗号化のシミュレーション）
        encoded_bytes = base64.b64encode(json_string.encode("utf-8"))
        encoded_string = encoded_bytes.decode("utf-8")

        print(f"エンコード前: {json_string[:100]}...")
        print(f"エンコード後: {encoded_string[:50]}...")

        return {
            "original_data": data,
            "encoded_data": encoded_string,
            "encoding": "base64",
            "compression": "none",
        }

    def decode_data(self, encoded_packet: Dict) -> Dict:
        """データの復号化・デコーディング"""
        print(f"Layer {self.layer} ({self.name}): データのデコーディング")

        decoded_bytes = base64.b64decode(encoded_packet["encoded_data"])
        decoded_string = decoded_bytes.decode("utf-8")
        original_data = json.loads(decoded_string)

        print("デコード完了: データを復元しました")
        return original_data


# 第5層: セッション層
class SessionLayer:
    def __init__(self):
        self.name = "セッション層"
        self.layer = 5
        self.sessions = {}

    def establish_session(self, session_id: str) -> Dict:
        """セッション確立"""
        print(f"Layer {self.layer} ({self.name}): セッション確立")

        session = {
            "id": session_id,
            "start_time": datetime.now(),
            "status": "active",
            "sequence_number": 0,
        }

        self.sessions[session_id] = session
        print(f"セッションID: {session_id} が確立されました")
        return session

    def manage_session(self, session_id: str, data: Any) -> Dict:
        """セッション管理"""
        if session_id not in self.sessions:
            raise ValueError(f"セッション {session_id} が見つかりません")

        session = self.sessions[session_id]
        session["sequence_number"] += 1
        session["last_activity"] = datetime.now()

        print(f"Session {session_id}: シーケンス番号 {session['sequence_number']}")

        return {"session_info": session, "data": data}


# 第4層: トランスポート層
class TransportLayer:
    def __init__(self):
        self.name = "トランスポート層"
        self.layer = 4

    def create_tcp_segment(
        self, data: Any, source_port: int, dest_port: int, sequence_num: int
    ) -> Dict:
        """TCP風のセグメント作成"""
        print(f"Layer {self.layer} ({self.name}): TCPセグメント作成")

        segment = {
            "header": {
                "source_port": source_port,
                "destination_port": dest_port,
                "sequence_number": sequence_num,
                "acknowledgment_number": 0,
                "flags": {"ACK": False, "SYN": False, "FIN": False},
                "window_size": 65535,
                "checksum": self.calculate_checksum(data),
            },
            "data": data,
        }

        print(f"TCPセグメント: {source_port} -> {dest_port}, Seq: {sequence_num}")
        return segment

    def calculate_checksum(self, data: Any) -> int:
        """簡単なチェックサム計算"""
        data_str = json.dumps(data, ensure_ascii=False)
        checksum = sum(ord(char) for char in data_str)
        return checksum % 65536


# 第3層: ネットワーク層
class NetworkLayer:
    def __init__(self):
        self.name = "ネットワーク層"
        self.layer = 3

    def create_ip_packet(self, segment: Dict, source_ip: str, dest_ip: str) -> Dict:
        """IPパケット作成"""
        print(f"Layer {self.layer} ({self.name}): IPパケット作成")

        packet = {
            "header": {
                "version": 4,
                "header_length": 20,
                "type_of_service": 0,
                "total_length": 20 + len(json.dumps(segment)),
                "identification": random.randint(0, 65535),
                "flags": 0,
                "fragment_offset": 0,
                "time_to_live": 64,
                "protocol": 6,  # TCP
                "header_checksum": 0,
                "source_address": source_ip,
                "destination_address": dest_ip,
            },
            "payload": segment,
        }

        print(f"IPパケット: {source_ip} -> {dest_ip}")
        return packet

    def route_packet(self, packet: Dict) -> str:
        """ルーティングテーブルのシミュレーション"""
        dest_ip = packet["header"]["destination_address"]
        print(f"ルーティング: {dest_ip} への経路を決定")

        # 簡単なルーティング判定
        if dest_ip.startswith("192.168."):
            return "ローカルネットワーク"
        else:
            return "デフォルトゲートウェイ"


# 第2層: データリンク層
class DataLinkLayer:
    def __init__(self):
        self.name = "データリンク層"
        self.layer = 2

    def create_ethernet_frame(
        self, packet: Dict, source_mac: str, dest_mac: str
    ) -> Dict:
        """Ethernetフレーム作成"""
        print(f"Layer {self.layer} ({self.name}): Ethernetフレーム作成")

        frame = {
            "header": {
                "preamble": "AA AA AA AA AA AA AA AB",
                "destination_mac": dest_mac,
                "source_mac": source_mac,
                "ether_type": "0x0800",  # IPv4
                "payload": packet,
                "frame_check_sequence": self.calculate_fcs(packet),
            }
        }

        print(f"Ethernetフレーム: {source_mac} -> {dest_mac}")
        return frame

    def calculate_fcs(self, data: Dict) -> str:
        """フレームチェックシーケンス計算"""
        # 簡単なCRC32のシミュレーション
        data_str = json.dumps(data, ensure_ascii=False)
        hash_object = hashlib.md5(data_str.encode())
        return hash_object.hexdigest()[:8].upper()


# 第1層: 物理層
class PhysicalLayer:
    def __init__(self):
        self.name = "物理層"
        self.layer = 1

    def transmit_frame(self, frame: Dict) -> Dict:
        """デジタル信号への変換"""
        print(f"Layer {self.layer} ({self.name}): 物理的な信号送信")

        frame_data = json.dumps(frame, ensure_ascii=False)
        binary_signal = self.convert_to_binary(frame_data)

        print(f"データサイズ: {len(frame_data)} bytes")
        print(f"バイナリ信号: {binary_signal[:50]}...")

        # 送信シミュレーション
        return self.simulate_transmission(binary_signal)

    def convert_to_binary(self, data: str) -> str:
        """バイナリ変換"""
        return "".join(format(ord(char), "08b") for char in data)

    def simulate_transmission(self, binary_signal: str) -> Dict:
        """送信シミュレーション"""
        print("物理メディア経由でデータ送信中...")

        # ノイズや遅延のシミュレーション
        noise = "1" if random.random() > 0.9 else "0"
        delay = random.randint(1, 10)
        success = random.random() > 0.05  # 95%の成功率

        return {
            "signal": binary_signal,
            "noise": noise,
            "delay": delay,
            "success": success,
        }


# OSI参照モデルデモンストレーション
class OSIModelDemo:
    def __init__(self):
        self.application_layer = ApplicationLayer()
        self.presentation_layer = PresentationLayer()
        self.session_layer = SessionLayer()
        self.transport_layer = TransportLayer()
        self.network_layer = NetworkLayer()
        self.data_link_layer = DataLinkLayer()
        self.physical_layer = PhysicalLayer()

    def demonstrate_data_transmission(self):
        """完全なデータ送信プロセスのデモ"""
        print("=== OSI参照モデル データ送信デモ ===\n")

        try:
            # Layer 7: アプリケーション層
            http_request = self.application_layer.create_http_request(
                "POST", "/api/users", {"name": "Alice", "email": "alice@example.com"}
            )
            print()

            # Layer 6: プレゼンテーション層
            encoded_data = self.presentation_layer.encode_data(http_request)
            print()

            # Layer 5: セッション層
            session_id = f"session_{random.randint(100000, 999999)}"
            self.session_layer.establish_session(session_id)
            session_data = self.session_layer.manage_session(session_id, encoded_data)
            print()

            # Layer 4: トランスポート層
            tcp_segment = self.transport_layer.create_tcp_segment(
                session_data, 8080, 80, 1001
            )
            print()

            # Layer 3: ネットワーク層
            ip_packet = self.network_layer.create_ip_packet(
                tcp_segment, "192.168.1.100", "203.0.113.1"
            )
            route = self.network_layer.route_packet(ip_packet)
            print(f"ルーティング先: {route}")
            print()

            # Layer 2: データリンク層
            ethernet_frame = self.data_link_layer.create_ethernet_frame(
                ip_packet, "00:1A:2B:3C:4D:5E", "00:5E:4D:3C:2B:1A"
            )
            print()

            # Layer 1: 物理層
            transmission_result = self.physical_layer.transmit_frame(ethernet_frame)
            print()

            # 結果表示
            print("=== 送信結果 ===")
            print(f"送信成功: {'Yes' if transmission_result['success'] else 'No'}")
            print(f"遅延: {transmission_result['delay']}ms")
            print(
                f"ノイズ検出: {'Yes' if transmission_result['noise'] == '1' else 'No'}"
            )

        except Exception as error:
            print(f"送信エラー: {error}")


# デモ実行
if __name__ == "__main__":
    demo = OSIModelDemo()
    demo.demonstrate_data_transmission()
