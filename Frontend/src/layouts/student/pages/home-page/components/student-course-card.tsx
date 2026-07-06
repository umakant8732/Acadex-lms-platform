import { motion } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'
import type { KeyboardEvent } from 'react'

import {
  getCourseDiscount,
  getTotalLessons
} from '../../../../../shared/utils/course/calculate-course-pricing.js'
import { formatCoursePrice } from '../../../../../shared/utils/course/format-course-price.js'
import type { StudentCourseCardProps } from '../types/student-home-page-types'

const StudentCourseCard = ({ course }: StudentCourseCardProps) => {
  const navigate = useNavigate()
  const courseDiscount = getCourseDiscount(course.price, course.originalPrice)

  const totalLessons = getTotalLessons(course.syllabus)
  const courseThumbnail = course.thumbnail?.trim()
  const courseSummary = course.subtitle || course.description
  const access = course.access
  const preview = course.preview
  const courseOverviewPath = `/student/courses/${course._id}`
  const canWatchPreview = Boolean(
    !access.isPurchased && preview.firstPreviewLessonId
  )
  const hasPreviewLessons = Boolean(preview.hasPreviewLessons)
  const hasReadyPreviewLessons = Boolean(preview.readyPreviewLessonsCount)

  const primaryActionPath = access.isPurchased
    ? `/student/courses/${course._id}/learn`
    : canWatchPreview
      ? `/student/courses/${course._id}/learn/${preview.firstPreviewLessonId}`
      : `/student/checkout/${course._id}`

  const primaryActionLabel = access.isPurchased
    ? access.primaryAction?.label || 'Continue'
    : canWatchPreview
      ? 'Watch Preview'
      : access.primaryAction?.label || 'Buy now to unlock'

  const helperText = access.isPurchased
    ? 'Continue where you left off.'
    : canWatchPreview
      ? 'Start free, then unlock the complete course anytime.'
      : hasPreviewLessons
        ? 'Preview lessons are being prepared. Full access is available now.'
        : 'Unlock the full course to start learning.'

  // Makes full card open overview page.
  const handleCardClick = () => {
    navigate(courseOverviewPath)
  }

  // Keeps keyboard support for whole clickable card.
  const handleCardKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      navigate(courseOverviewPath)
    }
  }

  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
      role='link'
      tabIndex={0}
      onClick={handleCardClick}
      onKeyDown={handleCardKeyDown}
      className='flex h-full cursor-pointer flex-col overflow-hidden border border-black/5 bg-white'
    >
      <div className='overflow-hidden border-b border-black/5'>
        {courseThumbnail ? (
          <motion.img
            whileHover={{ scale: 1.04 }}
            transition={{ duration: 0.4 }}
            src={courseThumbnail}
            alt={course.title}
            className='h-56 w-full object-cover'
          />
        ) : (
          <div className='flex h-56 items-center justify-center bg-black px-6 text-center text-2xl font-semibold text-white'>
            <span className='overflow-hidden [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:2]'>
              {course.title}
            </span>
          </div>
        )}
      </div>

      <div className='flex flex-1 flex-col p-6'>
        <div className='flex items-center justify-between gap-3'>
          <span className='text-xs uppercase tracking-widest text-black/40'>
            {course.category || 'General'}
          </span>

          {courseDiscount > 0 && (
            <span className='shrink-0 text-sm font-medium'>{courseDiscount}% OFF</span>
          )}
        </div>

        <h2 className='mt-4 min-h-[4.5rem] overflow-hidden text-2xl font-semibold leading-tight tracking-tight text-black [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:2]'>
          {course.title}
        </h2>

        <p className='mt-4 min-h-[5.25rem] overflow-hidden text-sm leading-7 text-black/60 [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:3]'>
          {courseSummary ||
            'Explore this published course and unlock the full learning path.'}
        </p>

        <div className='mt-5 min-h-[2.5rem] content-start flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.2em] text-black/40'>
          <span>{course.level || 'Course'}</span>
          <span>{totalLessons} lessons</span>
          {access.isPurchased && (
            <span>{access.progressPercent ?? 0}% complete</span>
          )}
          {!access.isPurchased && hasReadyPreviewLessons && (
            <span>{preview.readyPreviewLessonsCount} preview ready</span>
          )}
        </div>

        <div className='mt-6 flex items-end gap-3'>
          <span className='text-3xl font-semibold'>
            {formatCoursePrice(course.price)}
          </span>

          {course.originalPrice > course.price && (
            <span className='pb-1 text-black/30 line-through'>
              {formatCoursePrice(course.originalPrice)}
            </span>
          )}
        </div>

        <div className='mt-4 flex min-h-[2.25rem] flex-wrap items-center gap-2 text-xs uppercase tracking-[0.16em] text-sky-700'>
          {!access.isPurchased && hasPreviewLessons && (
            <>
              <span className='border border-sky-200 bg-sky-50 px-2 py-1'>
                {hasReadyPreviewLessons ? 'Preview available' : 'Preview coming soon'}
              </span>

              {hasReadyPreviewLessons && (
                <span>{preview.readyPreviewLessonsCount} ready now</span>
              )}
            </>
          )}
        </div>

        <div className='mt-auto pt-7'>
          <Link
            to={primaryActionPath}
            onClick={event => event.stopPropagation()}
            className={`flex h-12 w-full items-center justify-center text-sm font-medium transition ${
              canWatchPreview
                ? 'border border-black text-black hover:bg-black hover:text-white'
                : 'bg-black text-white hover:opacity-90'
            }`}
          >
            {primaryActionLabel}
          </Link>

          <div className='mt-3 flex min-h-[3rem] items-start justify-center text-center text-sm leading-6 text-black/55'>
            <p className='overflow-hidden [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:2]'>
              {helperText}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default StudentCourseCard
