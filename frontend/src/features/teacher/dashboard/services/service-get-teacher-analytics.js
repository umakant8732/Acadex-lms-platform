import { getTeacherAnalyticsApi } from "../api/api-get-teacher-analytics";

export const getTeacherAnalyticsService = async () => {
  const response = await getTeacherAnalyticsApi();
  return response.data.data;
};
