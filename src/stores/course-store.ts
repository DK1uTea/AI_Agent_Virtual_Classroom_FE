import { Course } from "@/types/main-flow";
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

export type SetCourseListArg = Course[] | ((prev: Course[]) => Course[]);

type CourseState = {
  courseList: Course[];
  currentCourse: Course | null;
  currentPage: number;
  currentLimit: number;
  currentTotalPages: number;
  myCourses: Course[];
}

type CourseStateAction = {
  setCourseList: (next: SetCourseListArg) => void;
  setCurrentCourse: (course: Course | null) => void;
  setCurrentPage: (page: number) => void;
  setCurrentLimit: (limit: number) => void;
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

        currentPage: 1,
        setCurrentPage: (page: number) => {
          set((state) => {
            state.currentPage = page;
          });
        },

        currentLimit: 6,
        setCurrentLimit: (limit: number) => {
          set((state) => {
            state.currentLimit = limit;
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