import api from '../../../../shared/services/axios.js'

export const updateCourseApi = ({courseId, courseData}) => {
    return api.patch(`/course/update-course/${courseId}`, courseData)
}
