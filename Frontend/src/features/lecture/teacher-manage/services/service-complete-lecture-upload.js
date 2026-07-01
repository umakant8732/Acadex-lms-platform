import { completeLectureUploadApi } from '../api/api-complete-lecture-upload.js'

//calls backend and  return clean complete upload data.

export const completeLectureUploadService = async payload => {
    const response = await completeLectureUploadApi(payload)
    return response.data.data.completeUpload
}
