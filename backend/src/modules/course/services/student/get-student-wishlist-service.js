import { findStudentWishlistCourses } from '../../repositories/find-student-wishlist-courses-repository.js'
import { findLecturesByCourseIds } from '../../../lecture/repositories/find-lectures-by-course-ids-repository.js'
import { findActiveEnrollmentsByUserAndCourseIds } from '../../../enrollment/repositories/find-active-enrollments-by-user-and-course-ids-repository.js'
import { buildStudentCourseAccess } from '../../helpers/build-student-course-access.js'
import { mapStudentCourseCard } from '../../helpers/map-student-course-card.js'
import { buildCoursePreviewSummary } from '../../helpers/build-course-preview-summary.js'

// Retrieves all wishlisted courses for a student, joins access and preview details, and shapes them.
export const getStudentWishlistService = async userId => {
  const wishlistRecords = await findStudentWishlistCourses(userId)

  // Filter out any populated courses that are null (e.g. if the course was unpublished/deleted)
  const courses = wishlistRecords
    .map(record => record.courseId)
    .filter(course => Boolean(course))

  if (courses.length === 0) {
    return []
  }

  const courseIds = courses.map(course => course._id)

  // Fetch enrollments and lectures in parallel
  const [enrollments, lectures] = await Promise.all([
    findActiveEnrollmentsByUserAndCourseIds(userId, courseIds),
    findLecturesByCourseIds(courseIds)
  ])

  const enrollmentByCourseId = new Map(
    enrollments.map(enrollment => [String(enrollment.courseId), enrollment])
  )

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

    // These are from the user's wishlist, so isWishlisted is always true.
    const access = buildStudentCourseAccess({
      enrollment,
      isWishlisted: true
    })
    const preview = buildCoursePreviewSummary(courseLectures)

    return mapStudentCourseCard(course, access, preview)
  })
}
