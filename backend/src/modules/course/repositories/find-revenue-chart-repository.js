import PaymentAttempt from "../../payment/models/payment-attempt-model.js";
import { PAYMENT_ATTEMPT_STATUS } from "../../payment/constants/payment-constants.js";

export const findRevenueChart = async () => {
    const now = new Date();
    const twelveMonthsAgo = new Date(now.getFullYear(), now.getMonth() - 12, 1)

    const data = await PaymentAttempt.aggregate([
        //filter only successfull payments

        {
            $match : {
                status : PAYMENT_ATTEMPT_STATUS.FULFILLED,
                createdAt : {$gte : twelveMonthsAgo}
            }
        },

        {
            $group : {
                _id : {
                    year : {$year : "$createdAt"},
                    month : {$month : "$createdAt"}
                },
                totalRevenue : {$sum : "$amount"}
            }
        },

        {
            $sort : {
                "_id.year" : 1,
                "_id.month" : 1
            }
        }
    ])

    return data
}