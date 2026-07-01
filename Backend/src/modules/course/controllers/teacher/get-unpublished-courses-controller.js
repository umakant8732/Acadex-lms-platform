import asyncHandler from '../../../../utils/async-handler.js'
import ApiResponse from '../../../../utils/api-response.js'

import { getUnpublishedCoursesService } from '../../services/teacher/get-unpublished-courses-service.js'

export const getUnpublishedCourses = asyncHandler(
  async (req, res) => {
    const courses = await getUnpublishedCoursesService()

    return res
      .status(200)
      .json(new ApiResponse(
        200,
        'Courses fetched successfully',
        courses
      ))
  }
)
