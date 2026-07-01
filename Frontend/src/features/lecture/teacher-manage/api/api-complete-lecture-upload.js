import api from "../../../../shared/services/axios.js";

//calls backend after video file is uploaded to s3

export const completeLectureUploadApi = async payload => {
    return await api.post('/lecture/uploads/complete', payload)
}
