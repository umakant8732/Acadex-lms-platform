import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

import { getCourseDiscount } from '../../../../../shared/utils/course/calculate-course-pricing.js'
import { formatCoursePrice } from '../../../../../shared/utils/course/format-course-price.js'

const CourseCard = ({ course }) => {
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
        <div className='overflow-hidden'>
          <img
            src={course.thumbnail}
            alt={course.title}
            className='h-72 w-full object-cover transition duration-500 group-hover:scale-105'
          />
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
