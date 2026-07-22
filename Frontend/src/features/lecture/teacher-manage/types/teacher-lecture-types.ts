export type LectureStatusType =
  | 'upload_pending'
  | 'uploading'
  | 'processing'
  | 'ready'
  | 'failed'

export interface Lecture {
  _id: string
  videoAssetId?: string
  status: LectureStatusType
  hlsMasterKey?: string
  errorMessage?: string
  isPreview?: boolean
}

export interface Lesson {
  _id: string
  title: string
  lecture?: Lecture | null
}

export interface Section {
  _id: string
  sectionTitle: string
  lessons: Lesson[]
}

export interface TeacherCourseCurriculum {
  course: {
    _id: string
    title: string
    subtitle?: string | null
    thumbnail?: string | null
  }
  sections: Section[]
}

export interface LectureManageCourse {
  _id: string
  title: string
  subtitle?: string | null
  thumbnail?: string | null
  category?: string | null
  level?: string | null
  totalSections: number
  totalLessons: number
}

export interface CreateLecturePresignedUploadUrlPayload {
  courseId: string
  sectionId: string
  lessonId: string
  fileName: string
  mimeType: string
  size: number
}

export interface CreateLecturePresignedUploadUrlResult {
  presignedUploadUrl: string
  lectureId: string
  videoAssetId: string
  originalKey: string
}

export interface CompleteLectureUploadPayload {
  lectureId: string
  videoAssetId: string
  originalKey: string
}

export interface CompleteLectureUploadResult {
  lecture: Lecture
}

export interface PlaybackInfo {
  playlistUrl: string
  signedQuery: string
}

export interface PlaybackAccessResult {
  lectureId: string
  playback: PlaybackInfo
}

export interface LectureStatusChangedPayload {
  courseId: string
  sectionId: string
  lessonId: string
  lectureId: string
  videoAssetId?: string
  status: LectureStatusType
  hlsMasterKey?: string
  errorMessage?: string
}


export interface TogglePreviewLecturePayload {
  lectureId : string,
  isPreview : boolean
}
