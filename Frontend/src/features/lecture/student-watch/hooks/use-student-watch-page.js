import { useEffect, useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { useGetStudentCourseOverview } from '../../../course/student-overview/queries/use-get-student-course-overview.js'
import { getApiErrorMessage } from '../../../../shared/utils/get-api-error-message.js'
import { showError } from '../../../../shared/utils/toast.js'
import { useGetStudentCourseCurriculum } from '../queries/use-get-student-course-curriculum.js'
import { useGetStudentLecturePlaybackAccess } from '../queries/use-get-student-lecture-playback-access.js'

const EMPTY_SECTIONS = []

// Finds lesson and also keeps parent section info with it.
const findLessonWithSection = ({ sections, lessonId }) => {
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
const canStudentOpenLesson = ({ lesson, isPurchased }) => {
  if (!lesson?.lecture?.isPlayable) {
    return false
  }

  return isPurchased || lesson.lecture.isPreview
}

// Finds first ready preview lesson for non-purchased students.
const findFirstPreviewLesson = sections => {
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
const findFirstAccessibleLesson = ({ sections, isPurchased }) => {
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
export const useStudentWatchPage = () => {
  const navigate = useNavigate()
  const { courseId, lessonId } = useParams()
  const [playbackAccess, setPlaybackAccess] = useState(null)

  const studentCourseOverviewQuery = useGetStudentCourseOverview(courseId)
  const studentCourseCurriculumQuery = useGetStudentCourseCurriculum(courseId)
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
    () => findFirstAccessibleLesson({ sections, isPurchased }),
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
      }) || firstAccessibleLesson
    )
  }, [sections, lessonId, firstAccessibleLesson])

  const mutatePlaybackAccess =
    studentLecturePlaybackAccessMutation.mutateAsync

  // Sync generic /learn url to exact lesson route.
  useEffect(() => {
    if (!courseId || !activeLesson?._id || lessonId === activeLesson._id) {
      return
    }

    navigate(`/student/courses/${courseId}/learn/${activeLesson._id}`, {
      replace: true
    })
  }, [courseId, lessonId, activeLesson?._id, navigate])

  // Gets fresh CloudFront signed playback for current lesson.
  useEffect(() => {
    const loadPlaybackAccess = async () => {
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
  const handleLessonSelect = lessonIdToOpen => {
    if (!courseId || !lessonIdToOpen) {
      return
    }

    navigate(`/student/courses/${courseId}/learn/${lessonIdToOpen}`)
  }

  // Shows player level errors in one small helper.
  const handlePlaybackError = message => {
    showError(message || 'Unable to play this lecture right now')
  }

  // Retry button should refresh both page requests together.
  const refetchPage = async () => {
    await Promise.all([
      studentCourseOverviewQuery.refetch(),
      studentCourseCurriculumQuery.refetch()
    ])
  }

  return {
    courseId,
    course,
    sections,
    activeLesson,
    playbackAccess,
    isPurchased,
    previewActionPath: firstPreviewLesson
      ? `/student/courses/${courseId}/learn/${firstPreviewLesson._id}`
      : '',
    checkoutActionPath: `/student/checkout/${courseId}`,

    isLoading:
      studentCourseOverviewQuery.isLoading ||
      studentCourseCurriculumQuery.isLoading,
    isError:
      studentCourseOverviewQuery.isError ||
      studentCourseCurriculumQuery.isError,
    error:
      studentCourseOverviewQuery.error ??
      studentCourseCurriculumQuery.error,
    refetchPage,

    isPlaybackLoading: studentLecturePlaybackAccessMutation.isPending,
    handleLessonSelect,
    handlePlaybackError
  }
}
