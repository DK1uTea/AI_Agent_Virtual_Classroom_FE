import { Course, SortOrder } from "@/types/main-flow";
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

export type SetCourseListArg = Course[] | ((prev: Course[]) => Course[]);

export type Config = {
  page: number;
  limit: number;
  title: string;
  category: string;
  level: string;
  sort: SortOrder;
}

export type SetCourseListConfigArg = Config | ((prev: Config) => Config);

type CourseState = {
  courseList: Course[];
  currentCourse: Course | null;
  currentListConfig: Config;
  currentTotalPages: number;
  myCourses: Course[];
}

type CourseStateAction = {
  setCourseList: (next: SetCourseListArg) => void;
  setCurrentCourse: (course: Course | null) => void;
  setCurrentListConfig: (next: SetCourseListConfigArg) => void;
  setCurrentTotalPages: (totalPages: number) => void;
  setMyCourses: (next: SetCourseListArg) => void;
}

type CourseStore = CourseState & CourseStateAction;

export const useCourseStore = create<CourseStore>()(
  immer(
    devtools(
      (set, get) => ({
        courseList: [],
        setCourseList: (next: SetCourseListArg) => {
          set((state) => {
            if (typeof next === 'function') {
              state.courseList = next(state.courseList);
            } else {
              state.courseList = next;
            }
          });
        },

        currentCourse: null,
        setCurrentCourse: (course: Course | null) => {
          set((state) => {
            state.currentCourse = course;
          });
        },

        currentListConfig: {
          page: 1,
          limit: 6,
          title: '',
          category: '',
          level: '',
          sort: SortOrder.DESC,
        },
        setCurrentListConfig: (next: SetCourseListConfigArg) => {
          set((state) => {
            if (typeof next === 'function') {
              state.currentListConfig = next(state.currentListConfig);
            } else {
              state.currentListConfig = next;
            }
          });
        },

        currentTotalPages: 1,
        setCurrentTotalPages: (totalPages: number) => {
          set((state) => {
            state.currentTotalPages = totalPages;
          });
        },

        myCourses: [],
        setMyCourses: (next: SetCourseListArg) => {
          set((state) => {
            if (typeof next === 'function') {
              state.myCourses = next(state.myCourses);
            } else {
              state.myCourses = next;
            }
          });
        },
      })
    )
  )
)