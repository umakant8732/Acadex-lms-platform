import asyncHandler from "../../../../shared/utils/async-handler.js";
import ApiResponse from "../../../../shared/utils/api-response.js";
import { getTeacherAnalyticsService } from "../../services/teacher/get-teacher-analytics-service.js";


//controller to trigger aggregation and print raw logs in console for teacher dashboard

export const getTeacherAnalytics = asyncHandler(
    async (req, res) => {
        const rawStats = await getTeacherAnalyticsService()

        return res.status(200).json(
            new ApiResponse(
                200,
                "Raw overview stats fetched successfully",
                rawStats
            )
        )

    }
)
