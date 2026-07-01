import { useMemo } from 'react'
import { useParams } from 'react-router-dom'

import { useGetStudentCourseCurriculum } from '../../../lecture/student-watch/queries/use-get-student-course-curriculum.js'
import { useGetStudentCourseOverview } from '../queries/use-get-student-course-overview.js'

const EMPTY_SECTIONS = []

// Finds first ready preview lesson for non-purchased students.
const findFirstPreviewLesson = sections => {
  for (const section of sections) {
    const lesson = (section.lessons ?? []).find(currentLesson => {
      return Boolean(
        currentLesson.lecture?.isPreview && currentLesson.lecture?.isPlayable
      )
    })

    if (lesson) {
      return lesson
    }
  }

  return null
}

// Builds small summary numbers for overview page.
const buildContentStats = sections => {
  let totalLessons = 0
  let previewLessons = 0

  for (const section of sections) {
    for (const lesson of section.lessons ?? []) {
      totalLessons += 1

      if (lesson.lecture?.isPreview) {
        previewLessons += 1
      }
    }
  }

  return {
    totalSections: sections.length,
    totalLessons,
    previewLessons
  }
}

// Keeps overview page data logic in one place.
export const useStudentCourseOverviewPage = () => {
  const { courseId } = useParams()

  const studentCourseOverviewQuery = useGetStudentCourseOverview(courseId)
  const studentCourseCurriculumQuery = useGetStudentCourseCurriculum(courseId)

  const course = studentCourseOverviewQuery.data ?? null
  const curriculum = studentCourseCurriculumQuery.data ?? null

  // Keeps sections reference stable for memo logic.
  const sections = useMemo(
    () => curriculum?.sections ?? EMPTY_SECTIONS,
    [curriculum]
  )

  const firstPreviewLesson = useMemo(
    () => findFirstPreviewLesson(sections),
    [sections]
  )

  // Creates content stats for hero and syllabus header.
  const contentStats = useMemo(
    () => buildContentStats(sections),
    [sections]
  )

  const isLoading =
    studentCourseOverviewQuery.isLoading ||
    studentCourseCurriculumQuery.isLoading

  const isError =
    studentCourseOverviewQuery.isError ||
    studentCourseCurriculumQuery.isError

  const error =
    studentCourseOverviewQuery.error ??
    studentCourseCurriculumQuery.error

  // Refetches both requests together from one retry button.
  const refetchPage = async () => {
    await Promise.all([
      studentCourseOverviewQuery.refetch(),
      studentCourseCurriculumQuery.refetch()
    ])
  }

  const isPurchased = Boolean(course?.access?.isPurchased)
  const primaryActionPath = isPurchased
    ? `/student/courses/${courseId}/learn`
    : `/student/checkout/${courseId}`

  const previewActionPath = firstPreviewLesson
    ? `/student/courses/${courseId}/learn/${firstPreviewLesson._id}`
    : ''

  return {
    courseId,
    course,
    sections,
    contentStats,
    primaryActionPath,
    previewActionPath,
    checkoutActionPath: `/student/checkout/${courseId}`,
    canWatchPreview: Boolean(firstPreviewLesson),
    isPurchased,

    isLoading,
    isError,
    error,
    refetchPage
  }
}
