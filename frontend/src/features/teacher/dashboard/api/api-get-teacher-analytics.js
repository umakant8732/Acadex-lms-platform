import api from "@/shared/services/axios";

export const getTeacherAnalyticsApi = async () => {
  return await api.get("/course/teacher/analytics");
};
