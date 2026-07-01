import { createCourseThumbnailPresignedUploadUrlApi } from '../api/api-create-course-thumbnail-presigned-upload-url.js'

// Returns only signed upload payload used by frontend.
export const createCourseThumbnailPresignedUploadUrlService = async ({
  courseId,
  fileName,
  mimeType,
  size
}) => {
  const response = await createCourseThumbnailPresignedUploadUrlApi({
    courseId,
    payload: {
      fileName,
      mimeType,
      size
    }
  })

  return response.data.data.presignedThumbnailUpload
}
