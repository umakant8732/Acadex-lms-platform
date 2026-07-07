import React from 'react'
import { getLevelClass } from '../../helpers/get-level-class.js'
import { getStatusClass } from '../../helpers/get-status-class.js'
import { getTotalLessons } from '../../../../../shared/utils/course/calculate-course-pricing.js'
import { formatCoursePrice } from '../../../../../shared/utils/course/format-course-price.js'
import type { CourseDetails } from '../../types/teacher-course-types'

export interface ViewCourseContentProps {
  course: CourseDetails & { instructorName?: string }
}

const ViewCourseContent: React.FC<ViewCourseContentProps> = ({ course }) => {
  return (
    <section className='space-y-6'>
      <div className='border border-black/10 bg-white p-6'>
        <div className='flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between'>
          <div className='max-w-3xl'>
            <p className='text-xs uppercase tracking-[0.3em] text-black/35'>
              Course Details
            </p>

            <h1 className='mt-3 text-3xl font-semibold tracking-tight text-black'>
              {course.title}
            </h1>

            <p className='mt-3 text-sm leading-7 text-black/60'>
              {course.subtitle || 'No subtitle added yet.'}
            </p>

            <p className='mt-5 text-sm leading-7 text-black/70'>
              {course.description}
            </p>
          </div>

          {course.thumbnail ? (
            <img
              src={course.thumbnail}
              alt={course.title}
              className='h-48 w-full max-w-sm border border-black/10 object-cover'
            />
          ) : (
            <div className='flex h-48 w-full max-w-sm items-center justify-center border border-black/10 bg-[#f5f5f5] text-lg font-semibold text-black/45'>
              No Thumbnail
            </div>
          )}
        </div>
      </div>

      <div className='grid gap-6 md:grid-cols-2 xl:grid-cols-4'>
        <div className='border border-black/10 bg-white p-5'>
          <p className='text-xs uppercase tracking-[0.25em] text-black/35'>
            Category
          </p>
          <p className='mt-3 text-lg font-semibold text-black'>
            {course.category || 'Uncategorized'}
          </p>
        </div>

        <div className='border border-black/10 bg-white p-5'>
          <p className='text-xs uppercase tracking-[0.25em] text-black/35'>
            Price
          </p>
          <p className='mt-3 text-lg font-semibold text-black'>
            {formatCoursePrice(course.price)}
          </p>
        </div>

        <div className='border border-black/10 bg-white p-5'>
          <p className='text-xs uppercase tracking-[0.25em] text-black/35'>
            Lectures
          </p>
          <p className='mt-3 text-lg font-semibold text-black'>
            {course.lectures ?? 0}
          </p>
        </div>

        <div className='border border-black/10 bg-white p-5'>
          <p className='text-xs uppercase tracking-[0.25em] text-black/35'>
            Projects
          </p>
          <p className='mt-3 text-lg font-semibold text-black'>
            {course.projects ?? 0}
          </p>
        </div>
      </div>

      <div className='grid gap-6 lg:grid-cols-2'>
        <div className='border border-black/10 bg-white p-6'>
          <p className='text-xs uppercase tracking-[0.25em] text-black/35'>
            Course Status
          </p>

          <div className='mt-4 flex flex-wrap items-center gap-3'>
            <span
              className={`inline-flex items-center border px-3 py-1 text-xs font-medium capitalize ${getLevelClass(course.level)}`}
            >
              {course.level || 'beginner'}
            </span>

            <span
              className={`inline-flex items-center border px-3 py-1 text-xs font-medium ${getStatusClass(course.isPublished)}`}
            >
              {course.isPublished ? 'Published' : 'Draft'}
            </span>
          </div>

          <div className='mt-6 grid gap-4 sm:grid-cols-2'>
            <div>
              <p className='text-xs uppercase tracking-[0.25em] text-black/35'>
                Original Price
              </p>
              <p className='mt-2 text-base font-semibold text-black'>
                {formatCoursePrice(course.originalPrice)}
              </p>
            </div>

            <div>
              <p className='text-xs uppercase tracking-[0.25em] text-black/35'>
                Total Lessons
              </p>
              <p className='mt-2 text-base font-semibold text-black'>
                {getTotalLessons(course.syllabus)}
              </p>
            </div>
          </div>
        </div>

        <div className='border border-black/10 bg-white p-6'>
          <p className='text-xs uppercase tracking-[0.25em] text-black/35'>
            Instructor
          </p>
          <p className='mt-3 text-lg font-semibold text-black'>
            {course.instructorName || 'Instructor not available'}
          </p>
        </div>
      </div>

      <div className='border border-black/10 bg-white p-6'>
        <p className='text-xs uppercase tracking-[0.25em] text-black/35'>
          Syllabus
        </p>

        <div className='mt-6 space-y-4'>
          {course.syllabus && course.syllabus.length > 0 ? (
            course.syllabus.map((section, sectionIndex) => (
              <div
                key={section._id || sectionIndex}
                className='border border-black/10 bg-[#fafafa] p-5'
              >
                <h2 className='text-lg font-semibold text-black'>
                  {section.sectionTitle}
                </h2>

                <ul className='mt-4 space-y-2 text-sm text-black/65'>
                  {section.lessons?.map((lesson, lessonIndex) => (
                    <li
                      key={lesson._id || lessonIndex}
                      className='border-b border-black/5 pb-2 last:border-b-0 last:pb-0'
                    >
                      {lesson.title}
                    </li>
                  ))}
                </ul>
              </div>
            ))
          ) : (
            <p className='text-sm text-black/60'>
              No syllabus has been added yet.
            </p>
          )}
        </div>
      </div>
    </section>
  )
}

export default ViewCourseContent
