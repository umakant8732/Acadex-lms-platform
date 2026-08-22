import { useQuery } from "@tanstack/react-query";
import { getRevenueChartService } from "../services/service-get-revenue-chart";

export const useGetRevenueChart = () => {
  return useQuery({
    queryKey: ["teacher-revenue-chart"],
    queryFn: getRevenueChartService,
  });
};
