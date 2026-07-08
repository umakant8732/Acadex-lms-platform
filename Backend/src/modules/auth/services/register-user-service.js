import ApiError from '../../../utils/api-error.js'
import { createNewUser } from '../repositories/create-new-user-repository.js'
import { findUserByEmail } from '../repositories/find-user-by-email-repository.js'
import { sendOTPToUser } from './send-otp-to-user-service.js'

export const registerService = async payload => {
  const { fullName, email, password } = payload

  const existingUser = await findUserByEmail(email)

  if (existingUser && existingUser.isEmailVerified) {
    throw new ApiError(409, 'User already exists')
  }

  if (existingUser && !existingUser.isEmailVerified) {
    await sendOTPToUser(email)

    return {
      isNewUser: false,
      email: existingUser.email,
      expiresIn : 300 //5 min
    }
  }

  const user = await createNewUser({
    fullName,
    email,
    password
  })

  await sendOTPToUser(email)

  return {
    isNewUser: true,
    user,
    expiresIn : 300 //5min
  }
}
