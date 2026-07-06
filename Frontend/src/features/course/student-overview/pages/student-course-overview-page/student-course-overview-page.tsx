import SectionQueryError from '../../../../../shared/ui/feedback/section-query-error'

import StudentCourseOverviewContent from '../../components/student-course-overview-components/student-course-overview-content'
import StudentCourseOverviewHero from '../../components/student-course-overview-components/student-course-overview-hero'
import { useStudentCourseOverviewPage } from '../../hooks/use-student-course-overview-page'

const StudentCourseOverviewPage = () => {
  const {
    courseId,
    course,
    sections,
    contentStats,
    primaryActionPath,
    previewActionPath,
    checkoutActionPath,
    canWatchPreview,
    isPurchased,
    isLoading,
    isError,
    error,
    refetchPage
  } = useStudentCourseOverviewPage()

  if (isLoading) {
    return (
      <div className='border border-black/10 bg-white p-6 text-sm text-black/60'>
        Loading course overview...
      </div>
    )
  }

  if (isError) {
    return (
      <SectionQueryError
        variant='error'
        eyebrow='Student Course Overview'
        title='Unable to load course overview'
        message={
          error?.response?.data?.message ||
          'Something went wrong while fetching this student course overview.'
        }
        actionLabel='Try Again'
        onAction={refetchPage}
      />
    )
  }

  if (!course) {
    return (
      <SectionQueryError
        variant='empty'
        eyebrow='Student Course Overview'
        title='Course not found'
        message='We could not find the requested course.'
        onAction={undefined}
      />
    )
  }

  return (
    <section className='space-y-8'>
      <StudentCourseOverviewHero
        course={course}
        contentStats={contentStats}
        primaryActionPath={primaryActionPath}
        previewActionPath={previewActionPath}
        checkoutActionPath={checkoutActionPath}
        canWatchPreview={canWatchPreview}
      />

      <StudentCourseOverviewContent
        courseId={courseId}
        sections={sections}
        contentStats={contentStats}
        isPurchased={isPurchased}
      />
    </section>
  )
}

export default StudentCourseOverviewPage





