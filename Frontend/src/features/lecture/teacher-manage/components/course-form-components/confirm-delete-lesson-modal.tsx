import React from 'react'
import { FiAlertTriangle } from 'react-icons/fi'

// 1. Defining Props for the Modal Component
export interface ConfirmDeleteLessonModalProps {
  isOpen: boolean
  lessonTitle: string
  onClose: () => void
  onConfirm: () => void
}

const ConfirmDeleteLessonModal: React.FC<ConfirmDeleteLessonModalProps> = ({
  isOpen,
  lessonTitle,
  onClose,
  onConfirm
}) => {
  // 2. Early return check if modal is not active
  if (!isOpen) {
    return null
  }

  return (
    // 3. Main overlay wrapper (blur background and center align)
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4'>
      
      {/* 4. Sleek Container box with sharp borders and clean shadow */}
      <div className='w-full max-w-md border border-black/10 bg-white p-6 shadow-2xl'>
        
        {/* 5. Alert triangle indicator header */}
        <div className='flex h-12 w-12 items-center justify-center border border-red-200 bg-red-50 text-red-600'>
          <FiAlertTriangle size={20} />
        </div>

        {/* 6. Section tag title */}
        <p className='mt-5 text-xs uppercase tracking-[0.3em] text-red-500/80'>
          Delete Syllabus Item
        </p>

        <h2 className='mt-3 text-2xl font-semibold tracking-tight text-black'>
          Remove Lesson?
        </h2>

        {/* 7. Detailed warning copy regarding permanent S3 storage loss */}
        <p className='mt-3 text-sm leading-7 text-black/60'>
          Are you sure you want to remove{' '}
          <span className='font-semibold text-black'>{lessonTitle}</span>?
          If this lesson has an uploaded video, saving your changes will permanently delete the video file from storage.
        </p>

        {/* 8. Action button actions panel */}
        <div className='mt-8 flex items-center justify-end gap-3'>
          
          {/* Cancel button */}
          <button
            type='button'
            onClick={onClose}
            className='btn rounded-none border border-black/10 bg-white px-4 py-2 text-sm text-black hover:bg-[#f5f5f5]'
          >
            Cancel
          </button>

          {/* Confirm delete button */}
          <button
            type='button'
            onClick={onConfirm}
            className='btn rounded-none border-red-600 bg-red-600 px-4 py-2 text-sm text-white hover:border-red-700 hover:bg-red-700'
          >
            Remove Lesson
          </button>
        </div>
      </div>
    </div>
  )
}

export default ConfirmDeleteLessonModal
