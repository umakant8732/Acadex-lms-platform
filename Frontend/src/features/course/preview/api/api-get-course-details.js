import api from '../../../../shared/services/axios.js'

export const getCourseDetailsApi = async courseId => {
  return await api.get(`/course/get-course-details/${courseId}`)
}
