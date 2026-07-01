import asyncHandler from '../../../../utils/async-handler.js'
import ApiResponse from '../../../../utils/api-response.js'

import { createThumbnailPresignedUploadUrlService } from '../../services/teacher/create-thumbnail-presigned-upload-url-service.js'

// Gives teacher temporary upload access for one course thumbnail file.
export const createThumbnailPresignedUploadUrl = asyncHandler(async (req, res) => {
  const { courseId } = req.params

  const presignedThumbnailUpload =
    await createThumbnailPresignedUploadUrlService({
      courseId,
      ...req.body
    })

  return res.status(201).json(
    new ApiResponse(201, 'Course thumbnail presigned upload URL created successfully', {
      presignedThumbnailUpload
    })
  )
})
