import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCourseService } from "../services/service-delete-course";
import { courseQueryKeys } from "../helpers/course-query-keys";

export const useDeleteCourse = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteCourseService,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: courseQueryKeys.manageCoursesRoot,
      });
    },
  });
};
