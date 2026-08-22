import api from "@/shared/services/axios";

export const getRevenueChartApi = async () => {
  return await api.get("/course/teacher/analytics/revenue-chart");
};
