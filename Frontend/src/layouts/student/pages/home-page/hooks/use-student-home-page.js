import { useMemo, useState } from 'react'

import { useStudentCourseLibrary } from '../../../../../features/course/student-library/hooks/use-student-course-library.js'

export const useStudentHomePage = () => {
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
        .filter(Boolean)
        .some(field => field.toLowerCase().includes(normalizedSearch))
    })
  }, [
    studentCourses,
    searchValue
  ])

  const categoryCount = useMemo(() => {
    return new Set(
      studentCourses
        .map(course => course.category)
        .filter(Boolean)
    ).size
  }, [studentCourses])

  const handleSearchValueChange = event => {
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
