import api from "../../../../shared/services/axios";

export const createCourseApi = async (courseData) => {
  return await api.post("/course/create-course", courseData);
};
