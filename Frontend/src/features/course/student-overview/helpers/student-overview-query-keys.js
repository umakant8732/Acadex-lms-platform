//keeps student  overview cache keys in one place

export const studentOverviewQueryKeys = {
    root : ['student-course-overview'],
    course : courseId => ['student-course-overview', 'course', courseId]
}