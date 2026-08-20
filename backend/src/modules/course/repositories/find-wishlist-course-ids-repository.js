import Wishlist from "../models/wishlist-model.js";

/**
 * Retrieves the flat list of all course IDs wishlisted by a specific student.
 * Purpose: Used to quickly determine which course cards on the main home/library grid should show as wishlisted (heart icon filled).
 */
export const findWishlistCourseIds = async userId => {
    const items = await Wishlist.find({ userId }).select('courseId')
    return items.map(item => String(item.courseId))
}