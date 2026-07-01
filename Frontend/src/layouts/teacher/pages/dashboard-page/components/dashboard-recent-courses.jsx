const courses = [
  'Full Stack Foundations',
  'Advanced React',
  'Node.js APIs',
  'System Design'
]

function RecentCourses () {
  return (
    <div className='border border-black/5 bg-white p-5 sm:p-6'>
      <h2 className='text-xl font-semibold tracking-tight sm:text-2xl'>
        Recent Courses
      </h2>

      <div className='mt-8 space-y-5'>
        {courses.map(course => (
          <div
            key={course}
            className='flex flex-col gap-3 border-b border-black/5 pb-4 sm:flex-row sm:items-center sm:justify-between'
          >
            <div>
              <h3 className='font-medium'>
                {course}
              </h3>

              <p className='mt-1 text-sm text-black/40'>
                Updated 2 days ago
              </p>
            </div>

            <button className='text-left text-sm transition hover:opacity-50 sm:text-right'>
              View
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default RecentCourses
