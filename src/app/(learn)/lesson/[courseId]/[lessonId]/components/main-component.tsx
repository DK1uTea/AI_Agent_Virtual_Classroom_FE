'use client'

import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Course, Lesson } from "@/types/main-flow";
import { BarChart3, ChevronLeft, ChevronRight } from "lucide-react";
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
import { documentDispatchEvent, formatTimer } from "@/lib/utils";
import MindMapTab from "./mind-map-tab";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from "sonner";
import { getErrorJson, isHTTPError } from "@/lib/exception/http-error";
import { useMarkLearnVideoCompleted, useSaveVideoProgress } from "@/hooks/useProgress";
import { useAuthStore } from "@/stores/auth-store";
import { useCallback } from "react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { AIAnalyzeRes } from "@/apis/responses/ai-res";
import { useAIAnalyze } from "@/hooks/useAIAgent";
import { Message, MessageAvatar, MessageContent } from "@/components/ui/shadcn-io/ai/message";
import { Response } from "@/components/ui/shadcn-io/ai/response";
import DialogAnalyzeComponent from "./dialog-analyze-component";


const MainComponent = () => {

  const router = useRouter();

  const {
    accessToken
  } = useAuthStore(useShallow((state) => ({
    accessToken: state.accessToken,
  })));

  const {
    currentCourseId
  } = useCourseStore(useShallow((state) => ({
    currentCourseId: state.currentCourseId,
  })));

  const {
    currentLesson,
    currentSidebarLessons,
    setCurrentLessonVideoCompleted,
    isConfirmLearnVideoCompletedDialogOpen,
    toggleConfirmLearnVideoCompletedDialog,
    isConfirmContinueLearnDialogOpen,
    toggleConfirmContinueLearnDialog,
    toggleAnalyzeDialog,
  } = useLessonStore(useShallow((state) => ({
    currentLesson: state.currentLesson,
    currentSidebarLessons: state.currentSidebarLessons,
    setCurrentLessonVideoCompleted: state.setCurrentLessonVideoCompleted,
    isConfirmLearnVideoCompletedDialogOpen: state.ui.isConfirmLearnVideoCompletedDialogOpen,
    toggleConfirmLearnVideoCompletedDialog: state.toggleConfirmLearnVideoCompletedDialog,
    isConfirmContinueLearnDialogOpen: state.ui.isConfirmContinueLearnDialogOpen,
    toggleConfirmContinueLearnDialog: state.toggleConfirmContinueLearnDialog,
    toggleAnalyzeDialog: state.toggleAnalyzeDialog,
  })));

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
    setIsPlaying,
    duration,
    currentTime,
    setShowControls,
  } = useVideoPlayerStore(useShallow((state) => ({
    isPlaying: state.isPlaying,
    setIsPlaying: state.setIsPlaying,
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

  const saveVideoProgressMutation = useSaveVideoProgress();

  // Function to save video progress
  const saveProgress = useCallback(() => {
    // Get current time from store to avoid dependencies
    const time = useVideoPlayerStore.getState().currentTime;

    console.log('🔍 saveProgress called - time:', time, 'lessonId:', currentLesson?.id, 'hasToken:', !!accessToken);

    // Only save if we have valid data
    if (!currentLesson?.id || !time || time < 1 || !accessToken) {
      console.log('⚠️ saveProgress skipped - missing data');
      return;
    }

    console.log('✅ Saving video progress:', { lessonId: currentLesson.id, currentTime: time });

    saveVideoProgressMutation.mutate({
      accessToken: accessToken,
      lessonId: String(currentLesson.id),
      currentTime: time,
    });
  }, [currentLesson?.id, accessToken, saveVideoProgressMutation]);

  const handlePrevious = () => {
    saveProgress();
    router.push(`/lesson/${currentCourseId}/${prevAndNextLessonId?.prevLessonId}`);
  };

  const handleNext = () => {
    saveProgress();
    router.push(`/lesson/${currentCourseId}/${prevAndNextLessonId?.nextLessonId}`);
  };

  const markLearnVideoCompletedMutation = useMarkLearnVideoCompleted(
    () => {
      setCurrentLessonVideoCompleted(true);
      setIsPlaying(false);
      toggleConfirmLearnVideoCompletedDialog(true);
    },
    async (error) => {
      if (isHTTPError(error)) {
        await getErrorJson(error).then((res) => {
          toast.error(`Failed to mark video as completed: ${res.message}`);
        });
      }
    }
  );

  const [analyzeData, setAnalyzeData] = useState<AIAnalyzeRes | null>(null);

  const getAIAnalyzeQuery = useAIAnalyze(
    {
      accessToken: accessToken,
      lessonId: String(currentLesson?.id)
    },
    (res) => {
      toggleAnalyzeDialog(true);
    }
  )

  const handleAnalyze = () => {
    getAIAnalyzeQuery.refetch();
  }

  // Save progress on component unmount
  useEffect(() => {
    return () => {
      saveProgress();
    };
  }, [currentLesson?.id, accessToken]);

  const hasMarkedCompletionRef = useRef(false);

  useEffect(() => {
    if (!currentTime || !duration || !currentLesson) return;

    const currentProgress = currentTime / duration;

    // Only mark as completed once per lesson
    if (currentProgress >= 0.9 &&
      !currentLesson.completed?.videoCompleted &&
      !hasMarkedCompletionRef.current) {
      hasMarkedCompletionRef.current = true;

      markLearnVideoCompletedMutation.mutate({
        accessToken: accessToken,
        lessonId: String(currentLesson.id),
      });
    }
  }, [currentTime, duration, currentLesson, accessToken, markLearnVideoCompletedMutation]);

  // Reset flag when lesson changes
  useEffect(() => {
    hasMarkedCompletionRef.current = false;
  }, [currentLesson?.id]);

  // Periodic progress save while video is playing (every 2 minutes)
  useEffect(() => {
    if (!accessToken) return;

    console.log('🕐 Setting up auto-save interval (every 2 minutes)');

    const interval = setInterval(() => {
      console.log('⏰ Auto-save interval triggered');

      const time = useVideoPlayerStore.getState().currentTime;
      const lesson = useLessonStore.getState().currentLesson;

      console.log('🔍 Auto-save check - time:', time, 'lessonId:', lesson?.id);

      // Only save if we have valid data
      if (!lesson?.id || !time || time < 1 || lesson.completed?.videoCompleted) {
        console.log('⚠️ Auto-save skipped - missing data or video completed');
        return;
      }

      console.log('✅ Auto-saving video progress:', { lessonId: lesson.id, currentTime: time });

      // Call the mutation directly
      saveVideoProgressMutation.mutate({
        accessToken: accessToken,
        lessonId: String(lesson.id),
        currentTime: time,
      });
    }, 2 * 60 * 1000);

    return () => {
      console.log('🛑 Clearing auto-save interval');
      clearInterval(interval);
    };
  }, [accessToken]); // Only depend on accessToken

  useEffect(() => {
    if (currentLesson && !currentLesson.completed?.videoCompleted && currentLesson.currentTime && currentLesson.currentTime > 0) {
      toggleConfirmContinueLearnDialog(true);
    }
  }, [currentLesson?.id, currentLesson?.courseId])

  useEffect(() => {
    if (getAIAnalyzeQuery.data) {
      setAnalyzeData(getAIAnalyzeQuery.data);
    }
  }, [getAIAnalyzeQuery.data])

  return (
    <div className="flex flex-col lg:flex-row flex-grow h-full overflow-hidden">
      {/* Video Section */}
      <div className="flex flex-col items-center flex-grow gap-6 h-full lg:px-2 py-4">
        {/* Video Player */}
        <div
          id="video-container"
          className="relative aspect-video bg-black rounded-2xl w-full xl:max-w-[70%]"
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
              <ChevronLeft className="md:mr-2 h-4 w-4" />
              <span className="hidden md:inline">Previous Lesson</span>
            </Button>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <span className="inline-block">
                    <Button
                      variant="outline"
                      onClick={handleAnalyze}
                      disabled={currentLesson?.status !== 'completed' || getAIAnalyzeQuery.isLoading || getAIAnalyzeQuery.isFetching}
                    >
                      <BarChart3 className="md:mr-2 h-4 w-4" />
                      <span className="hidden md:inline">{getAIAnalyzeQuery.isLoading || getAIAnalyzeQuery.isFetching ? 'Analyzing...' : 'Analyze'}</span>
                    </Button>
                  </span>
                </TooltipTrigger>
                {currentLesson?.status !== 'completed' && (
                  <TooltipContent>
                    {!currentLesson?.completed?.videoCompleted && !currentLesson?.completed?.quizCompleted ? (
                      <p>You can only analyze lesson after you complete watch video and quiz.</p>
                    ) : (
                      <p>You need to complete the quiz before analyzing the lesson.</p>
                    )}
                  </TooltipContent>
                )}
              </Tooltip>
            </TooltipProvider>

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
              <ChevronRight className="md:ml-2 h-4 w-4" />
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
            <TabsContent value="chat" className="h-full m-0 p-2 data-[state=inactive]:hidden" forceMount>
              <ChatTab />
            </TabsContent>
            <TabsContent value="mind-map" className="h-full m-0 p-2">
              <MindMapTab />
            </TabsContent>
          </div>
        </Tabs>
      </div>

      {/* Dialog confirm learn video completed */}
      <Dialog open={isConfirmLearnVideoCompletedDialogOpen} onOpenChange={toggleConfirmLearnVideoCompletedDialog}>
        <DialogContent onInteractOutside={(e) => e.preventDefault()}>
          <DialogHeader>
            <DialogTitle>Learn Video Completed</DialogTitle>
            <DialogDescription>
              You have completed watching 90% of this lesson video. Now the quiz of this lesson is unlocked.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button onClick={() => {
              toggleConfirmLearnVideoCompletedDialog(false);
            }}>OK</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog confirm continue learn */}
      {currentLesson && !currentLesson.completed?.videoCompleted && !!currentLesson.currentTime && currentLesson.currentTime > 0 && (
        <Dialog open={isConfirmContinueLearnDialogOpen} onOpenChange={toggleConfirmContinueLearnDialog}>
          <DialogContent onInteractOutside={(e) => e.preventDefault()}>
            <DialogHeader>
              <DialogTitle>Continue Learning ?</DialogTitle>
              <DialogDescription>
                Last time you stopped at {formatTimer(currentLesson?.currentTime)}. Do you want to continue from there?
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button onClick={() => {
                toggleConfirmContinueLearnDialog(false);
              }}>Learn from start</Button>
              <Button onClick={() => {
                requestAnimationFrame(() => {
                  documentDispatchEvent("seekChange", {
                    time: currentLesson.currentTime || 0,
                  });
                });
                toggleConfirmContinueLearnDialog(false);
              }}>Continue learning</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* Dialog analyze */}
      <DialogAnalyzeComponent
        analyzeData={analyzeData}
      />
    </div >
  );
}

export default MainComponent;