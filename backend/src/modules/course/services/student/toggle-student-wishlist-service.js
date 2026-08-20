import ApiError from "../../../../shared/utils/api-error.js";
import { createWishlistItem } from "../../repositories/create-wishlist-item-repository.js";
import { deleteWishlistItem } from "../../repositories/delete-wishlist-item-repository.js";


//toggle a course in the student's wishlist using atomic delete-first approach

export const toggleStudentWishlistService = async (userId, courseId) => {

    if(!courseId) {
        throw new ApiError(400, 'Course id is required')
    }

    //1. try to delete the record first

    const deleteResult = await deleteWishlistItem(userId, courseId)

    //2. if it was deleted, it means it already existed  (toggle off)
    if (deleteResult.deletedCount > 0) {
        return {
            isWishlisted: false,
            message: 'Course removed from wishlist successfully'
        }
    }

    //3. if nothing was deleted, it means it did not exists (toggle ON)
    await createWishlistItem(userId, courseId)

    return {
        isWishlisted: true,
        message: 'Course added to wishlisted successfully'
    }

}