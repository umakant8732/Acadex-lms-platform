import asyncHandler from '../../../../utils/async-handler.js'
import ApiResponse from '../../../../utils/api-response.js'

import { getManageCoursesService } from '../../services/teacher/get-manage-courses-service.js'

export const getManageCourses = asyncHandler(async (req, res) => {
  const manageCourseResult = await getManageCoursesService(req.validatedQuery)

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        'Manage courses fetched successfully',
        manageCourseResult
      )
    )
})
