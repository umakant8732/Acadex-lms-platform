import React from 'react'
import { useCourseFormPage } from '../../hooks/use-course-form-page.js'
import CourseForm from '../course-form-components/course-form.js'
import type { CourseDetails } from '../../types/teacher-course-types'

export interface UpdateCourseContentProps {
  courseId: string
  course: CourseDetails
}

const UpdateCourseContent: React.FC<UpdateCourseContentProps> = ({ courseId, course }) => {
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
    mode: 'update',
    initialCourse: course,
    courseId
  })

  return (
    <section>
      <CourseForm
        mode='update'
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

export default UpdateCourseContent
