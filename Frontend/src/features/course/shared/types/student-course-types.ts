// Shared student course types keep library, overview, and lesson access consistent.
import type { AxiosError } from 'axios'

import type {
  ApiErrorResponse,
  PublicCourse
} from './public-course-types'

export type StudentLectureStatus =
  | 'upload_pending'
  | 'processing'
  | 'ready'
  | 'failed'

export interface StudentCoursePrimaryAction {
  label: string
}

export interface StudentCourseAccess {
  isPurchased: boolean
  progressPercent?: number | null
  expiresAt?: string | null
  primaryAction?: StudentCoursePrimaryAction | null
}

export interface StudentCoursePreview {
  hasPreviewLessons?: boolean
  readyPreviewLessonsCount?: number
  firstPreviewLessonId?: string | null
}

export interface StudentCourse extends PublicCourse {
  access: StudentCourseAccess
  preview: StudentCoursePreview
}

export interface StudentLessonLecture {
  _id: string
  status: StudentLectureStatus
  isPreview: boolean
  isPlayable: boolean
}

export interface StudentCurriculumLesson {
  _id: string
  title: string
  order: number
  lecture: StudentLessonLecture | null
}

export interface StudentCurriculumSection {
  _id: string
  sectionTitle: string
  order: number
  lessons: StudentCurriculumLesson[]
}

export interface StudentCourseCurriculum {
  sections: StudentCurriculumSection[]
}

export type StudentCourseList = StudentCourse[]
export type StudentCourseOverview = StudentCourse
export type StudentCourseQueryError = AxiosError<ApiErrorResponse>

export interface StudentCourseLibraryPayload {
  courses: StudentCourseList
}

export interface StudentCourseOverviewPayload {
  course: StudentCourseOverview
}

export interface StudentCourseCurriculumPayload {
  curriculum: StudentCourseCurriculum
}
