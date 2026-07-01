import PaymentAttempt from '../models/payment-attempt-model.js'

import { PAYMENT_ATTEMPT_STATUS } from '../constants/payment-constants.js'

//finds the latest active attempt for same user and same course.

export const findActivePaymentAttemptByUserAndCourse = async (userId, courseId) => {
    return await PaymentAttempt.findOne({
        userId,
        courseId,
        status : {
            $in : [
                PAYMENT_ATTEMPT_STATUS.CREATED,
                PAYMENT_ATTEMPT_STATUS.VERIFIED
            ]
        }
    }).sort({createdAt : -1})
}