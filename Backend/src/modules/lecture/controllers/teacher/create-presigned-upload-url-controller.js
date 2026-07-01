import asyncHandler from '../../../../utils/async-handler.js'
import ApiResponse from '../../../../utils/api-response.js'

import { createPresignedUploadUrlService } from '../../services/teacher/create-presigned-upload-url-service.js'

// Handles the teacher request to create a temporary S3 presigned upload URL.
export const createPresignedUploadUrl = asyncHandler(async (req, res) => {
  const presignedUploadSession = await createPresignedUploadUrlService(req.body)

  return res
    .status(201)
    .json(
      new ApiResponse(201, 'Lecture presigned upload URL created successfully', {
        presignedUploadSession
      })
    )
})
