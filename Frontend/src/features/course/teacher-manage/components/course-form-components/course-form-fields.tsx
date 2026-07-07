import React from 'react'
import { FiPlus, FiTrash2 } from 'react-icons/fi'
import type { CourseFormValues, SectionFormInput, LessonFormInput } from '../../types/teacher-course-types'

export interface FieldErrorProps {
  message?: string
}

const FieldError: React.FC<FieldErrorProps> = ({ message }) => {
  if (!message) {
    return null
  }

  return <p className='mt-2 text-xs text-red-600'>{message}</p>
}

const getLessonErrorMessage = (lessonError: any): string => {
  if (!lessonError) {
    return ''
  }

  if (typeof lessonError === 'string') {
    return lessonError
  }

  return lessonError.title || ''
}

export interface CourseFormFieldsProps {
  formValues: CourseFormValues
  formErrors: any
  isSubmitting: boolean
  onFieldChange: (name: keyof CourseFormValues, value: any) => void
  onSectionTitleChange: (sectionIndex: number, value: string) => void
  onLessonChange: (sectionIndex: number, lessonIndex: number, value: string) => void
  onAddSection: () => void
  onRemoveSection: (sectionIndex: number) => void
  onAddLesson: (sectionIndex: number) => void
  onRemoveLesson: (sectionIndex: number, lessonIndex: number) => void
}

