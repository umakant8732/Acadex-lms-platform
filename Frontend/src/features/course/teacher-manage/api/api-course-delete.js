import api from '../../../../shared/services/axios.js'

export const deleteCourseApi = courseId => {
  return api.delete(`/course/delete-course/${courseId}`)
}

