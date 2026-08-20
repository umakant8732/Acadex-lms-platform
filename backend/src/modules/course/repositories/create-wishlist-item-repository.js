import Wishlist from "../models/wishlist-model.js";

/**
 * Creates and saves a new wishlist mapping for a user and a course.
 * Purpose: Used to add a course to a student's wishlist.
 */
export const createWishlistItem = async (userId, courseId) => {
    return await Wishlist.create({ userId, courseId })
}