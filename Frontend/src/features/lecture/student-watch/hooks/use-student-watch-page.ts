import { useEffect, useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { useGetStudentCourseOverview } from '../../../course/student-overview/queries/use-get-student-course-overview'
import type {
  StudentCurriculumLesson,
  StudentCurriculumSection
} from '../../../course/shared/types/student-course-types'
import { getApiErrorMessage } from '../../../../shared/utils/get-api-error-message'
import { showError } from '../../../../shared/utils/toast'
import { useGetStudentCourseCurriculum } from '../queries/use-get-student-course-curriculum'
import { useGetStudentLecturePlaybackAccess } from '../queries/use-get-student-lecture-playback-access'
import type {
  StudentLecturePlaybackAccess,
  StudentWatchLesson,
  StudentWatchPageState
} from '../types/student-watch-types'

const EMPTY_SECTIONS: StudentCurriculumSection[] = []

// Finds lesson and also keeps parent section info with it.
const findLessonWithSection = ({
  sections,
  lessonId
}: {
  sections: StudentCurriculumSection[]
  lessonId: string
}): StudentWatchLesson | null => {
  for (const section of sections) {
    const lesson = (section.lessons ?? []).find(
      currentLesson => currentLesson._id === lessonId
    )

    if (lesson) {
      return {
        ...lesson,
        sectionId: section._id,
        sectionTitle: section.sectionTitle
      }
    }
  }

  return null
}

// Student can open lesson page only if lecture exists and access is allowed.
const canStudentOpenLesson = ({
  lesson,
  isPurchased
}: {
  lesson: StudentCurriculumLesson | StudentWatchLesson | null
  isPurchased: boolean
}): boolean => {
  if (!lesson?.lecture?.isPlayable) {
    return false
  }

  return isPurchased || lesson.lecture.isPreview
}

// Finds first ready preview lesson for non-purchased students.
const findFirstPreviewLesson = (
  sections: StudentCurriculumSection[]
): StudentWatchLesson | null => {
  for (const section of sections) {
    const lesson = (section.lessons ?? []).find(currentLesson => {
      return Boolean(
        currentLesson.lecture?.isPreview && currentLesson.lecture?.isPlayable
      )
    })

    if (lesson) {
      return {
        ...lesson,
        sectionId: section._id,
        sectionTitle: section.sectionTitle
      }
    }
  }

  return null
}

// Generic /learn route should land on first usable lesson.
const findFirstAccessibleLesson = ({
  sections,
  isPurchased
}: {
  sections: StudentCurriculumSection[]
  isPurchased: boolean
}): StudentWatchLesson | null => {
  for (const section of sections) {
    const lesson = (section.lessons ?? []).find(currentLesson => {
      return Boolean(
        currentLesson.lecture?.isPlayable &&
          canStudentOpenLesson({
            lesson: currentLesson,
            isPurchased
          })
      )
    })

    if (lesson) {
      return {
        ...lesson,
        sectionId: section._id,
        sectionTitle: section.sectionTitle
      }
    }
  }

  return null
}

// Keeps student watch page data, routing and playback flow in one place.
export const useStudentWatchPage = (): StudentWatchPageState => {
  const navigate = useNavigate()
  const { courseId, lessonId } = useParams<{ courseId: string; lessonId: string }>()
  const normalizedCourseId = courseId ?? ''
  const [playbackAccess, setPlaybackAccess] =
    useState<StudentLecturePlaybackAccess | null>(null)

  const studentCourseOverviewQuery = useGetStudentCourseOverview(normalizedCourseId)
  const studentCourseCurriculumQuery =
    useGetStudentCourseCurriculum(normalizedCourseId)
  const studentLecturePlaybackAccessMutation =
    useGetStudentLecturePlaybackAccess()

  const course = studentCourseOverviewQuery.data ?? null
  const curriculum = studentCourseCurriculumQuery.data ?? null
  const isPurchased = Boolean(course?.access?.isPurchased)

  // Keeps sections reference stable for memo work.
  const sections = useMemo(
    () => curriculum?.sections ?? EMPTY_SECTIONS,
    [curriculum]
  )

  const firstPreviewLesson = useMemo(
    () => findFirstPreviewLesson(sections),
    [sections]
  )

  // Used when url has no lesson id yet.
  const firstAccessibleLesson = useMemo(
    () =>
      findFirstAccessibleLesson({
        sections,
        isPurchased
      }),
    [sections, isPurchased]
  )

  // Route lesson is first priority, fallback lesson is backup.
  const activeLesson = useMemo(() => {
    if (!lessonId) {
      return firstAccessibleLesson
    }

    return (
      findLessonWithSection({
        sections,
        lessonId
      }) ?? firstAccessibleLesson
    )
  }, [sections, lessonId, firstAccessibleLesson])

  const mutatePlaybackAccess = studentLecturePlaybackAccessMutation.mutateAsync

  // Sync generic /learn url to exact lesson route.
  useEffect(() => {
    if (
      !normalizedCourseId ||
      !activeLesson?._id ||
      lessonId === activeLesson._id
    ) {
      return
    }

    navigate(`/student/courses/${normalizedCourseId}/learn/${activeLesson._id}`, {
      replace: true
    })
  }, [normalizedCourseId, lessonId, activeLesson?._id, navigate])

  // Gets fresh CloudFront signed playback for current lesson.
  useEffect(() => {
    const loadPlaybackAccess = async (): Promise<void> => {
      if (!activeLesson?.lecture?.isPlayable) {
        setPlaybackAccess(null)
        return
      }

      if (!canStudentOpenLesson({ lesson: activeLesson, isPurchased })) {
        setPlaybackAccess(null)
        return
      }

      try {
        const nextPlaybackAccess = await mutatePlaybackAccess(
          activeLesson.lecture._id
        )

        setPlaybackAccess(nextPlaybackAccess)
      } catch (error) {
        setPlaybackAccess(null)
        showError(getApiErrorMessage(error, 'Unable to open lesson playback'))
      }
    }

    void loadPlaybackAccess()
  }, [activeLesson, isPurchased, mutatePlaybackAccess])

  // Lesson click updates route, player follows route state.
  const handleLessonSelect = (lessonIdToOpen: string): void => {
    if (!normalizedCourseId || !lessonIdToOpen) {
      return
    }

    navigate(`/student/courses/${normalizedCourseId}/learn/${lessonIdToOpen}`)
  }

  // Shows player level errors in one small helper.
  const handlePlaybackError = (message?: string): void => {
    showError(message || 'Unable to play this lecture right now')
  }

  // Retry button should refresh both page requests together.
  const refetchPage = async (): Promise<unknown> => {
    return Promise.all([
      studentCourseOverviewQuery.refetch(),
      studentCourseCurriculumQuery.refetch()
    ])
  }

  return {
    courseId: normalizedCourseId,
    course,
    sections,
    activeLesson,
    playbackAccess,
    isPurchased,
    previewActionPath: firstPreviewLesson
      ? `/student/courses/${normalizedCourseId}/learn/${firstPreviewLesson._id}`
      : '',
    checkoutActionPath: `/student/checkout/${normalizedCourseId}`,
    isLoading:
      studentCourseOverviewQuery.isLoading ||
      studentCourseCurriculumQuery.isLoading,
    isError:
      studentCourseOverviewQuery.isError ||
      studentCourseCurriculumQuery.isError,
    error:
      studentCourseOverviewQuery.error ??
      studentCourseCurriculumQuery.error ??
      null,
    refetchPage,
    isPlaybackLoading: studentLecturePlaybackAccessMutation.isPending,
    handleLessonSelect,
    handlePlaybackError
  }
}



