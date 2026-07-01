import api from '../../../../shared/services/axios.js'

// Calls backend student library endpoint.
export const getStudentCourseLibraryApi = async () => {
  return await api.get('/course/student/courses')
}
