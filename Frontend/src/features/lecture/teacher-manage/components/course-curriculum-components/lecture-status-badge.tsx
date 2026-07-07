import React from 'react'
import type { LectureStatusType } from '../../types/teacher-lecture-types'

export interface LectureStatusBadgeProps {
  status?: LectureStatusType | null
}

const statusClasses: Record<string, string> = {
  upload_pending: 'border-amber-200 bg-amber-50 text-amber-700',
  uploading: 'border-blue-200 bg-blue-50 text-blue-700',
  processing: 'border-violet-200 bg-violet-50 text-violet-700',
  ready: 'border-emerald-200 bg-emerald-50 text-emerald-700',
  failed: 'border-red-200 bg-red-50 text-red-700',
  missing: 'border-black/10 bg-[#f5f5f5] text-black/55'
}

const statusLabels: Record<string, string> = {
  upload_pending: 'Upload pending',
  uploading: 'Uploading',
  processing: 'Processing',
  ready: 'Ready',
  failed: 'Failed',
  missing: 'No video'
}

const LectureStatusBadge: React.FC<LectureStatusBadgeProps> = ({ status }) => {
  const key = status || 'missing'

  return (
    <span
      className={`inline-flex items-center border px-2.5 py-1 text-xs font-medium ${statusClasses[key] || statusClasses.missing}`}
    >
      {statusLabels[key] || statusLabels.missing}
    </span>
  )
}

export default LectureStatusBadge
