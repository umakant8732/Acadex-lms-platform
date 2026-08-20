
import Wishlist from "../models/wishlist-model.js";

/**
 * Retrieves all wishlist records for a student and populates the nested course document details.
 * Purpose: Used on the student's wishlist page to show the full cards of their saved courses.
 */
export const findStudentWishlistCourses = async userId => {
    return await Wishlist
        .find({ userId })
        .populate({
            path: 'courseId',
            match: { isPublished: true }
        })
}