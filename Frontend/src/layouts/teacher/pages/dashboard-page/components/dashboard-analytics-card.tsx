import React from 'react'

const AnalyticsCard: React.FC = () => {
  return (
    <div className='h-[320px] border border-black/5 bg-white p-5 sm:p-6'>
      <div className='flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between'>
        <div>
          <p className='text-sm text-black/40'>
            Analytics
          </p>

          <h2 className='mt-2 text-2xl font-semibold sm:text-3xl'>
            Revenue Growth
          </h2>
        </div>

        <p className='text-sm text-black/40'>
          Last 6 Months
        </p>
      </div>

      <div className='mt-10 flex h-[180px] items-end gap-2 sm:gap-4'>
        {[40, 70, 55, 90, 60, 120].map((height, index) => (
          <div
            key={index}
            className='flex-1 bg-black'
            style={{
              height: `${height}px`
            }}
          />
        ))}
      </div>
    </div>
  )
}

export default AnalyticsCard
