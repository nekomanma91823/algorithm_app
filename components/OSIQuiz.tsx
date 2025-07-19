"use client";

import React, { useState } from "react";

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  layer: number;
}

const OSIQuiz: React.FC = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [userAnswers, setUserAnswers] = useState<number[]>([]);

  const questions: Question[] = [
    {
      id: 1,
      question:
        "ユーザーが直接操作するWebブラウザやメールソフトが動作するのはどの層ですか？",
      options: [
        "物理層",
        "ネットワーク層",
        "アプリケーション層",
        "データリンク層",
      ],
      correctAnswer: 2,
      explanation:
        "アプリケーション層（第7層）は、ユーザーが直接触れるアプリケーションが動作する層です。",
      layer: 7,
    },
    {
      id: 2,
      question: "データの暗号化や圧縮を行う層はどれですか？",
      options: [
        "セッション層",
        "プレゼンテーション層",
        "トランスポート層",
        "アプリケーション層",
      ],
      correctAnswer: 1,
      explanation:
        "プレゼンテーション層（第6層）は、データの暗号化、復号化、圧縮、文字コード変換などを行います。",
      layer: 6,
    },
    {
      id: 3,
      question: "TCPとUDPが動作する層はどれですか？",
      options: [
        "ネットワーク層",
        "データリンク層",
        "トランスポート層",
        "セッション層",
      ],
      correctAnswer: 2,
      explanation:
        "トランスポート層（第4層）では、TCPやUDPプロトコルが動作し、データの信頼性を確保します。",
      layer: 4,
    },
    {
      id: 4,
      question: "IPアドレスを使用してルーティングを行う層はどれですか？",
      options: [
        "ネットワーク層",
        "データリンク層",
        "トランスポート層",
        "物理層",
      ],
      correctAnswer: 0,
      explanation:
        "ネットワーク層（第3層）では、IPアドレスを使用してデータの配送経路を決定します。",
      layer: 3,
    },
    {
      id: 5,
      question:
        "MACアドレスを使用して隣接機器間の通信を制御する層はどれですか？",
      options: [
        "物理層",
        "データリンク層",
        "ネットワーク層",
        "トランスポート層",
      ],
      correctAnswer: 1,
      explanation:
        "データリンク層（第2層）では、MACアドレスを使用して直接接続された機器間の通信を制御します。",
      layer: 2,
    },
    {
      id: 6,
      question: "デジタルデータを電気信号や光信号に変換する層はどれですか？",
      options: [
        "物理層",
        "データリンク層",
        "ネットワーク層",
        "プレゼンテーション層",
      ],
      correctAnswer: 0,
      explanation:
        "物理層（第1層）では、デジタルデータを物理的な信号（電気、光、電波）に変換します。",
      layer: 1,
    },
  ];

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
  };

  const handleNextQuestion = () => {
    if (selectedAnswer === null) return;

    const newUserAnswers = [...userAnswers, selectedAnswer];
    setUserAnswers(newUserAnswers);

    if (selectedAnswer === questions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }

    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
    } else {
      setShowResult(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setUserAnswers([]);
  };

  const getScoreColor = () => {
    const percentage = (score / questions.length) * 100;
    if (percentage >= 80) return "text-green-600";
    if (percentage >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  const getScoreMessage = () => {
    const percentage = (score / questions.length) * 100;
    if (percentage >= 80)
      return "素晴らしい！OSI参照モデルをよく理解していますね！";
    if (percentage >= 60) return "良い成績です！もう少し復習してみましょう。";
    return "もう一度学習してからチャレンジしてみてください。";
  };

  if (showResult) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
        <h3 className="text-2xl font-bold text-center mb-6">クイズ結果</h3>
        <div className="text-center mb-6">
          <div className={`text-4xl font-bold mb-2 ${getScoreColor()}`}>
            {score}/{questions.length}
          </div>
          <div className="text-lg mb-4">
            正答率: {Math.round((score / questions.length) * 100)}%
          </div>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            {getScoreMessage()}
          </p>
        </div>

        <div className="space-y-4 mb-6">
          {questions.map((question, index) => (
            <div
              key={question.id}
              className="border dark:border-gray-600 rounded-lg p-4"
            >
              <h4 className="font-semibold mb-2">
                問題 {index + 1}: {question.question}
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-2">
                {question.options.map((option, optionIndex) => (
                  <div
                    key={optionIndex}
                    className={`p-2 rounded text-sm ${
                      optionIndex === question.correctAnswer
                        ? "bg-green-100 dark:bg-green-800 text-green-800 dark:text-green-100"
                        : userAnswers[index] === optionIndex
                        ? "bg-red-100 dark:bg-red-800 text-red-800 dark:text-red-100"
                        : "bg-gray-100 dark:bg-gray-700"
                    }`}
                  >
                    {option}
                    {optionIndex === question.correctAnswer && " ✓"}
                    {userAnswers[index] === optionIndex &&
                      optionIndex !== question.correctAnswer &&
                      " ✗"}
                  </div>
                ))}
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                解説: {question.explanation}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <button
            onClick={resetQuiz}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg"
          >
            もう一度チャレンジ
          </button>
        </div>
      </div>
    );
  }

  const currentQ = questions[currentQuestion];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-2xl font-bold">理解度チェック</h3>
          <span className="text-sm text-gray-600 dark:text-gray-400">
            {currentQuestion + 1} / {questions.length}
          </span>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
          <div
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${(currentQuestion / questions.length) * 100}%` }}
          ></div>
        </div>
      </div>

      <div className="mb-6">
        <h4 className="text-lg font-semibold mb-4">
          問題 {currentQuestion + 1}: {currentQ.question}
        </h4>
        <div className="space-y-3">
          {currentQ.options.map((option, index) => (
            <label
              key={index}
              className={`block p-3 rounded-lg border-2 cursor-pointer transition-colors ${
                selectedAnswer === index
                  ? "border-blue-500 bg-blue-50 dark:bg-blue-900"
                  : "border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500"
              }`}
            >
              <input
                type="radio"
                name="answer"
                value={index}
                checked={selectedAnswer === index}
                onChange={() => handleAnswerSelect(index)}
                className="sr-only"
              />
              <span className="flex items-center">
                <span
                  className={`w-4 h-4 rounded-full border-2 mr-3 ${
                    selectedAnswer === index
                      ? "border-blue-500 bg-blue-500"
                      : "border-gray-300 dark:border-gray-600"
                  }`}
                >
                  {selectedAnswer === index && (
                    <span className="block w-2 h-2 bg-white rounded-full mx-auto mt-0.5"></span>
                  )}
                </span>
                {option}
              </span>
            </label>
          ))}
        </div>
      </div>

      <div className="text-center">
        <button
          onClick={handleNextQuestion}
          disabled={selectedAnswer === null}
          className={`font-bold py-2 px-6 rounded-lg ${
            selectedAnswer === null
              ? "bg-gray-300 dark:bg-gray-600 text-gray-500 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700 text-white"
          }`}
        >
          {currentQuestion + 1 === questions.length ? "結果を表示" : "次の問題"}
        </button>
      </div>
    </div>
  );
};

export default OSIQuiz;
