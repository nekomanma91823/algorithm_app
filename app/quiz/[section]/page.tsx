"use client";

import Quiz from "@/components/Quiz";
import { allQuizData, allQuizzes } from "@/data/allQuizData";
import { useParams } from "next/navigation";
export const runtime = "edge";
const SectionQuizPage = () => {
  const params = useParams();
  const section = params.section as string;

  const getQuizData = () => {
    if (section === "all") {
      return allQuizzes;
    }
    const sectionQuiz = allQuizData.find((sq) => sq.section === section);
    return sectionQuiz ? sectionQuiz.quizzes : [];
  };

  const quizData = getQuizData();

  return (
    <div className="container mx-auto p-4 neumorphic-shadow bg-background text-foreground">
      <h1 className="text-3xl font-bold mb-4">
        {section === "all" ? "総合" : section}クイズ
      </h1>
      <Quiz quizData={quizData} />
    </div>
  );
};

export default SectionQuizPage;
