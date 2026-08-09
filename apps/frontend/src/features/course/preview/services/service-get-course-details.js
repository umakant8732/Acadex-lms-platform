import { getCourseDetailsApi } from "../api/api-get-course-details";

// Extracts course details payload from backend response.
export const getCourseDetailsService = async (courseId) => {
  const response = await getCourseDetailsApi(courseId);
  return response.data.data;
};
