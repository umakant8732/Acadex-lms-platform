import React from 'react'
import LectureCourseGrid from '../../components/manage-lectures-components/lecture-course-grid.js'
import SectionQueryError from '../../../../../shared/ui/feedback/section-query-error.js'
import { useManageLecturesPage } from '../../hooks/use-manage-lectures-page.js'

const ManageLecturesPage: React.FC = () => {
  const {
    courses,
    isLoading,
    isError,
    error,
    refetchCourses,
    goToCourseCurriculumPage
  } = useManageLecturesPage()

  return (
    <section className='space-y-6'>
      <div className='border border-black/10 bg-white p-6'>
        <div>
          <p className='text-xs uppercase tracking-[0.3em] text-black/35'>
            Lecture Manager
          </p>

          <h1 className='mt-3 text-2xl font-semibold tracking-tight text-black'>
            Manage Lectures
          </h1>

          <p className='mt-2 max-w-2xl text-sm leading-6 text-black/60'>
            Select a course to upload and manage videos for its syllabus lessons.
          </p>
        </div>
      </div>

      {isLoading ? (
        <div className='border border-black/10 bg-white p-6 text-sm text-black/60'>
          Loading courses...
        </div>
      ) : isError ? (
        <SectionQueryError
          variant='error'
          title='Unable to load courses'
          message={
            (error as any)?.response?.data?.message ||
            error?.message ||
            'Something went wrong while fetching lecture courses.'
          }
          actionLabel='Try Again'
          onAction={refetchCourses}
        />
      ) : courses.length === 0 ? (
        <SectionQueryError
          variant='empty'
          title='No courses found'
          message='Create a course first, then you can upload lectures for its syllabus lessons.'
        />
      ) : (
        <LectureCourseGrid
          courses={courses}
          onCourseSelect={goToCourseCurriculumPage}
        />
      )}
    </section>
  )
}

export default ManageLecturesPage
