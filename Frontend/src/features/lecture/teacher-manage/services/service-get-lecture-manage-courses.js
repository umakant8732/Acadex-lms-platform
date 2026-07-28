import { getLectureManageCoursesApi } from "../api/api-get-lecture-manage-courses";

// Extracts clean list of courses details from backend response.
export const getLectureManageCoursesService = async () => {
  const response = await getLectureManageCoursesApi();
  return response.data.data.courses;
};
