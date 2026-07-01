import Enrollment from '../models/enrollment-model.js'

// Finds enrollment already created from same payment attempt.
export const findEnrollmentByPaymentAttemptId = async paymentAttemptId => {
  return await Enrollment.findOne({
    paymentAttemptId
  })
}
