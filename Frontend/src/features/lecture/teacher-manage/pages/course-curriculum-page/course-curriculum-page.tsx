import React from 'react'
import SectionQueryError from '../../../../../shared/ui/feedback/section-query-error.js'
import { useLectureCurriculumPage } from '../../hooks/use-lecture-curriculum-page.js'
import LectureCurriculumContent from '../../components/course-curriculum-components/lecture-curriculum-content.js'
import LecturePreviewPlayer from '../../components/course-curriculum-components/lecture-preview-player.js'

const CourseCurriculumPage: React.FC = () => {
  const {
    curriculum,
    isLoading,
    isError,
    error,
    refetchCurriculum,
    handleUploadButtonClick,
    handleVideoFileChange,
    videoInputRef,
    uploadProgressByLessonId,
    uploadingLessonIds,

    handleRetryTranscode,
    retryLoadingLectureId,

    selectedPlayback,
    playbackLoadingLectureId,
    handleWatchLecture,
    handleClosePlayback,
    handlePlaybackError,

    handleTogglePreview,
    isTogglePreviewPending
  } = useLectureCurriculumPage()

  if (isLoading) {
    return (
      <div className='border border-black/10 bg-white p-6 text-sm text-black/60'>
        Loading lecture curriculum...
      </div>
    )
  }

  if (isError) {
    return (
      <SectionQueryError
        variant='error'
        title='Unable to load lecture curriculum'
        message={
          (error as any)?.response?.data?.message ||
          error?.message ||
          'Something went wrong while fetching this lecture curriculum.'
        }
        actionLabel='Try Again'
        onAction={refetchCurriculum}
      />
    )
  }

  if (!curriculum) {
    return (
      <SectionQueryError
        variant='empty'
        title='Curriculum not found'
        message='We could not find the requested course curriculum.'
      />
    )
  }

  return (
    <>
      <LectureCurriculumContent
        curriculum={curriculum}
        videoInputRef={videoInputRef}
        onUploadButtonClick={handleUploadButtonClick}
        onVideoFileChange={handleVideoFileChange}
        uploadingLessonIds={uploadingLessonIds}
        uploadProgressByLessonId={uploadProgressByLessonId}
        playbackLoadingLectureId={playbackLoadingLectureId}
        onWatchLecture={handleWatchLecture}
        onRetryClick={handleRetryTranscode}
        retryLoadingLectureId={retryLoadingLectureId}
        onTogglePreview={handleTogglePreview}
        isTogglePreviewPending={isTogglePreviewPending}
      />

      <LecturePreviewPlayer
        playbackAccess={selectedPlayback}
        onClose={handleClosePlayback}
        onPlaybackError={handlePlaybackError}
      />
    </>
  )
}

export default CourseCurriculumPage
