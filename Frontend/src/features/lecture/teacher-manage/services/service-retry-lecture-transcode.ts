import { retryLectureTranscodeApi } from "../api/api-retry-lecture-transcode.js";

import type { RetryLectureTranscodePayload } from "../api/api-retry-lecture-transcode";

//api execution for retrying transcoding

export const retryLectureTranscodeService = async (payload: RetryLectureTranscodePayload) => {
    const response = await retryLectureTranscodeApi(payload)
    return response.data
}



