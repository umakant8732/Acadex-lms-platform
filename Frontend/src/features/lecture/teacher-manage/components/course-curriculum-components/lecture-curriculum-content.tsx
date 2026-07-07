import React from 'react'
import LectureCurriculumHeader from './lecture-curriculum-header.js'
import LectureLessonRow from './lecture-lesson-row.js'
import type { TeacherCourseCurriculum, Section, Lesson } from '../../types/teacher-lecture-types'

export interface LectureCurriculumContentProps {
  curriculum: TeacherCourseCurriculum
  videoInputRef: React.RefObject<HTMLInputElement | null>
  onUploadButtonClick: (args: { section: Section; lesson: Lesson }) => void
  onVideoFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  uploadingLessonIds?: string[]
  uploadProgressByLessonId?: Record<string, number>
  isPlaybackLoading?: boolean
  onWatchLecture?: (lesson: Lesson) => void
}

const LectureCurriculumContent: React.FC<LectureCurriculumContentProps> = ({
  curriculum,
  videoInputRef,
  onUploadButtonClick,
  onVideoFileChange,
  uploadingLessonIds = [],
  uploadProgressByLessonId = {},
  isPlaybackLoading = false,
  onWatchLecture
}) => {
  const { course, sections } = curriculum // Course with curriculum data to show on frontend.

  return (
    <section className='space-y-6'>
      <input
        ref={videoInputRef}
        type='file'
        accept='video/mp4,video/webm,video/quicktime'
        className='hidden'
        onChange={onVideoFileChange}
      />
      <LectureCurriculumHeader course={course} />

      <div className='space-y-4'>
        {sections.length > 0 ? (
          sections.map((section, sectionIndex) => (
            <details
              key={section._id}
              open={sectionIndex === 0}
              className='border border-black/10 bg-white'
            >
              <summary className='cursor-pointer px-5 py-4 text-base font-semibold text-black'>
                {section.sectionTitle}
              </summary>

              <div className='border-t border-black/10'>
                {section.lessons.length > 0 ? (
                  section.lessons.map(lesson => {
                    const isCurrentLessonUploading =
                      uploadingLessonIds.includes(lesson._id)

                    // Shows how much video uploaded to s3.
                    const uploadProgress =
                      uploadProgressByLessonId[lesson._id] ?? 0

                    return (
                      <LectureLessonRow
                        key={lesson._id}
                        section={section}
                        lesson={lesson}
                        isUploading={isCurrentLessonUploading}
                        uploadProgress={uploadProgress}
                        onUploadButtonClick={onUploadButtonClick}
                        isPlaybackLoading={isPlaybackLoading}
                        onWatchLecture={onWatchLecture}
                      />
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
          <div className='border border-black/10 bg-white p-6 text-sm text-black/60'>
            No syllabus has been added for this course yet.
          </div>
        )}
      </div>
    </section>
  )
}

export default LectureCurriculumContent
