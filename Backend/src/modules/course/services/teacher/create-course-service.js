import { logger } from '../../../../utils/logger.js'
import { createCourse } from '../../repositories/create-course-repository.js'
import { clearPublishedCoursesCache } from '../../redis/published-courses-redis.js'
import { normalizeCoursePayload } from '../../helpers/normalize-course-syllabus.js'

export const createCourseService = async payload => {
  const normalizedPayload = normalizeCoursePayload(payload)
  const course = await createCourse(normalizedPayload)

  await clearPublishedCoursesCache()
  logger.info('Invalidated published courses cache after course creation')

  return course
}
