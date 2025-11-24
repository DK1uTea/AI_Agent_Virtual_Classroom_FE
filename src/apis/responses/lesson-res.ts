import { LessonWithPlayback, SidebarLessonItem } from "@/types/main-flow";

export type LessonPlaybackRes = LessonWithPlayback & {
  sidebarLessons: SidebarLessonItem[];
}