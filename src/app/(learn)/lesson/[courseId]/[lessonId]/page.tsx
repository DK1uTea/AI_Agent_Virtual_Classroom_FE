'use client'

import { Lesson } from "@/types/main-flow";
import LessonBreadcrumb from "./components/lesson-breadcrumb";
import MainComponent from "./components/main-component";
import { useCourseStore } from "@/stores/course-store";
import { useShallow } from "zustand/shallow";
import { useLessonStore } from "@/stores/lesson-store";
import { useGetCurrentLesson } from "@/hooks/useGetCurrentLesson";
import { useAuthStore } from "@/stores/auth-store";
import { use, useEffect } from "react";
import { useVideoPlayerStore } from "@/stores/video-player-store";
import { useParams } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Search } from "lucide-react";
import Loading from "@/components/ui/loading";
import { useGetCourseDetail } from "@/hooks/useGetCourseDetail";

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

  const {
    setCurrentCourseId,
  } = useCourseStore(useShallow((state) => ({
    setCurrentCourseId: state.setCurrentCourseId,
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

  const {
    setVideoUrl,
  } = useVideoPlayerStore(useShallow((state) => ({
    setVideoUrl: state.setVideoUrl,
  })))

  const {
    data: currentCourseData,
    isLoading: isLoadingCourseDetail,
  } = useGetCourseDetail({
    accessToken: accessToken,
    courseId: courseId,
  })

  const {
    isLoading: isLoadingCurrentLesson,
  } = useGetCurrentLesson(
    {
      accessToken: accessToken || '',
      lessonId,
    },
    ({ lessonPlaybackInfo, lessonTranscripts }) => {
      console.log('Fetched lesson playback info:', lessonPlaybackInfo);
      console.log('Fetched lesson transcripts:', lessonTranscripts);
      setCurrentSidebarLessons(lessonPlaybackInfo.sidebarLessons);
      const { sidebarLessons, ...currentLessonData } = lessonPlaybackInfo;
      setCurrentLesson(currentLessonData);
      setCurrentTranscripts(lessonTranscripts);
      setVideoUrl(currentLessonData.url);
    },
    () => {
      console.error('Error fetching current lesson data');
    }

  );

  useEffect(() => {
    setCurrentCourseId(courseId);
  }, [courseId])

  // useEffect(() => {

  //   return () => {
  //     resetPlayer();
  //   }
  // }, [])

  if (!courseId) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-16">
          <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-muted">
            <Search className="h-10 w-10 text-muted-foreground" />
          </div>
          <h3>Not found any courses</h3>
          <p className="text-muted-foreground">
            Please try again later.
          </p>
        </CardContent>
      </Card>
    );
  }

  if (!lessonId) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-16">
          <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-muted">
            <Search className="h-10 w-10 text-muted-foreground" />
          </div>
          <h3>Not found any lessons</h3>
          <p className="text-muted-foreground">
            Please try again later.
          </p>
        </CardContent>
      </Card>
    );
  }

  if (isLoadingCourseDetail || isLoadingCurrentLesson) {
    return (
      <Loading />
    )
  }

  return (
    <div className="flex flex-col lg:h-[calc(100vh-4rem)] p-6">
      {/* Breadcrumb */}
      <LessonBreadcrumb courseId={courseId} courseTitle={currentCourseData?.title || "Unknown Course"} />
      {/* Main Content */}
      <MainComponent />
    </div>
  );
}

export default LessonPage;