import { FiCheck } from 'react-icons/fi'

const courseValues = [
  'Lifetime access to the course',
  'Project based learning',
  'Certificate after completion',
  'Access on mobile and desktop',
  'Beginner friendly syllabus',
  'Practical production concepts'
]

const CourseValueList = () => {
  return (
    <div className='grid gap-3 sm:grid-cols-2'>
      {courseValues.map(value => (
        <div
          key={value}
          className='flex items-center gap-3 border border-black/10 bg-white px-4 py-3 text-sm text-black/70'
        >
          <span className='flex h-6 w-6 shrink-0 items-center justify-center bg-black text-white'>
            <FiCheck size={14} />
          </span>

          <span>{value}</span>
        </div>
      ))}
    </div>
  )
}

export default CourseValueList
