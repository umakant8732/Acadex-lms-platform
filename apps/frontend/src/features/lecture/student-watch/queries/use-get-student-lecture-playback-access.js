import { useMutation } from "@tanstack/react-query";

import { getStudentLecturePlaybackAccessService } from "../services/service-get-student-lecture-playback-access";

// Uses mutation because playback url must be requested fresh on demand.
export const useGetStudentLecturePlaybackAccess = () => {
  return useMutation({
    mutationFn: getStudentLecturePlaybackAccessService,
  });
};
