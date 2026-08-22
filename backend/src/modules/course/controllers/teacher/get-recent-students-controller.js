import ApiResponse from '../../../../shared/utils/api-response.js'
import asyncHandler from '../../../../shared/utils/async-handler.js'
import { getRecentStudentsService } from '../../services/teacher/get-recent-students-service.js'

export const getRecentStudents = asyncHandler(async (req, res) => {
  const limit = req.query.limit ? parseInt(req.query.limit, 10) : 5
  const data = await getRecentStudentsService(limit)

  return res
    .status(200)
    .json(new ApiResponse(200, 'Recent enrolled students fetched successfully', data))
})
