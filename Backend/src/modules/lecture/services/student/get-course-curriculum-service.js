import mongoose from 'mongoose'

import ApiError from '../../../../utils/api-error.js'

import { findActiveEnrollmentByUserAndCourse } from '../../../enrollment/repositories/find-active-enrollment-repository.js'

import { buildStudentCourseAccess } from '../../../course/helpers/build-student-course-access.js'
import { buildCourseThumbnailUrl } from '../../../course/helpers/build-course-thumbnail-url.js'
import { LECTURE_STATUS } from '../../constants/lecture-constants.js'
import { findCourseCurriculumById } from '../../repositories/find-course-curriculum-repository.js'
import { findLectureByCourse } from '../../repositories/find-lectures-by-course-repository.js'

// Builds student watch page curriculum data with real student access.
export const getCourseCurriculumService = async ({
  userId,
  courseId
}) => {
  if (!mongoose.Types.ObjectId.isValid(courseId)) {
    throw new ApiError(400, 'Invalid course id')
  }

  const course = await findCourseCurriculumById(courseId)

  // Student should not access unpublished courses.
  if (!course || !course.isPublished) {
    throw new ApiError(404, 'Course not found')
  }

  const enrollment = await findActiveEnrollmentByUserAndCourse(
    userId,
    courseId
  )

  const access = buildStudentCourseAccess({ enrollment })
  const lectures = await findLectureByCourse(courseId)

  // Makes lesson to lecture lookup fast while syllabus is being mapped.
  const lectureByLessonId = new Map(
    lectures.map(lecture => [String(lecture.lessonId), lecture])
  )

  const sections = (course.syllabus ?? []).map(section => ({
    _id: section._id,
    sectionTitle: section.sectionTitle,
    order: section.order,

    lessons: (section.lessons ?? []).map(lesson => {
      const lecture = lectureByLessonId.get(String(lesson._id))

      return {
        _id: lesson._id,
        title: lesson.title,
        order: lesson.order,

        lecture: lecture
          ? {
              _id: lecture._id,
              status: lecture.status,
              isPreview: lecture.isPreview,
              isPlayable: lecture.status === LECTURE_STATUS.READY
            }
          : null
      }
    })
  }))

  return {
    course: {
      _id: course._id,
      title: course.title,
      subtitle: course.subtitle,
      category: course.category,
      level: course.level,
      thumbnail: buildCourseThumbnailUrl(course.thumbnailKey),
      access
    },
    sections
  }
}
