import asyncHandler from '../../../../utils/async-handler.js'
import ApiResponse from '../../../../utils/api-response.js'

import { changePublishStatusService } from '../../services/teacher/change-publish-status-service.js'

export const changePublishStatus = asyncHandler(async (req, res) => {
  const { courseId } = req.params
  const { isPublished } = req.body

  const updateCourse = await changePublishStatusService(courseId, isPublished)

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        updateCourse.isPublished
          ? 'Course published successfully'
          : 'Course unpublished successfully',
        updateCourse
      )
    )
})
