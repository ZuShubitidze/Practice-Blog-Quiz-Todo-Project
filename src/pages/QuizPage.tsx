import GeographyQuiz from "@/components/quiz/GeographyQuiz";
import HistoryQuiz from "@/components/quiz/HistoryQuiz";
import SelectCategoryForm from "@/components/SelectCategoryForm";
import { Button } from "@/components/ui/button";
import { auth } from "@/firebaseConfig";
import { useState } from "react";

const QuizPage = () => {
  const loggedIn = auth.currentUser !== null;
  const [quizStartState, setQuizStartState] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value);
  };

  return (
    <main className="flex flex-col gap-10 p-10">
      <h1 className="font-bold text-3xl">Quiz Page</h1>
      <p>Welcome to the quiz page! Here you can test your knowledge.</p>
      {loggedIn ? (
        <div className="flex flex-col gap-10">
          {/* Start Quiz Button */}
          <Button
            onClick={() => setQuizStartState(true)}
            className={`w-40 h-10 ${quizStartState && "hidden"}`}
          >
            Start Quiz
          </Button>
          {quizStartState && (
            // Select Category Form
            <SelectCategoryForm handleCategoryChange={handleCategoryChange} />
          )}
          {/* Geography Quiz */}
          {selectedCategory === "geography" && <GeographyQuiz />}
          {/* History Quiz */}
          {selectedCategory === "history" && <HistoryQuiz />}
        </div>
      ) : (
        <p>Please log in to start the quiz.</p>
      )}
    </main>
  );
};

export default QuizPage;
