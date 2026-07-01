import ApiResponse from '../../../../utils/api-response.js'
import asyncHandler from '../../../../utils/async-handler.js'

import { getCourseCurriculumService } from '../../services/student/get-course-curriculum-service.js'

// Returns student course curriculum with real enrollment access data.
export const getCourseCurriculum = asyncHandler(async (req, res) => {
  const { courseId } = req.params
  const userId = req.user._id

  const curriculum = await getCourseCurriculumService({
    userId,
    courseId
  })

  return res.status(200).json(
    new ApiResponse(
      200,
      'Student course curriculum fetched successfully',
      { curriculum }
    )
  )
})
