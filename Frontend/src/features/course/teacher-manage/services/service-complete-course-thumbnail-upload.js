import { completeCourseThumbnailUploadApi } from '../api/api-complete-course-thumbnail-upload.js'

// Returns backend response after thumbnail key is saved in course.
export const completeCourseThumbnailUploadService = async ({
  courseId,
  thumbnailKey
}) => {
  const response = await completeCourseThumbnailUploadApi({
    courseId,
    thumbnailKey
  })

  return response.data
}
