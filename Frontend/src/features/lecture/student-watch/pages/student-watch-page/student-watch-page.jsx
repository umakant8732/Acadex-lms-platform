import SectionQueryError from '../../../../../shared/ui/feedback/section-query-error.jsx'
import StudentLecturePlayer from '../../components/student-watch-component/student-lecture-player.jsx'
import StudentWatchSidebar from '../../components/student-watch-component/student-watch-sidebar.jsx'
import StudentWatchTabs from '../../components/student-watch-component/student-watch-tabs.jsx'
import { useStudentWatchPage } from '../../hooks/use-student-watch-page.js'

const StudentWatchPage = () => {
  const {
    course,
    sections,
    activeLesson,
    playbackAccess,
    isPurchased,
    previewActionPath,
    checkoutActionPath,
    isLoading,
    isError,
    error,
    refetchPage,
    isPlaybackLoading,
    handleLessonSelect,
    handlePlaybackError
  } = useStudentWatchPage()

  if (isLoading) {
    return (
      <div className='border border-black/10 bg-white p-6 text-sm text-black/60'>
        Loading lesson player...
      </div>
    )
  }

  if (isError) {
    return (
      <SectionQueryError
        variant='error'
        title='Unable to load student watch page'
        message={
          error?.response?.data?.message ||
          'Something went wrong while fetching this course watch page.'
        }
        actionLabel='Try Again'
        onAction={refetchPage}
      />
    )
  }

  if (!course) {
    return (
      <SectionQueryError
        variant='empty'
        title='Course not found'
        message='We could not find the requested course.'
      />
    )
  }

  const isActiveLessonAccessible = Boolean(
    activeLesson?.lecture?.isPlayable &&
      (isPurchased || activeLesson?.lecture?.isPreview)
  )

  return (
    <section className='ml-[calc(50%-50dvw)] mr-[calc(50%-50dvw)] w-[100dvw] max-w-[100dvw] overflow-x-clip px-4 md:px-6'>
      <div className='grid w-full items-start gap-0 xl:grid-cols-[minmax(0,7fr)_minmax(320px,3fr)]'>
        <div className='min-w-0'>
          <StudentLecturePlayer
            course={course}
            lesson={activeLesson}
            playbackAccess={playbackAccess}
            isPlaybackLoading={isPlaybackLoading}
            isLessonAccessible={isActiveLessonAccessible}
            previewActionPath={previewActionPath}
            checkoutActionPath={checkoutActionPath}
            onPlaybackError={handlePlaybackError}
          />

          <div className='mt-6'>
            <StudentWatchTabs course={course} lesson={activeLesson} />
          </div>
        </div>

        <StudentWatchSidebar
          course={course}
          sections={sections}
          activeLessonId={activeLesson?._id}
          isPurchased={isPurchased}
          onLessonSelect={handleLessonSelect}
        />
      </div>
    </section>
  )
}

export default StudentWatchPage

