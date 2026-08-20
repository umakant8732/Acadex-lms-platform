import asyncHandler from '../../../../shared/utils/async-handler.js'
import ApiResponse from '../../../../shared/utils/api-response.js'
import { getStudentWishlistService } from '../../services/student/get-student-wishlist-service.js'

// Returns all wishlisted courses for the authenticated student.
export const getStudentWishlist = asyncHandler(async (req, res) => {
  const userId = req.user._id
  const courses = await getStudentWishlistService(userId)

  return res.status(200).json(
    new ApiResponse(
      200,
      'Student wishlist courses fetched successfully',
      { courses }
    )
  )
})
