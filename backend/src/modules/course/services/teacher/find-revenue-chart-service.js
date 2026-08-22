import { findRevenueChart } from "../../repositories/find-revenue-chart-repository.js";

export const getRevenueChartService = async () => {
    const rawData = await findRevenueChart()

    //convert paise into rupees and format for frontend chart

    const chartData = rawData.map(item => ({
        month : item._id.month,
        year : item._id.year,
        revenue : item.totalRevenue / 100
    }))

    return {chartData}
}