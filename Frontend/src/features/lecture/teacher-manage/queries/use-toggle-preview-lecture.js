import { useMutation, useQueryClient } from "@tanstack/react-query";
import { togglePreviewLectureService } from "../services/service-toggle-preview-lecture";
import { lectureQueryKeys } from "../helpers/lecture-query-keys";

//mutation hook to handle preview toggle request and refresh teacher curriculum query

export const useTogglePreviewLecture = (courseId) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: togglePreviewLectureService,
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: lectureQueryKeys.courseCurriculum(courseId),
      });
    },
  });
};
