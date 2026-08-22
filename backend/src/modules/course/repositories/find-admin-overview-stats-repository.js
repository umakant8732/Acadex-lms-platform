import PaymentAttempt from "../../payment/models/payment-attempt-model.js";
import Enrollment from "../../enrollment/models/enrollment-model.js";
import Course from "../models/course-model.js";
import { PAYMENT_ATTEMPT_STATUS } from "../../payment/constants/payment-constants.js";


export const findAdminOverviewStats = async () => {

    // Date boundaries for month-over-month growth comparison
    const now = new Date();
    const thisMonthStart = new Date(now.getFullYear(), now.getMonth(), 1);
    const lastMonthStart = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const lastMonthEnd   = thisMonthStart;

    const [
        paymentsStats,
        totalEnrollments,
        publishedCourses,
        thisMonthRevenue,
        lastMonthRevenue,
        thisMonthEnrollments,
        lastMonthEnrollments,
        newCoursesThisMonth,
    ] = await Promise.all([

        // 1. All-time payment aggregation: revenue sum + status counts
        PaymentAttempt.aggregate([
            {
                $facet: {
                    revenue: [
                        { $match: { status: PAYMENT_ATTEMPT_STATUS.FULFILLED } },
                        { $group: { _id: null, total: { $sum: '$amount' } } }
                    ],
                    statusCounts: [
                        { $match: { status: { $in: [PAYMENT_ATTEMPT_STATUS.FULFILLED, PAYMENT_ATTEMPT_STATUS.FAILED] } } },
                        { $group: { _id: "$status", count: { $sum: 1 } } }
                    ]
                }
            }
        ]),

        // 2. All-time total enrollments
        Enrollment.countDocuments(),

        // 3. Total published courses
        Course.countDocuments({ isPublished: true }),

        // 4. This month revenue
        PaymentAttempt.aggregate([
            { $match: { status: PAYMENT_ATTEMPT_STATUS.FULFILLED, createdAt: { $gte: thisMonthStart } } },
            { $group: { _id: null, total: { $sum: "$amount" } } }
        ]),

        // 5. Last month revenue
        PaymentAttempt.aggregate([
            { $match: { status: PAYMENT_ATTEMPT_STATUS.FULFILLED, createdAt: { $gte: lastMonthStart, $lt: lastMonthEnd } } },
            { $group: { _id: null, total: { $sum: "$amount" } } }
        ]),

        // 6. This month new enrollments
        Enrollment.countDocuments({ createdAt: { $gte: thisMonthStart } }),

        // 7. Last month enrollments
        Enrollment.countDocuments({ createdAt: { $gte: lastMonthStart, $lt: lastMonthEnd } }),

        // 8. New courses published this month
        Course.countDocuments({ isPublished: true, createdAt: { $gte: thisMonthStart } }),
    ]);

    // Return raw DB output — all calculations happen in service layer
    return {
        paymentsStats,
        totalEnrollments,
        publishedCourses,
        thisMonthRevenue,
        lastMonthRevenue,
        thisMonthEnrollments,
        lastMonthEnrollments,
        newCoursesThisMonth,
    };
};