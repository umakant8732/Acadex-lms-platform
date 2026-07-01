import redisClient from '../../../config/redis.js'
import { logger } from '../../../utils/logger.js'

const COURSE_DETAILS_KEY = 'course:details'

const CACHE_EXPIRY = 60 * 5

export const getCourseDetailsFromCache = async courseId => {
  const cachedCourse = await redisClient.get(
    `${COURSE_DETAILS_KEY}:${courseId}`
  )

  if (!cachedCourse) {
    return null
  }

  return JSON.parse(cachedCourse)
}

export const saveCourseDetailsToCache = async (courseId, course) => {
  await redisClient.set(
    `${COURSE_DETAILS_KEY}:${courseId}`,
    JSON.stringify(course),
    {
      EX: CACHE_EXPIRY
    }
  )
}

export const clearCourseDetailsCache = async courseId => {
  await redisClient.del(`${COURSE_DETAILS_KEY}:${courseId}`)
}
