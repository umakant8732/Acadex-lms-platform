import Course from "../models/course-model.js"


export const findUnpublishedCourses = async () => {
    return await Course
    .find({
        isPublished : false,
        delete: { $ne: true }
    })
    .sort({createdAt : -1})
}
