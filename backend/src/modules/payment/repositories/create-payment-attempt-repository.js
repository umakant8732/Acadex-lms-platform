import PaymentAttempt from "../models/payment-attempt-model.js";

//creates fresh payment attempt before provider order creation.

export const createPaymentAttempt = async payload => {
    return await PaymentAttempt.create(payload)
}