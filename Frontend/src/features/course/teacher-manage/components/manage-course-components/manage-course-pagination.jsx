import { COURSE_PAGE_LIMIT_OPTIONS } from '../../constants/course-pagination.js'
import AppPagination from '../../../../../shared/ui/navigation/app-pagination.jsx'

const ManageCoursePagination = ({
  pagination,
  onPageChange,
  onLimitChange
}) => {
  const {
    page,
    limit,
    totalItems,
    totalPages
  } = pagination

  if (totalItems === 0) {
    return null
  }

  const startItem = (page - 1) * limit + 1
  const endItem = Math.min(page * limit, totalItems)

  return (
    <section className='border border-black/10 bg-white p-5'>
      <div className='flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between'>
        <p className='text-sm text-black/60'>
          Showing{' '}
          <span className='font-medium text-black'>{startItem}</span>
          {' - '}
          <span className='font-medium text-black'>{endItem}</span>
          {' of '}
          <span className='font-medium text-black'>{totalItems}</span>
          {' courses'}
        </p>

        <div className='flex flex-col gap-3 sm:flex-row sm:items-center'>
          <label className='flex items-center gap-2 text-sm text-black/60'>
            Rows
            <select
              value={limit}
              onChange={event => onLimitChange(event.target.value)}
              className='h-10 border border-black/10 bg-white px-3 text-sm text-black outline-none transition focus:border-black'
            >
              {COURSE_PAGE_LIMIT_OPTIONS.map(limitOption => (
                <option key={limitOption} value={limitOption}>
                  {limitOption}
                </option>
              ))}
            </select>
          </label>

          <AppPagination
            page={page}
            totalPages={totalPages}
            onPageChange={onPageChange}
          />
        </div>
      </div>
    </section>
  )
}

export default ManageCoursePagination

