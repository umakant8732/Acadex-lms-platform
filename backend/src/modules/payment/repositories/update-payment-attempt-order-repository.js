import PaymentAttempt from "../models/payment-attempt-model.js";

//saves provider order id after Razorpay order is created.

export const updatePaymentAttemptOrderId = async (
    paymentAttemptId,
    providerOrderId
) => {
    return await PaymentAttempt.findByIdAndUpdate(
        paymentAttemptId,
        {
            providerOrderId
        },
        {
            new : true,
            runValidators : true
        }
    )
}