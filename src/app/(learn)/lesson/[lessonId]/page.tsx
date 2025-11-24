'use client'

import { Lesson } from "@/types/main-flow";
import LessonBreadcrumb from "../components/lesson-breadcrumb";
import MainComponent from "../components/main-component";
import { useCourseStore } from "@/stores/course-store";
import { useShallow } from "zustand/shallow";
import { useLessonStore } from "@/stores/lesson-store";

type LessonPageProps = {
  params: Promise<{ lessonId: string }>;
}

const LessonPage = async ({ params }: LessonPageProps) => {
  const { lessonId } = await params;

  const {
    currentCourseId
  } = useCourseStore(useShallow((state) => ({
    currentCourseId: state.currentCourseId,
  })));

  const {
    setCurrentLesson,
    setCurrentSidebarLessons,
    setCurrentTranscripts,
  } = useLessonStore(useShallow((state) => ({
    setCurrentLesson: state.setCurrentLesson,
    setCurrentSidebarLessons: state.setCurrentSidebarLessons,
    setCurrentTranscripts: state.setCurrentTranscripts,
  })));

  // TODO: Fetch current lesson data


  if (!currentCourseId) {
    return <div>Not course found</div>;
  }

  return (
    <div className="flex flex-col min-h-[calc] p-6">
      {/* Breadcrumb */}
      <LessonBreadcrumb />

      {/* Main Content */}
      <MainComponent />
    </div>
  );
}

export default LessonPage;