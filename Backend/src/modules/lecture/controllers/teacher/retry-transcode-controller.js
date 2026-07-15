import asyncHandler from "../../../../utils/async-handler.js";
import ApiResponse from "../../../../utils/api-response.js";
import { retryTranscodeService } from "../../services/teacher/retry-transcode-service.js";

//controller to handle retry transcode request from frontend

export const retryTranscode = asyncHandler(async(req, res) => {
    const result = await retryTranscodeService(req.body)

    return res.status(200).json(new ApiResponse(200, 'Transcoding job retried successfully', result))

})