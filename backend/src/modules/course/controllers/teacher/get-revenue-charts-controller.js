import ApiResponse from "../../../../shared/utils/api-response.js";
import asyncHandler from "../../../../shared/utils/async-handler.js";
import { getRevenueChartService } from "../../services/teacher/find-revenue-chart-service.js";


export const getRevenuChart = asyncHandler(
    async(req, res) => {
        const data = await getRevenueChartService()

        return res.status(200).json((
            new ApiResponse(
                200,
                "Revenue chart fetched",
                data
            )
        ))
    }
)