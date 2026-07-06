import { useState } from 'react'

import type {
  StudentLecturePlayerStateProps,
  StudentWatchTab,
  StudentWatchTabId,
  StudentWatchTabsProps
} from '../../types/student-watch-types'

const tabs: StudentWatchTab[] = [
  { id: 'description', label: 'Description' },
  { id: 'resources', label: 'Resources' },
  { id: 'comments', label: 'Comments' }
]

// Reusable placeholder so future tabs look intentional.
const ComingSoonPanel = ({
  title,
  subtitle: description
}: StudentLecturePlayerStateProps) => {
  return (
    <div className='border border-dashed border-black/15 bg-[#fafafa] px-5 py-6'>
      <p className='text-sm font-medium text-black'>{title}</p>
      <p className='mt-2 text-sm leading-7 text-black/60'>{description}</p>
    </div>
  )
}

const StudentWatchTabs = ({ course, lesson }: StudentWatchTabsProps) => {
  const [activeTab, setActiveTab] = useState<StudentWatchTabId>('description')

  return (
    <section className='overflow-hidden border border-black/10 bg-white'>
      <div className='flex flex-wrap border-b border-black/10'>
        {tabs.map(tab => (
          <button
            key={tab.id}
            type='button'
            onClick={() => setActiveTab(tab.id)}
            className={`px-5 py-4 text-sm font-medium transition ${
              activeTab === tab.id
                ? 'border-b-2 border-black text-black'
                : 'text-black/45 hover:text-black'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className='min-h-[220px] p-5 lg:p-6'>
        {activeTab === 'description' && (
          <div className='space-y-3'>
            <p className='text-xs font-medium uppercase tracking-[0.18em] text-black/45'>
              About this lesson
            </p>

            <h3 className='text-xl font-semibold tracking-tight text-black'>
              {lesson?.title || 'Lesson Description'}
            </h3>

            <p className='text-sm leading-7 text-black/60'>
              {course?.description ||
                'Detailed lesson notes will be added here as course content evolves.'}
            </p>
          </div>
        )}

        {activeTab === 'resources' && (
          <ComingSoonPanel
            title='Lesson resources are coming soon'
            subtitle='Downloadable notes, links and attachments for this lesson will appear here once we add the resource flow.'
          />
        )}

        {activeTab === 'comments' && (
          <ComingSoonPanel
            title='Lesson discussion is coming soon'
            subtitle='Student comments and lesson discussion will be added in the next phase of the learning experience.'
          />
        )}
      </div>
    </section>
  )
}

export default StudentWatchTabs
