import { togglePreviewLectureApi } from "../api/api-toggle-preview-lecture.js";
import type { TogglePreviewLecturePayload } from "../types/teacher-lecture-types";

//service execution for toggling preview status

export const togglePreviewLectureService = async (payload: TogglePreviewLecturePayload) => {
    const response = await togglePreviewLectureApi(payload)
    return response.data
}