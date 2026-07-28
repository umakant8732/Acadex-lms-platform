import { getStudentCourseCurriculumApi } from "../api/api-get-student-course-curriculum";

// Keeps only needed curriculum payload for UI side.
export const getStudentCourseCurriculumService = async (courseId) => {
  const response = await getStudentCourseCurriculumApi(courseId);
  return response.data.data.curriculum;
};
