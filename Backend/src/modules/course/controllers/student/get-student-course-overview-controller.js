import asyncHandler from '../../../../utils/async-handler.js'
import ApiResponse from '../../../../utils/api-response.js'
import { getStudentCourseOverviewService } from '../../services/student/get-student-course-overview-service.js'

// Returns one student course overview with real enrollment access data.
export const getStudentCourseOverview = asyncHandler(async (req, res) => {
  const { courseId } = req.params
  const userId = req.user._id

  const course = await getStudentCourseOverviewService({
    userId,
    courseId
  })

  return res.status(200).json(
    new ApiResponse(
      200,
      'Student course overview fetched successfully',
      { course }
    )
  )
})
