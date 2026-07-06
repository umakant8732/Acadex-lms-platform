import { useMemo, useState, type ChangeEventHandler } from 'react'

import { useStudentCourseLibrary } from '../../../../../features/course/student-library/hooks/use-student-course-library.js'
import type { StudentHomePageState } from '../types/student-home-page-types'

// Keeps library search and summary logic close to the student home page.
export const useStudentHomePage = (): StudentHomePageState => {
  const [searchValue, setSearchValue] = useState('')

  const studentCourseLibrary = useStudentCourseLibrary()
  const studentCourses = studentCourseLibrary.courses

  const filteredCourses = useMemo(() => {
    const normalizedSearch = searchValue.trim().toLowerCase()

    if (!normalizedSearch) {
      return studentCourses
    }

    return studentCourses.filter(course => {
      const searchableFields = [
        course.title,
        course.subtitle,
        course.description,
        course.category
      ]

      return searchableFields
        .filter((field): field is string => Boolean(field))
        .some(field => field.toLowerCase().includes(normalizedSearch))
    })
  }, [studentCourses, searchValue])

  const categoryCount = useMemo(() => {
    return new Set(studentCourses.map(course => course.category).filter(Boolean)).size
  }, [studentCourses])

  const handleSearchValueChange: ChangeEventHandler<HTMLInputElement> = event => {
    setSearchValue(event.target.value)
  }

  return {
    searchValue,
    courses: filteredCourses,
    totalCourses: studentCourses.length,
    categoryCount,
    isLoading: studentCourseLibrary.isLoading,
    isError: studentCourseLibrary.isError,
    error: studentCourseLibrary.error,
    hasActiveSearch: Boolean(searchValue.trim()),
    handleSearchValueChange,
    refetchCourses: studentCourseLibrary.refetchCourses
  }
}
