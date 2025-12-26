import { Question, QuizResult } from "@/types/main-flow";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, XCircle, AlertCircle, RotateCcw, BarChart3 } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { useGetQuizOfLesson } from "@/hooks/useQuiz";
import { useAuthStore } from "@/stores/auth-store";
import { useShallow } from "zustand/shallow";
import { useLessonStore } from "@/stores/lesson-store";
import { useAIAnalyze } from "@/hooks/useAIAgent";
import { useEffect, useState } from "react";
import { AIAnalyzeRes } from "@/apis/responses/ai-res";
import DialogAnalyzeComponent from "@/app/(learn)/lesson/[courseId]/[lessonId]/components/dialog-analyze-component";

type ResultQuizProps = {
  quizTitle: string;
  quizResult: QuizResult;
  questions: Question[];
  onRetry: () => void;
}

const ResultQuiz = ({ quizTitle, quizResult, questions, onRetry }: ResultQuizProps) => {

  const {
    accessToken
  } = useAuthStore(useShallow((state) => ({
    accessToken: state.accessToken,
  })));

  const {
    currentLesson,
    toggleAnalyzeDialog,
  } = useLessonStore(useShallow((state) => ({
    currentLesson: state.currentLesson,
    toggleAnalyzeDialog: state.toggleAnalyzeDialog,
  })));

  console.log('currentLesson', currentLesson);

  const [analyzeData, setAnalyzeData] = useState<AIAnalyzeRes | null>(null);

  const getAIAnalyzeQuery = useAIAnalyze(
    {
      accessToken: accessToken,
      lessonId: String(currentLesson?.id)
    },
    (res) => {
      toggleAnalyzeDialog(true);
    }
  )

  const handleAnalyze = () => {
    getAIAnalyzeQuery.refetch();
  }

  useEffect(() => {
    if (getAIAnalyzeQuery.data) {
      setAnalyzeData(getAIAnalyzeQuery.data);
    }
  }, [getAIAnalyzeQuery.data])

  return (
    <div className="space-y-6 p-6 animate-in fade-in duration-500">
      <h1 className="text-3xl font-bold text-center">Results for "{quizTitle}"</h1>
      <Card className={`border-l-4 ${quizResult.passed ? 'border-l-green-500' : 'border-l-red-500'}`}>
        <CardHeader className="pb-2">
          <CardTitle className="text-2xl flex items-center justify-between">
            <span className="flex items-center gap-2">
              {quizResult.passed ? (
                <>
                  <CheckCircle2 className="h-8 w-8 text-green-500" />
                  <span className="text-green-500">Passed</span>
                </>
              ) : (
                <>
                  <XCircle className="h-8 w-8 text-red-500" />
                  <span className="text-red-500">Failed</span>
                </>
              )}
            </span>
            <span className="text-3xl font-bold">
              {quizResult.score}%
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4 text-center mt-4">
            <div className="bg-muted p-4 rounded-lg">
              <p className="text-muted-foreground text-sm uppercase tracking-wider">Correct Answers</p>
              <p className="text-2xl font-bold">{quizResult.correctAnswers} / {quizResult.totalQuestions}</p>
            </div>
            <div className="bg-muted p-4 rounded-lg">
              <p className="text-muted-foreground text-sm uppercase tracking-wider">Status</p>
              <p className={`text-2xl font-bold ${quizResult.passed ? 'text-green-500' : 'text-red-500'}`}>
                {quizResult.passed ? 'Excellent!' : 'Keep Trying!'}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex flex-col md:flex-row md:justify-end gap-4">
        <Button
          onClick={handleAnalyze}
          disabled={getAIAnalyzeQuery.isLoading || getAIAnalyzeQuery.isFetching}
          className="w-full sm:w-auto gap-2"
          size="lg"
        >
          <BarChart3 className="h-4 w-4" />
          <span>{getAIAnalyzeQuery.isLoading || getAIAnalyzeQuery.isFetching ? 'Analyzing...' : 'Analyze'}</span>
        </Button>

        <Button onClick={onRetry} size="lg" className="w-full sm:w-auto gap-2">
          <RotateCcw className="h-4 w-4" />
          Retry Quiz
        </Button>
      </div>

      <div className="space-y-4">
        <h3 className="text-xl font-bold">Review Answers</h3>
        <div className="space-y-4">
          {quizResult.results.map((result, index) => {
            const question = questions.find(q => q.id === result.questionId);
            if (!question) return null;

            return (
              <Card key={result.questionId} className={`border-l-4 ${result.isCorrect ? 'border-l-green-500' : 'border-l-red-500'}`}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start gap-4">
                    <CardTitle className="text-base font-medium leading-relaxed">
                      <span className="mr-2 text-muted-foreground">Q{index + 1}.</span>
                      {question.question}
                    </CardTitle>
                    {result.isCorrect ? (
                      <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0" />
                    ) : (
                      <XCircle className="h-5 w-5 text-red-500 flex-shrink-0" />
                    )}
                  </div>
                </CardHeader>
                <CardContent className="space-y-3 pt-2">
                  <div className="grid gap-2">
                    <div className="p-3 rounded-md bg-muted/50 border">
                      <p className="text-xs text-muted-foreground font-semibold uppercase mb-1">Your Answer</p>
                      <p className={`font-medium ${result.isCorrect ? 'text-green-600' : 'text-red-600'}`}>
                        {result.userAnswer}
                      </p>
                    </div>
                    {!result.isCorrect && (
                      <div className="p-3 rounded-md bg-green-50/50 border border-green-100 dark:bg-green-900/10 dark:border-green-800">
                        <p className="text-xs text-green-600 dark:text-green-400 font-semibold uppercase mb-1">Correct Answer</p>
                        <p className="font-medium text-green-700 dark:text-green-300">
                          {result.correctAnswer}
                        </p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
      <DialogAnalyzeComponent
        analyzeData={analyzeData}
      />
    </div>
  );
}

export default ResultQuiz;