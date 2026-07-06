import CourseSearch from './components/course-search'
import CoursesGrid from './components/course-grid'
import StudentHomeHero from './components/student-home-hero'
import { useStudentHomePage } from './hooks/use-student-home-page'

const StudentHomePage = () => {
  const {
    searchValue,
    courses,
    totalCourses,
    categoryCount,
    isLoading,
    isError,
    error,
    hasActiveSearch,
    handleSearchValueChange,
    refetchCourses
  } = useStudentHomePage()

  return (
    <section>
      <StudentHomeHero
        totalCourses={totalCourses}
        categoryCount={categoryCount}
      />

      <div className='mt-10'>
        <CourseSearch
          value={searchValue}
          onChange={handleSearchValueChange}
        />
      </div>

      <CoursesGrid
        courses={courses}
        isLoading={isLoading}
        isError={isError}
        error={error}
        hasActiveSearch={hasActiveSearch}
        onRetry={refetchCourses}
      />
    </section>
  )
}

export default StudentHomePage




