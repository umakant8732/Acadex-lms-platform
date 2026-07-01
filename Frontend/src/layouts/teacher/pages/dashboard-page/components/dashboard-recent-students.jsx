const students = [
  'Rahul Sharma',
  'Aman Verma',
  'Priya Patel',
  'Rohit Singh'
]

function RecentStudents () {
  return (
    <div className='border border-black/5 bg-white p-5 sm:p-6'>
      <h2 className='text-xl font-semibold tracking-tight sm:text-2xl'>
        Recent Students
      </h2>

      <div className='mt-8 space-y-5'>
        {students.map(student => (
          <div
            key={student}
            className='flex flex-col gap-3 border-b border-black/5 pb-4 sm:flex-row sm:items-center sm:justify-between'
          >
            <div className='flex items-center gap-4'>
              <div className='flex h-10 w-10 items-center justify-center bg-black text-sm font-medium text-white'>
                {student[0]}
              </div>

              <div>
                <h3 className='font-medium'>
                  {student}
                </h3>

                <p className='text-sm text-black/40'>
                  Joined recently
                </p>
              </div>
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

export default RecentStudents
