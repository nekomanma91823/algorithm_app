"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface GraphNode {
  id: string;
  x: number;
  y: number;
  label: string;
}

interface GraphEdge {
  from: string;
  to: string;
  weight?: number;
}

const GraphVisualizer: React.FC = () => {
  const [nodes, setNodes] = useState<GraphNode[]>([
    { id: 'A', x: 150, y: 100, label: 'A' },
    { id: 'B', x: 250, y: 100, label: 'B' },
    { id: 'C', x: 100, y: 200, label: 'C' },
    { id: 'D', x: 200, y: 200, label: 'D' },
    { id: 'E', x: 300, y: 200, label: 'E' },
  ]);
  
  const [edges, setEdges] = useState<GraphEdge[]>([
    { from: 'A', to: 'B', weight: 5 },
    { from: 'A', to: 'C', weight: 3 },
    { from: 'B', to: 'D', weight: 7 },
    { from: 'C', to: 'D', weight: 2 },
    { from: 'D', to: 'E', weight: 4 },
  ]);
  
  const [fromNode, setFromNode] = useState<string>("");
  const [toNode, setToNode] = useState<string>("");
  const [weight, setWeight] = useState<string>("");
  const [newNodeLabel, setNewNodeLabel] = useState<string>("");
  const [operation, setOperation] = useState<string>("");
  const [highlightPath, setHighlightPath] = useState<string[]>([]);
  const [isDirected, setIsDirected] = useState<boolean>(false);

  const addNode = () => {
    if (!newNodeLabel.trim()) return;
    
    const newNode: GraphNode = {
      id: newNodeLabel,
      x: 200 + Math.random() * 200,
      y: 150 + Math.random() * 100,
      label: newNodeLabel
    };
    
    setNodes([...nodes, newNode]);
    setNewNodeLabel("");
    setOperation(`ノード "${newNodeLabel}" を追加しました`);
    setTimeout(() => setOperation(""), 3000);
  };

  const addEdge = () => {
    if (!fromNode || !toNode) return;
    
    const edgeWeight = weight ? parseInt(weight) : undefined;
    const newEdge: GraphEdge = {
      from: fromNode,
      to: toNode,
      weight: edgeWeight
    };
    
    setEdges([...edges, newEdge]);
    setFromNode("");
    setToNode("");
    setWeight("");
    setOperation(`エッジ ${fromNode} → ${toNode} ${edgeWeight ? `(重み: ${edgeWeight})` : ''} を追加しました`);
    setTimeout(() => setOperation(""), 3000);
  };

  const removeNode = (nodeId: string) => {
    setNodes(nodes.filter(node => node.id !== nodeId));
    setEdges(edges.filter(edge => edge.from !== nodeId && edge.to !== nodeId));
    setOperation(`ノード "${nodeId}" とその接続を削除しました`);
    setTimeout(() => setOperation(""), 3000);
  };

  const removeEdge = (from: string, to: string) => {
    setEdges(edges.filter(edge => !(edge.from === from && edge.to === to)));
    setOperation(`エッジ ${from} → ${to} を削除しました`);
    setTimeout(() => setOperation(""), 3000);
  };

  // 深さ優先探索（DFS）のデモ
  const performDFS = (startNodeId: string) => {
    const visited = new Set<string>();
    const path: string[] = [];
    
    const dfs = (nodeId: string) => {
      if (visited.has(nodeId)) return;
      
      visited.add(nodeId);
      path.push(nodeId);
      
      // 隣接ノードを探索
      const neighbors = edges
        .filter(edge => edge.from === nodeId)
        .map(edge => edge.to);
      
      for (const neighbor of neighbors) {
        dfs(neighbor);
      }
    };
    
    dfs(startNodeId);
    setHighlightPath(path);
    setOperation(`DFS探索: ${path.join(' → ')}`);
    
    setTimeout(() => {
      setHighlightPath([]);
      setOperation("");
    }, 5000);
  };

  // 幅優先探索（BFS）のデモ
  const performBFS = (startNodeId: string) => {
    const visited = new Set<string>();
    const queue: string[] = [startNodeId];
    const path: string[] = [];
    
    visited.add(startNodeId);
    
    while (queue.length > 0) {
      const current = queue.shift()!;
      path.push(current);
      
      // 隣接ノードをキューに追加
      const neighbors = edges
        .filter(edge => edge.from === current)
        .map(edge => edge.to)
        .filter(neighbor => !visited.has(neighbor));
      
      for (const neighbor of neighbors) {
        visited.add(neighbor);
        queue.push(neighbor);
      }
    }
    
    setHighlightPath(path);
    setOperation(`BFS探索: ${path.join(' → ')}`);
    
    setTimeout(() => {
      setHighlightPath([]);
      setOperation("");
    }, 5000);
  };

  const resetGraph = () => {
    setNodes([
      { id: 'A', x: 150, y: 100, label: 'A' },
      { id: 'B', x: 250, y: 100, label: 'B' },
      { id: 'C', x: 100, y: 200, label: 'C' },
      { id: 'D', x: 200, y: 200, label: 'D' },
      { id: 'E', x: 300, y: 200, label: 'E' },
    ]);
    setEdges([
      { from: 'A', to: 'B', weight: 5 },
      { from: 'A', to: 'C', weight: 3 },
      { from: 'B', to: 'D', weight: 7 },
      { from: 'C', to: 'D', weight: 2 },
      { from: 'D', to: 'E', weight: 4 },
    ]);
    setHighlightPath([]);
    setOperation("グラフをリセットしました");
    setTimeout(() => setOperation(""), 2000);
  };

  const getNodeById = (id: string) => nodes.find(node => node.id === id);

  return (
    <div className="space-y-6">
      {/* グラフの視覚化 */}
      <div className="p-6 rounded-lg neumorphic-shadow">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">グラフの可視化</h3>
          <div className="flex items-center gap-2">
            <Button 
              onClick={() => setIsDirected(!isDirected)} 
              variant="outline"
              size="sm"
            >
              {isDirected ? '有向' : '無向'}グラフ
            </Button>
          </div>
        </div>
        
        {/* SVGでグラフを描画 */}
        <div className="rounded overflow-hidden neumorphic-shadow-inset">
          <svg width="400" height="300" className="w-full">
            {/* エッジの描画 */}
            {edges.map((edge, index) => {
              const fromNode = getNodeById(edge.from);
              const toNode = getNodeById(edge.to);
              
              if (!fromNode || !toNode) return null;
              
              const isHighlighted = highlightPath.includes(edge.from) && highlightPath.includes(edge.to);
              
              return (
                <g key={index}>
                  {/* エッジライン */}
                  <line
                    x1={fromNode.x}
                    y1={fromNode.y}
                    x2={toNode.x}
                    y2={toNode.y}
                    stroke={isHighlighted ? "var(--primary)" : "var(--foreground)"}
                    strokeWidth={isHighlighted ? "3" : "2"}
                    markerEnd={isDirected ? "url(#arrowhead)" : ""}
                  />
                  
                  {/* 重みの表示 */}
                  {edge.weight && (
                    <text
                      x={(fromNode.x + toNode.x) / 2}
                      y={(fromNode.y + toNode.y) / 2 - 5}
                      textAnchor="middle"
                      className="text-xs fill-red-600 font-semibold"
                    >
                      {edge.weight}
                    </text>
                  )}
                  
                  {/* エッジの削除ボタン */}
                  <circle
                    cx={(fromNode.x + toNode.x) / 2}
                    cy={(fromNode.y + toNode.y) / 2 + 10}
                    r="8"
                    fill="var(--destructive)"
                    className="cursor-pointer opacity-70 hover:opacity-100"
                    onClick={() => removeEdge(edge.from, edge.to)}
                  />
                  <text
                    x={(fromNode.x + toNode.x) / 2}
                    y={(fromNode.y + toNode.y) / 2 + 14}
                    textAnchor="middle"
                    className="text-xs fill-white cursor-pointer font-bold"
                    onClick={() => removeEdge(edge.from, edge.to)}
                  >
                    ×
                  </text>
                </g>
              );
            })}
            
            {/* 矢印マーカー（有向グラフ用） */}
            <defs>
              <marker
                id="arrowhead"
                markerWidth="10"
                markerHeight="7"
                refX="9"
                refY="3.5"
                orient="auto"
              >
                <polygon
                  points="0 0, 10 3.5, 0 7"
                  fill="var(--foreground)"
                />
              </marker>
            </defs>
            
            {/* ノードの描画 */}
            {nodes.map((node, index) => {
              const isHighlighted = highlightPath.includes(node.id);
              const highlightIndex = highlightPath.indexOf(node.id);
              
              return (
                <g key={index}>
                  {/* ノード */}
                  <circle
                    cx={node.x}
                    cy={node.y}
                    r="20"
                    fill={isHighlighted ? "var(--primary)" : "var(--background)"}
                    stroke={isHighlighted ? "var(--primary-foreground)" : "var(--border)"}
                    strokeWidth="2"
                    className="cursor-pointer hover:fill-gray-300 neumorphic-shadow"
                    onClick={() => performDFS(node.id)}
                  />
                  
                  {/* ノードラベル */}
                  <text
                    x={node.x}
                    y={node.y + 4}
                    textAnchor="middle"
                    className={`text-sm font-bold cursor-pointer ${
                      isHighlighted ? 'fill-white' : 'fill-foreground'
                    }`}
                    onClick={() => performDFS(node.id)}
                  >
                    {node.label}
                  </text>
                  
                  {/* 探索順序の表示 */}
                  {isHighlighted && (
                    <text
                      x={node.x}
                      y={node.y - 30}
                      textAnchor="middle"
                      className="text-xs fill-blue-600 font-bold"
                    >
                      {highlightIndex + 1}
                    </text>
                  )}
                  
                  {/* ノードの削除ボタン */}
                  <circle
                    cx={node.x + 15}
                    cy={node.y - 15}
                    r="8"
                    fill="var(--destructive)"
                    className="cursor-pointer opacity-70 hover:opacity-100"
                    onClick={() => removeNode(node.id)}
                  />
                  <text
                    x={node.x + 15}
                    y={node.y - 11}
                    textAnchor="middle"
                    className="text-xs fill-white cursor-pointer font-bold"
                    onClick={() => removeNode(node.id)}
                  >
                    ×
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        {/* 隣接リスト表示 */}
        <div className="mt-4 p-3 rounded neumorphic-shadow">
          <h4 className="text-sm font-semibold mb-2">隣接リスト:</h4>
          <div className="text-sm space-y-1">
            {nodes.map(node => {
              const neighbors = edges
                .filter(edge => edge.from === node.id)
                .map(edge => `${edge.to}${edge.weight ? `(${edge.weight})` : ''}`);
              return (
                <div key={node.id}>
                  <span className="font-medium">{node.id}:</span> [{neighbors.join(', ')}]
                </div>
              );
            })}
          </div>
        </div>

        {/* 操作結果表示 */}
        {operation && (
          <div className="mt-4 p-3 rounded text-center neumorphic-shadow">
            {operation}
          </div>
        )}
      </div>

      {/* コントロールパネル */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* ノード追加 */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="font-semibold mb-3 text-green-700">📍 ノード追加</h4>
          <div className="space-y-2">
            <Input
              type="text"
              placeholder="ノードラベル"
              value={newNodeLabel}
              onChange={(e) => setNewNodeLabel(e.target.value)}
            />
            <Button 
              onClick={addNode} 
              className="w-full bg-green-600 hover:bg-green-700"
            >
              ノード追加
            </Button>
          </div>
        </div>

        {/* エッジ追加 */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="font-semibold mb-3 text-blue-700">🔗 エッジ追加</h4>
          <div className="space-y-2">
            <Input
              type="text"
              placeholder="開始ノード"
              value={fromNode}
              onChange={(e) => setFromNode(e.target.value)}
            />
            <Input
              type="text"
              placeholder="終了ノード"
              value={toNode}
              onChange={(e) => setToNode(e.target.value)}
            />
            <Input
              type="number"
              placeholder="重み（オプション）"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
            />
            <Button 
              onClick={addEdge} 
              className="w-full bg-blue-600 hover:bg-blue-700"
            >
              エッジ追加
            </Button>
          </div>
        </div>
      </div>

      {/* 探索アルゴリズム */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <h4 className="font-semibold mb-3 text-purple-700">🔍 グラフ探索</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {nodes.map(node => (
            <div key={node.id} className="space-y-1">
              <Button 
                onClick={() => performDFS(node.id)} 
                variant="outline"
                size="sm"
                className="w-full"
              >
                DFS({node.id})
              </Button>
              <Button 
                onClick={() => performBFS(node.id)} 
                variant="outline"
                size="sm"
                className="w-full"
              >
                BFS({node.id})
              </Button>
            </div>
          ))}
        </div>
      </div>

      {/* 操作説明 */}
      <div className="p-4 rounded-lg neumorphic-shadow">
        <h4 className="font-semibold mb-2">💡 グラフの特徴</h4>
        <ul className="text-sm space-y-1">
          <li>• <strong>ノード（頂点）</strong>: データを格納する要素</li>
          <li>• <strong>エッジ（辺）</strong>: ノード間の関係を表す</li>
          <li>• <strong>有向・無向</strong>: エッジに方向性があるかどうか</li>
          <li>• <strong>重み付き</strong>: エッジにコストや距離を持たせる</li>
          <li>• <strong>DFS</strong>: 深さ優先探索、スタックベース</li>
          <li>• <strong>BFS</strong>: 幅優先探索、キューベース</li>
          <li>• <strong>使用例</strong>: SNS、地図、ネットワーク、依存関係など</li>
        </ul>
      </div>

      {/* リセット */}
      <div className="flex justify-center">
        <Button onClick={resetGraph} variant="outline">
          🔄 リセット
        </Button>
      </div>
    </div>
  );
};

export default GraphVisualizer;
