import Course from "../models/course-model.js";


//loads only published courses for the given course ids


export const findPublishedCoursesByIds = async (courseIds = [])=> {
    if (!courseIds.length) {
        return []
    }


    return await Course.find(
        {
            _id : {$in : courseIds},
            isPublished : true,
            delete : {$ne : true}
        }
    )
}