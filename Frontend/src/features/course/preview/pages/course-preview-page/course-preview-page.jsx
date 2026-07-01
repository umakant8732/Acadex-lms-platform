import CoursePreviewContent from '../../components/course-preview-content.jsx'
import { useCoursePreviewPage } from '../../hooks/use-course-preview-page.js'
import PageLoader from '../../../../../shared/ui/feedback/page-loader.jsx'
import SectionQueryError from '../../../../../shared/ui/feedback/section-query-error.jsx'

const CoursePreviewPage = () => {
  const {
    course,
    isLoading,
    isError,
    error,
    refetchCourse,
    checkoutAction,
    checkoutIdentity
  } = useCoursePreviewPage()

  if (isLoading) {
    return <PageLoader />
  }

  if (isError) {
    return (
      <div className='min-h-screen px-6 py-20'>
        <SectionQueryError
          variant='error'
          title='Unable to load course details'
          message={
            error?.response?.data?.message ||
            'Something went wrong while loading this course.'
          }
          actionLabel='Try Again'
          onAction={refetchCourse}
        />
      </div>
    )
  }

  if (!course) {
    return (
      <div className='min-h-screen px-6 py-20'>
        <SectionQueryError
          variant='empty'
          title='Course not found'
          message='We could not find the requested course.'
        />
      </div>
    )
  }

  return (
    <CoursePreviewContent
      course={course}
      checkoutAction={checkoutAction}
      checkoutIdentity={checkoutIdentity}
    />
  )
}

export default CoursePreviewPage

