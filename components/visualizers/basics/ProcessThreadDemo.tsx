"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Process {
  id: number;
  name: string;
  status: "running" | "ready" | "waiting" | "terminated";
  priority: number;
  threads: Thread[];
  memoryUsage: number;
  createdAt: number;
}

interface Thread {
  id: number;
  name: string;
  status: "running" | "ready" | "waiting" | "terminated";
  progress: number;
  task: string;
}

const ProcessThreadDemo: React.FC = () => {
  const [processes, setProcesses] = useState<Process[]>([
    {
      id: 1,
      name: "Webブラウザ",
      status: "running",
      priority: 5,
      memoryUsage: 512,
      createdAt: Date.now(),
      threads: [
        {
          id: 1,
          name: "メインUI",
          status: "running",
          progress: 60,
          task: "ユーザーインターフェース処理",
        },
        {
          id: 2,
          name: "ネットワーク",
          status: "waiting",
          progress: 30,
          task: "Webページダウンロード",
        },
        {
          id: 3,
          name: "JavaScript",
          status: "ready",
          progress: 80,
          task: "スクリプト実行",
        },
      ],
    },
    {
      id: 2,
      name: "テキストエディタ",
      status: "ready",
      priority: 3,
      memoryUsage: 128,
      createdAt: Date.now() - 5000,
      threads: [
        {
          id: 4,
          name: "エディタ",
          status: "ready",
          progress: 90,
          task: "テキスト編集",
        },
        {
          id: 5,
          name: "自動保存",
          status: "waiting",
          progress: 10,
          task: "ファイル保存",
        },
      ],
    },
  ]);

  const [currentCPU, setCurrentCPU] = useState<string>("CPU待機中");
  const [newProcessName, setNewProcessName] = useState<string>("");
  const [timeSlice, setTimeSlice] = useState<number>(0);
  const [isSchedulerRunning, setIsSchedulerRunning] = useState<boolean>(false);

  // CPU時間の分割実行（ラウンドロビン）
  useEffect(() => {
    if (!isSchedulerRunning) return;

    const interval = setInterval(() => {
      setProcesses((prev) => {
        const newProcesses = [...prev];

        // 実行可能なプロセスを探す
        const runnableProcesses = newProcesses.filter(
          (p) => p.status === "running" || p.status === "ready"
        );

        if (runnableProcesses.length > 0) {
          // ラウンドロビンでプロセスを切り替え
          const currentIndex = runnableProcesses.findIndex(
            (p) => p.status === "running"
          );
          const nextIndex = (currentIndex + 1) % runnableProcesses.length;

          // 現在実行中のプロセスを待機状態に
          if (currentIndex >= 0) {
            runnableProcesses[currentIndex].status = "ready";
          }

          // 次のプロセスを実行状態に
          runnableProcesses[nextIndex].status = "running";
          setCurrentCPU(
            `${runnableProcesses[nextIndex].name} (PID: ${runnableProcesses[nextIndex].id})`
          );

          // スレッドの進行
          runnableProcesses[nextIndex].threads.forEach((thread) => {
            if (thread.status === "running" || thread.status === "ready") {
              thread.progress = Math.min(
                100,
                thread.progress + Math.random() * 10
              );
              if (thread.progress >= 100) {
                thread.status = "terminated";
              }
            }
          });
        }

        return newProcesses;
      });

      setTimeSlice((prev) => prev + 1);
    }, 2000);

    return () => clearInterval(interval);
  }, [isSchedulerRunning]);

  // 新しいプロセスを作成
  const createProcess = () => {
    if (!newProcessName) return;

    const newProcess: Process = {
      id: Math.max(...processes.map((p) => p.id)) + 1,
      name: newProcessName,
      status: "ready",
      priority: Math.floor(Math.random() * 10) + 1,
      memoryUsage: Math.floor(Math.random() * 200) + 50,
      createdAt: Date.now(),
      threads: [
        {
          id: Date.now(),
          name: "メインスレッド",
          status: "ready",
          progress: 0,
          task: "初期化処理",
        },
      ],
    };

    setProcesses([...processes, newProcess]);
    setNewProcessName("");
  };

  // プロセスを終了
  const terminateProcess = (processId: number) => {
    setProcesses((prev) =>
      prev.map((p) =>
        p.id === processId
          ? {
              ...p,
              status: "terminated",
              threads: p.threads.map((t) => ({ ...t, status: "terminated" })),
            }
          : p
      )
    );
  };

  // スレッドを追加
  const addThread = (processId: number) => {
    setProcesses((prev) =>
      prev.map((p) =>
        p.id === processId
          ? {
              ...p,
              threads: [
                ...p.threads,
                {
                  id: Date.now(),
                  name: `スレッド${p.threads.length + 1}`,
                  status: "ready",
                  progress: 0,
                  task: "バックグラウンド処理",
                },
              ],
            }
          : p
      )
    );
  };

  // ステータスに応じた色を取得
  const getStatusColor = (status: string) => {
    switch (status) {
      case "running":
        return "bg-green-500";
      case "ready":
        return "bg-yellow-500";
      case "waiting":
        return "bg-blue-500";
      case "terminated":
        return "bg-gray-500";
      default:
        return "bg-gray-300";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "running":
        return "実行中";
      case "ready":
        return "実行可能";
      case "waiting":
        return "待機中";
      case "terminated":
        return "終了";
      default:
        return "不明";
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg border">
      <h3 className="text-xl font-bold mb-4 text-center">
        プロセス・スレッド管理シミュレータ
      </h3>

      {/* CPU状態とスケジューラ制御 */}
      <div className="bg-blue-50 p-4 rounded-lg mb-6">
        <h4 className="font-semibold text-blue-800 mb-3">CPU スケジューラ</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-3 rounded border">
            <div className="text-sm text-gray-600">現在実行中</div>
            <div className="font-medium">{currentCPU}</div>
          </div>
          <div className="bg-white p-3 rounded border">
            <div className="text-sm text-gray-600">時間スライス</div>
            <div className="font-medium">{timeSlice}</div>
          </div>
          <div className="bg-white p-3 rounded border">
            <div className="text-sm text-gray-600">スケジューラ</div>
            <Button
              size="sm"
              onClick={() => setIsSchedulerRunning(!isSchedulerRunning)}
              className={
                isSchedulerRunning
                  ? "bg-red-500 hover:bg-red-600"
                  : "bg-green-500 hover:bg-green-600"
              }
            >
              {isSchedulerRunning ? "停止" : "開始"}
            </Button>
          </div>
        </div>
      </div>

      {/* プロセス作成 */}
      <div className="bg-gray-50 p-4 rounded-lg mb-6">
        <h4 className="font-semibold text-gray-800 mb-3">
          新しいプロセスを作成
        </h4>
        <div className="flex gap-2">
          <Input
            value={newProcessName}
            onChange={(e) => setNewProcessName(e.target.value)}
            placeholder="プロセス名を入力"
          />
          <Button onClick={createProcess} disabled={!newProcessName}>
            作成
          </Button>
        </div>
      </div>

      {/* プロセス一覧 */}
      <div className="space-y-4">
        <h4 className="font-semibold text-gray-800">プロセス一覧</h4>
        {processes.map((process) => (
          <div key={process.id} className="border rounded-lg p-4 bg-gray-50">
            {/* プロセス情報 */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-4">
                <div
                  className={`w-4 h-4 rounded-full ${getStatusColor(
                    process.status
                  )}`}
                ></div>
                <div>
                  <h5 className="font-semibold">{process.name}</h5>
                  <div className="text-sm text-gray-600">
                    PID: {process.id} | 優先度: {process.priority} | メモリ:{" "}
                    {process.memoryUsage}MB
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span
                  className={`px-2 py-1 rounded text-xs font-medium text-white ${getStatusColor(
                    process.status
                  )}`}
                >
                  {getStatusText(process.status)}
                </span>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => addThread(process.id)}
                  disabled={process.status === "terminated"}
                >
                  スレッド追加
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => terminateProcess(process.id)}
                  disabled={process.status === "terminated"}
                  className="text-red-600 hover:text-red-700"
                >
                  終了
                </Button>
              </div>
            </div>

            {/* スレッド一覧 */}
            <div className="ml-8">
              <h6 className="font-medium text-gray-700 mb-2">
                スレッド ({process.threads.length}個)
              </h6>
              <div className="space-y-2">
                {process.threads.map((thread) => (
                  <div
                    key={thread.id}
                    className="bg-white p-3 rounded border flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-3 h-3 rounded-full ${getStatusColor(
                          thread.status
                        )}`}
                      ></div>
                      <div>
                        <div className="font-medium text-sm">{thread.name}</div>
                        <div className="text-xs text-gray-500">
                          {thread.task}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      {/* プログレスバー */}
                      <div className="w-32 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${thread.progress}%` }}
                        ></div>
                      </div>
                      <span className="text-xs font-medium">
                        {Math.round(thread.progress)}%
                      </span>
                      <span
                        className={`px-2 py-1 rounded text-xs text-white ${getStatusColor(
                          thread.status
                        )}`}
                      >
                        {getStatusText(thread.status)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* システム統計 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
        <div className="bg-green-50 p-4 rounded-lg text-center">
          <div className="text-2xl font-bold text-green-600">
            {processes.filter((p) => p.status !== "terminated").length}
          </div>
          <div className="text-sm text-green-800">アクティブプロセス</div>
        </div>
        <div className="bg-blue-50 p-4 rounded-lg text-center">
          <div className="text-2xl font-bold text-blue-600">
            {processes.reduce(
              (sum, p) =>
                sum + p.threads.filter((t) => t.status !== "terminated").length,
              0
            )}
          </div>
          <div className="text-sm text-blue-800">アクティブスレッド</div>
        </div>
        <div className="bg-purple-50 p-4 rounded-lg text-center">
          <div className="text-2xl font-bold text-purple-600">
            {processes.reduce((sum, p) => sum + p.memoryUsage, 0)}MB
          </div>
          <div className="text-sm text-purple-800">使用メモリ</div>
        </div>
        <div className="bg-orange-50 p-4 rounded-lg text-center">
          <div className="text-2xl font-bold text-orange-600">
            {processes.filter((p) => p.status === "running").length}
          </div>
          <div className="text-sm text-orange-800">実行中プロセス</div>
        </div>
      </div>

      {/* 説明 */}
      <div className="bg-indigo-50 p-4 rounded-lg mt-6">
        <h4 className="font-semibold text-indigo-800 mb-2">概念説明</h4>
        <div className="text-sm text-indigo-700 space-y-2">
          <div>
            <strong>プロセス:</strong>{" "}
            実行中のプログラム。独立したメモリ空間を持つ
          </div>
          <div>
            <strong>スレッド:</strong> プロセス内の実行単位。メモリ空間を共有
          </div>
          <div>
            <strong>ラウンドロビン:</strong>{" "}
            各プロセスに平等な時間を割り当てるスケジューリング
          </div>
          <div>
            <strong>コンテキストスイッチ:</strong>{" "}
            CPUが実行するプロセスを切り替えること
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProcessThreadDemo;
