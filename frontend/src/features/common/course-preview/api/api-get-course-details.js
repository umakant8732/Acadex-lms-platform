import api from "@/shared/services/axios";

// Calls public course-details endpoint by course id.
export const getCourseDetailsApi = async (courseId) => {
  return api.get(`/course/get-course-details/${courseId}`);
};
