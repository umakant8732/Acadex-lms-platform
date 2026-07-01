import ApiResponse from '../../../../utils/api-response.js'
import asyncHandler from '../../../../utils/async-handler.js'
import { getCourseCurriculumService } from '../../services/teacher/get-course-curriculum-service.js'

export const getCourseCurriculum = asyncHandler(async (req, res) => {
  const { courseId } = req.params

  const curriculum = await getCourseCurriculumService(courseId)

  return res
    .status(200)
    .json(
      new ApiResponse(200, 'Course lecture curriculum fetched successfully', {
        curriculum
      })
    )
})
