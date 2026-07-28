import { createCourseApi } from "../api/api-course-create";

export const createCourseService = async (courseData) => {
  const response = await createCourseApi(courseData);
  return response.data;
};
