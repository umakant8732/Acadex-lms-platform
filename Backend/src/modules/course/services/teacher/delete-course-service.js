import mongoose from 'mongoose'
import ApiError from '../../../../utils/api-error.js'
import { logger } from '../../../../utils/logger.js'
import { deleteCourseById } from '../../repositories/delete-course-repository.js'
import { clearPublishedCoursesCache } from '../../redis/published-courses-redis.js'
import { clearCourseDetailsCache } from '../../redis/course-details-redis.js'
import { cleanupLectureAssets } from '../../../lecture/services/teacher/cleanup-lecture-service.js'


export const deleteCourseService = async (courseId) => {
    if (!mongoose.Types.ObjectId.isValid(courseId)) {
        throw new ApiError(400, 'Invalid course id')
    }

    const course = await deleteCourseById(courseId)
    if(!course){
        throw new ApiError(
            404,
            'Course not found'
        )
    }

    //background cleanup call
    cleanupLectureAssets({courseId}).catch(error => {
        logger.info(`Failed to clean up lecture assets on course delete for courseId=${courseId}:${error.message}`)
    })

    await Promise.all([
        clearPublishedCoursesCache(),
        clearCourseDetailsCache(courseId)
    ])

    logger.info(`Invalidated course caches after delete for courseId: ${courseId}`)

    return course
}
