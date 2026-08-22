import ApiResponse from '../../../../shared/utils/api-response.js'
import asyncHandler from '../../../../shared/utils/async-handler.js'
import { getTopPerformingCoursesService } from '../../services/teacher/get-top-performing-courses-service.js'

export const getTopPerformingCourses = asyncHandler(async (req, res) => {
  const limit = req.query.limit ? parseInt(req.query.limit, 10) : 5
  const data = await getTopPerformingCoursesService(limit)

  return res
    .status(200)
    .json(new ApiResponse(200, 'Top performing courses fetched successfully', data))
})
