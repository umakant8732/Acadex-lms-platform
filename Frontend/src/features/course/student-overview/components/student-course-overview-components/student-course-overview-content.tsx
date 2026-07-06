import { Link } from 'react-router-dom'

import type {
  StudentCurriculumLesson,
  StudentLessonLecture
} from '../../../shared/types/student-course-types'
import type { StudentCourseOverviewContentProps } from '../../types/student-course-overview-types'

interface LessonStateMeta {
  label: string
  helperText: string
  className: string
}

// Decides lesson badge and helper text for current student access.
const getLessonStateMeta = ({
  lesson,
  isPurchased
}: {
  lesson: StudentCurriculumLesson
  isPurchased: boolean
}): LessonStateMeta => {
  if (!lesson.lecture) {
    return {
      label: 'Coming soon',
      helperText: 'No lecture video yet',
      className: 'border-black/10 bg-[#f5f5f5] text-black/55'
    }
  }

  if (lesson.lecture.isPreview && lesson.lecture.isPlayable) {
    return {
      label: 'Preview',
      helperText: 'Available before purchase',
      className: 'border-sky-200 bg-sky-50 text-sky-700'
    }
  }

  if (lesson.lecture.isPreview) {
    return {
      label: 'Preview soon',
      helperText: 'Preview video is still preparing',
      className: 'border-sky-200 bg-sky-50 text-sky-700'
    }
  }

  if (isPurchased && lesson.lecture.isPlayable) {
    return {
      label: 'Ready',
      helperText: 'Included in your course access',
      className: 'border-emerald-200 bg-emerald-50 text-emerald-700'
    }
  }

  if (isPurchased && lesson.lecture.status === 'processing') {
    return {
      label: 'Processing',
      helperText: 'Video is still preparing',
      className: 'border-violet-200 bg-violet-50 text-violet-700'
    }
  }

  return {
    label: 'Locked',
    helperText: 'Unlocks after purchase',
    className: 'border-amber-200 bg-amber-50 text-amber-700'
  }
}

// Student can open player only when lecture is ready and access is allowed.
const canOpenLessonPlayer = ({
  lecture,
  isPurchased
}: {
  lecture: StudentLessonLecture | null
  isPurchased: boolean
}) => {
  if (!lecture?.isPlayable) {
    return false
  }

  return isPurchased || lecture.isPreview
}

const StudentCourseOverviewContent = ({
  courseId,
  sections,
  contentStats,
  isPurchased
}: StudentCourseOverviewContentProps) => {
  return (
    <section className='border border-black/10 bg-white p-6 lg:p-8'>
      <div className='mb-6 space-y-2'>
        <h2 className='text-2xl font-semibold tracking-tight text-black'>
          Contents
        </h2>

        <p className='text-sm text-black/60'>
          {contentStats.totalSections} sections - {contentStats.totalLessons}{' '}
          lessons - {contentStats.previewLessons} preview lessons
        </p>
      </div>

      <div className='space-y-4'>
        {sections.length > 0 ? (
          sections.map((section, sectionIndex) => (
            <details
              key={section._id}
              open={sectionIndex === 0}
              className='border border-black/10'
            >
              <summary className='cursor-pointer px-5 py-4 text-base font-semibold text-black'>
                {section.sectionTitle}
              </summary>

              <div className='border-t border-black/10'>
                {section.lessons.length > 0 ? (
                  section.lessons.map(lesson => {
                    const lessonStateMeta = getLessonStateMeta({
                      lesson,
                      isPurchased
                    })
                    const shouldOpenPlayer = canOpenLessonPlayer({
                      lecture: lesson.lecture,
                      isPurchased
                    })

                    return (
                      <div
                        key={lesson._id}
                        className='grid gap-4 border-b border-black/10 px-5 py-4 last:border-b-0 md:grid-cols-[minmax(0,1fr)_auto]'
                      >
                        <div className='min-w-0'>
                          {shouldOpenPlayer ? (
                            <Link
                              to={`/student/courses/${courseId}/learn/${lesson._id}`}
                              className='text-sm font-medium text-black transition hover:text-black/65'
                            >
                              {lesson.order}. {lesson.title}
                            </Link>
                          ) : (
                            <p className='text-sm font-medium text-black'>
                              {lesson.order}. {lesson.title}
                            </p>
                          )}

                          <div className='mt-2 flex flex-wrap items-center gap-2'>
                            <span className='text-xs uppercase tracking-[0.18em] text-black/40'>
                              Lesson {lesson.order}
                            </span>

                            <span
                              className={`border px-2.5 py-1 text-xs font-medium ${lessonStateMeta.className}`}
                            >
                              {lessonStateMeta.label}
                            </span>
                          </div>
                        </div>

                        <p className='text-sm text-black/55 md:text-right'>
                          {lessonStateMeta.helperText}
                        </p>
                      </div>
                    )
                  })
                ) : (
                  <p className='px-5 py-4 text-sm text-black/60'>
                    No lessons added in this section.
                  </p>
                )}
              </div>
            </details>
          ))
        ) : (
          <div className='border border-black/10 bg-[#fafafa] p-6 text-sm text-black/60'>
            No curriculum is available for this course yet.
          </div>
        )}
      </div>
    </section>
  )
}

export default StudentCourseOverviewContent
