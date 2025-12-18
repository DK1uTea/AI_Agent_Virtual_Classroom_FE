'use client'

import { courseApis } from "@/apis/gateways/course-apis";
import { Button } from "@/components/ui/button";
import { useGetMyCourse } from "@/hooks/useGetMyCourse";
import { getErrorJson, isHTTPError } from "@/lib/exception/http-error";
import { useAuthStore } from "@/stores/auth-store";
import { useCourseStore } from "@/stores/course-store";
import { Course } from "@/types/main-flow";
import { useMutation } from "@tanstack/react-query";
import { Loader2Icon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useMemo } from "react";
import { toast } from "sonner";
import { useShallow } from "zustand/shallow";

type EnrollLessonButtonProps = {
  course: Course
}

const EnrollLessonButton = ({ course }: EnrollLessonButtonProps) => {

  const {
    accessToken
  } = useAuthStore(useShallow((state) => ({
    accessToken: state.accessToken,
  })));

  const startLessonId = useMemo(() => {
    return course?.lessons?.[0]?.id || null;
  }, [course])

  const router = useRouter();

  const enrollCourseMutation = useMutation({
    mutationFn: async (req: {
      accessToken: string;
      courseId: string;
    }) => {
      toast.loading('Enrolling in course...', {
        id: "enroll-course"
      });
      const res = await courseApis.enrollCourse(req);
      return res;
    },
    onSuccess: async (res) => {
      toast.success("Enrolled successfully!", {
        id: "enroll-course"
      });
      if (course && startLessonId) {
        router.push(`/lesson/${course.id}/${startLessonId}`);
      }
    },
    onError: (error) => {
      toast.error("Failed to enroll!", {
        id: "enroll-course"
      });
      console.error('Error enrolling in course: ', error);
      if (isHTTPError(error)) {
        getErrorJson(error).then((res) => {
          console.error('Error enrolling in course details: ', res.message);
          toast.error(res.message, {
            id: "enroll-course"
          });
        });
      }
    }
  })

  const handleEnroll = () => {
    const req = {
      accessToken,
      courseId: String(course.id),
    };
    enrollCourseMutation.mutate(req);
  };

  if (!startLessonId) {
    return (
      <Button className="w-full" size="lg"
        disabled={true}
      >
        This course not ready yet
      </Button>
    )
  }

  return (
    <Button className="w-full" size="lg" onClick={handleEnroll}
      disabled={enrollCourseMutation.isPending}
    >
      {
        enrollCourseMutation.isPending ?
          (
            <>
              <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
              Enrolling...
            </>) : 'Enroll in Course'
      }
    </Button>
  );
};

export default EnrollLessonButton;