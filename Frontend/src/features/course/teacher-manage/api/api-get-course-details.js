import api from '../../../../shared/services/axios.js'

export const getCourseDetailsApi = courseId => {
    return api.get(`/course/get-course-details/${courseId}`)
}
