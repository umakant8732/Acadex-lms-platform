export type CourseLevelType = 'beginner' | 'intermediate' | 'advanced'

export interface LessonFormInput {
  _id?: string
  title: string
  order?: number
}

export interface SectionFormInput {
  _id?: string
  sectionTitle: string
  order?: number
  lessons: LessonFormInput[]
}

export interface CourseFormValues {
  title: string
  subtitle: string
  description: string
  category: string
  level: CourseLevelType
  price: number
  originalPrice: number
  lectures: number
  projects: number
  syllabus: SectionFormInput[]
}

export interface CourseDetails {
  _id: string
  title: string
  subtitle: string
  description: string
  category: string
  level: CourseLevelType
  price: number
  originalPrice: number
  lectures: number
  projects: number
  thumbnail?: string | null
  isPublished: boolean
  syllabus: SectionFormInput[]
}

export interface TeacherManageCourseListItem {
  _id: string
  title: string
  subtitle?: string | null
  category?: string | null
  level?: CourseLevelType | null
  price: number
  originalPrice: number
  thumbnail?: string | null
  isPublished: boolean
}

export interface PaginatedTeacherCourses {
  courses: TeacherManageCourseListItem[]
  pagination: {
    totalCourses: number
    totalPages: number
    currentPage: number
    limit: number
  }
}

export interface ManageCoursesFilters {
  page?: number
  limit?: number
  search?: string
  category?: string
}

export interface ThumbnailUploadSessionResult {
  presignedUploadUrl: string
  thumbnailKey: string
}

export interface CreateCourseThumbnailPresignedUploadUrlPayload {
  fileName: string
  mimeType: string
  size: number
}

export interface CompleteCourseThumbnailUploadPayload {
  courseId: string
  thumbnailUrl: string
}
