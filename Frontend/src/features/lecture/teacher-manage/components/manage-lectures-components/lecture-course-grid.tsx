import React from 'react'
import LectureCourseCard from './lecture-course-card.js'
import type { LectureManageCourse } from '../../types/teacher-lecture-types'

export interface LectureCourseGridProps {
  courses: LectureManageCourse[]
  onCourseSelect: (courseId: string) => void
}

const LectureCourseGrid: React.FC<LectureCourseGridProps> = ({ courses, onCourseSelect }) => {
  return (
    <div className='grid gap-5 md:grid-cols-2 xl:grid-cols-3'>
      {courses.map(course => (
        <LectureCourseCard
          key={course._id}
          course={course}
          onSelect={onCourseSelect}
        />
      ))}
    </div>
  )
}

export default LectureCourseGrid
