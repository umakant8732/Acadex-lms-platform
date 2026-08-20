import { getStudentWishlistApi } from "../api/api-get-student-wishlist.js";

// Extracts wishlist payload from backend response.
export const getStudentWishlistService = async () => {
  const response = await getStudentWishlistApi();
  return response.data.data;
};
