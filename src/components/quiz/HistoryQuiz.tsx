import { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

const HistoryQuiz = () => {
  const [totalPoints, setTotalPoints] = useState<number>(0);
  const [question1, setQuestion1] = useState<string>("");
  const [question2, setQuestion2] = useState<string>("");
  const [quizCompleted, setQuizCompleted] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      question1.toLowerCase() === "peloponnesus" ||
      "macedonia" ||
      "macedon" ||
      "pella" ||
      "pela"
    ) {
      setTotalPoints((prev) => prev + 1);
    }
    if (question2.toLowerCase() === "bucephalus") {
      setTotalPoints((prev) => prev + 1);
    }
    setQuizCompleted(true);
  };

  return (
    <div className="flex flex-col gap-10">
      <h1 className="text-3xl font-bold">History Quiz</h1>
      {quizCompleted ? (
        <div className="alert alert-success">
          <p>Congratulations! You completed the quiz.</p>
          <p>You scored {totalPoints} points!</p>
        </div>
      ) : (
        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
          <h2 className="text-2xl">Question 1</h2>
          {/* Question 1 */}
          <div>
            <p>Where was Alexander the Great born?</p>
            <Input
              placeholder="Your answer"
              value={question1}
              onChange={(e) => setQuestion1(e.target.value)}
              className="w-100"
            />
          </div>
          {/* Question 2 */}
          <div>
            <p>What was the name of Alexander the Great's horse?</p>
            <Input
              placeholder="Your answer"
              value={question2}
              onChange={(e) => setQuestion2(e.target.value)}
              className="w-100"
            />
          </div>
          {/* Submit Answers */}
          <Button type="submit" className="w-100">
            Submit your final answers
          </Button>
        </form>
      )}
    </div>
  );
};

export default HistoryQuiz;
