'use client'

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { ImageWithFallback } from "@/components/ui/image-with-fallback";
import { useCourseStore } from "@/stores/course-store";
import { Course } from "@/types/main-flow"
import { Star } from "lucide-react";
import { useRouter } from "next/navigation";
import { useShallow } from "zustand/shallow";

type CourseCardProps = {
  course: Course;
}

const CourseCard = ({ course }: CourseCardProps) => {

  const router = useRouter();

  const {
    setCurrentCourseId,
  } = useCourseStore(useShallow((state) => ({
    setCurrentCourseId: state.setCurrentCourseId,
  })))

  return (
    <Card className="group overflow-hidden transition-all hover:shadow-lg cursor-pointer">
      <div className="relative aspect-video overflow-hidden">
        <ImageWithFallback
          src={course.coverImage}
          alt={course.title}
          className="h-full w-full object-cover transition-transform group-hover:scale-105"
        />
        <div className="absolute top-3 right-3 flex gap-2">
          {
            course.isNew && (
              <Badge className="bg-primary text-primary-foreground">New</Badge>
            )
          }
          {
            course.isHot && (
              <Badge className="bg-destructive text-destructive-foreground">Hot</Badge>
            )
          }
        </div>
      </div>

      <CardHeader onClick={() => router.push(`/course-detail/${course.id}`)}>
        <div className="flex items-center gap-2 text-muted-foreground">
          <Badge>{course.level}</Badge>
          <span>•</span>
          <span>{course.category}</span>
        </div>
        <h3 className="line-clamp-2">{course.title}</h3>
        <p className="text-muted-foreground line-clamp-2">{course.description}</p>
      </CardHeader>

      <CardContent className="space-y-2">
        <div className="flex items-center justify-between text-muted-foreground">
          <span>{course.rating}</span>
          <span>{course.duration}</span>
        </div>
        <div className="flex items-center gap-1">
          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
          <span>{course.rating}</span>
          <span className="text-muted-foreground">• {course.instructor}</span>
        </div>
      </CardContent>

      <CardFooter>
        {course.status === 'Active' && (
          <Button
            variant={"secondary"}
            className="w-full"
            onClick={() => {
              setCurrentCourseId(String(course.id))
              router.push(`/course-detail/${course.id}`)
            }}
          >
            Continue Learning
          </Button>
        )}
        {course.status === 'Completed' && (
          <Button
            className="w-full"
            disabled
          >
            You have completed this course
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}

export default CourseCard;