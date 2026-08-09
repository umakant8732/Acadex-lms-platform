import api from "@/shared/services/axios";

export const updateCourseApi = async ({ courseId, courseData }) => {
  return await api.patch(`/course/update-course/${courseId}`, courseData);
};
