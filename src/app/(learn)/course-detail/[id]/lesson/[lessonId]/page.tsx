'use client'

import { Course, Lesson } from "@/types/main-flow";
import LessonBreadcrumb from "../components/lesson-breadcrumb";
import MainComponent from "../components/main-component";
import { useCourseStore } from "@/stores/course-store";
import { useShallow } from "zustand/shallow";

type LessonPageProps = {
  params: Promise<{ lessonId: string }>;
}

const LessonPage = async ({ params }: LessonPageProps) => {
  const { lessonId } = await params;

  const {
    currentCourse
  } = useCourseStore(useShallow((state) => ({
    currentCourse: state.currentCourse,
  })))

  // Fetch lesson data by ID
  // TODO: Implement data fetching logic here

  const currentLesson: Lesson = {
    id: lessonId,
    courseId: currentCourse ? currentCourse.id : '',
    title: "Introduction to NestJS",
    duration: '930',
    status: 'in-progress',
    videoUrl: 'https://www.youtube.com/watch?v=ftO1fTbWpxs',
    transcript: [],
    order: 1,
  };

  if (!currentCourse) {
    return <div>Not course found</div>;
  }

  return (
    <div className="flex flex-col min-h-[calc] p-6">
      {/* Breadcrumb */}
      <LessonBreadcrumb
        courseId={currentCourse.id}
        courseTitle={currentCourse.title}
        lessonTitle={currentLesson.title}
      />

      {/* Main Content */}
      <MainComponent
        currentCourse={currentCourse}
        currentLesson={currentLesson} />
    </div>
  );
}

export default LessonPage;