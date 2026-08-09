import { useMutation } from "@tanstack/react-query";
import { completeLectureUploadService } from "../services/service-complete-lecture-upload";

// Notifies backend that S3 video file upload has completed.
export const useCompleteLectureUpload = () => {
  return useMutation({
    mutationFn: completeLectureUploadService,
  });
};
