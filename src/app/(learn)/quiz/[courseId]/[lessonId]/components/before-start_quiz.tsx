'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import QuizBreadcrumb from "./quiz-breadcrumb";
import { Aladin } from "next/font/google";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { formatTimer } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { set } from "zod";


type BeforeStartQuizProps = {
  setQuizStarted: (started: boolean) => void;
  courseId: string;
  lessonId: string;
  courseTitle: string;
  lessonTitle: string;
}
const BeforeStartQuiz = ({ setQuizStarted, courseId, lessonId, courseTitle, lessonTitle }: BeforeStartQuizProps) => {

  return (
    <div className="space-y-6 p-6">
      <QuizBreadcrumb
        text="Before Starting Quiz"
        courseId={courseId}
        lessonId={lessonId}
        courseTitle={courseTitle}
        lessonTitle={lessonTitle}
      />

      <Card className="max-w-2xl mx-auto">
        <CardHeader className="text-center">
          <CardTitle>
            {/* Quiz Title */}
          </CardTitle>
          <CardDescription>
            Check your knowledge with this quiz! Test your understanding of the lesson material and reinforce your learning.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="flex items-center justify-between rounded-lg border p-4">
              <span className="text-muted-foreground">Questions Amount</span>
              <span>
                {/* Questions amount */}
              </span>
            </div>
            <div className="flex items-center justify-between rounded-lg border p-4">
              <span className="text-muted-foreground">Time</span>
              <span>
                {/* Time limit */}
              </span>
            </div>
          </div>

          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              You will have 20 minutes to complete 20 questions. The quiz will automatically submit when the time is up.
            </AlertDescription>
          </Alert>

          <Button className="w-full" size={"lg"} onClick={() => {
            setQuizStarted(true);
          }}>
            Start Quiz
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

export default BeforeStartQuiz;