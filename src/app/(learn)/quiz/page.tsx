'use client'

import { Clock } from "lucide-react";
import QuizBreadcrumb from "./components/quiz-breadcrumb";
import { useMemo, useState } from "react";
import { formatTimer } from "@/lib/utils";
import BeforeStartQuiz from "./components/before-start_quiz";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useLessonStore } from "@/stores/lesson-store";
import { useShallow } from "zustand/shallow";



const QuizPage = () => {
  const {
    currentLesson
  } = useLessonStore(useShallow((state) => ({
    currentLesson: state.currentLesson,
  })))

  const [timeLeft, setTimeLeft] = useState<number>(90);
  const [quizStarted, setQuizStarted] = useState<boolean>(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);

  const isLastQuestion = useMemo(() => {
    return true;
  }, []);

  if (!quizStarted) {
    return (
      <BeforeStartQuiz
        setQuizStarted={setQuizStarted} />
    );
  }

  return (
    <div className="space-y-6 p-6">
      <div>
        <QuizBreadcrumb
          text="Quiz Test"
        />

        <div className="flex items-center gap-2 text-muted-foreground">
          <Clock className="h-5 w-5" />
          <span className={timeLeft < 60 ? 'text-destructive' : ''}>
            {formatTimer(timeLeft)}
          </span>
        </div>
      </div>

      <div className="max-w-2xl mx-auto space-y-6">
        <div className="space-y-2">
          <div className="flex items-center justify-between text-muted-foreground">
            <span>
              {/* Question order */}
            </span>
            <span>
              {/* Progress */}
            </span>
          </div>
          <Progress
          // value={progress}
          />
        </div>

        <Card>
          <CardHeader>
            <CardTitle>
              {/* Question Title */}
            </CardTitle>
            <CardDescription>
              {/* Question type */}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {/* <RadioGroup
              value={answers[currentQuestion.id]}
              onValueChange={handleAnswer}
            >
              <div className="space-y-3">
                {currentQuestion.options?.map((option, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-3 rounded-lg border p-4 hover:bg-accent cursor-pointer"
                    onClick={() => handleAnswer(option)}
                  >
                    <RadioGroupItem value={option} id={`option-${index}`} />
                    <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer">
                      {option}
                    </Label>
                  </div>
                ))}
              </div>
            </RadioGroup> */}
          </CardContent>
        </Card>

        <div className="flex justify-between">
          <Button
            variant={"outline"}
            onClick={() => {

            }}
            disabled={currentQuestionIndex === 0}
          >
            Previous
          </Button>
          <Button
            onClick={() => {

            }}>
            {
              isLastQuestion ? 'Submit Quiz' : 'Next'
            }
          </Button>
        </div>
      </div>
    </div>
  );
};

export default QuizPage;