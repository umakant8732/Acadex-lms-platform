import asyncHandler from '../../../../utils/async-handler.js'
import ApiResponse from '../../../../utils/api-response.js'

import { getLectureManageCoursesService } from '../../services/teacher/get-manage-courses-service.js'

//handles the teacher request for course cards on the lecture manage page.

export const getLectureManageCourses = asyncHandler(async (req, res) => {
  const courses = await getLectureManageCoursesService()

  return res
    .status(200)
    .json(
      new ApiResponse(200, 'Lecture manage courses fetched successfully', {
        courses
      })
    )
})
