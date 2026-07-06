import type { StudentCurriculumLesson, StudentCurriculumSection } from '../../../../course/shared/types/student-course-types'
import type {
  StudentWatchSidebarLessonLabel,
  StudentWatchSidebarProps
} from '../../types/student-watch-types'

// Decides lesson label for student sidebar.
const getLessonLabel = ({
  lesson,
  isPurchased,
  isActive
}: {
  lesson: StudentCurriculumLesson
  isPurchased: boolean
  isActive: boolean
}): StudentWatchSidebarLessonLabel => {
  const canPlayLesson = Boolean(
    lesson.lecture?.isPlayable && (isPurchased || lesson.lecture?.isPreview)
  )

  if (isActive && canPlayLesson) {
    return {
      label: 'Playing',
      className: 'border-black bg-black text-white'
    }
  }

  if (!lesson.lecture) {
    return {
      label: 'Soon',
      className: 'border-black/10 bg-[#f5f5f5] text-black/55'
    }
  }

  if (lesson.lecture.isPreview && lesson.lecture.isPlayable) {
    return {
      label: 'Preview',
      className: 'border-sky-200 bg-sky-50 text-sky-700'
    }
  }

  if (lesson.lecture.isPreview) {
    return {
      label: 'Preview soon',
      className: 'border-sky-200 bg-sky-50 text-sky-700'
    }
  }

  if (isPurchased && lesson.lecture.isPlayable) {
    return {
      label: 'Ready',
      className: 'border-emerald-200 bg-emerald-50 text-emerald-700'
    }
  }

  if (isPurchased && lesson.lecture.status === 'processing') {
    return {
      label: 'Processing',
      className: 'border-violet-200 bg-violet-50 text-violet-700'
    }
  }

  return {
    label: 'Locked',
    className: 'border-amber-200 bg-amber-50 text-amber-700'
  }
}

// Small helper for sidebar summary.
const getLessonCounts = (sections: StudentCurriculumSection[]): number => {
  let totalLessons = 0

  for (const section of sections) {
    totalLessons += section.lessons?.length ?? 0
  }

  return totalLessons
}

const StudentWatchSidebar = ({
  course,
  sections,
  activeLessonId,
  isPurchased,
  onLessonSelect
}: StudentWatchSidebarProps) => {
  const totalLessons = getLessonCounts(sections)

  return (
    <aside className='self-start overflow-hidden border border-black/10 bg-white xl:sticky xl:top-0'>
      <div className='border-b border-black/10 px-5 py-5'>
        <p className='text-xs font-medium uppercase tracking-[0.18em] text-black/45'>
          Course content
        </p>

        <h2 className='mt-2 text-xl font-semibold tracking-tight text-black'>
          {course?.title || 'Course'}
        </h2>

        <p className='mt-2 text-sm text-black/60'>
          {sections.length} sections - {totalLessons} lessons
        </p>
      </div>

      <div className='xl:max-h-[calc(100dvh-220px)] xl:overflow-y-auto xl:overscroll-contain xl:[scrollbar-width:none] xl:[-ms-overflow-style:none] xl:[&::-webkit-scrollbar]:hidden'>
        {sections.length > 0 ? (
          sections.map((section, sectionIndex) => (
            <details
              key={section._id}
              open={sectionIndex === 0}
              className='border-b border-black/10 last:border-b-0'
            >
              <summary className='cursor-pointer px-5 py-4 text-base font-semibold text-black'>
                {section.sectionTitle}
              </summary>

              <div className='border-t border-black/10'>
                {section.lessons.length > 0 ? (
                  section.lessons.map(lesson => {
                    const isActive = activeLessonId === lesson._id
                    const lessonLabel = getLessonLabel({
                      lesson,
                      isPurchased,
                      isActive
                    })
                    const isUnavailable = !lesson.lecture

                    return (
                      <button
                        key={lesson._id}
                        type='button'
                        disabled={isUnavailable}
                        onClick={() => onLessonSelect(lesson._id)}
                        className={`grid w-full gap-3 border-b border-black/10 px-5 py-4 text-left transition last:border-b-0 ${
                          isActive
                            ? 'bg-black/[0.03]'
                            : 'bg-white hover:bg-black/[0.02]'
                        } ${
                          isUnavailable
                            ? 'cursor-default opacity-75'
                            : 'cursor-pointer'
                        }`}
                      >
                        <div className='flex items-start justify-between gap-4'>
                          <div className='min-w-0'>
                            <p
                              className={`text-sm leading-6 ${
                                isActive
                                  ? 'font-semibold text-black'
                                  : 'font-medium text-black/90'
                              }`}
                            >
                              {lesson.order}. {lesson.title}
                            </p>

                            <p
                              className={`mt-1 text-xs uppercase tracking-[0.18em] ${
                                isActive ? 'text-black/55' : 'text-black/40'
                              }`}
                            >
                              Lesson {lesson.order}
                            </p>
                          </div>

                          <span
                            className={`shrink-0 border px-2.5 py-1 text-xs font-medium ${lessonLabel.className}`}
                          >
                            {lessonLabel.label}
                          </span>
                        </div>
                      </button>
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
          <div className='p-5 text-sm text-black/60'>
            No curriculum is available for this course yet.
          </div>
        )}
      </div>
    </aside>
  )
}

export default StudentWatchSidebar
