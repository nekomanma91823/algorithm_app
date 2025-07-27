import { basicsMap } from "./basicsMap";
import { dataStructureMap } from "./dataStructureMap";
// import { networkMap } from "./networkMap";
import { patternMap } from "./patternMap";
import { searchAlgorithmMap } from "./searchMap";
import { sortAlgorithmMap } from "./sortMap";

export interface QuizItem {
  question: string;
  options: string[];
  answer: string;
}

export interface SectionQuiz {
  section: string;
  quizzes: QuizItem[];
}

const createQuizItems = (map: {
  [key: string]: { name: string; description: string };
}): QuizItem[] => {
  const allTerms = Object.values(map).map((item) => item.name);
  return Object.values(map).map((item) => {
    const correctAnswer = item.name;
    let options = [correctAnswer];
    while (options.length < 4) {
      const randomTerm = allTerms[Math.floor(Math.random() * allTerms.length)];
      if (!options.includes(randomTerm)) {
        options.push(randomTerm);
      }
    }
    options = options.sort(() => Math.random() - 0.5);
    return {
      question: item.description,
      options,
      answer: correctAnswer,
    };
  });
};

export const allQuizData: SectionQuiz[] = [
  { section: "basics", quizzes: createQuizItems(basicsMap) },
  { section: "data-structure", quizzes: createQuizItems(dataStructureMap) },
  // { section: 'network', quizzes: createQuizItems(networkMap) },
  // { section: "design-pattern", quizzes: createQuizItems(patternMap) },
  // { section: "search", quizzes: createQuizItems(searchAlgorithmMap) },
  // { section: "sort", quizzes: createQuizItems(sortAlgorithmMap) },
];

export const allQuizzes: QuizItem[] = allQuizData.flatMap((sq) => sq.quizzes);
