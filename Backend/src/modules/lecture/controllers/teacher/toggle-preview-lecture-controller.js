import asyncHandler from '../../../../utils/async-handler.js'
import ApiResponse from '../../../../utils/api-response.js'
import { togglePreviewLectureService } from '../../services/teacher/toggle-preview-lecture-service.js'

/**
 * Controller to handle lecture preview toggling requests.
 */
export const togglePreviewLecture = asyncHandler(async (req, res) => {
  const { lectureId, isPreview } = req.body

  // Execute database logic via service
  const updatedLecture = await togglePreviewLectureService({
    lectureId,
    isPreview
  })

  // Return standard success response
  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        'Lecture preview status updated successfully',
        updatedLecture
      )
    )
})