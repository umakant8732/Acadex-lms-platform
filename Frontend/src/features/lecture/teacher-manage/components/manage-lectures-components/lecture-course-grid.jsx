import LectureCourseCard from './lecture-course-card.jsx'

const LectureCourseGrid = ({ courses, onCourseSelect }) => {
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
