import api from '../../../../shared/services/axios.js'

export const createCourseApi = courseData => {
    return api.post('/course/create-course', courseData)
}
