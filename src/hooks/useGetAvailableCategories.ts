import { courseApis } from "@/apis/gateways/course-apis";
import { getErrorJson, isHTTPError } from "@/lib/exception/http-error";
import { useQuery } from "@tanstack/react-query";

export const useGetAvailableCategories = (
  req: {
    accessToken: string;
  },
) => {
  return useQuery({
    queryKey: ['available-categories', req.accessToken],
    queryFn: async () => {
      try {
        const res = await courseApis.getAvailableCategories({
          accessToken: req.accessToken,
        })
        return res;
      } catch (error) {
        console.error('Error fetching available categories:', error);
        if (isHTTPError(error)) {
          await getErrorJson(error);
          console.error('HTTP Error:', error.message);
        }
      }
    },
    enabled: !!req.accessToken,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5,
  })
}