import mongoose from 'mongoose'
import ApiError from '../../../../utils/api-error.js'
import { logger } from '../../../../utils/logger.js'

import Course from '../../models/course-model.js'
import { updateCourseById } from '../../repositories/update-course-repository.js'
import { clearPublishedCoursesCache } from '../../redis/published-courses-redis.js'
import { clearCourseDetailsCache } from '../../redis/course-details-redis.js'
import { normalizeCoursePayload } from '../../helpers/normalize-course-syllabus.js'
import { addPurgeLectureMediaJob } from '../../../lecture/jobs/purge-lecture-media-job.js'


export const updateCourseService = async (courseId, updatedData) => {
  if (!mongoose.Types.ObjectId.isValid(courseId)) {
    throw new ApiError(400, 'Invalid course id')
  }

  // - fetch the course in its current state before database save to retain previous syllabus details
  const oldCourse = await Course.findById(courseId)
  if (!oldCourse) {
    throw new ApiError(404, 'Invalid courseId')
  }

  const normalizedData = normalizeCoursePayload(updatedData)

  const updatedCourse = await updateCourseById(courseId, normalizedData)
  if (!updatedCourse) {
    throw new ApiError(404, 'Course not found')
  }

  // - loop through the old syllabus to collect all existing lesson IDs
  const oldLessonsIds = []
  if (oldCourse.syllabus) {
    oldCourse.syllabus.forEach(section => {
      if (section.lessons) {
        section.lessons.forEach(lesson => {
          oldLessonsIds.push(lesson._id.toString())
        })
      }
    })
  }

  // - loop through the updated syllabus payload to collect remaining lesson Ids.
  const newLessonIds = []
  if (normalizedData.syllabus) {
    normalizedData.syllabus.forEach(section => {
      if (section.lessons) {
        section.lessons.forEach(lesson => {
          if (lesson._id) {
            newLessonIds.push(lesson._id.toString())
          }
        })
      }
    })
  }

  //- compare the arrays to  identify which lesson IDs  were removed or deleted
  const deletedLessonIds = oldLessonsIds.filter(id => !newLessonIds.includes(id))

  // - trigger the background cleanup process if any deleted lesson Ids were found via BullMQ
  if(deletedLessonIds.length > 0){
    logger.info(`S3 Cleanup: Detected ${deletedLessonIds.length} deleted lessons. Queueing S3 cleanup...`)
    addPurgeLectureMediaJob({lessonIds: deletedLessonIds})
    .catch(error => {
       logger.error(`Failed to queue deleted lessons cleanup: ${error.message}`)
    })
  }


  await Promise.all([
    clearPublishedCoursesCache(),
    clearCourseDetailsCache(courseId)
  ])

  logger.info(
    `Invalidated course caches after update for courseId: ${courseId}`
  )

  return updatedCourse
}
