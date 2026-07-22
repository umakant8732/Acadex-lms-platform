import React from 'react'
import { FiPlayCircle, FiUploadCloud } from 'react-icons/fi'

import {
  canStartFirstLectureUpload,
  isLectureFailed,
  isLectureProcessing,
  isLectureReady,
  isLectureUploadPending
} from '../../constants/lecture-status.js'
import LectureStatusBadge from './lecture-status-badge.js'
import type { LectureStatusType, Section, Lesson } from '../../types/teacher-lecture-types'

export interface GetUploadButtonLabelArgs {
  isUploading: boolean
  uploadProgress: number
  lectureStatus?: LectureStatusType | null
}

const getUploadButtonLabel = ({
  isUploading,
  uploadProgress,
  lectureStatus
}: GetUploadButtonLabelArgs): string => {
  if (isUploading) {
    return `Uploading ${uploadProgress}%`
  }

  if (isLectureProcessing(lectureStatus)) {
    return 'Processing'
  }

  if (isLectureUploadPending(lectureStatus)) {
    return 'Upload Pending'
  }

  if (isLectureReady(lectureStatus)) {
    return 'Replace Video'
  }

  if (isLectureFailed(lectureStatus)) {
    return 'Upload Failed'
  }

  return 'Upload Video'
}

export interface LectureLessonRowProps {
  section: Section
  lesson: Lesson
  isUploading: boolean
  uploadProgress: number
  onUploadButtonClick: (args: { section: Section; lesson: Lesson }) => void
  isPlaybackLoading?: boolean,
  onWatchLecture?: (lesson: Lesson) => void
  onRetryClick?: (lectureId: string) => void
  isRetrying: boolean,
  onTogglePreview?: (lectureId: string, isPreview: boolean) => void
  isTogglePreviewPending?: boolean
}

const LectureLessonRow: React.FC<LectureLessonRowProps> = ({
  section,
  lesson,
  isUploading,
  uploadProgress,
  onUploadButtonClick,
  isPlaybackLoading = false,
  onWatchLecture,
  onRetryClick,
  isRetrying = false,
  onTogglePreview,
  isTogglePreviewPending = false

}) => {
  const lectureStatus = lesson.lecture?.status
  const isUploadDisabled =
    isUploading || !canStartFirstLectureUpload(lectureStatus)

  const canWatchLecture = isLectureReady(lectureStatus)

  return (
    <div className='flex flex-col gap-4 border-b border-black/5 px-5 py-4 last:border-b-0 md:flex-row md:items-center md:justify-between'>
      <div>
        <p className='text-sm font-medium text-black'>{lesson.title}</p>

        <div className='mt-2 flex items-center gap-4'>
          <LectureStatusBadge status={lesson.lecture?.status} />
        </div>

      </div>

      <div className='flex flex-wrap gap-2 md:justify-end'>
        {canWatchLecture && (
          <button
            type='button'
            disabled={isPlaybackLoading}
            onClick={() => onWatchLecture?.(lesson)}
            className='btn btn-outline rounded-none md:min-w-28 disabled:cursor-not-allowed'
          >
            <FiPlayCircle />
            {isPlaybackLoading ? 'Opening' : 'Watch'}
          </button>
        )}

        {
          isLectureFailed(lectureStatus) &&
          lesson.lecture?._id && (
            <button
              type='button'
              disabled={isRetrying}
              onClick={() => onRetryClick?.(lesson.lecture?._id || '')}
              className='btn btn-outline rounded-none md:min-w-24 disabled:cursor-not-allowed'
            >
              {isRetrying ? 'Retrying...' : 'Retry'}
            </button>
          )
        }

        <button
          type='button'
          disabled={isUploadDisabled}
          onClick={() => onUploadButtonClick({ section, lesson })}
          className='btn btn-neutral rounded-none md:min-w-36 disabled:cursor-not-allowed disabled:bg-black/60 disabled:text-white'
        >
          <FiUploadCloud />
          {getUploadButtonLabel({
            isUploading,
            uploadProgress,
            lectureStatus
          })}
        </button>

        {lectureStatus === 'ready' && (
          <label
            className={`btn no-animation rounded-none pointer-events-auto cursor-default gap-3 font-normal border ${
              lesson.lecture?.isPreview
                ? 'bg-emerald-50 text-emerald-700 border-emerald-300 hover:bg-emerald-50 hover:text-emerald-700 hover:border-emerald-300'
                : 'bg-rose-50 text-rose-600 border-rose-300 hover:bg-rose-50 hover:text-rose-600 hover:border-rose-300'
            }`}
          >
            <span className='text-xs font-semibold uppercase tracking-wider select-none'>
              {lesson.lecture?.isPreview ? 'Preview Active' : 'Preview Off'}
            </span>
            <input
              type='checkbox'
              className={`toggle toggle-xs cursor-pointer ${
                lesson.lecture?.isPreview ? 'toggle-success' : 'toggle-error'
              }`}
              disabled={isTogglePreviewPending}
              checked={lesson.lecture?.isPreview ?? false}
              onChange={(e) => {
                console.log('hii');
                if (lesson.lecture?._id) {
                  onTogglePreview?.(lesson.lecture._id, e.target.checked)
                }
              }}
            />
          </label>
        )}



      </div>
    </div>
  )
}

export default LectureLessonRow
