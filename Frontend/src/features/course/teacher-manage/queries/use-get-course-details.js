import { useQuery } from "@tanstack/react-query";
import { getCourseDetailsService } from "../services/service-get-course-details";
import { courseQueryKeys } from "../helpers/course-query-keys";

export const useGetCourseDetails = (courseId) => {
  return useQuery({
    queryKey: courseQueryKeys.courseDetails(courseId),
    queryFn: () => getCourseDetailsService(courseId),
    enabled: !!courseId,
  });
};
