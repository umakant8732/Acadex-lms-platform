import React from "react";
import { useCourseFormPage } from "../../hooks/use-course-form-page";
import CourseForm from "../course-form-components/course-form";

const UpdateCourseContent = ({ courseId, course }) => {
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
    handleSubmit,
  } = useCourseFormPage({
    mode: "update",
    initialCourse: course,
    courseId,
  });

  return (
    <section>
      <CourseForm
        mode="update"
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
  );
};

export default UpdateCourseContent;
