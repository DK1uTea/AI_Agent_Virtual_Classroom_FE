import { Lesson, LessonWithPlayback, SidebarLessonItem, TranscriptItem } from "@/types/main-flow";
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

type LessonState = {
  currentLesson: LessonWithPlayback | null;
  currentSidebarLessons: SidebarLessonItem[];
  currentTranscripts: TranscriptItem[];

  ui: {
    isMindMapDialogOpen: boolean;
    isConfirmLearnVideoCompletedDialogOpen: boolean;
    isConfirmLearnLessonCompletedDialogOpen: boolean;
    isConfirmContinueLearnDialogOpen: boolean;
    isAnalyzeDialogOpen: boolean;
  }
}

type LessonStateAction = {
  setCurrentLesson: (lesson: LessonWithPlayback | null) => void;
  setCurrentSidebarLessons: (lessons: SidebarLessonItem[]) => void;
  setCurrentTranscripts: (transcripts: TranscriptItem[]) => void;
  setCurrentLessonVideoCompleted: (videoCompleted: boolean) => void;
  setCurrentLessonCompleted: (lessonCompleted: boolean) => void;

  toggleMindMapDialog: (isOpen: boolean) => void;
  toggleConfirmLearnVideoCompletedDialog: (isOpen: boolean) => void;
  toggleConfirmLearnLessonCompletedDialog: (isOpen: boolean) => void;
  toggleConfirmContinueLearnDialog: (isOpen: boolean) => void;
  toggleAnalyzeDialog: (isOpen: boolean) => void;
}

type LessonStore = LessonState & LessonStateAction;

export const useLessonStore = create<LessonStore>()(
  immer(
    devtools(
      (set, get) => ({
        currentLesson: null,
        setCurrentLesson: (lesson: LessonWithPlayback | null) => {
          set((state) => {
            state.currentLesson = lesson;
          });
        },

        currentSidebarLessons: [],
        setCurrentSidebarLessons: (lessons: SidebarLessonItem[]) => {
          set((state) => {
            state.currentSidebarLessons = lessons;
          });
        },

        currentTranscripts: [],
        setCurrentTranscripts: (transcripts: TranscriptItem[]) => {
          set((state) => {
            state.currentTranscripts = transcripts;
          });
        },

        setCurrentLessonVideoCompleted(videoCompleted) {
          set((state) => {
            if (state.currentLesson?.completed) {
              state.currentLesson.completed.videoCompleted = videoCompleted;
            }
          })
        },

        setCurrentLessonCompleted(lessonCompleted) {
          set((state) => {
            if (state.currentLesson?.completed) {
              state.currentLesson.completed.quizCompleted = lessonCompleted;
              state.currentLesson.status = lessonCompleted ? 'completed' : 'in-progress';
            }
          })
        },

        ui: {
          isMindMapDialogOpen: false,
          isConfirmLearnVideoCompletedDialogOpen: false,
          isConfirmLearnLessonCompletedDialogOpen: false,
          isConfirmContinueLearnDialogOpen: false,
          isAnalyzeDialogOpen: false,
        },
        toggleMindMapDialog: (isOpen: boolean) => {
          set((state) => {
            state.ui.isMindMapDialogOpen = isOpen;
          });
        },
        toggleConfirmLearnVideoCompletedDialog: (isOpen: boolean) => {
          set((state) => {
            state.ui.isConfirmLearnVideoCompletedDialogOpen = isOpen;
          });
        },
        toggleConfirmLearnLessonCompletedDialog: (isOpen: boolean) => {
          set((state) => {
            state.ui.isConfirmLearnLessonCompletedDialogOpen = isOpen;
          });
        },
        toggleConfirmContinueLearnDialog: (isOpen: boolean) => {
          set((state) => {
            state.ui.isConfirmContinueLearnDialogOpen = isOpen;
          });
        },
        toggleAnalyzeDialog: (isOpen: boolean) => {
          set((state) => {
            state.ui.isAnalyzeDialogOpen = isOpen;
          });
        },
      })
    )
  )
)