import api from '../../../../shared/services/axios.js'
import type { TeacherCourseCurriculum } from '../types/teacher-lecture-types'

export interface GetLectureCourseCurriculumApiResponse {
  success: boolean
  message: string
  data: {
    curriculum: TeacherCourseCurriculum
  }
}

// Calls backend API that returns one course syllabus with lecture upload status
export const getLectureCourseCurriculumApi = async (courseId?: string) => {
  return await api.get<GetLectureCourseCurriculumApiResponse>(
    `/lecture/manage-courses/${courseId}/curriculum`
  )
}
