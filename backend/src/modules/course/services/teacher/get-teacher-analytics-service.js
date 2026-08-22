import { findAdminOverviewStats } from "../../repositories/find-admin-overview-stats-repository.js";
import { PAYMENT_ATTEMPT_STATUS } from "../../../payment/constants/payment-constants.js";

// Service layer: receives raw DB data and computes all KPI metrics
export const getTeacherAnalyticsService = async () => {
    const raw = await findAdminOverviewStats();

    // --- Revenue ---
    const rawRevenue = raw.paymentsStats[0]?.revenue[0]?.total ?? 0;
    const totalRevenue = rawRevenue / 100; // paise → rupees

    // Revenue growth % vs last month
    const rawThisMonthRev = raw.thisMonthRevenue[0]?.total ?? 0;
    const rawLastMonthRev = raw.lastMonthRevenue[0]?.total ?? 0;
    const revenueGrowth = rawLastMonthRev > 0
        ? parseFloat((((rawThisMonthRev - rawLastMonthRev) / rawLastMonthRev) * 100).toFixed(1))
        : null;

    // --- Enrollments growth % ---
    const enrollmentGrowth = raw.lastMonthEnrollments > 0
        ? parseFloat((((raw.thisMonthEnrollments - raw.lastMonthEnrollments) / raw.lastMonthEnrollments) * 100).toFixed(1))
        : null;

    // --- Payment Success Rate ---
    const countsArray = raw.paymentsStats[0]?.statusCounts ?? [];
    const fulfilledCount = countsArray.find(c => c._id === PAYMENT_ATTEMPT_STATUS.FULFILLED)?.count ?? 0;
    const failedCount    = countsArray.find(c => c._id === PAYMENT_ATTEMPT_STATUS.FAILED)?.count ?? 0;
    const totalAttempts  = fulfilledCount + failedCount;
    const paymentSuccessRate = totalAttempts > 0
        ? parseFloat(((fulfilledCount / totalAttempts) * 100).toFixed(1))
        : 100;

    // Return structured KPI data for the 4 dashboard cards
    return {
        totalRevenue,
        revenueGrowth,
        totalEnrollments: raw.totalEnrollments,
        enrollmentGrowth,
        publishedCourses: raw.publishedCourses,
        newCoursesThisMonth: raw.newCoursesThisMonth,
        paymentSuccessRate,
    };
};