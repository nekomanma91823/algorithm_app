"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";

interface CPUState {
  accumulator: number;
  programCounter: number;
  instructionRegister: string | null;
  memory: number[];
  running: boolean;
  step: number;
}

const CPUArchitectureDemo: React.FC = () => {
  const [cpuState, setCpuState] = useState<CPUState>({
    accumulator: 0,
    programCounter: 0,
    instructionRegister: null,
    memory: new Array(16).fill(0),
    running: false,
    step: 0,
  });

  const [currentOperation, setCurrentOperation] = useState<string>("待機中");
  const program = [0x15, 0x36, 0x27, 0x00];

  // プログラムをロード
  const loadProgram = () => {
    const newMemory = [...cpuState.memory];
    program.forEach((instruction, index) => {
      newMemory[index] = instruction;
    });
    // データも配置
    newMemory[5] = 5; // 値5
    newMemory[6] = 3; // 値3

    setCpuState({
      ...cpuState,
      memory: newMemory,
      programCounter: 0,
      accumulator: 0,
      running: true,
      step: 0,
    });
    setCurrentOperation("プログラムをメモリにロードしました");
  };

  // 1ステップ実行
  const executeStep = () => {
    if (!cpuState.running) return;

    const instruction = cpuState.memory[cpuState.programCounter];
    const opcode = instruction >> 4;
    const operand = instruction & 0x0f;

    // eslint-disable-next-line prefer-const
    let newState = { ...cpuState };
    let operation = "";

    // フェッチフェーズ
    newState.instructionRegister = `0x${instruction
      .toString(16)
      .toUpperCase()}`;
    newState.programCounter++;

    // 実行フェーズ
    switch (opcode) {
      case 1: // LOAD
        newState.accumulator = cpuState.memory[operand];
        operation = `LOAD: メモリ[${operand}]の値 ${cpuState.memory[operand]} を累積レジスタに読み込み`;
        break;
      case 3: // ADD
        newState.accumulator += cpuState.memory[operand];
        operation = `ADD: メモリ[${operand}]の値 ${cpuState.memory[operand]} を累積レジスタに加算 (結果: ${newState.accumulator})`;
        break;
      case 2: // STORE
        newState.memory[operand] = newState.accumulator;
        operation = `STORE: 累積レジスタの値 ${newState.accumulator} をメモリ[${operand}]に保存`;
        break;
      case 0: // HALT
        newState.running = false;
        operation = "HALT: プログラム終了";
        break;
      default:
        operation = "未知の命令";
    }

    newState.step++;
    setCpuState(newState);
    setCurrentOperation(operation);
  };

  // リセット
  const reset = () => {
    setCpuState({
      accumulator: 0,
      programCounter: 0,
      instructionRegister: null,
      memory: new Array(16).fill(0),
      running: false,
      step: 0,
    });
    setCurrentOperation("待機中");
  };

  return (
    <div className="p-6 bg-white rounded-lg border">
      <h3 className="text-xl font-bold mb-4 text-center">CPUシミュレータ</h3>

      {/* コントロールパネル */}
      <div className="flex gap-2 mb-6 justify-center">
        <Button onClick={loadProgram} variant="outline">
          プログラムロード
        </Button>
        <Button
          onClick={executeStep}
          disabled={!cpuState.running}
          
        >
          1ステップ実行
        </Button>
        <Button onClick={reset} variant="outline">
          リセット
        </Button>
      </div>

      {/* CPU状態表示 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {/* レジスタ */}
        <div className="p-4 rounded-lg neumorphic-shadow">
          <h4 className="font-semibold mb-2">レジスタ</h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>累積:</span>
              <span className="font-mono px-2 py-1 rounded neumorphic-shadow-inset">
                {cpuState.accumulator}
              </span>
            </div>
            <div className="flex justify-between">
              <span>PC:</span>
              <span className="font-mono px-2 py-1 rounded neumorphic-shadow-inset">
                {cpuState.programCounter}
              </span>
            </div>
            <div className="flex justify-between">
              <span>IR:</span>
              <span className="font-mono px-2 py-1 rounded neumorphic-shadow-inset">
                {cpuState.instructionRegister || "---"}
              </span>
            </div>
          </div>
        </div>

        {/* 制御部 */}
        <div className="p-4 rounded-lg neumorphic-shadow">
          <h4 className="font-semibold mb-2">制御部</h4>
          <div className="text-sm">
            <div className="mb-2">
              <span className="font-medium">ステップ:</span> {cpuState.step}
            </div>
            <div className="mb-2">
              <span className="font-medium">状態:</span>
              <span
                className={`ml-2 px-2 py-1 rounded text-xs neumorphic-shadow-inset ${
                  cpuState.running
                    ? "text-green-800"
                    : "text-gray-800"
                }`}
              >
                {cpuState.running ? "実行中" : "停止"}
              </span>
            </div>
          </div>
        </div>

        {/* 現在の操作 */}
        <div className="p-4 rounded-lg neumorphic-shadow">
          <h4 className="font-semibold mb-2">現在の操作</h4>
          <div className="text-sm">{currentOperation}</div>
        </div>
      </div>

      {/* メモリ表示 */}
      <div className="p-4 rounded-lg neumorphic-shadow">
        <h4 className="font-semibold mb-3">メモリ (16バイト)</h4>
        <div className="grid grid-cols-8 gap-2">
          {cpuState.memory.slice(0, 8).map((value, index) => (
            <div key={index} className="text-center">
              <div className="text-xs mb-1">[{index}]</div>
              <div
                className={`p-2 rounded text-sm font-mono neumorphic-shadow-inset ${
                  index === cpuState.programCounter - 1 && cpuState.running
                    ? "neumorphic-shadow"
                    : ""
                }`}
              >
                0x{value.toString(16).toUpperCase().padStart(2, "0")}
              </div>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-8 gap-2 mt-2">
          {cpuState.memory.slice(8, 16).map((value, index) => (
            <div key={index + 8} className="text-center">
              <div className="text-xs mb-1">[{index + 8}]</div>
              <div className="p-2 rounded text-sm font-mono neumorphic-shadow-inset">
                {value}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 説明 */}
      <div className="mt-4 p-4 rounded-lg neumorphic-shadow">
        <h4 className="font-semibold mb-2">プログラム説明</h4>
        <div className="text-sm space-y-1">
          <div>
            • <code>0x15</code>: LOAD メモリ[5]の値(5)を累積レジスタへ
          </div>
          <div>
            • <code>0x36</code>: ADD メモリ[6]の値(3)を累積レジスタに加算
          </div>
          <div>
            • <code>0x27</code>: STORE 累積レジスタの値をメモリ[7]へ保存
          </div>
          <div>
            • <code>0x00</code>: HALT プログラム終了
          </div>
          <div className="mt-2 font-medium">結果: 5 + 3 = 8 の計算を実行</div>
        </div>
      </div>
    </div>
  );
};

export default CPUArchitectureDemo;
