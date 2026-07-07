import React from 'react'
import { FiBookOpen, FiLayers } from 'react-icons/fi'
import type { LectureManageCourse } from '../../types/teacher-lecture-types'

export interface LectureCourseCardProps {
  course: LectureManageCourse
  onSelect: (courseId: string) => void
}

const LectureCourseCard: React.FC<LectureCourseCardProps> = ({ course, onSelect }) => {
  return (
    <button
      type='button'
      onClick={() => onSelect(course._id)}
      className='group border border-black/10 bg-white p-5 text-left transition hover:border-black hover:shadow-sm'
    >
      {course.thumbnail ? (
        <img
          src={course.thumbnail}
          alt={course.title}
          className='h-40 w-full border border-black/10 object-cover'
        />
      ) : (
        <div className='flex h-40 w-full items-center justify-center border border-black/10 bg-[#f5f5f5] text-sm font-medium text-black/45'>
          No Thumbnail
        </div>
      )}

      <div className='mt-5'>
        <div className='flex items-center justify-between gap-3'>
          <span className='text-xs uppercase tracking-[0.25em] text-black/35'>
            {course.category || 'Uncategorized'}
          </span>

          <span className='border border-black/10 px-2 py-1 text-xs font-medium capitalize text-black/60'>
            {course.level || 'beginner'}
          </span>
        </div>

        <h2 className='mt-3 line-clamp-2 text-lg font-semibold leading-6 text-black'>
          {course.title}
        </h2>

        <p className='mt-2 line-clamp-2 text-sm leading-6 text-black/60'>
          {course.subtitle || 'No subtitle added yet.'}
        </p>

        <div className='mt-5 grid grid-cols-2 gap-3'>
          <div className='border border-black/10 bg-[#fafafa] p-3'>
            <div className='flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-black/35'>
              <FiLayers size={14} />
              Sections
            </div>

            <p className='mt-2 text-lg font-semibold text-black'>
              {course.totalSections ?? 0}
            </p>
          </div>

          <div className='border border-black/10 bg-[#fafafa] p-3'>
            <div className='flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-black/35'>
              <FiBookOpen size={14} />
              Lessons
            </div>

            <p className='mt-2 text-lg font-semibold text-black'>
              {course.totalLessons ?? 0}
            </p>
          </div>
        </div>

        <div className='mt-5 text-sm font-medium text-black transition group-hover:underline'>
          Manage lectures
        </div>
      </div>
    </button>
  )
}

export default LectureCourseCard
