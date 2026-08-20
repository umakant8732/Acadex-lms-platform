import asyncHandler from "../../../../shared/utils/async-handler.js";
import ApiResponse from "../../../../shared/utils/api-response.js";
import ApiError from "../../../../shared/utils/api-error.js";
import Course from "../../models/course-model.js";
import { toggleStudentWishlistService } from "../../services/student/toggle-student-wishlist-service.js";



//handles student wishlist toggle request

export const toggleStudentWishlist = asyncHandler(
   async(req, res) => {
    const userId = req.user._id;
    const {courseId} = req.body

    if(!courseId) {
        throw new ApiError(400, 'Course ID is required')
    }

    //verify course exists before editing wishlist
    const courseExists = await Course.findById(courseId)

    if(!courseExists) {
        throw new ApiError(404, 'Course not found')
    }

    const result = await toggleStudentWishlistService(userId, courseId)

    return res.status(200).json(
        new ApiResponse(
            200,
            result.message,
            { isWishlisted: result.isWishlisted }
        )
    )
   }
)