"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface TreeNode {
  value: number;
  left: TreeNode | null;
  right: TreeNode | null;
}

interface BSTVisualizerProps {}

const BSTVisualizer: React.FC<BSTVisualizerProps> = () => {
  const [tree, setTree] = useState<TreeNode | null>({
    value: 50,
    left: {
      value: 30,
      left: { value: 20, left: null, right: null },
      right: { value: 40, left: null, right: null },
    },
    right: {
      value: 70,
      left: { value: 60, left: null, right: null },
      right: { value: 80, left: null, right: null },
    },
  });
  const [inputValue, setInputValue] = useState<string>("");
  const [operation, setOperation] = useState<string>("");
  const [highlightPath, setHighlightPath] = useState<number[]>([]);
  const [traversalResult, setTraversalResult] = useState<number[]>([]);
  const [traversalType, setTraversalType] = useState<string>("");

  const insertNode = (root: TreeNode | null, value: number): TreeNode => {
    if (!root) {
      return { value, left: null, right: null };
    }

    if (value < root.value) {
      root.left = insertNode(root.left, value);
    } else if (value > root.value) {
      root.right = insertNode(root.right, value);
    }

    return root;
  };

  const findMin = (node: TreeNode): TreeNode => {
    while (node.left) {
      node = node.left;
    }
    return node;
  };

  const deleteNode = (
    root: TreeNode | null,
    value: number
  ): TreeNode | null => {
    if (!root) return null;

    if (value < root.value) {
      root.left = deleteNode(root.left, value);
    } else if (value > root.value) {
      root.right = deleteNode(root.right, value);
    } else {
      // ノードを削除
      if (!root.left && !root.right) {
        return null;
      } else if (!root.left) {
        return root.right;
      } else if (!root.right) {
        return root.left;
      } else {
        // 両方の子がある場合
        const minNode = findMin(root.right);
        root.value = minNode.value;
        root.right = deleteNode(root.right, minNode.value);
      }
    }

    return root;
  };

  const searchPath = (
    root: TreeNode | null,
    value: number,
    path: number[] = []
  ): number[] => {
    if (!root) return path;

    path.push(root.value);

    if (value === root.value) {
      return path;
    } else if (value < root.value) {
      return searchPath(root.left, value, path);
    } else {
      return searchPath(root.right, value, path);
    }
  };

  const inorderTraversal = (
    root: TreeNode | null,
    result: number[] = []
  ): number[] => {
    if (root) {
      inorderTraversal(root.left, result);
      result.push(root.value);
      inorderTraversal(root.right, result);
    }
    return result;
  };

  const preorderTraversal = (
    root: TreeNode | null,
    result: number[] = []
  ): number[] => {
    if (root) {
      result.push(root.value);
      preorderTraversal(root.left, result);
      preorderTraversal(root.right, result);
    }
    return result;
  };

  const postorderTraversal = (
    root: TreeNode | null,
    result: number[] = []
  ): number[] => {
    if (root) {
      postorderTraversal(root.left, result);
      postorderTraversal(root.right, result);
      result.push(root.value);
    }
    return result;
  };

  const handleInsert = () => {
    const value = parseInt(inputValue);
    if (isNaN(value)) return;

    const newTree = tree
      ? insertNode(tree, value)
      : { value, left: null, right: null };
    setTree(newTree);
    setOperation(`値 ${value} を挿入しました`);
    setInputValue("");

    setTimeout(() => setOperation(""), 3000);
  };

  const handleDelete = () => {
    const value = parseInt(inputValue);
    if (isNaN(value)) return;

    const newTree = deleteNode(tree, value);
    setTree(newTree);
    setOperation(`値 ${value} を削除しました`);
    setInputValue("");

    setTimeout(() => setOperation(""), 3000);
  };

  const handleSearch = () => {
    const value = parseInt(inputValue);
    if (isNaN(value)) return;

    const path = searchPath(tree, value);
    setHighlightPath(path);

    if (path.length > 0 && path[path.length - 1] === value) {
      setOperation(
        `値 ${value} が見つかりました！探索パス: ${path.join(" → ")}`
      );
    } else {
      setOperation(
        `値 ${value} は見つかりませんでした。探索パス: ${path.join(" → ")}`
      );
    }

    setInputValue("");
    setTimeout(() => {
      setHighlightPath([]);
      setOperation("");
    }, 4000);
  };

  const handleTraversal = (type: string) => {
    let result: number[] = [];

    switch (type) {
      case "inorder":
        result = inorderTraversal(tree);
        setTraversalType("中間順序（Inorder）");
        break;
      case "preorder":
        result = preorderTraversal(tree);
        setTraversalType("前順序（Preorder）");
        break;
      case "postorder":
        result = postorderTraversal(tree);
        setTraversalType("後順序（Postorder）");
        break;
    }

    setTraversalResult(result);
    setOperation(`${traversalType}: ${result.join(" → ")}`);

    setTimeout(() => {
      setTraversalResult([]);
      setTraversalType("");
      setOperation("");
    }, 5000);
  };

  const resetTree = () => {
    setTree({
      value: 50,
      left: {
        value: 30,
        left: { value: 20, left: null, right: null },
        right: { value: 40, left: null, right: null },
      },
      right: {
        value: 70,
        left: { value: 60, left: null, right: null },
        right: { value: 80, left: null, right: null },
      },
    });
    setHighlightPath([]);
    setTraversalResult([]);
    setOperation("二分探索木をリセットしました");
    setTimeout(() => setOperation(""), 2000);
  };

  const renderTree = (
    node: TreeNode | null,
    level: number = 0
  ): React.JSX.Element | null => {
    if (!node) return null;

    const isHighlighted = highlightPath.includes(node.value);
    const isTraversalHighlighted = traversalResult.includes(node.value);

    return (
      <div className="flex flex-col items-center">
        {/* ノード */}
        <div
          className={`w-12 h-12 rounded-full border-2 flex items-center justify-center font-bold text-sm transition-all ${
            isHighlighted
              ? "bg-yellow-200 border-yellow-500 shadow-lg scale-110"
              : isTraversalHighlighted
              ? "bg-green-200 border-green-500"
              : "bg-blue-100 border-blue-300 hover:bg-blue-200"
          }`}
        >
          {node.value}
        </div>

        {/* 子ノード */}
        {(node.left || node.right) && (
          <div className="flex mt-4 space-x-8">
            <div className="flex flex-col items-center">
              {node.left && (
                <>
                  <div className="w-px h-4 bg-gray-400"></div>
                  <div className="text-xs text-gray-500 mb-2">L</div>
                  {renderTree(node.left, level + 1)}
                </>
              )}
            </div>
            <div className="flex flex-col items-center">
              {node.right && (
                <>
                  <div className="w-px h-4 bg-gray-400"></div>
                  <div className="text-xs text-gray-500 mb-2">R</div>
                  {renderTree(node.right, level + 1)}
                </>
              )}
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* 二分探索木の視覚化 */}
      <div className="bg-white p-6 rounded-lg border">
        <h3 className="text-lg font-semibold mb-4 text-center">
          二分探索木の可視化
        </h3>

        <div className="flex justify-center mb-6 overflow-x-auto">
          <div className="min-w-max">
            {tree ? (
              renderTree(tree)
            ) : (
              <div className="text-center text-gray-500 py-8">木が空です</div>
            )}
          </div>
        </div>

        {/* 操作結果表示 */}
        {operation && (
          <div className="bg-blue-50 border border-blue-200 rounded p-3 text-blue-800 text-center">
            {operation}
          </div>
        )}
      </div>

      {/* コントロールパネル */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* 挿入操作 */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="font-semibold mb-3 text-green-700">📥 ノードの挿入</h4>
          <div className="space-y-2">
            <Input
              type="number"
              placeholder="挿入する値"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
            <Button
              onClick={handleInsert}
              className="w-full bg-green-600 hover:bg-green-700"
            >
              挿入
            </Button>
          </div>
        </div>

        {/* 削除操作 */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="font-semibold mb-3 text-red-700">🗑️ ノードの削除</h4>
          <div className="space-y-2">
            <Input
              type="number"
              placeholder="削除する値"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
            <Button
              onClick={handleDelete}
              className="w-full bg-red-600 hover:bg-red-700"
            >
              削除
            </Button>
          </div>
        </div>

        {/* 検索操作 */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="font-semibold mb-3 text-blue-700">🔍 ノードの検索</h4>
          <div className="space-y-2">
            <Input
              type="number"
              placeholder="検索する値"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
            <Button
              onClick={handleSearch}
              className="w-full bg-blue-600 hover:bg-blue-700"
            >
              検索
            </Button>
          </div>
        </div>
      </div>

      {/* 走査操作 */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <h4 className="font-semibold mb-3 text-purple-700">🚶 木の走査</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
          <Button
            onClick={() => handleTraversal("inorder")}
            variant="outline"
            className="bg-purple-50"
          >
            中間順序（昇順）
          </Button>
          <Button
            onClick={() => handleTraversal("preorder")}
            variant="outline"
            className="bg-purple-50"
          >
            前順序
          </Button>
          <Button
            onClick={() => handleTraversal("postorder")}
            variant="outline"
            className="bg-purple-50"
          >
            後順序
          </Button>
        </div>
      </div>

      {/* 操作説明 */}
      <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
        <h4 className="font-semibold mb-2 text-yellow-800">
          💡 二分探索木の特徴
        </h4>
        <ul className="text-sm text-yellow-700 space-y-1">
          <li>
            • <strong>BST性質</strong>: 左の子 ＜ 親 ＜ 右の子
          </li>
          <li>
            • <strong>検索</strong>: 平均 O(log n)、最悪 O(n)
          </li>
          <li>
            • <strong>挿入・削除</strong>: 平均 O(log n)、最悪 O(n)
          </li>
          <li>
            • <strong>中間順序走査</strong>: ソート済み順序で出力
          </li>
          <li>
            • <strong>バランス</strong>: 偏った木は性能が悪化
          </li>
          <li>
            • <strong>使用例</strong>:
            データベースインデックス、検索アルゴリズムなど
          </li>
        </ul>
      </div>

      {/* リセット */}
      <div className="flex justify-center">
        <Button onClick={resetTree} variant="outline">
          🔄 リセット
        </Button>
      </div>
    </div>
  );
};

export default BSTVisualizer;
