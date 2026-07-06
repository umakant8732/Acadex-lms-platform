// Keeps student overview cache keys in one place.
export const studentOverviewQueryKeys = {
  root: ['student-course-overview'] as const,
  course: (courseId: string) =>
    ['student-course-overview', 'course', courseId] as const
}
