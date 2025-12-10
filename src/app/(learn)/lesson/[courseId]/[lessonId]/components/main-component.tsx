'use client'

import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Course, Lesson } from "@/types/main-flow";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { use, useEffect, useMemo, useRef, useState } from "react";
import LessonListTab from "./lesson-list-tab";
import VideoPlayer from "./video-player";
import VideoControls from "./video-controls";
import { useVideoPlayerStore } from "@/stores/video-player-store";
import { useShallow } from "zustand/shallow";
import { useCourseStore } from "@/stores/course-store";
import { useLessonStore } from "@/stores/lesson-store";
import { useRouter } from "next/navigation";
import TranscriptTab from "./transcript-tab";
import ChatTab from "./chat-tab";
import { formatTimer } from "@/lib/utils";


const MainComponent = () => {

  const router = useRouter();

  const {
    currentCourseId
  } = useCourseStore(useShallow((state) => ({
    currentCourseId: state.currentCourseId,
  })));

  const {
    currentLesson,
    currentSidebarLessons
  } = useLessonStore(useShallow((state) => ({
    currentLesson: state.currentLesson,
    currentSidebarLessons: state.currentSidebarLessons,
  })));

  console.log("currentLesson in MainComponent:", currentLesson);
  console.log("currentSidebarLessons in MainComponent:", currentSidebarLessons);

  const currentLessonOrder = useMemo(() => {
    if (!currentLesson?.id || !currentSidebarLessons?.length) return 0;

    return currentSidebarLessons.find(
      (lesson) => lesson.id === currentLesson.id
    )?.order;
  }, [currentLesson?.id, currentSidebarLessons]);

  const prevAndNextLessonId = useMemo(() => {
    if (!currentSidebarLessons?.length || currentLessonOrder == null) {
      return { prevLessonId: null, nextLessonId: null };
    }

    const lessonOrder = Number(currentLessonOrder);

    const currentIndex = currentSidebarLessons.findIndex(
      (lesson) => lesson.order === lessonOrder
    );

    if (currentIndex === -1) {
      return { prevLessonId: null, nextLessonId: null };
    }

    const prevLessonId =
      currentSidebarLessons[currentIndex - 1]?.id ?? null;

    const nextLessonId =
      currentSidebarLessons[currentIndex + 1]?.id ?? null;

    return {
      prevLessonId,
      nextLessonId,
    };
  }, [currentSidebarLessons, currentLessonOrder]);


  console.log("Prev and Next Lesson IDs:", prevAndNextLessonId);

  console.log("Last order: ", currentSidebarLessons[currentSidebarLessons.length - 1]?.order);

  const {
    isPlaying,
    duration,
    currentTime,
    setShowControls,
  } = useVideoPlayerStore(useShallow((state) => ({
    isPlaying: state.isPlaying,
    duration: state.duration,
    currentTime: state.currentTime,
    setShowControls: state.setShowControls,
  })))

  const timeoutRef = useRef<NodeJS.Timeout>(null);

  const handleMouseMove = () => {
    setShowControls(true);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      if (isPlaying) {
        setShowControls(false);
      }
    }, 3000);
  };

  const handleMouseLeave = () => {
    if (isPlaying) {
      setShowControls(false);
    }
  }

  const handlePrevious = () => {
    router.push(`/lesson/${currentCourseId}/${prevAndNextLessonId?.prevLessonId}`);
  };

  const handleNext = () => {
    router.push(`/lesson/${currentCourseId}/${prevAndNextLessonId?.nextLessonId}`);
  };

  return (
    <div className="flex flex-col lg:flex-row flex-grow h-full overflow-hidden">
      {/* Video Section */}
      <div className="flex flex-col items-center flex-grow gap-6 h-full">
        {/* Video Player */}
        <div
          id="video-container"
          className="relative aspect-video bg-black rounded-2xl w-full xl:max-w-[75%]"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          <VideoPlayer />
          <VideoControls />
        </div>
        {/* Progress And Navigation */}
        <div className="bg-background p-4 space-y-4 w-full">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <p>{currentLesson?.title ?? "Unknown Lesson"}</p>
              <span className="text-muted-foreground">{formatTimer(duration || 0)}</span>
            </div>
            <Progress value={(currentTime / duration) * 100 || 0} />
          </div>

          <div className="flex items-center justify-between">
            <Button
              className="disabled:cursor-not-allowed"
              variant="outline"
              onClick={handlePrevious}
              disabled={currentLessonOrder === currentSidebarLessons[0]?.order}
            >
              <ChevronLeft className="mr-2 h-4 w-4" />
              <span className="hidden md:inline">Previous Lesson</span>
            </Button>

            <Button
              className="disabled:cursor-not-allowed"
              variant="outline"
              onClick={handleNext}
              disabled={
                currentLessonOrder ===
                currentSidebarLessons[currentSidebarLessons.length - 1]?.order
              }
            >
              <span className="hidden md:inline">Next Lesson</span>
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Tab Section */}
      <div className="w-full lg:w-[25rem] xl:w-[30rem] border-l bg-background h-[40rem] lg:h-full">
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

          <div className="flex-1 overflow-hidden ">
            <TabsContent value="lesson-list" className="h-full p-4 m-0">
              <LessonListTab />
            </TabsContent>
            <TabsContent value="transcript-text" className="h-full m-0">
              <TranscriptTab />
            </TabsContent>
            <TabsContent value="chat" className="h-full m-0 p-2">
              <ChatTab />
            </TabsContent>
            <TabsContent value="mind-map" className="h-full m-0">
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
}

export default MainComponent;