const SkeletonBlock = ({ className = '' }) => {
  return (
    <div
      className={`bg-black/5 animate-pulse ${className}`}
    />
  )
}

const PageLoader = () => {
  return (
    <div
      role='status'
      aria-live='polite'
      className='relative min-h-screen overflow-hidden bg-[#f5f5f5] text-black'
    >
      <div className='absolute inset-x-0 top-0 h-1 bg-black/5'>
        <div className='h-full w-1/3 bg-black animate-[pulse_1s_ease-in-out_infinite]' />
      </div>

      <div className='mx-auto flex min-h-screen max-w-7xl flex-col px-5 py-5 md:px-8'>
        <header className='flex h-16 items-center justify-between border-b border-black/5 bg-white px-4 md:px-6'>
          <div className='flex items-center gap-3'>
            <div className='flex h-10 w-10 items-center justify-center bg-black text-sm font-semibold text-white'>
              AC
            </div>

            <div>
              <p className='text-sm font-semibold leading-none'>Acadex Platform</p>
              <p className='mt-1 text-xs text-black/40'>Loading workspace</p>
            </div>
          </div>

          <div className='hidden items-center gap-3 md:flex'>
            <SkeletonBlock className='h-2 w-16' />
            <SkeletonBlock className='h-2 w-20' />
            <SkeletonBlock className='h-9 w-9' />
          </div>
        </header>

        <main className='grid flex-1 gap-5 py-5 md:grid-cols-[240px_1fr]'>
          <aside className='hidden border border-black/5 bg-white p-4 md:block'>
            <SkeletonBlock className='h-9 w-full' />

            <div className='mt-8 space-y-3'>
              <SkeletonBlock className='h-10 w-full' />
              <SkeletonBlock className='h-10 w-11/12' />
              <SkeletonBlock className='h-10 w-full' />
              <SkeletonBlock className='h-10 w-10/12' />
            </div>
          </aside>

          <section className='border border-black/5 bg-white p-5 md:p-8'>
            <div className='flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between'>
              <div>
                <SkeletonBlock className='h-3 w-24' />
                <SkeletonBlock className='mt-4 h-10 w-64 max-w-full' />
              </div>

              <div className='flex items-center gap-3'>
                <SkeletonBlock className='h-10 w-28' />
                <SkeletonBlock className='h-10 w-10' />
              </div>
            </div>

            <div className='mt-10 grid gap-4 md:grid-cols-3'>
              <SkeletonBlock className='h-28 w-full' />
              <SkeletonBlock className='h-28 w-full' />
              <SkeletonBlock className='h-28 w-full' />
            </div>

            <div className='mt-8 grid gap-5 lg:grid-cols-[1.2fr_0.8fr]'>
              <div className='border border-black/5 p-5'>
                <SkeletonBlock className='h-4 w-32' />

                <div className='mt-8 flex h-48 items-end gap-3'>
                  <SkeletonBlock className='h-20 flex-1' />
                  <SkeletonBlock className='h-36 flex-1' />
                  <SkeletonBlock className='h-28 flex-1' />
                  <SkeletonBlock className='h-44 flex-1' />
                  <SkeletonBlock className='h-32 flex-1' />
                </div>
              </div>

              <div className='border border-black/5 p-5'>
                <SkeletonBlock className='h-4 w-36' />

                <div className='mt-8 space-y-4'>
                  <SkeletonBlock className='h-12 w-full' />
                  <SkeletonBlock className='h-12 w-full' />
                  <SkeletonBlock className='h-12 w-full' />
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>

      <div className='pointer-events-none absolute inset-0 flex items-center justify-center px-5'>
        <div className='flex items-center gap-4 border border-black/10 bg-white/90 px-5 py-4 shadow-sm backdrop-blur-md'>
          <div className='relative h-11 w-11 shrink-0'>
            <div className='absolute inset-0 border border-black/10' />
            <div className='absolute inset-0 animate-spin border border-transparent border-t-black' />
            <div className='absolute inset-4 bg-emerald-500' />
          </div>

          <div>
            <p className='text-sm font-semibold'>Preparing your learning space</p>
            <p className='mt-1 text-xs text-black/50'>
              Courses, progress and dashboard are almost ready.
            </p>
          </div>
        </div>
      </div>

      <span className='sr-only'>Loading Acadex Platform</span>
    </div>
  )
}

export default PageLoader
