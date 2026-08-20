import api from "@/shared/services/axios";

//calls backend student wishlist toggle endpoint

export const toggleStudentWishlistApi = async (courseId) => {
    return await api.post("/course/student/wishlist/toggle", {
        courseId
    })
}

