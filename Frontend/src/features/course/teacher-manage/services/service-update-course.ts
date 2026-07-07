import { updateCourseApi } from '../api/api-course-update.js'
import type { UpdateCoursePayload, UpdateCourseApiResponse } from '../api/api-course-update'

export const updateCourseService = async ({
  courseId,
  courseData
}: UpdateCoursePayload): Promise<UpdateCourseApiResponse> => {
  const response = await updateCourseApi({ courseId, courseData })
  return response.data
}
