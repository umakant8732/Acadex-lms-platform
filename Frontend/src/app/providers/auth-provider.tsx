import { useEffect, useRef, type PropsWithChildren } from 'react'

import { useGetCurrentUser } from '../../features/auth/queries/use-get-current-user'
import { useRefreshToken } from '../../features/auth/queries/use-refresh-token'
import PageLoader from '../../shared/ui/feedback/page-loader'
import { clearUser, setUser, useAppDispatch } from '../store'

const AuthProvider = ({ children }: PropsWithChildren) => {
  const dispatch = useAppDispatch()
  const hasTriedRefresh = useRef(false)

  const {
    data,
    isLoading,
    isSuccess,
    isError,
    refetch
  } = useGetCurrentUser()

  const {
    mutateAsync: refreshSession,
    isPending: isRefreshing
  } = useRefreshToken()

  useEffect(() => {
    const recoverSession = async () => {
      try {
        // If access token is gone but refresh cookie exists, issue new cookies once.
        await refreshSession()

        const refreshedUser = await refetch()

        if (refreshedUser.data?.data) {
          dispatch(setUser(refreshedUser.data.data))
          return
        }
      } catch {
        // If refresh also fails, we just treat user as signed out.
      }

      dispatch(clearUser())
    }

    if (isSuccess) {
      if (data?.data) {
        dispatch(setUser(data.data))
      } else {
        dispatch(clearUser())
      }

      return
    }

    if (isError) {
      if (!hasTriedRefresh.current) {
        hasTriedRefresh.current = true
        recoverSession()
        return
      }

      dispatch(clearUser())
    }
  }, [
    data,
    dispatch,
    isError,
    isSuccess,
    refetch,
    refreshSession
  ])

  if (isLoading || isRefreshing) {
    return <PageLoader />
  }

  return <>{children}</>
}

export default AuthProvider
