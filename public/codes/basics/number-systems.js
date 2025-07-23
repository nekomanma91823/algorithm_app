// 数値変換システムの実装
class NumberSystem {
  // 10進数から2進数への変換
  static decimalToBinary(decimal) {
    if (decimal === 0) return "0";

    let binary = "";
    let num = Math.abs(decimal);

    while (num > 0) {
      binary = (num % 2) + binary;
      num = Math.floor(num / 2);
    }

    return decimal < 0 ? "-" + binary : binary;
  }

  // 10進数から16進数への変換
  static decimalToHex(decimal) {
    if (decimal === 0) return "0";

    const hexDigits = "0123456789ABCDEF";
    let hex = "";
    let num = Math.abs(decimal);

    while (num > 0) {
      hex = hexDigits[num % 16] + hex;
      num = Math.floor(num / 16);
    }

    return decimal < 0 ? "-" + hex : hex;
  }

  // 2進数から10進数への変換
  static binaryToDecimal(binary) {
    const isNegative = binary.startsWith("-");
    const binaryStr = isNegative ? binary.slice(1) : binary;

    let decimal = 0;
    let power = 0;

    for (let i = binaryStr.length - 1; i >= 0; i--) {
      if (binaryStr[i] === "1") {
        decimal += Math.pow(2, power);
      }
      power++;
    }

    return isNegative ? -decimal : decimal;
  }

  // 16進数から10進数への変換
  static hexToDecimal(hex) {
    const isNegative = hex.startsWith("-");
    const hexStr = isNegative ? hex.slice(1) : hex;

    let decimal = 0;
    let power = 0;

    for (let i = hexStr.length - 1; i >= 0; i--) {
      const digit = hexStr[i].toUpperCase();
      let value;

      if (digit >= "0" && digit <= "9") {
        value = parseInt(digit);
      } else if (digit >= "A" && digit <= "F") {
        value = digit.charCodeAt(0) - "A".charCodeAt(0) + 10;
      } else {
        throw new Error(`Invalid hex digit: ${digit}`);
      }

      decimal += value * Math.pow(16, power);
      power++;
    }

    return isNegative ? -decimal : decimal;
  }

  // 2進数から16進数への変換（4ビットずつグループ化）
  static binaryToHex(binary) {
    const decimal = this.binaryToDecimal(binary);
    return this.decimalToHex(decimal);
  }

  // 16進数から2進数への変換
  static hexToBinary(hex) {
    const decimal = this.hexToDecimal(hex);
    return this.decimalToBinary(decimal);
  }

  // ビット演算のデモ
  static bitwiseOperations(a, b) {
    return {
      and: a & b, // ビット積
      or: a | b, // ビット和
      xor: a ^ b, // ビット排他的論理和
      not_a: ~a, // ビット否定（aの）
      left_shift: a << 1, // 左シフト（2倍）
      right_shift: a >> 1, // 右シフト（半分）
    };
  }

  // 数値表現の比較表示
  static showNumberRepresentations(decimal) {
    return {
      decimal: decimal,
      binary: this.decimalToBinary(decimal),
      hex: this.decimalToHex(decimal),
      octal: decimal.toString(8), // 8進数
    };
  }
}

// 使用例とテスト
console.log("=== 数値変換の例 ===");
const number = 42;
console.log(`10進数 ${number} の各進数表現:`);
const representations = NumberSystem.showNumberRepresentations(number);
console.log(`2進数: ${representations.binary}`);
console.log(`16進数: ${representations.hex}`);
console.log(`8進数: ${representations.octal}`);

console.log("\n=== 変換テスト ===");
console.log(`2進数 "1010" → 10進数: ${NumberSystem.binaryToDecimal("1010")}`);
console.log(`16進数 "FF" → 10進数: ${NumberSystem.hexToDecimal("FF")}`);
console.log(`10進数 255 → 2進数: ${NumberSystem.decimalToBinary(255)}`);
console.log(`10進数 255 → 16進数: ${NumberSystem.decimalToHex(255)}`);

console.log("\n=== ビット演算の例 ===");
const a = 12; // 1100 in binary
const b = 10; // 1010 in binary
const bitOps = NumberSystem.bitwiseOperations(a, b);
console.log(
  `${a} (${NumberSystem.decimalToBinary(
    a
  )}) AND ${b} (${NumberSystem.decimalToBinary(b)}) = ${
    bitOps.and
  } (${NumberSystem.decimalToBinary(bitOps.and)})`
);
console.log(
  `${a} OR ${b} = ${bitOps.or} (${NumberSystem.decimalToBinary(bitOps.or)})`
);
console.log(
  `${a} XOR ${b} = ${bitOps.xor} (${NumberSystem.decimalToBinary(bitOps.xor)})`
);
