'use client';

import React, { useState, useEffect } from 'react';
import { QuizItem } from '@/data/allQuizData';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface QuizProps {
  quizData: QuizItem[];
}

const Quiz: React.FC<QuizProps> = ({ quizData }) => {
  const [questions, setQuestions] = useState<QuizItem[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    // シャッフルされたクイズデータをセット
    setQuestions(quizData.sort(() => Math.random() - 0.5).slice(0, 10));
  }, [quizData]);

  const handleOptionClick = (option: string) => {
    if (isAnswered) return;

    setSelectedOption(option);
    setIsAnswered(true);

    if (option === questions[currentQuestionIndex].answer) {
      setScore(score + 1);
    }
  };

  const handleNextQuestion = () => {
    setIsAnswered(false);
    setSelectedOption(null);

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setShowResult(true);
    }
  };

  const handleRestartQuiz = () => {
    setQuestions(quizData.sort(() => Math.random() - 0.5).slice(0, 10));
    setCurrentQuestionIndex(0);
    setScore(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setShowResult(false);
  };

  if (questions.length === 0) {
    return <div>Loading...</div>;
  }

  if (showResult) {
    return (
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>クイズ結果</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl mb-4">あなたのスコア: {score} / {questions.length}</p>
          <Button onClick={handleRestartQuiz}>もう一度挑戦する</Button>
        </CardContent>
      </Card>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>クイズ {currentQuestionIndex + 1} / {questions.length}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="mb-4">{currentQuestion.question}</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {currentQuestion.options.map((option, index) => (
            <Button
              key={index}
              onClick={() => handleOptionClick(option)}
              className={`justify-start text-left h-auto whitespace-normal ${isAnswered ? (option === currentQuestion.answer ? 'bg-green-500' : (option === selectedOption ? 'bg-red-500' : '')) : ''}`}>
              {option}
            </Button>
          ))}
        </div>
        {isAnswered && (
          <div className="mt-4">
            <p>正解は: {currentQuestion.answer}</p>
            <Button onClick={handleNextQuestion} className="mt-2">
              {currentQuestionIndex < questions.length - 1 ? '次の問題へ' : '結果を見る'}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default Quiz;
