import { buildCourseThumbnailUrl } from '../../../course/helpers/build-course-thumbnail-url.js'
import { findLectureManageCourses } from '../../repositories/find-manage-courses-repository.js'

//builds lightWeight course data for teacher lectures page to show on the card
export const getLectureManageCoursesService = async () => {
  const courses = await findLectureManageCourses()

  return courses.map(course => {
    //calculate how many sections are there in syllabus
    const totalSections = course.syllabus?.length || 0

    //calculate how many lessons are the in course
    const totalLessons =
      course.syllabus?.reduce((count, section) => {
        return count + (section.lessons?.length || 0)
      }, 0) || 0

    return {
      _id: course._id,
      title: course.title,
      subtitle: course.subtitle,
      category: course.category,
      level: course.level,
      thumbnail: buildCourseThumbnailUrl(course.thumbnailKey),
      isPublished: course.isPublished,
      totalSections,
      totalLessons
    }
  })
}
