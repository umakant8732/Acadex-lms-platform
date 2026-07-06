import { useMutation } from '@tanstack/react-query'

import { logoutUserService } from '../services/service-logout-user'
import type { LogoutUserResponse } from '../types/auth-query-types'

// Ends current session and clears server-side auth cookies.
export const useLogoutUser = () => {
  return useMutation<LogoutUserResponse, Error, void>({
    mutationFn: logoutUserService
  })
}

