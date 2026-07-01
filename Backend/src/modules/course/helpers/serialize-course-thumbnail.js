import { buildCourseThumbnailUrl } from './build-course-thumbnail-url.js'

// Adds response friendly thumbnail url while keeping stored key.
export const serializeCourseThumbnail = course => {
  if (!course) {
    return course
  }

  const courseObject =
    typeof course.toObject === 'function'
      ? course.toObject()
      : course

  return {
    ...courseObject,
    thumbnailKey: courseObject.thumbnailKey ?? '',
    thumbnail: buildCourseThumbnailUrl(courseObject.thumbnailKey)
  }
}
