// CPU処理のシミュレーション例
class CPU {
  constructor() {
    this.registers = {
      accumulator: 0,
      programCounter: 0,
      instructionRegister: null,
    };
    this.memory = new Array(256).fill(0);
    this.running = false;
  }

  // 命令フェッチ（取得）
  fetch() {
    const instruction = this.memory[this.registers.programCounter];
    this.registers.instructionRegister = instruction;
    this.registers.programCounter++;
    return instruction;
  }

  // 命令デコード（解読）
  decode(instruction) {
    const opcode = instruction >> 4; // 上位4ビット
    const operand = instruction & 0x0f; // 下位4ビット
    return { opcode, operand };
  }

  // 命令実行
  execute(opcode, operand) {
    switch (opcode) {
      case 1: // LOAD - メモリから累積レジスタに読み込み
        this.registers.accumulator = this.memory[operand];
        break;
      case 2: // STORE - 累積レジスタからメモリに保存
        this.memory[operand] = this.registers.accumulator;
        break;
      case 3: // ADD - 指定メモリの値を累積レジスタに加算
        this.registers.accumulator += this.memory[operand];
        break;
      case 4: // SUB - 指定メモリの値を累積レジスタから減算
        this.registers.accumulator -= this.memory[operand];
        break;
      case 0: // HALT - 停止
        this.running = false;
        break;
      default:
        console.log("Unknown instruction");
    }
  }

  // CPUサイクル実行
  cycle() {
    if (!this.running) return false;

    const instruction = this.fetch();
    const { opcode, operand } = this.decode(instruction);
    this.execute(opcode, operand);

    return this.running;
  }

  // プログラム実行
  run(program) {
    // プログラムをメモリにロード
    for (let i = 0; i < program.length; i++) {
      this.memory[i] = program[i];
    }

    this.running = true;
    this.registers.programCounter = 0;

    // 実行ループ
    while (this.cycle()) {
      // サイクル実行を継続
    }

    return this.registers.accumulator;
  }
}

// 使用例
const cpu = new CPU();

// 簡単なプログラム: 5 + 3 を計算
const program = [
  0x15, // LOAD from address 5 (value: 5)
  0x36, // ADD from address 6 (value: 3)
  0x27, // STORE to address 7
  0x00, // HALT
];

// データをメモリに配置
cpu.memory[5] = 5;
cpu.memory[6] = 3;

// プログラム実行
const result = cpu.run(program);
console.log(`計算結果: ${result}`); // 結果: 8
