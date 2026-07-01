import SectionQueryError from '../../../../../shared/ui/feedback/section-query-error.jsx'
import UpdateCourseContent from '../../components/update-course-components/update-course-content.jsx'
import { useCourseDetailsPage } from '../../hooks/use-course-details-page.js'

function UpdateCoursePage() {
  const {
    courseId,
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
          error?.response?.data?.message ||
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

  return <UpdateCourseContent courseId={courseId} course={course} />
}

export default UpdateCoursePage

