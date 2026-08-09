import PaymentAttempt from "../../models/payment-attempt-model.js";

import { PAYMENT_ATTEMPT_STATUS } from "../../constants/payment-constants.js";


//fetches all successfull purchases(invoices) for the logged in student

export const getInvoicesService = async(userId) => {
    //query only attempts that succeeded (marked as fulfilled)
        //populate course details (title, price, original price thumbnailKey) from course collection

    const invoices = await PaymentAttempt
    .find({userId,status: PAYMENT_ATTEMPT_STATUS.FULFILLED})
    .populate('courseId', 'title price originalPrice thumbnailKey')
    .sort({paidAt: -1, createdAt: -1})

    return invoices
    
}