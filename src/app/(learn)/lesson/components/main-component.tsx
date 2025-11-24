'use client'

import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Course, Lesson } from "@/types/main-flow";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import LessonListTab from "./lesson-list-tab";
import VideoPlayer from "./video-player";
import VideoControls from "./video-controls";
import { useVideoPlayerStore } from "@/stores/video-player-store";
import { useShallow } from "zustand/shallow";
import { useCourseStore } from "@/stores/course-store";
import { useLessonStore } from "@/stores/lesson-store";
import { useRouter } from "next/navigation";


const MainComponent = () => {

  const router = useRouter();

  const {
    currentCourseId,
    myCourses
  } = useCourseStore(useShallow((state) => ({
    currentCourseId: state.currentCourseId,
    myCourses: state.myCourses
  })))

  const {
    currentLesson,
    currentSidebarLessons
  } = useLessonStore(useShallow((state) => ({
    currentLesson: state.currentLesson,
    currentSidebarLessons: state.currentSidebarLessons,
  })));

  const prevAndNextLessonId = useMemo(() => {
    if (currentSidebarLessons.length > 0 && currentLesson && currentLesson.order) {
      const prevLessonId = currentSidebarLessons.find((lesson) => lesson.order === (currentLesson?.order - 1))?.id || null;
      const nextLessonId = currentSidebarLessons.find((lesson) => lesson.order === (currentLesson?.order + 1))?.id || null;
      return {
        prevLessonId,
        nextLessonId,
      };
    };
  }, [currentSidebarLessons, currentLesson]);

  const {
    setShowControls,
  } = useVideoPlayerStore(useShallow((state) => ({
    setShowControls: state.setShowControls,
  })))

  const [isVideoPauseByChat, setIsVideoPauseByChat] = useState<boolean>(false);
  const [controlsTimeout, setControlsTimeout] = useState<NodeJS.Timeout | null>(null);

  const handleMouseMove = () => {
    setShowControls(true);

    if (controlsTimeout) {
      clearTimeout(controlsTimeout);
    }

    const timeout = setTimeout(() => {
      setShowControls(false);
    }, 3000);

    setControlsTimeout(timeout);
  };

  const handleMouseLeave = () => {
    if (controlsTimeout) {
      clearTimeout(controlsTimeout);
    }

    const timeout = setTimeout(() => {
      setShowControls(false);
    }, 1000);

    setControlsTimeout(timeout);
  };

  useEffect(() => {
    return () => {
      if (controlsTimeout) {
        clearTimeout(controlsTimeout);
      }
    };
  }, [controlsTimeout]);

  const handlePrevious = () => {
    router.push(`/lesson/${prevAndNextLessonId?.prevLessonId}`);
  };

  const handleNext = () => {
    router.push(`/lesson/${prevAndNextLessonId?.nextLessonId}`);
  };

  return (
    <div className="flex flex-1 overflow-hidden flex-col lg:flex-row">
      {/* Video Section */}
      <div className="flex flex-1 flex-col">
        {/* Video Player */}
        <div
          id="video-container"
          className="relative aspect-video bg-black"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          <VideoPlayer />
          <VideoControls />
        </div>
        {isVideoPauseByChat && (
          <div className="bg-yellow-500/10 border-t border-yellow-500/20 p-2 text-center text-yellow-500">
            Video is paused due to chat interaction.
          </div>
        )}

        {/* Progress And Navigation */}
        <div className="bg-background p-4 space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <p>{currentLesson?.title ?? "Unknown Lesson"}</p>
              <span className="text-muted-foreground">{currentLesson?.duration ?? "Unknown Duration"}</span>
            </div>
            <Progress value={65} />
          </div>

          <div className="flex items-center justify-between">
            <Button variant="outline" onClick={handlePrevious} disabled={currentLesson?.order === 1}
            >
              <ChevronLeft className="mr-2 h-4 w-4" />
              Previous Lesson
            </Button>
            <Button
              variant="outline"
              onClick={handleNext} disabled={currentLesson?.order === currentSidebarLessons.length}
            >
              Next Lesson
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Tab Section */}
      <div className="w-full lg:w-96">
        <Tabs defaultValue="lesson-list" className="flex h-full flex-col">
          <TabsList className="w-full rounded-none border-b">
            <TabsTrigger value="lesson-list" className="flex-1">
              Lesson List
            </TabsTrigger>
            <TabsTrigger value="transcript-text" className="flex-1">
              Transcript
            </TabsTrigger>
            <TabsTrigger value="chat" className="flex-1">
              Chat Agent
            </TabsTrigger>
            <TabsTrigger value="mind-map" className="flex-1">
              Mind Map
            </TabsTrigger>
          </TabsList>

          <div className="flex-1">
            <TabsContent value="lesson-list" className="h-full p-4 m-0">
              <LessonListTab />
            </TabsContent>
            <TabsContent value="transcript-text" className="h-full p-4 m-0">

            </TabsContent>
            <TabsContent value="chat" className="h-full p-4 m-0">

            </TabsContent>
            <TabsContent value="mind-map" className="h-full p-4 m-0">

            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
}

export default MainComponent;