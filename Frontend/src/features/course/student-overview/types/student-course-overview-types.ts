import type {
  StudentCourseOverview,
  StudentCourseQueryError,
  StudentCurriculumSection
} from '../../shared/types/student-course-types'

// Overview screen types keep hero, content and hook outputs aligned.
export interface StudentCourseContentStats {
  totalSections: number
  totalLessons: number
  previewLessons: number
}

export interface StudentCourseOverviewHeroProps {
  course: StudentCourseOverview
  contentStats: StudentCourseContentStats
  primaryActionPath: string
  previewActionPath: string
  checkoutActionPath: string
  canWatchPreview: boolean
}

export interface StudentCourseOverviewContentProps {
  courseId: string
  sections: StudentCurriculumSection[]
  contentStats: StudentCourseContentStats
  isPurchased: boolean
}

export interface StudentCourseOverviewPageState {
  courseId: string
  course: StudentCourseOverview | null
  sections: StudentCurriculumSection[]
  contentStats: StudentCourseContentStats
  primaryActionPath: string
  previewActionPath: string
  checkoutActionPath: string
  canWatchPreview: boolean
  isPurchased: boolean
  isLoading: boolean
  isError: boolean
  error: StudentCourseQueryError | null
  refetchPage: () => Promise<unknown>
}
