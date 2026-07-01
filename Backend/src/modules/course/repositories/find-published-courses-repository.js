import Course from "../models/course-model.js"

export const findPublishedCourses = async () => {
  return await Course.find({
    isPublished: true,
    delete: { $ne: true }
  }).sort({
    createdAt: -1
  })
}
