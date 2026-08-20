import { toggleStudentWishlistApi } from "../api/api-toggle-student-wishlist.js";

export const toggleStudentWishlistService = async (courseId) => {
    const response = await toggleStudentWishlistApi(courseId)
    return response.data.data //returns {isWishlisted : true/false}
}