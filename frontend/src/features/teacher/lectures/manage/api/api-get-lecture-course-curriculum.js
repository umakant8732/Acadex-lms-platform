import api from "@/shared/services/axios";

// Calls backend API that returns one course syllabus with lecture upload status
export const getLectureCourseCurriculumApi = async (courseId) => {
  return await api.get(`/lecture/manage-courses/${courseId}/curriculum`);
};
