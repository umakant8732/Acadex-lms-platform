import React from 'react'
import SectionQueryError from '../../../../../shared/ui/feedback/section-query-error.js'
import ViewCourseContent from '../../components/view-course-components/view-course-content.js'
import { useCourseDetailsPage } from '../../hooks/use-course-details-page.js'

const ViewCoursePage: React.FC = () => {
  const {
    course,
    isLoading,
    isError,
    error,
    refetchCourse
  } = useCourseDetailsPage()

  if (isLoading) {
    return (
      <div className='border border-black/10 bg-white p-6 text-sm text-black/60'>
        Loading course details...
      </div>
    )
  }

  if (isError) {
    return (
      <SectionQueryError
        variant='error'
        title='Unable to load course details'
        message={
          (error as any)?.response?.data?.message ||
          error?.message ||
          'Something went wrong while fetching this course.'
        }
        actionLabel='Try Again'
        onAction={refetchCourse}
      />
    )
  }

  if (!course) {
    return (
      <SectionQueryError
        variant='empty'
        title='Course not found'
        message='We could not find the requested course.'
      />
    )
  }

  return <ViewCourseContent course={course} />
}

export default ViewCoursePage
