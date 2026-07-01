import asyncHandler from '../../../../utils/async-handler.js'
import ApiResponse from '../../../../utils/api-response.js'

import { completeUploadService } from '../../services/teacher/complete-upload-service.js'


//handles request after frontend uploaded original video to s3

export const completeUpload = asyncHandler(async (req, res) => {
  const completeUpload = await completeUploadService(req.body)

  return res
    .status(200)
    .json(
      new ApiResponse(200, 'Lecture upload complete successfully', {
        completeUpload
      })
    )
})
