import SectionQueryError from '../../../../../shared/ui/feedback/section-query-error.jsx'
import StudentCourseCard from './student-course-card.jsx'

const CourseCardSkeleton = () => {
  return (
    <div className='flex h-full flex-col overflow-hidden border border-black/5 bg-white'>
      <div className='h-56 animate-pulse bg-black/5' />

      <div className='flex flex-1 flex-col p-6'>
        <div className='h-3 w-28 animate-pulse bg-black/5' />
        <div className='mt-5 h-8 w-4/5 animate-pulse bg-black/5' />
        <div className='mt-3 h-4 w-full animate-pulse bg-black/5' />
        <div className='mt-2 h-4 w-5/6 animate-pulse bg-black/5' />

        <div className='mt-auto pt-7'>
          <div className='h-12 w-full animate-pulse bg-black/5' />
        </div>
      </div>
    </div>
  )
}

const CoursesGrid = ({
  courses,
  isLoading,
  isError,
  error,
  hasActiveSearch,
  onRetry
}) => {
  if (isLoading) {
    return (
      <div className='mt-10 grid items-stretch gap-8 md:grid-cols-2 xl:grid-cols-3'>
        {Array.from({ length: 6 }).map((_, index) => (
          <CourseCardSkeleton key={index} />
        ))}
      </div>
    )
  }

  if (isError) {
    return (
      <SectionQueryError
        title='Unable to load student course library'
        message={
          error?.response?.data?.message ||
          'Something went wrong while fetching student course library.'
        }
        onAction={onRetry}
      />
    )
  }

  if (courses.length === 0) {
    return (
      <SectionQueryError
        variant='empty'
        title={hasActiveSearch ? 'No matching courses found' : 'No published courses available'}
        message={
          hasActiveSearch
            ? 'Try a different course title, category or keyword.'
            : 'Student course library will appear here once published courses are available.'
        }
      />
    )
  }

  return (
    <div className='mt-10 grid items-stretch gap-8 md:grid-cols-2 xl:grid-cols-3'>
      {courses.map(course => (
        <StudentCourseCard
          key={course._id}
          course={course}
        />
      ))}
    </div>
  )
}

export default CoursesGrid

