import { useMutation } from "@tanstack/react-query";
import { createCourseThumbnailPresignedUploadUrlService } from "../services/service-create-course-thumbnail-presigned-upload-url";

export const useCreateCourseThumbnailPresignedUploadUrl = () => {
  return useMutation({
    mutationFn: createCourseThumbnailPresignedUploadUrlService,
  });
};
