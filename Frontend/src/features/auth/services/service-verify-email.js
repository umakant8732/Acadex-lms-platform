import { verifyEmailApi } from '../api/api-verify-email.js'

export const verifyEmailService = async data => {
  return await verifyEmailApi(data)
}
