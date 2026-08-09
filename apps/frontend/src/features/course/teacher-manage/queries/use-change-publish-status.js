import { useMutation, useQueryClient } from "@tanstack/react-query";
import { changePublishStatusService } from "../services/service-change-publish-status";
import { courseQueryKeys } from "../helpers/course-query-keys";

export const useChangePublishStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: changePublishStatusService,
    onSuccess: () => {
      // Invalidate manage courses list so isPublished refreshes and button text toggles.
      queryClient.invalidateQueries({
        queryKey: courseQueryKeys.manageCoursesRoot,
      });
    },
  });
};
