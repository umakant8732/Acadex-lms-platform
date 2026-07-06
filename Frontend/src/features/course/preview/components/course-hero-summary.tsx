import { motion } from 'framer-motion'

import { getTotalLessons } from '../../../../shared/utils/course/calculate-course-pricing.js'
import type { CourseHeroSummaryProps } from '../types/course-preview-types'

const fallbackThumbnail =
  'https://images.unsplash.com/photo-1498050108023-c5249f4df085'

interface CourseStatProps {
  label: string
  value: string | number
}

const CourseStat = ({ label, value }: CourseStatProps) => {
  return (
    <div className='border border-black/10 bg-white px-4 py-3'>
      <p className='text-xs uppercase tracking-[0.2em] text-black/35'>
        {label}
      </p>
      <p className='mt-2 text-sm font-semibold text-black'>{value}</p>
    </div>
  )
}

const CourseHeroSummary = ({ course }: CourseHeroSummaryProps) => {
  const totalLessons = getTotalLessons(course.syllabus)

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      className='space-y-8'
    >
      <div className='overflow-hidden border border-black/10 bg-white'>
        <img
          src={course.thumbnail || fallbackThumbnail}
          alt={course.title}
          className='h-[280px] w-full object-cover sm:h-[360px]'
        />
      </div>

      <div>
        <p className='text-xs uppercase tracking-[0.28em] text-black/40'>
          {course.category}
        </p>

        <h1 className='mt-4 max-w-4xl text-4xl font-semibold leading-tight tracking-tight text-black md:text-6xl'>
          {course.title}
        </h1>

        {course.subtitle && (
          <p className='mt-6 max-w-3xl text-lg leading-8 text-black/60'>
            {course.subtitle}
          </p>
        )}

        {course.description && (
          <p className='mt-5 max-w-4xl text-base leading-8 text-black/65'>
            {course.description}
          </p>
        )}
      </div>

      <div className='grid gap-3 sm:grid-cols-2 lg:grid-cols-4'>
        <CourseStat label='Level' value={course.level || 'Beginner'} />
        <CourseStat
          label='Lessons'
          value={totalLessons || course.lectures || 'Not added'}
        />
        <CourseStat
          label='Duration'
          value={course.duration ? `${course.duration} Hours` : 'Self paced'}
        />
        <CourseStat
          label='Projects'
          value={course.projects ? `${course.projects} Projects` : 'Included'}
        />
      </div>
    </motion.div>
  )
}

export default CourseHeroSummary
