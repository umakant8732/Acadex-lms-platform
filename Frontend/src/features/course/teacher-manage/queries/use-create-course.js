import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCourseService } from "../services/service-create-course";
import { courseQueryKeys } from "../helpers/course-query-keys";

export const useCreateCourse = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createCourseService,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: courseQueryKeys.manageCoursesRoot,
      });
    },
  });
};
