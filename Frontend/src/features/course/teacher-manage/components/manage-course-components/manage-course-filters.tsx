import React from 'react'
import { FiRefreshCcw, FiSearch } from 'react-icons/fi'

import { COURSE_CATEGORIES } from '../../constants/course-categories.js'

export interface ManageCourseFiltersProps {
  searchValue: string
  selectedCategory: string
  hasActiveFilters: boolean
  onSearchChange: (value: string) => void
  onCategoryChange: (value: string) => void
  onResetFilters: () => void
}

const ManageCourseFilters: React.FC<ManageCourseFiltersProps> = ({
  searchValue,
  selectedCategory,
  hasActiveFilters,
  onSearchChange,
  onCategoryChange,
  onResetFilters
}) => {
  return (
    <section className='border border-black/10 bg-white p-5'>
      <div className='grid gap-4 lg:grid-cols-[1fr_260px_auto] lg:items-end'>
        <div>
          <label className='text-sm font-medium text-black'>Search</label>
          <div className='mt-2 flex items-center border border-black/10 bg-white px-3'>
            <FiSearch size={16} className='text-black/35' />
            <input
              type='search'
              value={searchValue}
              onChange={event => onSearchChange(event.target.value)}
              placeholder='Search by title, subtitle, or category'
              className='h-11 flex-1 bg-transparent px-3 text-sm outline-none placeholder:text-black/35'
            />
          </div>
        </div>

        <div>
          <label className='text-sm font-medium text-black'>Category</label>
          <select
            value={selectedCategory}
            onChange={event => onCategoryChange(event.target.value)}
            className='mt-2 h-11 w-full border border-black/10 bg-white px-3 text-sm outline-none transition focus:border-black'
          >
            <option value=''>All Categories</option>
            {COURSE_CATEGORIES.map(category => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <button
          type='button'
          onClick={onResetFilters}
          disabled={!hasActiveFilters}
          className='inline-flex h-11 items-center justify-center gap-2 border border-black/10 px-4 text-sm font-medium text-black transition hover:bg-black hover:text-white disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-white disabled:hover:text-black'
        >
          <FiRefreshCcw size={16} />
          Reset
        </button>
      </div>
    </section>
  )
}

export default ManageCourseFilters
