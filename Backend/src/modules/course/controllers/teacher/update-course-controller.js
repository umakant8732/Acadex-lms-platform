import ApiResponse from '../../../../utils/api-response.js'
import asyncHandler from '../../../../utils/async-handler.js'

import { updateCourseService } from '../../services/teacher/update-course-service.js'

export const updateCourse = asyncHandler(async (req, res) => {
  const { courseId } = req.params

  const updatedCourse = await updateCourseService(courseId, req.body)

  return res
    .status(201)
    .json(new ApiResponse(201, 'Course updated successfully', updatedCourse))
})
