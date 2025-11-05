import { courseApis } from "@/apis/gateways/course-apis";
import { getErrorJson, isHTTPError } from "@/lib/exception/http-error";
import { useQuery } from "@tanstack/react-query"

export const useCourseList = (req: {
  accessToken: string;
  page?: number;
  limit?: number;
  title?: string;
  category?: string;
  level?: string;
  sort?: string;
  sortBy?: string;
}) => {
  return useQuery({
    queryKey: ['course-list', req.page, req.limit, req.title, req.category, req.level, req.sort, req.sortBy],
    enabled: false,
    queryFn: async () => {
      try {
        const res = await courseApis.listCourse(req);
        return res;
      } catch (error) {
        console.error('Error fetching course list: ', error);
        if (isHTTPError(error)) {
          getErrorJson(error).then((res) => {
            console.error('Error fetching course list details: ', res.message);
          })
        }
      }
    }
  })
}