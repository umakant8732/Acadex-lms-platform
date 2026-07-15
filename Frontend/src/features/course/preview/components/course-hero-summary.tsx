import { motion } from 'framer-motion'

import { getTotalLessons } from '../../../../shared/utils/course/calculate-course-pricing.js'
import type { CourseHeroSummaryProps } from '../types/course-preview-types'

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
      <div className='absolute -bottom-8 -right-6 text-[12rem] font-black text-white/[0.02] select-none uppercase tracking-tighter'>
        {getInitials(title)}
      </div>
      <div className='z-10 flex flex-col items-center text-center p-6'>
        <div className='w-16 h-16 flex items-center justify-center bg-white/5 border border-white/10 rounded-full mb-4 shadow-lg'>
          <svg className='w-6 h-6 text-white/70' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253' />
          </svg>
        </div>
        {category && (
          <span className='text-[10px] tracking-[0.25em] font-bold text-white/40 uppercase mb-2'>
            {category}
          </span>
        )}
        <span className='text-2xl font-bold tracking-tight text-white/90 max-w-md leading-snug line-clamp-2 px-4'>
          {title}
        </span>
      </div>
    </div>
  )
}

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
      <div className='overflow-hidden border border-black/10 bg-white h-[280px] sm:h-[360px] relative'>
        {course.thumbnail ? (
          <img
            src={course.thumbnail}
            alt={course.title}
            className='h-full w-full object-cover'
          />
        ) : (
          <CourseThumbnailPlaceholder title={course.title} category={course.category} />
        )}
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
