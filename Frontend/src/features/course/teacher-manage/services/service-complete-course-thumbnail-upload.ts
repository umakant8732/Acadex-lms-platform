import { completeCourseThumbnailUploadApi } from '../api/api-complete-course-thumbnail-upload.js'
import type { CompleteCourseThumbnailUploadPayload, CompleteCourseThumbnailUploadApiResponse } from '../api/api-complete-course-thumbnail-upload'

// Returns backend response after thumbnail key is saved in course.
export const completeCourseThumbnailUploadService = async ({
  courseId,
  thumbnailKey
}: CompleteCourseThumbnailUploadPayload): Promise<CompleteCourseThumbnailUploadApiResponse> => {
  const response = await completeCourseThumbnailUploadApi({
    courseId,
    thumbnailKey
  })

  return response.data
}
