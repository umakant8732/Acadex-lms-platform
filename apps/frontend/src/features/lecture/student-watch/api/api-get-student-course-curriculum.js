import api from "../../../../shared/services/axios";

// Calls backend api to load student course curriculum.
export const getStudentCourseCurriculumApi = async (courseId) => {
  return api.get(`/lecture/student/courses/${courseId}/curriculum`);
};
