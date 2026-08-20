import api from "@/shared/services/axios";

// Calls backend student wishlist endpoint.
export const getStudentWishlistApi = async () => {
  return api.get("/course/student/wishlist");
};
