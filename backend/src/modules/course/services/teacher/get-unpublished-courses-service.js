import { serializeCourseThumbnail } from '../../helpers/serialize-course-thumbnail.js'
import { findUnpublishedCourses } from '../../repositories/find-unpublished-courses-repository.js'

export const getUnpublishedCoursesService = async () => {
  const courses = await findUnpublishedCourses()

  return courses.map(serializeCourseThumbnail)
}
