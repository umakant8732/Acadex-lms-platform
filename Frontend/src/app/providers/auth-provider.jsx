import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import { useGetCurrentUser } from '../../features/auth/queries/use-get-current-user'
import { clearUser, setUser } from '../../features/auth/store/auth-slice'
import PageLoader from '../../shared/ui/feedback/page-loader'

const AuthProvider = ({ children }) => {
  const dispatch = useDispatch()

  const { data, isLoading, isSuccess, isError } = useGetCurrentUser()

  useEffect(() => {
    if (isSuccess) {
      if (data?.data) {
        dispatch(setUser(data.data))
      } else {
        dispatch(clearUser())
      }
    }

    if (isError) {
      dispatch(clearUser())
    }
  }, [data, isSuccess, isError, dispatch])

  if (isLoading) {
    return <PageLoader />
  }

  return children
}

export default AuthProvider

