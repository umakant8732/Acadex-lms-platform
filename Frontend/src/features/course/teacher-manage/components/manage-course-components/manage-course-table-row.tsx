import React from 'react'
import { FiEdit2, FiEye, FiTrash2 } from 'react-icons/fi'

import { getLevelClass } from '../../helpers/get-level-class.js'
import { getStatusClass } from '../../helpers/get-status-class.js'
import { courseThumbnailAcceptAttribute } from '../../constants/course-thumbnail-upload.js'
import { formatCoursePrice } from '../../../../../shared/utils/course/format-course-price.js'
import type { TeacherManageCourseListItem } from '../../types/teacher-course-types'

export interface ManageCourseTableRowProps {
  course: TeacherManageCourseListItem
  onViewClick: (courseId: string) => void
  onEditClick: (courseId: string) => void
  onDeleteClick: (course: TeacherManageCourseListItem) => void
  onPublishClick: (course: TeacherManageCourseListItem) => void
  publishingCourseId?: string | null
  onThumbnailChange?: (course: TeacherManageCourseListItem, file: File) => void
  uploadingThumbnailCourseId?: string | null
}

const ManageCourseTableRow: React.FC<ManageCourseTableRowProps> = ({
  course,
  onViewClick,
  onEditClick,
  onDeleteClick,
  onPublishClick,
  publishingCourseId,
  onThumbnailChange,
  uploadingThumbnailCourseId
}) => {
  const thumbnailFallback = course.title?.charAt(0)?.toUpperCase() || 'C'
  const isThumbnailUploading = uploadingThumbnailCourseId === course._id
  const thumbnailInputId = `course-thumbnail-${course._id}`
  const thumbnailActionLabel = course.thumbnail ? 'Replace' : 'Add'

  const handleThumbnailInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]

    if (!file) {
      event.target.value = ''
      return
    }

    onThumbnailChange?.(course, file)
    event.target.value = ''
  }

  return (
    <tr className='transition-colors hover:bg-black/[0.02]'>
      <td className='px-6 py-4'>
        <div className='flex items-center gap-4'>
          <label
            htmlFor={thumbnailInputId}
            className={`group relative block h-14 w-20 overflow-hidden border border-black/10 transition ${
              isThumbnailUploading
                ? 'cursor-wait bg-black/5'
                : 'cursor-pointer hover:border-black/30'
            }`}
            title={course.thumbnail ? 'Replace thumbnail' : 'Add thumbnail'}
            onClick={event => {
              if (isThumbnailUploading) {
                event.preventDefault()
              }
            }}
          >
            <input
              id={thumbnailInputId}
              type='file'
              accept={courseThumbnailAcceptAttribute}
              className='hidden'
              disabled={isThumbnailUploading}
              onChange={handleThumbnailInputChange}
            />

            {course.thumbnail ? (
              <img
                src={course.thumbnail}
                alt={course.title}
                className='h-full w-full object-cover'
              />
            ) : (
              <div className='flex h-full w-full items-center justify-center bg-[#f3f3f3] text-lg font-semibold text-black/55'>
                {thumbnailFallback}
              </div>
            )}

            {isThumbnailUploading ? (
              <div className='absolute inset-0 flex items-center justify-center bg-black/70 px-1 text-[9px] font-medium uppercase leading-none whitespace-nowrap text-white'>
                Uploading
              </div>
            ) : (
              <div className='pointer-events-none absolute inset-x-0 bottom-0 bg-black/70 px-1 py-1 text-center text-[9px] font-medium uppercase leading-none whitespace-nowrap text-white'>
                {thumbnailActionLabel}
              </div>
            )}
          </label>

          <div className='min-w-0'>
            <h3 className='truncate text-sm font-semibold text-black'>
              {course.title}
            </h3>

            <p className='mt-1 line-clamp-1 text-xs text-black/55'>
              {course.subtitle || 'No subtitle added yet'}
            </p>
          </div>
        </div>
      </td>

      <td className='px-6 py-4 text-sm text-black/65'>
        {course.category || 'Uncategorized'}
      </td>

      <td className='px-6 py-4'>
        <span
          className={`inline-flex items-center border px-3 py-1 text-xs font-medium capitalize ${getLevelClass(
            course.level
          )}`}
        >
          {course.level || 'beginner'}
        </span>
      </td>

      <td className='px-6 py-4 text-sm font-medium text-black'>
        {formatCoursePrice(course.price)}
      </td>

      <td className='px-6 py-4'>
        <span
          className={`inline-flex items-center border px-3 py-1 text-xs font-medium ${getStatusClass(
            course.isPublished
          )}`}
        >
          {course.isPublished ? 'Published' : 'Draft'}
        </span>
      </td>

      <td className='px-6 py-4'>
        <div className='flex items-center justify-end'>
          <button
            type='button'
            onClick={() => onViewClick(course._id)}
            className='flex h-9 w-9 items-center justify-center border border-black/10 text-black/70 transition hover:bg-black hover:text-white'
            aria-label='View course'
            title='View course'
          >
            <FiEye size={16} />
          </button>

          <button
            type='button'
            onClick={() => onPublishClick(course)}
            disabled={publishingCourseId === course._id}
            className={`inline-flex h-9 items-center justify-center border px-3 text-xs font-medium transition ${
              course.isPublished
                ? 'border-orange-200 text-orange-700 hover:bg-orange-500 hover:text-white'
                : 'border-emerald-200 text-emerald-700 hover:bg-emerald-600 hover:text-white'
            } disabled:cursor-not-allowed disabled:opacity-60`}
          >
            {publishingCourseId === course._id
              ? 'Saving...'
              : course.isPublished
              ? 'Unpublish'
              : 'Publish'}
          </button>

          <button
            type='button'
            onClick={() => onEditClick(course._id)}
            className='flex h-9 w-9 items-center justify-center border border-black/10 text-black/70 transition hover:bg-black hover:text-white'
            aria-label='Edit course'
            title='Edit course'
          >
            <FiEdit2 size={16} />
          </button>

          <button
            type='button'
            onClick={() => onDeleteClick(course)}
            className='flex h-9 w-9 items-center justify-center border border-red-200 text-red-600 transition hover:bg-red-600 hover:text-white'
            aria-label='Delete course'
            title='Delete course'
          >
            <FiTrash2 size={16} />
          </button>
        </div>
      </td>
    </tr>
  )
}

export default ManageCourseTableRow
