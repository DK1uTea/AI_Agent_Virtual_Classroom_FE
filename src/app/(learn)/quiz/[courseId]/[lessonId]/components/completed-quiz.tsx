import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";
import { Dispatch, SetStateAction } from "react";

type CompletedQuizProps = {
  currentQuizTitle: string;
  setShowResults: Dispatch<SetStateAction<boolean>>;
}

const CompletedQuiz = (
  { currentQuizTitle, setShowResults }: CompletedQuizProps
) => {
  return (
    <div className="space-y-6 p-6 flex flex-col items-center justify-center min-h-[60vh] text-center">
      <div className="rounded-full bg-green-100 p-6 dark:bg-green-900/20">
        <CheckCircle2 className="h-16 w-16 text-green-600 dark:text-green-400" />
      </div>
      <h2 className="text-2xl font-bold">Quiz Completed!</h2>
      <p className="text-muted-foreground max-w-md">
        You have successfully completed the quiz "{currentQuizTitle}". Results will be available shortly.
      </p>
      <Button onClick={() => setShowResults(true)}>View Results</Button>
    </div>
  );
}

export default CompletedQuiz;