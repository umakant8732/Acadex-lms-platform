import asyncHandler from '../../../../utils/async-handler.js'
import ApiResponse from '../../../../utils/api-response.js'

import { completeThumbnailUploadService } from '../../services/teacher/complete-thumbnail-upload-service.js'

// Saves uploaded thumbnail key after browser finishes direct S3 upload.
export const completeThumbnailUpload = asyncHandler(async (req, res) => {
  const { courseId } = req.params

  const course = await completeThumbnailUploadService({
    courseId,
    ...req.body
  })

  return res.status(200).json(
    new ApiResponse(200, 'Course thumbnail saved successfully', {
      course
    })
  )
})
