import asyncHandler from '../../../../utils/async-handler.js'
import ApiResponse from '../../../../utils/api-response.js'
import { getCourseDetailsService } from '../../services/public/get-course-details-service.js'

export const getCourseDetails = asyncHandler(
  async (req, res) => {
    const { courseId } = req.params

    const course = await getCourseDetailsService(courseId)

    return res.status(200).json(
      new ApiResponse(
        200,
        'Course details fetched successfully',
        course
      )
    )
  }
)

