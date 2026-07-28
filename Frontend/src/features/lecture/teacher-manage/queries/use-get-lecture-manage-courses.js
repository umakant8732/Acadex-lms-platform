import { useQuery } from "@tanstack/react-query";
import { getLectureManageCoursesService } from "../services/service-get-lecture-manage-courses";
import { lectureQueryKeys } from "../helpers/lecture-query-keys";

// Returns all courses available for teacher's lecture management.
export const useGetLectureManageCourses = () => {
  return useQuery({
    queryKey: lectureQueryKeys.manageCourses,
    queryFn: getLectureManageCoursesService,
  });
};
