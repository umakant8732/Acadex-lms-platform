import asyncHandler from '../../../../utils/async-handler.js'
import ApiResponse from '../../../../utils/api-response.js'

import { deleteCourseService } from '../../services/teacher/delete-course-service.js'

export const deleteCourse = asyncHandler(async (req, res) => {
  const { courseId } = req.params

  const deletedCourse = await deleteCourseService(courseId)

  return res
    .status(201)
    .json(new ApiResponse(200, 'Course deleted successfully', deletedCourse))
})
