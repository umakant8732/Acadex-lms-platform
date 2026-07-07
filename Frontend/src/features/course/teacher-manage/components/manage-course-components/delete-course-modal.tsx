import React from 'react'
import { FiAlertTriangle } from 'react-icons/fi'
import type { TeacherManageCourseListItem } from '../../types/teacher-course-types'

export interface DeleteCourseModalProps {
  course: TeacherManageCourseListItem | null
  isOpen: boolean
  isPending: boolean
  errorMessage?: string | null
  onClose: () => void
  onConfirm: () => void
}

const DeleteCourseModal: React.FC<DeleteCourseModalProps> = ({
  course,
  isOpen,
  isPending,
  errorMessage,
  onClose,
  onConfirm
}) => {
  if (!isOpen || !course) {
    return null
  }

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4'>
      <div className='w-full max-w-md border border-black/10 bg-white p-6 shadow-2xl'>
        <div className='flex h-12 w-12 items-center justify-center border border-red-200 bg-red-50 text-red-600'>
          <FiAlertTriangle size={20} />
        </div>

        <p className='mt-5 text-xs uppercase tracking-[0.3em] text-red-500/80'>
          Delete Course
        </p>

        <h2 className='mt-3 text-2xl font-semibold tracking-tight text-black'>
          Are you sure?
        </h2>

        <p className='mt-3 text-sm leading-7 text-black/60'>
          You are about to delete{' '}
          <span className='font-semibold text-black'>{course.title}</span>.
        </p>

        {errorMessage && (
          <div className='mt-5 border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700'>
            {errorMessage}
          </div>
        )}

        <div className='mt-8 flex items-center justify-end gap-3'>
          <button
            type='button'
            onClick={onClose}
            disabled={isPending}
            className='btn rounded-none border border-black/10 bg-white text-black hover:bg-[#f5f5f5]'
          >
            Cancel
          </button>

          <button
            type='button'
            onClick={onConfirm}
            disabled={isPending}
            className='btn rounded-none border-red-600 bg-red-600 text-white hover:border-red-700 hover:bg-red-700'
          >
            {isPending ? 'Deleting...' : 'Delete Course'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default DeleteCourseModal
