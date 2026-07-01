const StudentHomeHero = ({
  totalCourses,
  categoryCount
}) => {
  return (
    <section className='border border-black/5 bg-white p-6 md:p-8'>
      <p className='text-xs uppercase tracking-[0.3em] text-black/35'>
        Student Library
      </p>

      <div className='mt-5 grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-end'>
        <div>
          <h1 className='text-4xl font-semibold tracking-tight md:text-5xl'>
            Find your next course and unlock the full learning path
          </h1>

          <p className='mt-4 max-w-2xl text-sm leading-7 text-black/60 md:text-base'>
            Browse published courses, compare pricing and review the curriculum before you enroll in your next learning path.
          </p>
        </div>

        <div className='grid gap-4 sm:grid-cols-2'>
          <div className='border border-black/10 bg-[#f5f5f5] p-5'>
            <p className='text-xs uppercase tracking-[0.3em] text-black/35'>
              Live Courses
            </p>

            <p className='mt-4 text-4xl font-semibold tracking-tight'>
              {totalCourses}
            </p>
          </div>

          <div className='border border-black/10 bg-[#f5f5f5] p-5'>
            <p className='text-xs uppercase tracking-[0.3em] text-black/35'>
              Categories
            </p>

            <p className='mt-4 text-4xl font-semibold tracking-tight'>
              {categoryCount}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default StudentHomeHero
