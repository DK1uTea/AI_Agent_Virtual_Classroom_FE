import { Lesson, LessonWithPlayback, SidebarLessonItem, TranscriptItem } from "@/types/main-flow";
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

type LessonState = {
  currentLesson: LessonWithPlayback | null;
  currentSidebarLessons: SidebarLessonItem[];
  currentTranscripts: TranscriptItem[];
}

type LessonStateAction = {
  setCurrentLesson: (lesson: LessonWithPlayback | null) => void;
  setCurrentSidebarLessons: (lessons: SidebarLessonItem[]) => void;
  setCurrentTranscripts: (transcripts: TranscriptItem[]) => void;
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
      })
    )
  )
)