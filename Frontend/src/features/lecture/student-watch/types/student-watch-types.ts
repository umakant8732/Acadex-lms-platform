import type { ReactNode } from 'react'

import type {
  StudentCourseOverview,
  StudentCourseQueryError,
  StudentCurriculumLesson,
  StudentCurriculumSection,
  StudentLectureStatus
} from '../../../course/shared/types/student-course-types'

// Signed playback stream details used by student player.
export interface StudentLecturePlaybackStream {
  type: 'hls' | string
  delivery: 'cloudfront' | string
  playlistUrl: string
  signedQuery: string
  expiresAt: number
}

// Backend returns this object after checking student access.
export interface StudentLecturePlaybackAccess {
  lectureId: string
  courseId: string
  lessonId: string
  videoAssetId: string
  status: StudentLectureStatus
  playback: StudentLecturePlaybackStream
}

export interface StudentLecturePlaybackAccessPayload {
  playbackAccess: StudentLecturePlaybackAccess
}

// Watch page uses lesson data plus parent section info.
export interface StudentWatchLesson extends StudentCurriculumLesson {
  sectionId: string
  sectionTitle: string
}

export interface StudentWatchPageState {
  courseId: string
  course: StudentCourseOverview | null
  sections: StudentCurriculumSection[]
  activeLesson: StudentWatchLesson | null
  playbackAccess: StudentLecturePlaybackAccess | null
  isPurchased: boolean
  previewActionPath: string
  checkoutActionPath: string
  isLoading: boolean
  isError: boolean
  error: StudentCourseQueryError | null
  refetchPage: () => Promise<unknown>
  isPlaybackLoading: boolean
  handleLessonSelect: (lessonIdToOpen: string) => void
  handlePlaybackError: (message?: string) => void
}

export interface StudentLecturePlayerStateProps {
  title: string
  subtitle: string
  actions?: ReactNode
}

export interface StudentLecturePlayerProps {
  course: StudentCourseOverview | null
  lesson: StudentWatchLesson | null
  playbackAccess: StudentLecturePlaybackAccess | null
  isPlaybackLoading: boolean
  isLessonAccessible: boolean
  isPurchased: boolean
  previewActionPath: string
  checkoutActionPath: string
  onPlaybackError?: (message?: string) => void
}

export interface StudentWatchSidebarLessonLabel {
  label: string
  className: string
}

export interface StudentWatchSidebarProps {
  course: StudentCourseOverview | null
  sections: StudentCurriculumSection[]
  activeLessonId?: string
  isPurchased: boolean
  onLessonSelect: (lessonIdToOpen: string) => void
}

export type StudentWatchTabId = 'description' | 'resources' | 'comments'

export interface StudentWatchTab {
  id: StudentWatchTabId
  label: string
}

export interface StudentWatchTabsProps {
  course: StudentCourseOverview | null
  lesson: StudentWatchLesson | null
}
