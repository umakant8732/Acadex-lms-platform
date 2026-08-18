import asyncHandler from '../../../../shared/utils/async-handler.js'
import ApiResponse from '../../../../shared/utils/api-response.js'
import { getStudentMyLearningService } from '../../services/student/get-student-my-learning-service.js'

// Returns enrolled courses for the student my learning page.
export const getStudentMyLearning = asyncHandler(async (req, res) => {
  const userId = req.user._id
  const myLearning = await getStudentMyLearningService(userId)

  return res.status(200).json(
    new ApiResponse(
      200,
      'Student my learning fetched successfully',
      myLearning
    )
  )
})
