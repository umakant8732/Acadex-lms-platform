import { Link } from 'react-router-dom'

import { formatCoursePrice } from '../../../../../shared/utils/course/format-course-price.js'
import type { StudentCourseOverviewHeroProps } from '../../types/student-course-overview-types'

// Formats expiry date for student overview header.
const formatExpiryDate = (expiresAt?: string | null) => {
  if (!expiresAt) {
    return null
  }

  return new Date(expiresAt).toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  })
}

const StudentCourseOverviewHero = ({
  course,
  contentStats,
  primaryActionPath,
  previewActionPath,
  checkoutActionPath,
  canWatchPreview
}: StudentCourseOverviewHeroProps) => {
  const courseThumbnail = course.thumbnail?.trim()
  const expiryText = formatExpiryDate(course.access?.expiresAt)
  const isPurchased = Boolean(course.access?.isPurchased)
  const hasPreviewLessons = contentStats.previewLessons > 0

  return (
    <section className='mt-5 border border-black/10 bg-white p-6 lg:p-8'>
      <div className='grid gap-8 lg:grid-cols-[320px_minmax(0,1fr)] lg:items-start'>
        <div className='overflow-hidden border border-black/10 bg-black/5'>
          {courseThumbnail ? (
            <img
              src={courseThumbnail}
              alt={course.title}
              className='h-full w-full object-cover'
            />
          ) : (
            <div className='flex min-h-[220px] items-center justify-center bg-black px-6 text-center text-3xl font-semibold text-white'>
              {course.title}
            </div>
          )}
        </div>

        <div className='space-y-6'>
          <div className='flex flex-wrap items-center justify-between gap-4'>
            <Link
              to='/student'
              className='text-sm font-medium text-black/55 transition hover:text-black'
            >
              Back to courses
            </Link>

            {expiryText && (
              <span className='border border-amber-200 bg-amber-50 px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] text-amber-700'>
                Expires {expiryText}
              </span>
            )}
          </div>

          <div className='space-y-3'>
            <h1 className='max-w-3xl text-4xl font-semibold tracking-tight text-black'>
              {course.title}
            </h1>

            <p className='max-w-3xl text-sm leading-7 text-black/60'>
              {course.subtitle || course.description}
            </p>

            <div className='flex flex-wrap gap-3 text-xs uppercase tracking-[0.18em] text-black/45'>
              <span>{contentStats.totalSections} sections</span>
              <span>{contentStats.totalLessons} lessons</span>
              <span>{contentStats.previewLessons} preview lessons</span>
              <span>{course.level}</span>
            </div>
          </div>

          <div className='flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between'>
            <div className='min-w-0 flex-1'>
              {isPurchased ? (
                <div className='space-y-3'>
                  <p className='text-sm text-black/60'>
                    Overall progress {course.access.progressPercent ?? 0}%
                  </p>

                  <div className='h-2.5 overflow-hidden bg-black/10'>
                    <div
                      className='h-full bg-[#16a34a]'
                      style={{
                        width: `${course.access.progressPercent ?? 0}%`
                      }}
                    />
                  </div>
                </div>
              ) : (
                <div className='space-y-3'>
                  <div className='flex items-end gap-3'>
                    <span className='text-3xl font-semibold text-black'>
                      {formatCoursePrice(course.price)}
                    </span>

                    {course.originalPrice > course.price && (
                      <span className='pb-1 text-black/30 line-through'>
                        {formatCoursePrice(course.originalPrice)}
                      </span>
                    )}
                  </div>

                  <p className='text-sm text-black/60'>
                    {canWatchPreview
                      ? 'You can start with free preview lessons right away, then unlock the full course whenever you are ready.'
                      : hasPreviewLessons
                        ? 'Preview lessons exist, but they are still being prepared. You can unlock the full course right now.'
                        : 'Purchase access is needed to unlock lesson playback for this course.'}
                  </p>

                  {hasPreviewLessons && (
                    <div className='inline-flex items-center gap-2 border border-sky-200 bg-sky-50 px-3 py-2 text-xs font-medium uppercase tracking-[0.16em] text-sky-700'>
                      <span>
                        {canWatchPreview
                          ? 'Preview access available'
                          : 'Preview is preparing'}
                      </span>
                      <span>{contentStats.previewLessons} preview lessons</span>
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className='flex flex-wrap gap-3'>
              {isPurchased ? (
                <Link
                  to={primaryActionPath}
                  className='flex h-12 min-w-[180px] items-center justify-center bg-black px-6 text-sm font-medium text-white transition hover:opacity-90'
                >
                  {course.access?.primaryAction?.label || 'Continue'}
                </Link>
              ) : (
                <>
                  {canWatchPreview && (
                    <Link
                      to={previewActionPath}
                      className='flex h-12 min-w-[180px] items-center justify-center border border-black px-6 text-sm font-medium text-black transition hover:bg-black hover:text-white'
                    >
                      Watch Preview
                    </Link>
                  )}

                  <Link
                    to={checkoutActionPath}
                    className='flex h-12 min-w-[180px] items-center justify-center bg-black px-6 text-sm font-medium text-white transition hover:opacity-90'
                  >
                    Buy now to unlock
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default StudentCourseOverviewHero
