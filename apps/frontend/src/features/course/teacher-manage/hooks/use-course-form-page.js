import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  createEmptyLesson,
  createEmptySection,
  getInitialCourseValues,
  normalizeCourseFormPayload,
} from "../helpers/course-form-values";
import { useCreateCourse } from "../queries/use-create-course";
import { useUpdateCourse } from "../queries/use-update-course";
import { validateCourseForm } from "../validations/course-form-schema";
import { showError, showSuccess } from "../../../../shared/utils/toast";

export const useCourseFormPage = ({
  mode,
  initialCourse = null,
  courseId = null,
}) => {
  const navigate = useNavigate();

  const createCourseMutation = useCreateCourse();
  const updateCourseMutation = useUpdateCourse();

  const [formValues, setFormValues] = useState(() =>
    getInitialCourseValues({ mode, initialCourse }),
  );
  const [formErrors, setFormErrors] = useState({});

  const [lessonToDelete, setLessonToDelete] = useState(null);

  const syncErrorsIfNeeded = (nextValues) => {
    if (Object.keys(formErrors).length > 0) {
      const result = validateCourseForm(nextValues);
      setFormErrors(result.errors);
    }
  };

  const handleFieldChange = (name, value) => {
    const nextValues = {
      ...formValues,
      [name]: value,
    };
    setFormValues(nextValues);
    syncErrorsIfNeeded(nextValues);
  };

  const handleSectionTitleChange = (sectionIndex, value) => {
    const nextValues = {
      ...formValues,
      syllabus: formValues.syllabus.map((section, index) =>
        index === sectionIndex ? { ...section, sectionTitle: value } : section,
      ),
    };
    setFormValues(nextValues);
    syncErrorsIfNeeded(nextValues);
  };

  const handleLessonChange = (sectionIndex, lessonIndex, value) => {
    const nextValues = {
      ...formValues,
      syllabus: formValues.syllabus.map((section, index) =>
        index === sectionIndex
          ? {
              ...section,
              lessons: section.lessons.map((lesson, currentLessonIndex) =>
                currentLessonIndex === lessonIndex
                  ? { ...lesson, title: value }
                  : lesson,
              ),
            }
          : section,
      ),
    };
    setFormValues(nextValues);
    syncErrorsIfNeeded(nextValues);
  };

  const addSection = () => {
    const nextValues = {
      ...formValues,
      syllabus: [
        ...formValues.syllabus,
        createEmptySection(formValues.syllabus.length + 1),
      ],
    };
    setFormValues(nextValues);
    syncErrorsIfNeeded(nextValues);
  };

  const removeSection = (sectionIndex) => {
    if (formValues.syllabus.length === 1) {
      return;
    }

    const nextValues = {
      ...formValues,
      syllabus: formValues.syllabus.filter(
        (_, index) => index !== sectionIndex,
      ),
    };
    setFormValues(nextValues);
    syncErrorsIfNeeded(nextValues);
  };

  const addLesson = (sectionIndex) => {
    const nextValues = {
      ...formValues,
      syllabus: formValues.syllabus.map((section, index) =>
        index === sectionIndex
          ? {
              ...section,
              lessons: [
                ...section.lessons,
                createEmptyLesson(section.lessons.length + 1),
              ],
            }
          : section,
      ),
    };

    setFormValues(nextValues);
    syncErrorsIfNeeded(nextValues);
  };

  const removeLesson = (sectionIndex, lessonIndex) => {
    if (formValues.syllabus[sectionIndex].lessons.length === 1) {
      return;
    }

    const lesson = formValues.syllabus[sectionIndex].lessons[lessonIndex];
    setLessonToDelete({
      sectionIndex,
      lessonIndex,
      lessonTitle: lesson.title || `Lesson ${lessonIndex + 1}`,
    });
  };

  const confirmRemoveLesson = () => {
    if (!lessonToDelete) return;
    const { sectionIndex, lessonIndex } = lessonToDelete;

    const nextValues = {
      ...formValues,
      syllabus: formValues.syllabus.map((section, index) =>
        index === sectionIndex
          ? {
              ...section,
              lessons: section.lessons.filter(
                (_, currentLessonIndex) => currentLessonIndex !== lessonIndex,
              ),
            }
          : section,
      ),
    };

    setFormValues(nextValues);
    syncErrorsIfNeeded(nextValues);
    setLessonToDelete(null);
  };

  const cancelRemoveLesson = () => {
    setLessonToDelete(null);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const submitValues = normalizeCourseFormPayload(formValues);
    const validationResult = validateCourseForm(submitValues);

    if (!validationResult.success) {
      setFormErrors(validationResult.errors);
      return;
    }

    const payload = validationResult.data;

    try {
      if (mode === "create") {
        const response = await createCourseMutation.mutateAsync(payload);
        showSuccess(response.message || "Course created successfully");
      } else {
        const response = await updateCourseMutation.mutateAsync({
          courseId: courseId || "",
          courseData: payload,
        });
        showSuccess(response.message || "Course updated successfully");
      }

      navigate("/teacher/courses");
    } catch (error) {
      showError(error?.response?.data?.message || "Something went wrong");
    }
  };

  return {
    formValues,
    formErrors,
    isSubmitting:
      createCourseMutation.isPending || updateCourseMutation.isPending,

    lessonToDelete,

    handleFieldChange,
    handleSectionTitleChange,
    handleLessonChange,
    addSection,
    removeSection,
    addLesson,
    removeLesson,
    confirmRemoveLesson,
    cancelRemoveLesson,
    handleSubmit,
  };
};
