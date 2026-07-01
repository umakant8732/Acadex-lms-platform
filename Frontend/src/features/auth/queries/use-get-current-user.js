import { useQuery } from '@tanstack/react-query'

import { getCurrentUserService } from '../services/service-get-current-user.js'

export const useGetCurrentUser = () => {
  return useQuery({
    queryKey: ['me'],
    queryFn: getCurrentUserService,
    retry: false,
    staleTime: Infinity
  })
}
