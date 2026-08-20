import Wishlist from "../models/wishlist-model.js";

/**
 * Removes a course from a student's wishlist.
 * Purpose: Used to remove/delete a wishlist mapping when a student untoggles a course.
 */
export const deleteWishlistItem = async (userId, courseId) => {
    return await Wishlist.deleteOne({ userId, courseId })
}