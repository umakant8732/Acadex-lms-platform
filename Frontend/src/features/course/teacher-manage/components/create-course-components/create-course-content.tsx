import React from 'react'
import { useCourseFormPage } from '../../hooks/use-course-form-page.js'
import CourseForm from '../course-form-components/course-form.js'

const CreateCourseContent: React.FC = () => {
  const {
    formValues,
    formErrors,
    isSubmitting,
    handleFieldChange,
    handleSectionTitleChange,
    handleLessonChange,
    addSection,
    removeSection,
    addLesson,
    removeLesson,
    lessonToDelete,
    confirmRemoveLesson,
    cancelRemoveLesson,
    handleSubmit
  } = useCourseFormPage({
    mode: 'create'
  })

  return (
    <section>
      <CourseForm
        mode='create'
        formValues={formValues}
        formErrors={formErrors}
        isSubmitting={isSubmitting}
        onFieldChange={handleFieldChange}
        onSectionTitleChange={handleSectionTitleChange}
        onLessonChange={handleLessonChange}
        onAddSection={addSection}
        onRemoveSection={removeSection}
        onAddLesson={addLesson}
        onRemoveLesson={removeLesson}
        lessonToDelete={lessonToDelete}
        onConfirmRemoveLesson={confirmRemoveLesson}
        onCloseConfirmModal={cancelRemoveLesson}
        onSubmit={handleSubmit}
      />
    </section>
  )
}

export default CreateCourseContent
