import { useQuery } from '@tanstack/react-query'

import { getCurrentUserService } from '../services/service-get-current-user'
import type { AuthUserResponse } from '../types/auth-query-types'

// Loads current authenticated user once and keeps it fresh forever.
export const useGetCurrentUser = () => {
  return useQuery<AuthUserResponse>({
    queryKey: ['me'],
    queryFn: getCurrentUserService,
    retry: false,
    staleTime: Infinity
  })
}

