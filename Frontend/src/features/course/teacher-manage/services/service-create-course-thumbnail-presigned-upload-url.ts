import { createCourseThumbnailPresignedUploadUrlApi } from '../api/api-create-course-thumbnail-presigned-upload-url.js'
import type {
  CreateCourseThumbnailPresignedUploadUrlPayload,
  ThumbnailUploadSessionResult
} from '../types/teacher-course-types'

export interface CreateCourseThumbnailPresignedUploadUrlServiceArgs {
  courseId: string
  fileName: string
  mimeType: string
  size: number
}

// Returns only signed upload payload used by frontend.
export const createCourseThumbnailPresignedUploadUrlService = async ({
  courseId,
  fileName,
  mimeType,
  size
}: CreateCourseThumbnailPresignedUploadUrlServiceArgs): Promise<ThumbnailUploadSessionResult> => {
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
