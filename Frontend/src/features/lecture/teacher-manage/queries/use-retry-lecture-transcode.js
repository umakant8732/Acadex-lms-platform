import { useMutation, useQueryClient } from "@tanstack/react-query";
import { retryLectureTranscodeService } from "../services/service-retry-lecture-transcode";

import { lectureQueryKeys } from "../helpers/lecture-query-keys";

//mutation hook to handle transcode retry request and invalidate queries an success

export const useRetryLectureTranscode = (courseId) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: retryLectureTranscodeService,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: lectureQueryKeys.courseCurriculum(courseId),
      });
    },
  });
};
