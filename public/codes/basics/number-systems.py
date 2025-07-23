# 数値変換システムの実装
class NumberSystem:
    @staticmethod
    def decimal_to_binary(decimal):
        """10進数から2進数への変換"""
        if decimal == 0:
            return "0"

        binary = ""
        num = abs(decimal)

        while num > 0:
            binary = str(num % 2) + binary
            num = num // 2

        return "-" + binary if decimal < 0 else binary

    @staticmethod
    def decimal_to_hex(decimal):
        """10進数から16進数への変換"""
        if decimal == 0:
            return "0"

        hex_digits = "0123456789ABCDEF"
        hex_str = ""
        num = abs(decimal)

        while num > 0:
            hex_str = hex_digits[num % 16] + hex_str
            num = num // 16

        return "-" + hex_str if decimal < 0 else hex_str

    @staticmethod
    def binary_to_decimal(binary):
        """2進数から10進数への変換"""
        is_negative = binary.startswith("-")
        binary_str = binary[1:] if is_negative else binary

        decimal = 0
        power = 0

        for i in range(len(binary_str) - 1, -1, -1):
            if binary_str[i] == "1":
                decimal += 2**power
            power += 1

        return -decimal if is_negative else decimal

    @staticmethod
    def hex_to_decimal(hex_str):
        """16進数から10進数への変換"""
        is_negative = hex_str.startswith("-")
        hex_digits = hex_str[1:] if is_negative else hex_str

        decimal = 0
        power = 0

        for i in range(len(hex_digits) - 1, -1, -1):
            digit = hex_digits[i].upper()

            if "0" <= digit <= "9":
                value = int(digit)
            elif "A" <= digit <= "F":
                value = ord(digit) - ord("A") + 10
            else:
                raise ValueError(f"Invalid hex digit: {digit}")

            decimal += value * (16**power)
            power += 1

        return -decimal if is_negative else decimal

    @classmethod
    def binary_to_hex(cls, binary):
        """2進数から16進数への変換（4ビットずつグループ化）"""
        decimal = cls.binary_to_decimal(binary)
        return cls.decimal_to_hex(decimal)

    @classmethod
    def hex_to_binary(cls, hex_str):
        """16進数から2進数への変換"""
        decimal = cls.hex_to_decimal(hex_str)
        return cls.decimal_to_binary(decimal)

    @staticmethod
    def bitwise_operations(num_a, num_b):
        """ビット演算のデモ"""
        return {
            "and": num_a & num_b,  # ビット積
            "or": num_a | num_b,  # ビット和
            "xor": num_a ^ num_b,  # ビット排他的論理和
            "not_a": ~num_a,  # ビット否定（num_aの）
            "left_shift": num_a << 1,  # 左シフト（2倍）
            "right_shift": num_a >> 1,  # 右シフト（半分）
        }

    @classmethod
    def show_number_representations(cls, decimal):
        """数値表現の比較表示"""
        return {
            "decimal": decimal,
            "binary": cls.decimal_to_binary(decimal),
            "hex": cls.decimal_to_hex(decimal),
            "octal": oct(decimal)[2:],  # 8進数（プレフィックス除去）
        }


# 使用例とテスト
if __name__ == "__main__":
    print("=== 数値変換の例 ===")
    number = 42
    print(f"10進数 {number} の各進数表現:")
    representations = NumberSystem.show_number_representations(number)
    print(f"2進数: {representations['binary']}")
    print(f"16進数: {representations['hex']}")
    print(f"8進数: {representations['octal']}")

    print("\n=== 変換テスト ===")
    print(f"2進数 '1010' → 10進数: {NumberSystem.binary_to_decimal('1010')}")
    print(f"16進数 'FF' → 10進数: {NumberSystem.hex_to_decimal('FF')}")
    print(f"10進数 255 → 2進数: {NumberSystem.decimal_to_binary(255)}")
    print(f"10進数 255 → 16進数: {NumberSystem.decimal_to_hex(255)}")

    print("\n=== ビット演算の例 ===")
    a = 12  # 1100 in binary
    b = 10  # 1010 in binary
    bit_ops = NumberSystem.bitwise_operations(a, b)
    print(
        f"{a} ({NumberSystem.decimal_to_binary(a)}) AND {b} ({NumberSystem.decimal_to_binary(b)}) = {bit_ops['and']} ({NumberSystem.decimal_to_binary(bit_ops['and'])})"
    )
    print(
        f"{a} OR {b} = {bit_ops['or']} ({NumberSystem.decimal_to_binary(bit_ops['or'])})"
    )
    print(
        f"{a} XOR {b} = {bit_ops['xor']} ({NumberSystem.decimal_to_binary(bit_ops['xor'])})"
    )
