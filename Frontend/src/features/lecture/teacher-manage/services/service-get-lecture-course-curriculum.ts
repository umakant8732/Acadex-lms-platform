import { getLectureCourseCurriculumApi } from '../api/api-get-lecture-course-curriculum.js'
import type { TeacherCourseCurriculum } from '../types/teacher-lecture-types'

// Extracts clean course syllabus details from backend response.
export const getLectureCourseCurriculumService = async (
  courseId?: string
): Promise<TeacherCourseCurriculum> => {
  const response = await getLectureCourseCurriculumApi(courseId)
  return response.data.data.curriculum
}
