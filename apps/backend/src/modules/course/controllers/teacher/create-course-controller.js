import asyncHandler from '../../../../shared/utils/async-handler.js'
import ApiResponse from '../../../../shared/utils/api-response.js'
import { createCourseService } from '../../services/teacher/create-course-service.js'

export const createCourse = asyncHandler(async (req, res) => {
  const course = await createCourseService(req.body)
  return res.status(201).json(new ApiResponse(201, 'Course created successfully', course))
})
