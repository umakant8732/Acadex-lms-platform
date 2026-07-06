import CoursePreviewContent from '../../components/course-preview-content'
import { useCoursePreviewPage } from '../../hooks/use-course-preview-page'
import PageLoader from '../../../../../shared/ui/feedback/page-loader.jsx'
import SectionQueryError from '../../../../../shared/ui/feedback/section-query-error'
import { getApiErrorMessage } from '../../../../../shared/utils/get-api-error-message'

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
          eyebrow='Course Preview'
          title='Unable to load course details'
          message={getApiErrorMessage(
            error,
            'Something went wrong while loading this course.'
          )}
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
          eyebrow='Course Preview'
          title='Course not found'
          message='We could not find the requested course.'
          onAction={undefined}
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