const CourseFormFields: React.FC<CourseFormFieldsProps> = ({
  formValues,
  formErrors,
  isSubmitting,
  onFieldChange,
  onSectionTitleChange,
  onLessonChange,
  onAddSection,
  onRemoveSection,
  onAddLesson,
  onRemoveLesson
}) => {
  return (
    <div className='space-y-8'>
      <section className='border border-black/10 bg-white p-6'>
        <div className='grid gap-6 md:grid-cols-2'>
          <div className='md:col-span-2'>
            <label className='text-sm font-medium text-black'>Title</label>
            <input
              type='text'
              value={formValues.title}
              disabled={isSubmitting}
              onChange={event => onFieldChange('title', event.target.value)}
              placeholder='Master React from Basics to Advanced'
              className='mt-2 w-full border border-black/10 bg-white px-4 py-3 text-sm outline-none transition focus:border-black'
            />
            <FieldError message={formErrors.title} />
          </div>

          <div className='md:col-span-2'>
            <label className='text-sm font-medium text-black'>Subtitle</label>
            <input
              type='text'
              value={formValues.subtitle}
              disabled={isSubmitting}
              onChange={event => onFieldChange('subtitle', event.target.value)}
              placeholder='Build projects and understand core concepts'
              className='mt-2 w-full border border-black/10 bg-white px-4 py-3 text-sm outline-none transition focus:border-black'
            />
            <FieldError message={formErrors.subtitle} />
          </div>

          <div className='md:col-span-2'>
            <label className='text-sm font-medium text-black'>Description</label>
            <textarea
              rows={5}
              value={formValues.description}
              disabled={isSubmitting}
              onChange={event => onFieldChange('description', event.target.value)}
              placeholder='Write a detailed course description'
              className='mt-2 w-full border border-black/10 bg-white px-4 py-3 text-sm outline-none transition focus:border-black'
            />
            <FieldError message={formErrors.description} />
          </div>

          <div>
            <label className='text-sm font-medium text-black'>Category</label>
            <input
              type='text'
              value={formValues.category}
              disabled={isSubmitting}
              onChange={event => onFieldChange('category', event.target.value)}
              placeholder='Web Development'
              className='mt-2 w-full border border-black/10 bg-white px-4 py-3 text-sm outline-none transition focus:border-black'
            />
            <FieldError message={formErrors.category} />
          </div>

          <div>
            <label className='text-sm font-medium text-black'>Level</label>
            <select
              value={formValues.level}
              disabled={isSubmitting}
              onChange={event => onFieldChange('level', event.target.value as any)}
              className='mt-2 w-full border border-black/10 bg-white px-4 py-3 text-sm outline-none transition focus:border-black'
            >
              <option value='beginner'>Beginner</option>
              <option value='intermediate'>Intermediate</option>
              <option value='advanced'>Advanced</option>
            </select>
            <FieldError message={formErrors.level} />
          </div>

          <div>
            <label className='text-sm font-medium text-black'>Price</label>
            <input
              type='number'
              min='0'
              value={formValues.price}
              disabled={isSubmitting}
              onChange={event => onFieldChange('price', event.target.value)}
              className='mt-2 w-full border border-black/10 bg-white px-4 py-3 text-sm outline-none transition focus:border-black'
            />
            <FieldError message={formErrors.price} />
          </div>

          <div>
            <label className='text-sm font-medium text-black'>
              Original Price
            </label>
            <input
              type='number'
              min='0'
              value={formValues.originalPrice}
              disabled={isSubmitting}
              onChange={event =>
                onFieldChange('originalPrice', event.target.value)
              }
              className='mt-2 w-full border border-black/10 bg-white px-4 py-3 text-sm outline-none transition focus:border-black'
            />
            <FieldError message={formErrors.originalPrice} />
          </div>

          <div>
            <label className='text-sm font-medium text-black'>Lectures</label>
            <input
              type='number'
              min='0'
              value={formValues.lectures}
              disabled={isSubmitting}
              onChange={event => onFieldChange('lectures', event.target.value)}
              className='mt-2 w-full border border-black/10 bg-white px-4 py-3 text-sm outline-none transition focus:border-black'
            />
            <FieldError message={formErrors.lectures} />
          </div>

          <div>
            <label className='text-sm font-medium text-black'>Projects</label>
            <input
              type='number'
              min='0'
              value={formValues.projects}
              disabled={isSubmitting}
              onChange={event => onFieldChange('projects', event.target.value)}
              className='mt-2 w-full border border-black/10 bg-white px-4 py-3 text-sm outline-none transition focus:border-black'
            />
            <FieldError message={formErrors.projects} />
          </div>
        </div>
      </section>

      <section className='border border-black/10 bg-white p-6'>
        <div className='flex items-center justify-between gap-4'>
          <div>
            <p className='text-xs uppercase tracking-[0.3em] text-black/35'>
              Course Content
            </p>
            <h2 className='mt-2 text-2xl font-semibold tracking-tight text-black'>
              Syllabus
            </h2>
          </div>

          <button
            type='button'
            onClick={onAddSection}
            disabled={isSubmitting}
            className='inline-flex items-center gap-2 border border-black/10 px-4 py-2 text-sm font-medium text-black transition hover:bg-black hover:text-white'
          >
            <FiPlus size={16} />
            Add Section
          </button>
        </div>

        <div className='mt-6 space-y-5'>
          {formValues.syllabus.map((section, sectionIndex) => (
            <div
              key={section._id || `section-${sectionIndex}`}
              className='border border-black/10 bg-[#fafafa] p-5'
            >
              <div className='flex items-start justify-between gap-4'>
                <div className='flex-1'>
                  <label className='text-sm font-medium text-black'>
                    Section Title
                  </label>

                  <input
                    type='text'
                    value={section.sectionTitle}
                    disabled={isSubmitting}
                    onChange={event =>
                      onSectionTitleChange(sectionIndex, event.target.value)
                    }
                    placeholder='Introduction to React'
                    className='mt-2 w-full border border-black/10 bg-white px-4 py-3 text-sm outline-none transition focus:border-black'
                  />

                  <FieldError
                    message={formErrors.syllabus?.[sectionIndex]?.sectionTitle}
                  />
                </div>

                {formValues.syllabus.length > 1 && (
                  <button
                    type='button'
                    onClick={() => onRemoveSection(sectionIndex)}
                    disabled={isSubmitting}
                    className='mt-7 flex h-11 w-11 items-center justify-center border border-red-200 text-red-600 transition hover:bg-red-600 hover:text-white'
                  >
                    <FiTrash2 size={16} />
                  </button>
                )}
              </div>

              <div className='mt-5 space-y-3'>
                {section.lessons.map((lesson, lessonIndex) => (
                  <div key={lesson._id || `lesson-${sectionIndex}-${lessonIndex}`}>
                    <div className='flex items-start gap-3'>
                      <div className='flex-1'>
                        <label className='text-sm font-medium text-black'>
                          Lesson {lessonIndex + 1}
                        </label>

                        <input
                          type='text'
                          value={lesson.title}
                          disabled={isSubmitting}
                          onChange={event =>
                            onLessonChange(
                              sectionIndex,
                              lessonIndex,
                              event.target.value
                            )
                          }
                          placeholder='What is React?'
                          className='mt-2 w-full border border-black/10 bg-white px-4 py-3 text-sm outline-none transition focus:border-black'
                        />

                        <FieldError
                          message={
                            getLessonErrorMessage(
                              formErrors.syllabus?.[sectionIndex]?.lessons?.[
                                lessonIndex
                              ]
                            )
                          }
                        />
                      </div>

                      {section.lessons.length > 1 && (
                        <button
                          type='button'
                          onClick={() =>
                            onRemoveLesson(sectionIndex, lessonIndex)
                          }
                          disabled={isSubmitting}
                          className='mt-7 flex h-11 w-11 items-center justify-center border border-red-200 text-red-600 transition hover:bg-red-600 hover:text-white'
                        >
                          <FiTrash2 size={16} />
                        </button>
                      )}
                    </div>
                  </div>
                ))}

                <button
                  type='button'
                  onClick={() => onAddLesson(sectionIndex)}
                  disabled={isSubmitting}
                  className='inline-flex items-center gap-2 border border-black/10 px-4 py-2 text-sm font-medium text-black transition hover:bg-black hover:text-white'
                >
                  <FiPlus size={16} />
                  Add Lesson
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

export default CourseFormFields
