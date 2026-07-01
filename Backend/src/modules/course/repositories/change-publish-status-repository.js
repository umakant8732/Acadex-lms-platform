
import Course from '../models/course-model.js'

export const changePublishStatusById = async (courseId, isPublished) => {
    return await Course.findOneAndUpdate(

        {
            _id : courseId,
            delete : {$ne : true}
        },

        {isPublished},
        {
            new : true,
            runValidators : true
        }


    )
}