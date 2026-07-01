import Enrollment from '../models/enrollment-model.js'

// Creates final course access record for student.
export const createEnrollment = async payload => {
  return await Enrollment.create(payload)
}
