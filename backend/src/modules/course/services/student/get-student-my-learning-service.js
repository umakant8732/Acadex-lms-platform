import { findActiveEnrollmentsByUser } from '../../../enrollment/repositories/find-active-enrollment-by-user-repository.js'

import { buildStudentCourseAccess } from '../../helpers/build-student-course-access.js'
import { mapStudentCourseCard } from '../../helpers/map-student-course-card.js'
import { serializeCourseThumbnail } from '../../helpers/serialize-course-thumbnail.js'
import { findPublishedCoursesByIds } from '../../repositories/find-published-courses-by-ids-repository.js'

const emptyCoursePreview = {
  hasPreviewLessons: false,
  previewLessonsCount: 0,
  readyPreviewLessonsCount: 0,
  firstPreviewLessonId: null
}

// Gets only enrolled published courses for the student my learning page.
export const getStudentMyLearningService = async userId => {
  const enrollments = await findActiveEnrollmentsByUser(userId)

  if (!enrollments.length) {
    return {
      courses: [],
      totalEnrolled: 0
    }
  }

  const courseIds = enrollments.map(enrollment => enrollment.courseId)
  const publishedCourses = await findPublishedCoursesByIds(courseIds)

  const courseById = new Map(
    publishedCourses.map(course => [
      String(course._id),
      serializeCourseThumbnail(course)
    ])
  )

  const courses = enrollments
    .map(enrollment => {
      const course = courseById.get(String(enrollment.courseId))

      if (!course) {
        return null
      }

      const access = buildStudentCourseAccess({ enrollment })
      const courseCard = mapStudentCourseCard(course, access, emptyCoursePreview)

      return {
        ...courseCard,
        enrolledAt: enrollment.enrolledAt
      }
    })
    .filter(Boolean)

  return {
    courses,
    totalEnrolled: courses.length
  }
}
