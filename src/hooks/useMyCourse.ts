import { courseApis } from "@/apis/gateways/course-apis";
import { getErrorJson, isHTTPError } from "@/lib/exception/http-error";
import { useQuery } from "@tanstack/react-query";

export const useMyCourse = (req: {
  accessToken: string;
}) => {
  return useQuery({
    queryKey: ['my-courses'],
    queryFn: async () => {
      try {
        const res = await courseApis.myEnrolledCourses(req);
        return res;
      } catch (error) {
        console.error('Error fetching my courses: ', error);
        if (isHTTPError(error)) {
          getErrorJson(error).then((res) => {
            console.error('Error fetching my courses details: ', res.message);
          })
        }
        throw error;
      }
    }
  })
}