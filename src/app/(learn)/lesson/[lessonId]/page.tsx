'use client'

import { Lesson } from "@/types/main-flow";
import LessonBreadcrumb from "../components/lesson-breadcrumb";
import MainComponent from "../components/main-component";
import { useCourseStore } from "@/stores/course-store";
import { useShallow } from "zustand/shallow";
import { useLessonStore } from "@/stores/lesson-store";
import { useCurrentLesson } from "@/hooks/useCurrentLesson";
import { useAuthStore } from "@/stores/auth-store";
import {use, useEffect } from "react";
import { useVideoPlayerStore } from "@/stores/video-player-store";
import { useParams } from "next/navigation";

type LessonPageProps = {
  params: Promise<{ lessonId: string }>;
}

const LessonPage = ({ params }: LessonPageProps) => {
  const { lessonId } = use(params);

  const {
    accessToken
  } = useAuthStore(useShallow((state) => ({
    accessToken: state.accessToken,
  })));

  console.log('accessToken from lesson page:', accessToken);

  const {
    currentCourseId
  } = useCourseStore(useShallow((state) => ({
    currentCourseId: state.currentCourseId,
  })));

  const {
    currentLesson,
    setCurrentLesson,
    setCurrentSidebarLessons,
    setCurrentTranscripts,
  } = useLessonStore(useShallow((state) => ({
    currentLesson: state.currentLesson,
    setCurrentLesson: state.setCurrentLesson,
    setCurrentSidebarLessons: state.setCurrentSidebarLessons,
    setCurrentTranscripts: state.setCurrentTranscripts,
  })));

  console.log('currentLesson:', currentLesson);

  const {
    setVideoUrl,
    setDuration,
    resetPlayer,
  } = useVideoPlayerStore(useShallow((state) => ({
    setVideoUrl: state.setVideoUrl,
    setDuration: state.setDuration,
    resetPlayer: state.resetPlayer,
  })))

  const {
    isFetching: isFetchingCurrentLesson,
  } = useCurrentLesson({
    accessToken: accessToken || '',
    lessonId,
    setCurrentLesson,
    setCurrentSidebarLessons,
    setCurrentTranscripts,
  });

  useEffect(() => {
    if (currentLesson && currentLesson.url && currentLesson.duration) {
      setVideoUrl(currentLesson.url);
      setDuration(currentLesson.duration);
    }

    return () => {
      resetPlayer();
    }
  }, [currentLesson])

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