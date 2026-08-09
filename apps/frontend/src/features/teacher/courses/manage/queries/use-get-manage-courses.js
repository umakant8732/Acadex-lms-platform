import { useQuery } from "@tanstack/react-query";
import { getManageCoursesService } from "../services/service-get-manage-courses";
import { courseQueryKeys } from "../helpers/course-query-keys";

export const useGetManageCourses = (params = {}) => {
  return useQuery({
    queryKey: courseQueryKeys.manageCourses(params),
    queryFn: () => getManageCoursesService(params),
  });
};
