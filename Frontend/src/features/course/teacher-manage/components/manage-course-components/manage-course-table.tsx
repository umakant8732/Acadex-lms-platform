import React from 'react'
import ManageCourseTableRow from './manage-course-table-row.js'
import type { TeacherManageCourseListItem } from '../../types/teacher-course-types'

export interface ManageCourseTableProps {
  courses: TeacherManageCourseListItem[]
  onViewClick: (courseId: string) => void
  onEditClick: (courseId: string) => void
  onDeleteClick: (course: TeacherManageCourseListItem) => void
  onPublishClick: (course: TeacherManageCourseListItem) => void
  publishingCourseId?: string | null
  onThumbnailChange?: (course: TeacherManageCourseListItem, file: File) => void
  uploadingThumbnailCourseId?: string | null
}

const ManageCourseTable: React.FC<ManageCourseTableProps> = ({
  courses,
  onViewClick,
  onEditClick,
  onDeleteClick,
  onPublishClick,
  publishingCourseId,
  onThumbnailChange,
  uploadingThumbnailCourseId
}) => {
  return (
    <div className='overflow-hidden border border-black/10 bg-white'>
      <div className='overflow-x-auto'>
        <table className='min-w-full divide-y divide-black/10'>
          <thead className='bg-[#f7f7f7]'>
            <tr>
              <th className='px-6 py-4 text-left text-xs font-semibold uppercase tracking-[0.2em] text-black/45'>
                Course
              </th>
              <th className='px-6 py-4 text-left text-xs font-semibold uppercase tracking-[0.2em] text-black/45'>
                Category
              </th>
              <th className='px-6 py-4 text-left text-xs font-semibold uppercase tracking-[0.2em] text-black/45'>
                Level
              </th>
              <th className='px-6 py-4 text-left text-xs font-semibold uppercase tracking-[0.2em] text-black/45'>
                Price
              </th>
              <th className='px-6 py-4 text-left text-xs font-semibold uppercase tracking-[0.2em] text-black/45'>
                Status
              </th>
              <th className='px-6 py-4 text-right text-xs font-semibold uppercase tracking-[0.2em] text-black/45'>
                Actions
              </th>
            </tr>
          </thead>

          <tbody className='divide-y divide-black/10'>
            {courses.map(course => (
              <ManageCourseTableRow
                key={course._id}
                course={course}
                onViewClick={onViewClick}
                onEditClick={onEditClick}
                onDeleteClick={onDeleteClick}
                onPublishClick={onPublishClick}
                publishingCourseId={publishingCourseId}
                onThumbnailChange={onThumbnailChange}
                uploadingThumbnailCourseId={uploadingThumbnailCourseId}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ManageCourseTable
