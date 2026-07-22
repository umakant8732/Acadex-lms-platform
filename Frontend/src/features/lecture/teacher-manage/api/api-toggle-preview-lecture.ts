import api from '../../../../shared/services/axios.js'
import type { TogglePreviewLecturePayload } from '../types/teacher-lecture-types'

export interface TogglePreviewLectureApiResponse {
    success : boolean,
    message: string,
    data : any
}

//calls backend to toggle preview status of a lecture

export const togglePreviewLectureApi = async (payload: TogglePreviewLecturePayload) => {
    return await api.patch<TogglePreviewLectureApiResponse>('/lecture/preview', payload)
}