"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const NumberSystemsDemo: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>("42");
  const [inputBase, setInputBase] = useState<number>(10);
  const [showConversion, setShowConversion] = useState<boolean>(false);
  const [bitOperationA, setBitOperationA] = useState<number>(12);
  const [bitOperationB, setBitOperationB] = useState<number>(10);

  // 数値変換関数
  const convertToBase = (num: number, base: number): string => {
    if (base === 2) {
      return num.toString(2);
    } else if (base === 8) {
      return num.toString(8);
    } else if (base === 16) {
      return num.toString(16).toUpperCase();
    }
    return num.toString();
  };

  const parseFromBase = (value: string, base: number): number => {
    return parseInt(value, base) || 0;
  };

  const currentDecimal = parseFromBase(inputValue, inputBase);
  const isValidInput = !isNaN(currentDecimal) && currentDecimal >= 0;

  // ビット演算結果
  const bitOperations = {
    and: bitOperationA & bitOperationB,
    or: bitOperationA | bitOperationB,
    xor: bitOperationA ^ bitOperationB,
    not_a: ~bitOperationA & 0xFF, // 8ビットに制限
    left_shift: (bitOperationA << 1) & 0xFF,
    right_shift: bitOperationA >> 1
  };

  return (
    <div className="p-6 bg-white rounded-lg border">
      <h3 className="text-xl font-bold mb-4 text-center">数値システム変換器</h3>
      
      {/* 入力セクション */}
      <div className="bg-blue-50 p-4 rounded-lg mb-6">
        <h4 className="font-semibold text-blue-800 mb-3">数値入力</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">数値を入力:</label>
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="数値を入力してください"
              className="w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">入力形式:</label>
            <div className="flex gap-2">
              {[
                { base: 10, label: "10進数" },
                { base: 2, label: "2進数" },
                { base: 16, label: "16進数" }
              ].map(({ base, label }) => (
                <Button
                  key={base}
                  size="sm"
                  variant={inputBase === base ? "default" : "outline"}
                  onClick={() => setInputBase(base)}
                >
                  {label}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 変換結果表示 */}
      {isValidInput && (
        <div className="bg-green-50 p-4 rounded-lg mb-6">
          <h4 className="font-semibold text-green-800 mb-3">
            変換結果: {currentDecimal} (10進数)
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="text-center p-3 bg-white rounded border">
              <div className="font-medium text-gray-700 mb-1">2進数</div>
              <div className="font-mono text-lg font-bold text-blue-600">
                {convertToBase(currentDecimal, 2)}
              </div>
              <div className="text-xs text-gray-500 mt-1">Binary</div>
            </div>
            
            <div className="text-center p-3 bg-white rounded border">
              <div className="font-medium text-gray-700 mb-1">8進数</div>
              <div className="font-mono text-lg font-bold text-orange-600">
                {convertToBase(currentDecimal, 8)}
              </div>
              <div className="text-xs text-gray-500 mt-1">Octal</div>
            </div>
            
            <div className="text-center p-3 bg-white rounded border">
              <div className="font-medium text-gray-700 mb-1">10進数</div>
              <div className="font-mono text-lg font-bold text-green-600">
                {currentDecimal}
              </div>
              <div className="text-xs text-gray-500 mt-1">Decimal</div>
            </div>
            
            <div className="text-center p-3 bg-white rounded border">
              <div className="font-medium text-gray-700 mb-1">16進数</div>
              <div className="font-mono text-lg font-bold text-purple-600">
                {convertToBase(currentDecimal, 16)}
              </div>
              <div className="text-xs text-gray-500 mt-1">Hexadecimal</div>
            </div>
          </div>
        </div>
      )}

      {/* ビット表現 */}
      {isValidInput && currentDecimal <= 255 && (
        <div className="bg-purple-50 p-4 rounded-lg mb-6">
          <h4 className="font-semibold text-purple-800 mb-3">ビット表現 (8ビット)</h4>
          <div className="flex justify-center mb-4">
            <div className="grid grid-cols-8 gap-1">
              {convertToBase(currentDecimal, 2).padStart(8, '0').split('').map((bit, index) => (
                <div
                  key={index}
                  className={`w-12 h-12 flex items-center justify-center rounded font-mono font-bold ${
                    bit === '1' ? 'bg-purple-500 text-white' : 'bg-white border border-purple-300'
                  }`}
                >
                  {bit}
                </div>
              ))}
            </div>
          </div>
          
          {/* 位の重み */}
          <div className="text-center">
            <div className="text-sm text-purple-600 mb-2">各ビットの重み（位の値）</div>
            <div className="grid grid-cols-8 gap-1 max-w-md mx-auto">
              {[128, 64, 32, 16, 8, 4, 2, 1].map((weight, index) => (
                <div key={index} className="text-xs text-center font-mono">
                  2^{7-index}<br/>({weight})
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ビット演算デモ */}
      <div className="bg-yellow-50 p-4 rounded-lg mb-6">
        <h4 className="font-semibold text-yellow-800 mb-3">ビット演算デモ</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium mb-2">数値A:</label>
            <Input
              type="number"
              value={bitOperationA}
              onChange={(e) => setBitOperationA(parseInt(e.target.value) || 0)}
              min="0"
              max="255"
            />
            <div className="text-xs text-gray-500 mt-1">
              2進数: {convertToBase(bitOperationA, 2).padStart(8, '0')}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">数値B:</label>
            <Input
              type="number"
              value={bitOperationB}
              onChange={(e) => setBitOperationB(parseInt(e.target.value) || 0)}
              min="0"
              max="255"
            />
            <div className="text-xs text-gray-500 mt-1">
              2進数: {convertToBase(bitOperationB, 2).padStart(8, '0')}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-3 rounded border">
            <div className="font-medium text-gray-700 mb-2">AND (&)</div>
            <div className="font-mono">
              {bitOperationA} & {bitOperationB} = {bitOperations.and}
            </div>
            <div className="text-xs text-gray-500 mt-1">
              {convertToBase(bitOperationA, 2).padStart(8, '0')}<br/>
              {convertToBase(bitOperationB, 2).padStart(8, '0')}<br/>
              {convertToBase(bitOperations.and, 2).padStart(8, '0')}
            </div>
          </div>

          <div className="bg-white p-3 rounded border">
            <div className="font-medium text-gray-700 mb-2">OR (|)</div>
            <div className="font-mono">
              {bitOperationA} | {bitOperationB} = {bitOperations.or}
            </div>
            <div className="text-xs text-gray-500 mt-1">
              {convertToBase(bitOperationA, 2).padStart(8, '0')}<br/>
              {convertToBase(bitOperationB, 2).padStart(8, '0')}<br/>
              {convertToBase(bitOperations.or, 2).padStart(8, '0')}
            </div>
          </div>

          <div className="bg-white p-3 rounded border">
            <div className="font-medium text-gray-700 mb-2">XOR (^)</div>
            <div className="font-mono">
              {bitOperationA} ^ {bitOperationB} = {bitOperations.xor}
            </div>
            <div className="text-xs text-gray-500 mt-1">
              {convertToBase(bitOperationA, 2).padStart(8, '0')}<br/>
              {convertToBase(bitOperationB, 2).padStart(8, '0')}<br/>
              {convertToBase(bitOperations.xor, 2).padStart(8, '0')}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          <div className="bg-white p-3 rounded border">
            <div className="font-medium text-gray-700 mb-2">NOT (~)</div>
            <div className="font-mono">
              ~{bitOperationA} = {bitOperations.not_a}
            </div>
            <div className="text-xs text-gray-500 mt-1">
              {convertToBase(bitOperationA, 2).padStart(8, '0')}<br/>
              {convertToBase(bitOperations.not_a, 2).padStart(8, '0')}
            </div>
          </div>

          <div className="bg-white p-3 rounded border">
            <div className="font-medium text-gray-700 mb-2">左シフト (&lt;&lt;)</div>
            <div className="font-mono">
              {bitOperationA} &lt;&lt; 1 = {bitOperations.left_shift}
            </div>
            <div className="text-xs text-gray-500 mt-1">
              {convertToBase(bitOperationA, 2).padStart(8, '0')}<br/>
              {convertToBase(bitOperations.left_shift, 2).padStart(8, '0')}
            </div>
          </div>

          <div className="bg-white p-3 rounded border">
            <div className="font-medium text-gray-700 mb-2">右シフト (&gt;&gt;)</div>
            <div className="font-mono">
              {bitOperationA} &gt;&gt; 1 = {bitOperations.right_shift}
            </div>
            <div className="text-xs text-gray-500 mt-1">
              {convertToBase(bitOperationA, 2).padStart(8, '0')}<br/>
              {convertToBase(bitOperations.right_shift, 2).padStart(8, '0')}
            </div>
          </div>
        </div>
      </div>

      {/* 説明 */}
      <div className="bg-indigo-50 p-4 rounded-lg">
        <h4 className="font-semibold text-indigo-800 mb-2">実用例</h4>
        <div className="text-sm text-indigo-700 space-y-2">
          <div><strong>16進数:</strong> カラーコード #FF0000 (赤色)</div>
          <div><strong>2進数:</strong> ファイルの権限設定 755 = rwxr-xr-x</div>
          <div><strong>ビット演算:</strong> フラグ管理、マスク処理、高速計算</div>
          <div><strong>シフト演算:</strong> 2倍/半分の高速計算、ビットパターン移動</div>
        </div>
      </div>
    </div>
  );
};

export default NumberSystemsDemo;
