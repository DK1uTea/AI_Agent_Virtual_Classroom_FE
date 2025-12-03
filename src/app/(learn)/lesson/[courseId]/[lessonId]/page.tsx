'use client'

import { Lesson } from "@/types/main-flow";
import LessonBreadcrumb from "../components/lesson-breadcrumb";
import MainComponent from "../components/main-component";
import { useCourseStore } from "@/stores/course-store";
import { useShallow } from "zustand/shallow";
import { useLessonStore } from "@/stores/lesson-store";
import { useGetCurrentLesson } from "@/hooks/useGetCurrentLesson";
import { useAuthStore } from "@/stores/auth-store";
import { use, useEffect } from "react";
import { useVideoPlayerStore } from "@/stores/video-player-store";
import { useParams } from "next/navigation";

type LessonPageProps = {
  params: Promise<{
    courseId: string;
    lessonId: string
  }>;
}

const LessonPage = ({ params }: LessonPageProps) => {
  const { courseId, lessonId } = use(params);

  const {
    accessToken
  } = useAuthStore(useShallow((state) => ({
    accessToken: state.accessToken,
  })));

  console.log('accessToken from lesson page:', accessToken);

  const {
    setCurrentCourseId,
  } = useCourseStore(useShallow((state) => ({
    setCurrentCourseId: state.setCurrentCourseId,
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
  } = useGetCurrentLesson(
    {
      accessToken: accessToken || '',
      lessonId,
    },
    ({ lessonPlaybackInfo, lessonTranscripts }) => {
      setCurrentSidebarLessons(lessonPlaybackInfo.sidebarLessons);
      const { sidebarLessons, ...currentLesson } = lessonPlaybackInfo;
      setCurrentLesson(currentLesson);
      setCurrentTranscripts(lessonTranscripts);
      setVideoUrl(currentLesson.url);
      setDuration(currentLesson.duration);
    },
    () => {
      console.error('Error fetching current lesson data');
    }

  );

  useEffect(() => {
    setCurrentCourseId(courseId);
  }, [courseId])

  useEffect(() => {

    return () => {
      resetPlayer();
    }
  }, [currentLesson])

  if (!courseId) {
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