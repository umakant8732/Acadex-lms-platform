export const coursePreviewQueryKeys = {
  courseDetails: (courseId: string | undefined) =>
    ['course-preview-details', courseId] as const
}
