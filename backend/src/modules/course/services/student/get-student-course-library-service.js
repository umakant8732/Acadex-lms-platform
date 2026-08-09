import { LECTURE_STATUS } from '../../../lecture/constants/lecture-constants.js'
import { findLecturesByCourseIds } from '../../../lecture/repositories/find-lectures-by-course-ids-repository.js'
import { findActiveEnrollmentsByUserAndCourseIds } from '../../../enrollment/repositories/find-active-enrollments-by-user-and-course-ids-repository.js'

import { buildStudentCourseAccess } from '../../helpers/build-student-course-access.js'
import { mapStudentCourseCard } from '../../helpers/map-student-course-card.js'
import { getPublishedCoursesService } from '../public/get-published-courses-service.js'

// Builds small preview summary for one course card.
const buildCoursePreviewSummary = lectures => {
  const previewLectures = lectures.filter(lecture => lecture.isPreview)
  const readyPreviewLectures = previewLectures.filter(
    lecture => lecture.status === LECTURE_STATUS.READY
  )

  return {
    hasPreviewLessons: previewLectures.length > 0,
    previewLessonsCount: previewLectures.length,
    readyPreviewLessonsCount: readyPreviewLectures.length,
    firstPreviewLessonId: readyPreviewLectures[0]
      ? String(readyPreviewLectures[0].lessonId)
      : null
  }
}

// Gets published courses and joins real student access in one pass.
export const getStudentCourseLibraryService = async userId => {
  const courses = await getPublishedCoursesService()
  const courseIds = courses.map(course => course._id)

  const [enrollments, lectures] = await Promise.all([
    findActiveEnrollmentsByUserAndCourseIds(userId, courseIds),
    findLecturesByCourseIds(courseIds)
  ])

  // Makes purchased lookup fast while cards are being shaped.
  const enrollmentByCourseId = new Map(
    enrollments.map(enrollment => [String(enrollment.courseId), enrollment])
  )

  // Groups lectures so preview summary can be built per course.
  const lecturesByCourseId = new Map()

  for (const lecture of lectures) {
    const courseKey = String(lecture.courseId)
    const groupedLectures = lecturesByCourseId.get(courseKey) ?? []

    groupedLectures.push(lecture)
    lecturesByCourseId.set(courseKey, groupedLectures)
  }

  return courses.map(course => {
    const courseKey = String(course._id)
    const enrollment = enrollmentByCourseId.get(courseKey) ?? null
    const courseLectures = lecturesByCourseId.get(courseKey) ?? []

    const access = buildStudentCourseAccess({ enrollment })
    const preview = buildCoursePreviewSummary(courseLectures)

    return mapStudentCourseCard(course, access, preview)
  })
}
