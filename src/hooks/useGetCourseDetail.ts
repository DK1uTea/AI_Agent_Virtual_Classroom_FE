import { courseApis } from "@/apis/gateways/course-apis";
import { getErrorJson, isHTTPError } from "@/lib/exception/http-error";
import { Course } from "@/types/main-flow";
import { useQuery } from "@tanstack/react-query";

export const useGetCourseDetail = (
  req: {
    accessToken: string;
    courseId: string;
  },
  onSuccessExtra?: (courseDetail: Course) => void,
  onErrorExtra?: () => void,
) => {
  return useQuery({
    queryKey: ['course-detail', req.courseId],
    enabled: Boolean(req.accessToken) && Boolean(req.courseId),
    refetchOnWindowFocus: false,
    queryFn: async () => {
      try {
        const res = await courseApis.courseDetail({
          accessToken: req.accessToken,
          id: req.courseId,
        });
        console.log('course detail res: ', res);

        onSuccessExtra?.(res);
        return res;
      } catch (error) {
        onErrorExtra?.();
        console.error('Error fetching course detail data', error);
        if (isHTTPError(error)) {
          await getErrorJson(error).then((res) => {
            console.error('Error fetching course detail details: ', res.message);
          })
        }
      }
    }
  })
}