"use client"; // クライアントコンポーネントとしてマーク

import React, { useRef, useEffect, useState, useCallback } from 'react';
import * as d3 from 'd3'; // D3.jsをインポート

interface DataPoint {
  x: number;
  y: number;
}

export default function LinearRegressionPage() {
  const svgRef = useRef<SVGSVGElement>(null);
  const [data, setData] = useState<DataPoint[]>([]);
  const [slope, setSlope] = useState<number>(0);
  const [intercept, setIntercept] = useState<number>(0);
  const [mse, setMse] = useState<number>(0);

  // 最小二乗法で回帰直線を計算する関数
  const calculateRegression = useCallback(() => {
    if (data.length < 2) {
      setSlope(0);
      setIntercept(0);
      setMse(0);
      return;
    }

    const n = data.length;
    const sumX = data.reduce((acc, p) => acc + p.x, 0);
    const sumY = data.reduce((acc, p) => acc + p.y, 0);
    const sumXY = data.reduce((acc, p) => acc + p.x * p.y, 0);
    const sumX2 = data.reduce((acc, p) => acc + p.x * p.x, 0);

    const numerator = n * sumXY - sumX * sumY;
    const denominator = n * sumX2 - sumX * sumX;

    if (denominator === 0) {
      setSlope(0);
      setIntercept(0);
      setMse(0);
      return;
    }

    const m = numerator / denominator; // slope
    const b = (sumY - m * sumX) / n; // intercept

    setSlope(m);
    setIntercept(b);

    // 平均二乗誤差 (MSE) の計算
    const error = data.reduce((acc, p) => {
      const predictedY = m * p.x + b;
      return acc + Math.pow(p.y - predictedY, 2);
    }, 0);
    setMse(error / n);

  }, [data]);

  useEffect(() => {
    calculateRegression();
  }, [data, calculateRegression]);

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    const width = 800;
    const height = 500;
    const margin = { top: 20, right: 20, bottom: 30, left: 40 };

    svg.attr("width", width).attr("height", height);

    const xScale = d3.scaleLinear()
      .domain([0, 100]) // x軸の範囲を0から100に固定
      .range([margin.left, width - margin.right]);

    const yScale = d3.scaleLinear()
      .domain([0, 100]) // y軸の範囲を0から100に固定
      .range([height - margin.bottom, margin.top]);

    // 軸の描画
    svg.selectAll("*").remove(); // 既存の要素をクリア
    svg.append("g")
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(xScale));
    svg.append("g")
      .attr("transform", `translate(${margin.left},0)`)
      .call(d3.axisLeft(yScale));

    // データポイントの描画
    svg.selectAll(".dot")
      .data(data)
      .join("circle")
      .attr("class", "dot")
      .attr("cx", d => xScale(d.x))
      .attr("cy", d => yScale(d.y))
      .attr("r", 5)
      .attr("fill", "steelblue");

    // 回帰直線の描画
    if (data.length >= 2) {
      const x1 = 0;
      const y1 = slope * x1 + intercept;
      const x2 = 100;
      const y2 = slope * x2 + intercept;

      svg.append("line")
        .attr("class", "regression-line")
        .attr("x1", xScale(x1))
        .attr("y1", yScale(y1))
        .attr("x2", xScale(x2))
        .attr("y2", yScale(y2))
        .attr("stroke", "red")
        .attr("stroke-width", 2);
    }

    // クリックイベントでデータポイントを追加
    svg.on("click", (event) => {
      const [mouseX, mouseY] = d3.pointer(event);
      const newX = xScale.invert(mouseX);
      const newY = yScale.invert(mouseY);

      // 範囲外のクリックは無視
      if (newX < 0 || newX > 100 || newY < 0 || newY > 100) {
        return;
      }

      setData(prevData => [...prevData, { x: newX, y: newY }]);
    });

  }, [data, slope, intercept]);

  const handleClearData = () => {
    setData([]);
  };

  return (
    <div className="p-4 bg-background text-foreground">
      <h1 className="text-2xl font-bold mb-4 text-foreground">線形回帰の視覚化</h1>
      <p className="mb-2">グラフをクリックしてデータポイントを追加してください。</p>
      <div className="mb-4">
        <p>回帰直線: y = {slope.toFixed(2)}x + {intercept.toFixed(2)}</p>
        <p>平均二乗誤差 (MSE): {mse.toFixed(2)}</p>
        <button
          onClick={handleClearData}
          className="neumorphic-button bg-card text-foreground py-2 px-4 rounded-lg mt-2"
        >
          データをクリア
        </button>
      </div>
      <svg ref={svgRef} className="neumorphic-shadow-inset bg-card"></svg>
    </div>
  );
}