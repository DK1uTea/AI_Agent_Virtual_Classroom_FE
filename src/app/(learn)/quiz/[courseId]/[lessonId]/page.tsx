'use client'

import { Clock, CheckCircle2, AlertCircle } from "lucide-react";
import QuizBreadcrumb from "./components/quiz-breadcrumb";
import { use, useMemo, useState, useEffect } from "react";
import { formatTimer } from "@/lib/utils";
import BeforeStartQuiz from "./components/before-start-quiz";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useLessonStore } from "@/stores/lesson-store";
import { useShallow } from "zustand/shallow";
import { useAuthStore } from "@/stores/auth-store";
import { useGetCourseDetail } from "@/hooks/useGetCourseDetail";
import { useGetCurrentLesson } from "@/hooks/useGetCurrentLesson";
import Loading from "@/components/ui/loading";
import { Answer, Question, Quiz } from "@/types/main-flow";
import MultipleChoiceQuestion from "./components/multiple-choice-question";
import TrueFalseQuestion from "./components/true-false-question";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useGetQuizOfLesson, useSubmitQuizAnswers } from "@/hooks/useQuiz";
import CompletedQuiz from "./components/completed-quiz";
import ResultQuiz from "./components/result-quiz";
import { useMarkLearnLessonCompleted } from "@/hooks/useProgress";

type QuizPageProps = {
  params: Promise<{
    courseId: string;
    lessonId: string
  }>;
}

