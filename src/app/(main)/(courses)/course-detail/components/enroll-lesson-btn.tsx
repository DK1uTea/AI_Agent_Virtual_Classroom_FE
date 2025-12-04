'use client'

import { courseApis } from "@/apis/gateways/course-apis";
import { Button } from "@/components/ui/button";
import { useGetMyCourse } from "@/hooks/useGetMyCourse";
import { getErrorJson, isHTTPError } from "@/lib/exception/http-error";
import { useAuthStore } from "@/stores/auth-store";
import { useCourseStore } from "@/stores/course-store";
import { useMutation } from "@tanstack/react-query";
import { Loader2Icon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useShallow } from "zustand/shallow";

type EnrollLessonButtonProps = {
  courseId: string;
}

const EnrollLessonButton = ({ courseId }: EnrollLessonButtonProps) => {

  const {
    accessToken
  } = useAuthStore(useShallow((state) => ({
    accessToken: state.accessToken,
  })));

  const {
    setCourseList,
    setMyCourses,
  } = useCourseStore(useShallow((state) => ({
    setCourseList: state.setCourseList,
    setMyCourses: state.setMyCourses,
  })));

  const {
    data: myCoursesData,
    refetch: refetchMyCourses,
  } = useGetMyCourse({
    accessToken,
  });

  const router = useRouter();

  const enrollCourseMutation = useMutation({
    mutationFn: async (req: {
      accessToken: string;
      courseId: string;
    }) => {
      const res = await courseApis.enrollCourse(req);
      return res;
    },
    onSuccess: async (res) => {
      setMyCourses((prev) => [...prev, res]);
      setCourseList((prev) => {
        return prev.map((course) => {
          return course.id === courseId ? { ...course, status: res.status, enrolledAt: res.enrolledAt } : course;
        })
      })
      // router.push(`/lesson/${courseId}`);
    },
    onError: (error) => {
      console.error('Error enrolling in course: ', error);
      if (isHTTPError(error)) {
        getErrorJson(error).then((res) => {
          console.error('Error enrolling in course details: ', res.message);
        });
      }
    }
  })

  const handleEnroll = () => {
    const req = {
      accessToken,
      courseId,
    };
    enrollCourseMutation.mutate(req);
  };

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