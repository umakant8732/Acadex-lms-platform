import React from 'react'
import { Link } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi'

export interface LectureCurriculumHeaderProps {
  course: {
    _id: string
    title: string
    subtitle?: string | null
    thumbnail?: string | null
  }
}

const LectureCurriculumHeader: React.FC<LectureCurriculumHeaderProps> = ({ course }) => {
  return (
    <div className='border border-black/10 bg-white p-6'>
      <Link
        to='/teacher/lectures'
        className='inline-flex items-center gap-2 text-sm font-medium text-black/60 transition hover:text-black'
      >
        <FiArrowLeft size={16} />
        Back to courses
      </Link>

      <div className='mt-6 flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between'>
        <div className='max-w-3xl'>
          <p className='text-xs uppercase tracking-[0.3em] text-black/35'>
            Lecture Curriculum
          </p>

          <h1 className='mt-3 text-3xl font-semibold tracking-tight text-black'>
            {course.title}
          </h1>

          <p className='mt-3 text-sm leading-7 text-black/60'>
            {course.subtitle || 'Upload videos against this course syllabus.'}
          </p>
        </div>

        {course.thumbnail ? (
          <img
            src={course.thumbnail}
            alt={course.title}
            className='h-36 w-full max-w-xs border border-black/10 object-cover'
          />
        ) : (
          <div className='flex h-36 w-full max-w-xs items-center justify-center border border-black/10 bg-[#f5f5f5] text-sm font-medium text-black/45'>
            No Thumbnail
          </div>
        )}
      </div>
    </div>
  )
}

export default LectureCurriculumHeader
