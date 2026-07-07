import api from '../../../../shared/services/axios.js'

export interface DeleteCourseApiResponse {
  success: boolean
  message: string
}

export const deleteCourseApi = async (courseId: string) => {
  return await api.delete<DeleteCourseApiResponse>(`/course/delete-course/${courseId}`)
}
