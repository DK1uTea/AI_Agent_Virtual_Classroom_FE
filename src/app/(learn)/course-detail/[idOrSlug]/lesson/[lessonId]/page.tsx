'use client'

import { Course, Lesson } from "@/types/main-flow";
import LessonBreadcrumb from "../components/lesson-breadcrumb";
import MainComponent from "../components/main-component";

type LessonPageProps = {
  params: Promise<{ idOrSlug: string; lessonId: string }>;
}

const LessonPage = async ({ params }: LessonPageProps) => {
  const { idOrSlug, lessonId } = await params;

  // TODO: Fetch course data to handle in lesson page breadcrumb
  const currentCourse: Course = {
    id: '1',
    title: 'Introduction to Programming',
    description: 'Learn the basics of programming with this comprehensive course.',
    coverImage: '/images/course-cover.jpg',
    instructor: 'John Doe',
    duration: '10 hours',
    lessonCount: 20,
    level: 'beginner',
    category: 'Programming',
    rating: 4.5,
    lessons: [
      {
        id: '1',
        title: "Introduction to NestJS",
        order: 1,
        duration: '930'
      },
      {
        id: '2',
        title: "Controllers and Services",
        order: 2,
        duration: '900'
      }
    ]
  };

  // Fetch lesson data by ID
  // TODO: Implement data fetching logic here

  const currentLesson: Lesson = {
    id: lessonId,
    courseId: currentCourse.id,
    title: "Introduction to NestJS",
    duration: '930',
    status: 'in-progress',
    videoUrl: 'https://www.youtube.com/watch?v=ftO1fTbWpxs',
    transcript: [],
    order: 1,
  };


  return (
    <div className="flex flex-col min-h-[calc] p-6">
      {/* Breadcrumb */}
      <LessonBreadcrumb
        courseIdOrSlug={idOrSlug}
        courseTitle={currentCourse.title}
        lessonTitle={currentLesson.title}
      />

      {/* Main Content */}
      <MainComponent
        currentCourse={currentCourse}
        currentLesson={currentLesson} />
    </div>
  );
}

export default LessonPage;