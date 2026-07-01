//builds one consistent access object for student course UI.

export const buildStudentCourseAccess = ({ enrollment }) => {
    const isPurchased = Boolean(enrollment)

    return {
        isPurchased,
        progressPercent: 0,
        expiresAt: null,

        //frontend should render CTA from backend access state.
        primaryAction: isPurchased ?
            {
                type: 'continue',
                label: 'Continue'
            }

            :

            {
                type: 'buy_now',
                label: 'Buy now to unlock'
            }


    }
}