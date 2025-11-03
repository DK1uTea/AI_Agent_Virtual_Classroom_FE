'use client'

import QuizBreadcrumb from "./components/quiz-breadcrumb";

type QuizPageProps = {
  params: Promise<{ idOrSlug: string; lessonId: string }>;
}

const QuizPage = async ({ params }: QuizPageProps) => {
  const { idOrSlug, lessonId } = await params;

  return (
    <div className="space-y-6 p-6">
      <QuizBreadcrumb
        courseIdOrSlug={idOrSlug}
        courseTitle=""
        lessonId={lessonId}
        lessonTitle=""
        text="Quiz Test"
      />

      <div>
        
      </div>
    </div>
  );
};

export default QuizPage;