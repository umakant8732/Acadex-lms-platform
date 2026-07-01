import { useMutation } from '@tanstack/react-query'

import { logoutUserService } from '../services/service-logout-user.js'

export const useLogoutUser = () => {
  return useMutation({
    mutationFn: logoutUserService
  })
}
