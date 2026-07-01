import { refreshTokenApi } from '../api/api-refresh-token.js'

export const refreshTokenService = async () => {
  return await refreshTokenApi()
}
