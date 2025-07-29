import Link from "next/link";
import { allQuizData } from "@/data/allQuizData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const QuizSelectionPage = () => {
  return (
    <div className="container mx-auto p-4 bg-background text-foreground neumorphic-shadow">
      <h1 className="text-3xl font-bold mb-4">クイズ選択</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card className="neumorphic-shadow bg-card">
          <CardHeader>
            <CardTitle>総合クイズ</CardTitle>
          </CardHeader>
          <CardContent>
            <p>すべてのセクションからランダムに出題されます。</p>
            <Link href={`/quiz/all`} passHref>
              <Button className="mt-4">挑戦する</Button>
            </Link>
          </CardContent>
        </Card>
        {allQuizData.map((sectionQuiz) => (
          <Card key={sectionQuiz.section} className="neumorphic-shadow bg-card">
            <CardHeader>
              <CardTitle>{sectionQuiz.section}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{sectionQuiz.section}に関するクイズです。</p>
              <Link href={`/quiz/${sectionQuiz.section}`} passHref>
                <Button className="mt-4">挑戦する</Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default QuizSelectionPage;
