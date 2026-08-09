import asyncHandler from '../../../../shared/utils/async-handler.js'
import ApiResponse from '../../../../shared/utils/api-response.js'
import { getPublishedCoursesService } from '../../services/public/get-published-courses-service.js'

export const getPublishedCourses = asyncHandler(async (req, res) => {
  const courses = await getPublishedCoursesService()

  return res
    .status(200)
    .json(new ApiResponse(200, 'Courses fetched successfully', courses))
})
