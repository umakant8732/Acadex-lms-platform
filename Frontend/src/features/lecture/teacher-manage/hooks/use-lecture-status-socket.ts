import { useEffect } from 'react'
import { useQueryClient } from '@tanstack/react-query'

import { socket } from '../../../../shared/services/socket.js'
import { lectureQueryKeys } from '../helpers/lecture-query-keys.js'
import type {
  TeacherCourseCurriculum,
  LectureStatusChangedPayload,
  Lesson
} from '../types/teacher-lecture-types'

// Updates only changed lesson inside curriculum cache.
// This keeps UI realtime without polling or full API refetch.
const updateLessonLectureStatus = (
  curriculum: TeacherCourseCurriculum | undefined,
  payload: LectureStatusChangedPayload
): TeacherCourseCurriculum | undefined => {
  if (!curriculum?.sections) return curriculum

  return {
    ...curriculum,
    sections: curriculum.sections.map(section => ({
      ...section,
      lessons: section.lessons.map((lesson: Lesson) => {
        if (String(lesson._id) !== String(payload.lessonId)) {
          return lesson
        }

        return {
          ...lesson,
          lecture: {
            ...(lesson.lecture ?? {}),
            _id: payload.lectureId,
            videoAssetId: payload.videoAssetId,
            status: payload.status,
            hlsMasterKey:
              payload.hlsMasterKey || lesson.lecture?.hlsMasterKey || '',
            errorMessage: payload.errorMessage || ''
          }
        }
      })
    }))
  }
}

// Connects teacher curriculum page with lecture realtime status events.
// Backend emits status changes, and this hook patches exact lesson in cache.
export const useLectureStatusSocket = (courseId?: string) => {
  const queryClient = useQueryClient()

  useEffect(() => {
    if (!courseId) return

    // Connect socket only when curriculum page has course id.
    if (!socket.connected) {
      socket.connect()
    }

    // Join current course room so backend sends only this course updates.
    socket.emit('lecture:join-course', courseId)

    const handleLectureStatusChanged = (payload: LectureStatusChangedPayload) => {
      if (String(payload.courseId) !== String(courseId)) {
        return
      }

      queryClient.setQueryData<TeacherCourseCurriculum>(
        lectureQueryKeys.courseCurriculum(courseId),
        currentCurriculum => updateLessonLectureStatus(currentCurriculum, payload) as TeacherCourseCurriculum
      )
    }

    socket.on('lecture:status-changed', handleLectureStatusChanged)

    return () => {
      // Leave room and remove listener when page changes or unmounts.
      socket.emit('lecture:leave-course', courseId)
      socket.off('lecture:status-changed', handleLectureStatusChanged)
    }
  }, [courseId, queryClient])
}
