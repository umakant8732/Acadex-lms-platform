import { findPublishedCourses } from '../../repositories/find-published-courses-repository.js'
import { logger } from '../../../../utils/logger.js'

import {
  getPublishedCoursesFromCache,
  savePublishedCoursesToCache
} from '../../redis/published-courses-redis.js'
import { serializeCourseThumbnail } from '../../helpers/serialize-course-thumbnail.js'

export const getPublishedCoursesService = async () => {
  const cachedCourses = await getPublishedCoursesFromCache()

  if (cachedCourses) {
    logger.info('Getting published courses data from cache')
    return cachedCourses
  }

  logger.info('Getting published courses data from database')
  const courses = await findPublishedCourses()

  const serializedCourses = courses.map(serializeCourseThumbnail)

  await savePublishedCoursesToCache(serializedCourses)

  return serializedCourses
}
