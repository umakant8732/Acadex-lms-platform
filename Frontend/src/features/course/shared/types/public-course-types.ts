// Shared public course shape used by catalog and preview flows.
export type CourseLevel = 'beginner' | 'intermediate' | 'advanced'

export interface CourseSyllabusLesson {
  _id: string
  title: string
  order: number
}

export interface CourseSyllabusSection {
  _id: string
  sectionTitle: string
  order: number
  lessons: CourseSyllabusLesson[]
}

export interface PublicCourse {
  _id: string
  title: string
  subtitle: string
  description: string
  category: string
  level: CourseLevel
  price: number
  originalPrice: number
  duration: number
  lectures: number
  projects: number
  thumbnailKey: string
  thumbnail: string
  instructorName: string
  syllabus: CourseSyllabusSection[]
  isPublished?: boolean
  createdAt?: string
  updatedAt?: string
}

export interface ApiSuccessResponse<TData> {
  statusCode: number
  success: boolean
  message: string
  data: TData
}

export interface ApiErrorResponse {
  statusCode?: number
  success?: boolean
  message?: string
  errors?: unknown[]
}

export type PublishedCourseList = PublicCourse[]
export type CourseDetails = PublicCourse
