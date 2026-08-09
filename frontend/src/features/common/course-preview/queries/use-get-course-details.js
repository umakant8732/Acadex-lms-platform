import { useQuery } from "@tanstack/react-query";

import { coursePreviewQueryKeys } from "../helpers/course-preview-query-keys";
import { getCourseDetailsService } from "../services/service-get-course-details";

// Gets one public course details record for preview pages.
export const useGetCourseDetails = (courseId) => {
  return useQuery({
    queryKey: coursePreviewQueryKeys.courseDetails(courseId),
    queryFn: async () => {
      if (!courseId) {
        throw new Error("Course id is required");
      }

      return getCourseDetailsService(courseId);
    },
    enabled: Boolean(courseId),
    staleTime: 1 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    refetchOnWindowFocus: true,
  });
};
