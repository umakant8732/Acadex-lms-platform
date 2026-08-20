import Wishlist from "../models/wishlist-model.js";

/**
 * Checks if a specific course is already present in a student's wishlist.
 * Purpose: Used during wishlist toggle actions to decide whether to add or remove the course.
 */
export const findWishlistItem = async (userId, courseId) => {
    return await Wishlist.findOne({ userId, courseId })
}