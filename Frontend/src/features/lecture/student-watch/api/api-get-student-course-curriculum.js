import api from '../../../../shared/services/axios.js'

// Calls backend api to load student course curriculum.
export const getStudentCourseCurriculumApi = async courseId => {
  return await api.get(`/lecture/student/courses/${courseId}/curriculum`)
}
