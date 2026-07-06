import { motion } from 'framer-motion'

import CourseCard from './course-card'
import PageLoader from '../../../../../shared/ui/feedback/page-loader.jsx'
import SectionQueryError from '../../../../../shared/ui/feedback/section-query-error'
import { usePublishedCourseCatalog } from '../../../../../features/course/catalog/hooks/use-published-course-catalog.js'
import { getApiErrorMessage } from '../../../../../shared/utils/get-api-error-message'

const CoursesSection = () => {
  const {
    courses,
    isLoading,
    isError,
    error,
    isSuccess,
    refetchCourses
  } = usePublishedCourseCatalog()

  if (isLoading) {
    return <PageLoader />
  }

  return (
    <section id='courses' className='px-6 py-24'>
      <div className='max-w-7xl mx-auto'>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className='text-center mb-20'
        >
          <p className='uppercase tracking-[0.3em] text-sm text-black/40'>
            Courses
          </p>

          <h2 className='mt-6 text-5xl md:text-6xl font-semibold tracking-tight'>
            Explore Popular
            <br />
            Courses
          </h2>
        </motion.div>

        {isError && (
          <SectionQueryError
            variant='error'
            eyebrow='Course Catalog'
            title='Unable to load courses'
            message={getApiErrorMessage(
              error,
              'Something went wrong while loading published courses.'
            )}
            actionLabel='Try Again'
            onAction={refetchCourses}
          />
        )}

        {isSuccess && courses.length === 0 && (
          <SectionQueryError
            variant='empty'
            eyebrow='Course Catalog'
            title='No published courses available'
            message='New courses will appear here as soon as teachers publish them.'
            onAction={undefined}
          />
        )}

        {isSuccess && courses.length > 0 && (
          <div className='grid md:grid-cols-2 xl:grid-cols-3 gap-12'>
            {courses.map(course => (
              <CourseCard key={course._id} course={course} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

export default CoursesSection