const QuizPage = ({ params }: QuizPageProps) => {
  const { courseId, lessonId } = use(params);

  const {
    accessToken
  } = useAuthStore(useShallow((state) => ({
    accessToken: state.accessToken,
  })));

  const {
    setCurrentLessonCompleted,
    setCurrentLesson,
  } = useLessonStore(useShallow((state) => ({
    setCurrentLessonCompleted: state.setCurrentLessonCompleted,
    setCurrentLesson: state.setCurrentLesson,
  })))

  const {
    data: currentCourseData,
    isLoading: isLoadingCourseDetail,
  } = useGetCourseDetail({
    accessToken: accessToken,
    courseId: courseId,
  })

  const {
    data: currentLessonData,
    isLoading: isLoadingCurrentLesson,
  } = useGetCurrentLesson({
    accessToken: accessToken,
    lessonId: lessonId,
  })

  useEffect(() => {
    if (!currentLessonData) return;

    const { lessonPlaybackInfo } = currentLessonData;
    const { sidebarLessons, ...lessonData } = lessonPlaybackInfo;
    setCurrentLesson(lessonData);
  }, [currentLessonData, setCurrentLesson])

  const {
    data: quizForLessonData,
    isLoading: isLoadingQuizForLesson,
    refetch: refetchQuizForLesson,
  } = useGetQuizOfLesson({
    accessToken: accessToken,
    lessonId: lessonId,
  });

  const submitQuizMutation = useSubmitQuizAnswers(
    (res) => {
      setIsSubmitted(true);
      setShowConfirmSubmit(false);
    }
  )

  const markLessonCompleteMutation = useMarkLearnLessonCompleted(
    () => {
      setCurrentLessonCompleted(true);
    }
  )

  const [currentQuiz, setCurrentQuiz] = useState<Quiz | null>(null);
  const [questionList, setQuestionList] = useState<Question[]>([]);
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [quizStarted, setQuizStarted] = useState<boolean>(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [showConfirmSubmit, setShowConfirmSubmit] = useState<boolean>(false);
  const [showResults, setShowResults] = useState<boolean>(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (quizStarted && timeLeft > 0 && !isSubmitted) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (quizStarted && timeLeft === 0 && !isSubmitted) {
      handleSubmitQuiz();
    }
    return () => clearInterval(timer);
  }, [quizStarted, timeLeft, isSubmitted]);

  const currentQuestion = useMemo(() => {
    return questionList[currentQuestionIndex];
  }, [questionList, currentQuestionIndex])

  const isLastQuestion = useMemo(() => {
    return currentQuestionIndex === questionList.length - 1;
  }, [questionList, currentQuestionIndex]);

  const progress = useMemo(() => {
    return ((answers.length) / questionList.length) * 100;
  }, [answers, questionList]);

  const handleAnswer = (answer: string) => {
    setAnswers((prev) => {
      const existingAnswerIndex = prev.findIndex(a => a.questionId === currentQuestion.id);
      if (existingAnswerIndex !== -1) {
        const updatedAnswers = [...prev];
        updatedAnswers[existingAnswerIndex] = {
          questionId: currentQuestion.id,
          answer: answer
        };
        return updatedAnswers;
      } else {
        return [...prev, {
          questionId: currentQuestion.id,
          answer: answer
        }];
      }
    });
  };

  const handleNext = () => {
    if (isLastQuestion) {
      setShowConfirmSubmit(true);
    } else {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  const handleSubmitQuiz = () => {
    submitQuizMutation.mutate({
      accessToken: accessToken,
      lessonId: lessonId,
      answers: answers
    });
  };

  useEffect(() => {
    if (quizForLessonData) {
      setCurrentQuiz(quizForLessonData);
      setQuestionList(quizForLessonData.questions);
      setTimeLeft(quizForLessonData.timeLimit);
    }
  }, [quizForLessonData]);

  useEffect(() => {
    if (isSubmitted && submitQuizMutation.data?.passed) {
      markLessonCompleteMutation.mutate({
        accessToken: accessToken,
        lessonId: lessonId,
      });
    }
  }, [submitQuizMutation.data])

  if (isLoadingCourseDetail || isLoadingCurrentLesson || isLoadingQuizForLesson) {
    return (
      <Loading />
    )
  }

  if (!currentQuiz || questionList.length === 0) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-16">
          <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-muted">
            <AlertCircle className="h-10 w-10 text-muted-foreground" />
          </div>
          <h3>Quiz not available</h3>
          <p className="text-muted-foreground">
            No quiz questions found for this lesson.
          </p>
        </CardContent>
      </Card>
    );
  }

  if (!quizStarted && currentQuiz) {
    return (
      <BeforeStartQuiz
        setQuizStarted={setQuizStarted}
        courseId={courseId}
        lessonId={lessonId}
        courseTitle={currentCourseData?.title || "Unknown Course"}
        lessonTitle={currentLessonData?.lessonPlaybackInfo.title || "Unknown Lesson"}
        questionsAmount={currentQuiz?.questionCount}
        timeLimit={currentQuiz?.timeLimit}
        quizTitle={currentQuiz?.title}
      />
    );
  }

  if (isSubmitted && !showResults) {
    return (
      <CompletedQuiz
        currentQuizTitle={currentQuiz?.title || ''}
        setShowResults={setShowResults}
      />
    )
  }

  const handleRetry = () => {
    setQuizStarted(false);
    setIsSubmitted(false);
    setShowResults(false);
    setAnswers([]);
    setCurrentQuestionIndex(0);
    setTimeLeft(currentQuiz?.timeLimit || 0);
    refetchQuizForLesson();
  }

  if (currentQuiz && isSubmitted && showResults && submitQuizMutation.data) {
    return (
      <ResultQuiz
        quizTitle={currentQuiz?.title}
        quizResult={submitQuizMutation.data}
        questions={questionList}
        onRetry={handleRetry}
      />
    )
  }

  return (
    <div className="space-y-6 p-6">
      <div>
        <QuizBreadcrumb
          text={`Quiz test for ${currentLessonData?.lessonPlaybackInfo.title || 'the lesson'}`}
          courseId={courseId}
          lessonId={lessonId}
          courseTitle={currentCourseData?.title || "Unknown Course"}
          lessonTitle={currentLessonData?.lessonPlaybackInfo.title || "Unknown Lesson"}
        />

        <div className="flex items-center justify-between mt-4">
          <h1 className="text-2xl font-bold">{currentQuiz?.title}</h1>
          <div className="flex items-center gap-2 text-muted-foreground font-mono bg-muted px-4 py-2 rounded-md">
            <Clock className="h-5 w-5" />
            <span className={timeLeft < 60 ? 'text-destructive font-bold' : ''}>
              {formatTimer(timeLeft)}
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto space-y-6">
        <div className="space-y-2">
          <div className="flex items-center justify-between text-muted-foreground text-sm">
            <span>
              Question {currentQuestionIndex + 1} of {questionList.length}
            </span>
            <span>
              {Math.round(progress)}% Completed
            </span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        <Card className="border-2">
          <CardHeader>
            <CardDescription className="text-primary font-medium uppercase tracking-wider text-xs">
              {currentQuestion.type === 'multiple_choice' ? 'Multiple Choice' : 'True / False'}
            </CardDescription>
            <CardTitle className="text-xl">
              {currentQuestion.question}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {currentQuestion.type === 'multiple_choice' ? (
              <MultipleChoiceQuestion
                question={currentQuestion}
                currentAnswer={answers.find(a => a.questionId === currentQuestion.id)?.answer}
                onAnswer={handleAnswer}
              />
            ) : (
              <TrueFalseQuestion
                question={currentQuestion}
                currentAnswer={answers.find(a => a.questionId === currentQuestion.id)?.answer}
                onAnswer={handleAnswer}
              />
            )}
          </CardContent>
        </Card>

        <div className="flex justify-between pt-4">
          <Button
            variant={"outline"}
            onClick={handlePrevious}
            disabled={currentQuestionIndex === 0}
            size="lg"
          >
            Previous
          </Button>
          <Button
            onClick={handleNext}
            size="lg"
            className="min-w-[100px]"
          >
            {isLastQuestion ? 'Submit' : 'Next'}
          </Button>
        </div>
      </div>

      <Dialog open={showConfirmSubmit} onOpenChange={setShowConfirmSubmit}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Submit Quiz?</DialogTitle>
            <DialogDescription>
              Are you sure you want to submit your quiz? You won't be able to change your answers after submitting.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowConfirmSubmit(false)}>Cancel</Button>
            <Button
              disabled={submitQuizMutation.isPending}
              onClick={handleSubmitQuiz}>{submitQuizMutation.isPending ? 'Submitting...' : 'Submit'}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default QuizPage;