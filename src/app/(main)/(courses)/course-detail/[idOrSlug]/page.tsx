import { Course } from "@/types/main-flow";
import CourseDetailBreadcrumb from "../components/course-detail-breadcrumb";
import { ImageWithFallback } from "@/components/ui/image-with-fallback";
import ContinueLearnButton from "../components/continue-learn-btn";
import { Badge } from "@/components/ui/badge";
import { BookOpen, CheckCircle2, Clock, Star } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import EnrollLessonButton from "../components/enroll-lesson-btn";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CurriculumTab from "../components/curriculum-tab";
import DescriptionTab from "../components/description-tab";
import RequirementsTab from "../components/requirement-tab";

type CourseDetailPageProps = {
  params: {
    idOrSlug: string;
  };
}

const CourseDetailPage = async ({ params }: CourseDetailPageProps) => {

  const key = params.idOrSlug;

  if (/^\d+$/.test(key)) {
    // Fetch by ID
  } else {
    // Fetch by Slug
  }

  const course: Course = {
    id: '1',
    title: 'Introduction to Programming',
    description: 'Learn the basics of programming using Python.',
    coverImage: '/images/course-cover.jpg',
    instructor: 'John Doe',
    duration: '10 hours',
    lessonCount: 20,
    level: 'beginner',
    category: 'Programming',
    rating: 4.5,
    isNew: true,
    isHot: false,
    progress: 50,
    enrolled: true,
  }

  return (
    <div className="space-y-6">
      <CourseDetailBreadcrumb course={course} />
      {/* Hero section */}
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <div className="relative aspect-video overflow-hidden rounded-xl">
            <ImageWithFallback
              src={course.coverImage}
              alt={course.title}
              className="h-full w-full object-cover"
            />
            {
              course.enrolled && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                  <ContinueLearnButton />
                </div>
              )
            }
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Badge>{course.level}</Badge>
              <Badge variant={"secondary"}>{course.category}</Badge>
              {course.isNew && <Badge>New</Badge>}
              {course.isHot && <Badge variant="destructive">Hot</Badge>}
            </div>

            <h1>{course.title}</h1>
            <p className="text-muted-foreground">{course.description}</p>

            <div className="flex flex-wrap items-center gap-6 text-muted-foreground">
              <div className="flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                <span>{course.lessonCount} bài học</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                <span>{course.duration}</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                <span>{course.rating}/5</span>
              </div>
            </div>

            {course.enrolled && course.progress !== undefined && (
              <Card>
                <CardHeader>
                  <CardTitle>Your progress</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span>Completed</span>
                    <span>{course.progress}%</span>
                  </div>
                  <Progress value={course.progress} />
                  <p className="text-muted-foreground">
                    {Math.round((course.lessonCount * course.progress) / 100)}/{course.lessonCount} lessons
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Start Learning now!</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {course.enrolled ? (
                <>
                  <ContinueLearnButton />
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-muted-foreground">
                      <span>Time spent</span>
                      <span>8.5 hours</span>
                    </div>
                    <div className="flex items-center justify-between text-muted-foreground">
                      <span>Average score</span>
                      <span>85%</span>
                    </div>
                  </div>
                </>
              ) : (
                <EnrollLessonButton />
              )}

              <Separator />

              <div className="space-y-3">
                <h4>Course Includes:</h4>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 text-primary" />
                    <span>{course.lessonCount} high-quality video lessons</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 text-primary" />
                    <span>Practice exercises after each lesson</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 text-primary" />
                    <span>AI Chat Agent support</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 text-primary" />
                    <span>Completion certificate</span>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Author</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <span>{course.instructor[0]}</span>
                </div>
                <div>
                  <p>{course.instructor}</p>
                  <p className="text-muted-foreground">
                    Expert in {course.category}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      {/* Tabs Section */}
      <Tabs defaultValue="curriculum" className="w-full">
        <TabsList className="w-full lg:w-auto">
          <TabsTrigger value="curriculum" className="flex-1 lg:flex-none">
            Course curriculum
          </TabsTrigger>
          <TabsTrigger value="description" className="flex-1 lg:flex-none">
            Description
          </TabsTrigger>
          <TabsTrigger value="requirements" className="flex-1 lg:flex-none">
            Requirements
          </TabsTrigger>
        </TabsList>

        <TabsContent value="curriculum" className="mt-6">
          <CurriculumTab />
        </TabsContent>
        <TabsContent value="description" className="mt-6">
          <DescriptionTab course={course} />
        </TabsContent>
        <TabsContent value="requirements" className="mt-6">
          <RequirementsTab course={course} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CourseDetailPage;