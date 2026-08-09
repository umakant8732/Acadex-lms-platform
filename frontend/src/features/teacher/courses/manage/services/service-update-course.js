import { updateCourseApi } from "../api/api-course-update";

export const updateCourseService = async ({ courseId, courseData }) => {
  const response = await updateCourseApi({ courseId, courseData });
  return response.data;
};
