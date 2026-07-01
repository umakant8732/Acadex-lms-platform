import CourseFormFields from './course-form-fields.jsx'

const CourseForm = ({
  mode,
  formValues,
  formErrors,
  isSubmitting,
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
        <p className='text-xs uppercase tracking-[0.3em] text-black/35'>
          {isCreateMode ? 'New Course' : 'Edit Course'}
        </p>

        <div className='mt-3 flex flex-col gap-4 md:flex-row md:items-end md:justify-between'>
          <div>
            <h1 className='text-3xl font-semibold tracking-tight text-black'>
              {isCreateMode ? 'Create Course' : 'Update Course'}
            </h1>

            <p className='mt-2 max-w-2xl text-sm leading-7 text-black/60'>
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
    </form>
  )
}

export default CourseForm
