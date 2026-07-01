import asyncHandler from '../../../../utils/async-handler.js'
import ApiResponse from '../../../../utils/api-response.js'
import { getStudentCourseLibraryService } from '../../services/student/get-student-course-library-service.js'

// Returns student library courses with real enrollment access data.
export const getStudentCourseLibrary = asyncHandler(async (req, res) => {
  const userId = req.user._id
  const courses = await getStudentCourseLibraryService(userId)

  return res.status(200).json(
    new ApiResponse(
      200,
      'Student course library fetched successfully',
      { courses }
    )
  )
})
