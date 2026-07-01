import { Navigate, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { getPostLoginRedirectPath } from '../shared/utils/auth-redirect.js'

const PreventAuthRoute = ({ children }) => {
  const location = useLocation()
  const { user, isLoading } = useSelector(state => state.auth)

  const redirectPath = new URLSearchParams(location.search).get('redirect')

  if (isLoading) {
    return null
  }

  if (user) {
    return (
      <Navigate
        to={
          getPostLoginRedirectPath({
            role: user.role,
            redirectPath
          })
        }
        replace
      />
    )
  }

  return children
}

export default PreventAuthRoute
