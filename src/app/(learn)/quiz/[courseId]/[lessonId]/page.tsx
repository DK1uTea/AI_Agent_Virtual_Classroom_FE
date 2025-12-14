'use client'

import { Clock, CheckCircle2, AlertCircle } from "lucide-react";
import QuizBreadcrumb from "./components/quiz-breadcrumb";
import { use, useMemo, useState, useEffect } from "react";
import { formatTimer } from "@/lib/utils";
import BeforeStartQuiz from "./components/before-start_quiz";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useLessonStore } from "@/stores/lesson-store";
import { useShallow } from "zustand/shallow";
import { useAuthStore } from "@/stores/auth-store";
import { useGetCourseDetail } from "@/hooks/useGetCourseDetail";
import { useGetCurrentLesson } from "@/hooks/useGetCurrentLesson";
import Loading from "@/components/ui/loading";
import { Quiz } from "@/types/main-flow";
import MultipleChoiceQuestion from "./components/multiple-choice-question";
import TrueFalseQuestion from "./components/true-false-question";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";

type QuizPageProps = {
  params: Promise<{
    courseId: string;
    lessonId: string
  }>;
}

const mockQuiz: Quiz = {
  id: '1',
  lessonId: '1',
  title: 'Kiểm tra kiến thức về React',
  status: 'not-started',
  timeLimit: 300,
  questions: [
    {
      id: '1',
      type: 'multiple-choice',
      question: 'React là gì?',
      options: [
        'Một ngôn ngữ lập trình',
        'Một thư viện JavaScript',
        'Một framework backend',
        'Một database',
      ],
    },
    {
      id: '2',
      type: 'true-false',
      question: 'React được phát triển bởi Google',
      options: ['True', 'False'],
    },
    {
      id: '3',
      type: 'multiple-choice',
      question: 'Hook nào dùng để quản lý state trong functional component?',
      options: [
        'useEffect',
        'useState',
        'useContext',
        'useReducer',
      ],
    },
    {
      id: '4',
      type: 'true-false',
      question: 'JSX là bắt buộc khi sử dụng React',
      options: ['True', 'False'],
    },
    {
      id: '5',
      type: 'multiple-choice',
      question: 'Phương thức nào được gọi sau khi component được render lần đầu?',
      options: [
        'componentWillMount',
        'componentDidMount',
        'componentDidUpdate',
        'componentWillUnmount',
      ],
    },
  ],
};

const QuizPage = ({ params }: QuizPageProps) => {
  const { courseId, lessonId } = use(params);

  const {
    accessToken
  } = useAuthStore(useShallow((state) => ({
    accessToken: state.accessToken,
  })));

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

  const [timeLeft, setTimeLeft] = useState<number>(mockQuiz.timeLimit || 300);
  const [quizStarted, setQuizStarted] = useState<boolean>(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [showConfirmSubmit, setShowConfirmSubmit] = useState<boolean>(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (quizStarted && timeLeft > 0 && !isSubmitted) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && !isSubmitted) {
      handleSubmitQuiz();
    }
    return () => clearInterval(timer);
  }, [quizStarted, timeLeft, isSubmitted]);

  const currentQuestion = mockQuiz.questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === mockQuiz.questions.length - 1;
  const progress = ((currentQuestionIndex + 1) / mockQuiz.questions.length) * 100;

  const handleAnswer = (answer: string) => {
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: answer,
    }));
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
    setIsSubmitted(true);
    setShowConfirmSubmit(false);
    // Here you would typically send the answers to the backend
    console.log('Quiz submitted:', answers);
  };

  if (isLoadingCourseDetail || isLoadingCurrentLesson) {
    return (
      <Loading />
    )
  }

  if (!quizStarted) {
    return (
      <BeforeStartQuiz
        setQuizStarted={setQuizStarted}
        courseId={courseId}
        lessonId={lessonId}
        courseTitle={currentCourseData?.title || "Unknown Course"}
        lessonTitle={currentLessonData?.lessonPlaybackInfo.title || "Unknown Lesson"}
      />
    );
  }

  if (isSubmitted) {
     return (
        <div className="space-y-6 p-6 flex flex-col items-center justify-center min-h-[60vh] text-center">
            <div className="rounded-full bg-green-100 p-6 dark:bg-green-900/20">
                <CheckCircle2 className="h-16 w-16 text-green-600 dark:text-green-400" />
            </div>
            <h2 className="text-2xl font-bold">Quiz Completed!</h2>
            <p className="text-muted-foreground max-w-md">
                You have successfully completed the quiz "{mockQuiz.title}". Results will be available shortly.
            </p>
            <Button onClick={() => window.location.reload()}>Retake Quiz</Button>
        </div>
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
            <h1 className="text-2xl font-bold">{mockQuiz.title}</h1>
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
              Question {currentQuestionIndex + 1} of {mockQuiz.questions.length}
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
                {currentQuestion.type === 'multiple-choice' ? 'Multiple Choice' : 'True / False'}
            </CardDescription>
            <CardTitle className="text-xl">
              {currentQuestion.question}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {currentQuestion.type === 'multiple-choice' ? (
              <MultipleChoiceQuestion
                question={currentQuestion}
                currentAnswer={answers[currentQuestion.id]}
                onAnswer={handleAnswer}
              />
            ) : (
                <TrueFalseQuestion
                question={currentQuestion}
                currentAnswer={answers[currentQuestion.id]}
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
                <Button onClick={handleSubmitQuiz}>Submit Quiz</Button>
            </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default QuizPage;