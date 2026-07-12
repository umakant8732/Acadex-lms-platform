import React from 'react'
import CourseFormFields from './course-form-fields.js'
import ConfirmDeleteLessonModal from '../../../../lecture/teacher-manage/components/course-form-components/confirm-delete-lesson-modal.js'
import type { CourseFormValues } from '../../types/teacher-course-types'

export interface CourseFormProps {
  mode: 'create' | 'update'
  formValues: CourseFormValues
  formErrors: any
  isSubmitting: boolean
  
  // Props for the modal integration from hook
  lessonToDelete: {
    sectionIndex: number
    lessonIndex: number
    lessonTitle: string
  } | null
  onConfirmRemoveLesson: () => void
  onCloseConfirmModal: () => void

  onFieldChange: (name: keyof CourseFormValues, value: any) => void
  onSectionTitleChange: (sectionIndex: number, value: string) => void
  onLessonChange: (sectionIndex: number, lessonIndex: number, value: string) => void
  onAddSection: () => void
  onRemoveSection: (sectionIndex: number) => void
  onAddLesson: (sectionIndex: number) => void
  onRemoveLesson: (sectionIndex: number, lessonIndex: number) => void
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void
}

const CourseForm: React.FC<CourseFormProps> = ({
  mode,
  formValues,
  formErrors,
  isSubmitting,
  lessonToDelete,
  onConfirmRemoveLesson,
  onCloseConfirmModal,
  onFieldChange,
  onSectionTitleChange,
  onLessonChange,
  onAddSection,
  onRemoveSection,
  onAddLesson,
  onRemoveLesson,
  onSubmit
}) => {
  const isCreateMode = mode === 'create'

  return (
    <form onSubmit={onSubmit} className='space-y-6' noValidate>
      <section className='border border-black/10 bg-white p-6'>
        <div className='flex flex-wrap items-center justify-between gap-4'>
          <div>
            <h1 className='text-2xl font-semibold tracking-tight text-black'>
              {isCreateMode ? 'Create New Course' : 'Update Course'}
            </h1>
            <p className='mt-1.5 text-sm text-black/55'>
              {isCreateMode
                ? 'Set up the course details, pricing, and syllabus structure before publishing it to students.'
                : 'Refine your course content, pricing, and structure while keeping the experience consistent for learners.'}
            </p>
          </div>

          <button
            type='submit'
            disabled={isSubmitting}
            className='btn rounded-none border-black bg-black text-white hover:bg-black/90'
          >
            {isSubmitting
              ? isCreateMode
                ? 'Creating...'
                : 'Updating...'
              : isCreateMode
                ? 'Create Course'
                : 'Save Changes'}
          </button>
        </div>
      </section>

      <CourseFormFields
        formValues={formValues}
        formErrors={formErrors}
        isSubmitting={isSubmitting}
        onFieldChange={onFieldChange}
        onSectionTitleChange={onSectionTitleChange}
        onLessonChange={onLessonChange}
        onAddSection={onAddSection}
        onRemoveSection={onRemoveSection}
        onAddLesson={onAddLesson}
        onRemoveLesson={onRemoveLesson}
      />

      {/* Render custom confirmation modal */}
      <ConfirmDeleteLessonModal
        isOpen={lessonToDelete !== null}
        lessonTitle={lessonToDelete?.lessonTitle || ''}
        onClose={onCloseConfirmModal}
        onConfirm={onConfirmRemoveLesson}
      />
    </form>
  )
}

export default CourseForm
