import Course from '../../course/models/course-model.js'

//fetches courses that can be shown as cards on the teacher lectures page
export const findLectureManageCourses = async () => {
  return await Course.find({ delete: { $ne: true } })
    .select('title subtitle category level thumbnailKey isPublished syllabus createdAt')
    .sort({ createdAt: -1 })
}
