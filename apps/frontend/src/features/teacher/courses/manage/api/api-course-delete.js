import api from "@/shared/services/axios";

export const deleteCourseApi = async (courseId) => {
  return await api.delete(`/course/delete-course/${courseId}`);
};
