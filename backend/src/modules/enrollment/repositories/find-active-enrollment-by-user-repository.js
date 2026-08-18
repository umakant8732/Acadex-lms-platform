
import Enrollment from "../models/enrollment-model.js";
import { ENROLLMENT_STATUS } from "../constants/enrollment-constants.js";


//Loads all active enrollments for one student

export const findActiveEnrollmentsByUser = async (userId) => {
    return await Enrollment.find(
        {
            userId,
            status: ENROLLMENT_STATUS.ACTIVE
        }).sort({ enrolledAt: -1 })
}


