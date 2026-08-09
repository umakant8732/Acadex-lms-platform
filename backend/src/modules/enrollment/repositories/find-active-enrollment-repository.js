import Enrollment from '../models/enrollment-model.js'

import { ENROLLMENT_STATUS } from '../constants/enrollment-constants.js'

//checks if student already owns this course.

export const findActiveEnrollmentByUserAndCourse = async (userId, courseId) => {
    return await Enrollment.findOne({
        userId,
        courseId,
        status : ENROLLMENT_STATUS.ACTIVE
    })
}