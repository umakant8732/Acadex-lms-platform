import { useQuery } from "@tanstack/react-query";
import { getTeacherAnalyticsService } from "../services/service-get-teacher-analytics";

export const useGetTeacherAnalytics = () => {
  return useQuery({
    queryKey: ["teacher-analytics"],
    queryFn: getTeacherAnalyticsService,
  });
};
