import { useMutation } from "@tanstack/react-query";
import { createLecturePresignedUploadUrlService } from "../services/service-create-lecture-presigned-upload-url";

// Fetches an S3 pre-signed upload URL for streaming uploads.
export const useCreateLecturePresignedUploadUrl = () => {
  return useMutation({
    mutationFn: createLecturePresignedUploadUrlService,
  });
};
