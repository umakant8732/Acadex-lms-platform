import { getPublishedCoursesApi } from "../api/api-get-published-courses";

// Extracts only course list from backend response.
export const getPublishedCoursesService = async () => {
  const response = await getPublishedCoursesApi();
  return response.data.data;
};
