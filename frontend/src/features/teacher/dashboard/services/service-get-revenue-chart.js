import { getRevenueChartApi } from "../api/api-get-revenue-chart";

// Month name lookup — MongoDB returns month as integer (1=Jan, 12=Dec)
const MONTH_NAMES = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
                     "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const formatDisplay = (revenue) => {
  if (revenue >= 100000) return `Rs.${(revenue / 100000).toFixed(1)}L`;
  if (revenue >= 1000)   return `Rs.${(revenue / 1000).toFixed(1)}K`;
  return `Rs.${revenue}`;
};

export const getRevenueChartService = async () => {
  const response = await getRevenueChartApi();
  const { chartData } = response.data.data;

  // Transform raw { month, year, revenue } into chart-ready format
  const formattedData = chartData.map((item) => ({
    month: MONTH_NAMES[item.month - 1],  // Convert int to "Jan", "Feb"...
    amount: item.revenue,
    display: formatDisplay(item.revenue),
  }));

  return formattedData;
};
