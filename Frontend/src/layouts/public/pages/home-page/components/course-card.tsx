import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

import { getCourseDiscount } from '../../../../../shared/utils/course/calculate-course-pricing.js'
import { formatCoursePrice } from '../../../../../shared/utils/course/format-course-price.js'
import type { CourseCardProps } from '../../../../../features/course/catalog/types/course-catalog-types'

const CourseThumbnailPlaceholder = ({ title, category }: { title: string; category?: string }) => {
  const getInitials = (str: string) => {
    return str
      .split(' ')
      .slice(0, 2)
      .map(word => word[0])
      .join('')
      .toUpperCase()
  }

  return (
    <div className='w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-neutral-950 to-neutral-800 text-white relative overflow-hidden select-none border border-black/5'>
      <div className='absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.05),transparent)] pointer-events-none' />
      <div className='absolute -bottom-8 -right-6 text-[10rem] font-black text-white/[0.02] select-none uppercase tracking-tighter'>
        {getInitials(title)}
      </div>
      <div className='z-10 flex flex-col items-center text-center p-6'>
        <div className='w-12 h-12 flex items-center justify-center bg-white/5 border border-white/10 rounded-full mb-3 shadow-lg'>
          <svg className='w-5 h-5 text-white/70' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253' />
          </svg>
        </div>
        {category && (
          <span className='text-[9px] tracking-[0.25em] font-bold text-white/40 uppercase mb-1.5'>
            {category}
          </span>
        )}
        <span className='text-lg font-bold tracking-tight text-white/90 max-w-[200px] leading-tight line-clamp-2 px-2'>
          {title}
        </span>
      </div>
    </div>
  )
}

const CourseCard = ({ course }: CourseCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -10 }}
      transition={{ duration: 0.3 }}
      className='group'
    >
      <div className='overflow-hidden bg-white'>
        <div className='overflow-hidden h-72 relative'>
          {course.thumbnail ? (
            <img
              src={course.thumbnail}
              alt={course.title}
              className='h-full w-full object-cover transition duration-500 group-hover:scale-105'
            />
          ) : (
            <div className='w-full h-full transition duration-500 group-hover:scale-105'>
              <CourseThumbnailPlaceholder title={course.title} category={course.category} />
            </div>
          )}
        </div>

        <div className='pt-6'>
          <div className='flex items-center justify-between'>
            <span className='text-sm uppercase tracking-widest text-black/40'>
              {course.category}
            </span>

            <span className='text-sm text-black/40'>
              {getCourseDiscount(course.price, course.originalPrice)}% OFF
            </span>
          </div>

          <h2 className='mt-4 text-3xl font-semibold tracking-tight'>
            {course.title}
          </h2>

          <p className='mt-4 text-black/60 leading-7'>{course.description}</p>

          <div className='mt-8 flex items-end gap-3'>
            <span className='text-4xl font-semibold'>
              {formatCoursePrice(course.price)}
            </span>

            <span className='line-through text-black/30 pb-1'>
              {formatCoursePrice(course.originalPrice)}
            </span>
          </div>

          <Link
            to={`/course-details-page/${course._id}`}
            className='mt-8 inline-flex items-center gap-3 text-sm font-semibold tracking-[0.15em] uppercase group'
          >
            <span className='group-hover:translate-x-1 transition duration-300'>
              View Course Details
            </span>

            <span className='transition duration-300 group-hover:translate-x-2'>
              -&gt;
            </span>
          </Link>
        </div>
      </div>
    </motion.div>
  )
}

export default CourseCard
