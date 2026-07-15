import api from '../../../../shared/services/axios.js'

export interface RetryLectureTranscodePayload {
    lectureId: string
}

export interface RetryLectureTranscodeApiResponse {
    success : boolean,
    message : string,
    data : any
}

//calls backend to retry transcoding for a failed lecture video

export const retryLectureTranscodeApi = async (payload: RetryLectureTranscodePayload) => {
    return await api.post<RetryLectureTranscodeApiResponse>('/lecture/upload/retry', payload)
}