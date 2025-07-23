# CPU処理のシミュレーション例
class CPU:
    def __init__(self):
        self.registers = {
            "accumulator": 0,
            "program_counter": 0,
            "instruction_register": None,
        }
        self.memory = [0] * 256
        self.running = False

    def fetch(self):
        """命令フェッチ（取得）"""
        instruction = self.memory[self.registers["program_counter"]]
        self.registers["instruction_register"] = instruction
        self.registers["program_counter"] += 1
        return instruction

    def decode(self, instruction):
        """命令デコード（解読）"""
        opcode = instruction >> 4  # 上位4ビット
        operand = instruction & 0x0F  # 下位4ビット
        return opcode, operand

    def execute(self, opcode, operand):
        """命令実行"""
        if opcode == 1:  # LOAD - メモリから累積レジスタに読み込み
            self.registers["accumulator"] = self.memory[operand]
        elif opcode == 2:  # STORE - 累積レジスタからメモリに保存
            self.memory[operand] = self.registers["accumulator"]
        elif opcode == 3:  # ADD - 指定メモリの値を累積レジスタに加算
            self.registers["accumulator"] += self.memory[operand]
        elif opcode == 4:  # SUB - 指定メモリの値を累積レジスタから減算
            self.registers["accumulator"] -= self.memory[operand]
        elif opcode == 0:  # HALT - 停止
            self.running = False
        else:
            print("Unknown instruction")

    def cycle(self):
        """CPUサイクル実行"""
        if not self.running:
            return False

        instruction = self.fetch()
        opcode, operand = self.decode(instruction)
        self.execute(opcode, operand)

        return self.running

    def run(self, program):
        """プログラム実行"""
        # プログラムをメモリにロード
        for i, instruction in enumerate(program):
            self.memory[i] = instruction

        self.running = True
        self.registers["program_counter"] = 0

        # 実行ループ
        while self.cycle():
            pass  # サイクル実行を継続

        return self.registers["accumulator"]


# 使用例
if __name__ == "__main__":
    cpu = CPU()

    # 簡単なプログラム: 5 + 3 を計算
    program = [
        0x15,  # LOAD from address 5 (value: 5)
        0x36,  # ADD from address 6 (value: 3)
        0x27,  # STORE to address 7
        0x00,  # HALT
    ]

    # データをメモリに配置
    cpu.memory[5] = 5
    cpu.memory[6] = 3

    # プログラム実行
    result = cpu.run(program)
    print(f"計算結果: {result}")  # 結果: 8
