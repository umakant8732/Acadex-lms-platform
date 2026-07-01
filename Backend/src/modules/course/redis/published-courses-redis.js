import redisClient from "../../../config/redis.js";
import { logger } from "../../../utils/logger.js";

const PUBLISHED_COURSES_KEY = 'courses:published'

const CACHE_EXPIRY = 60 * 5

export const getPublishedCoursesFromCache = async () => {
    const cachedCourses = await redisClient.get(PUBLISHED_COURSES_KEY)
    if(!cachedCourses) {
        return null
    }

    return JSON.parse(cachedCourses)
}

export const savePublishedCoursesToCache = async courses => {
    await redisClient.set(PUBLISHED_COURSES_KEY, JSON.stringify(courses), {
        EX : CACHE_EXPIRY
    })
}


export const clearPublishedCoursesCache = async () => {
    await redisClient.del(PUBLISHED_COURSES_KEY)
}