import type { PropsWithChildren } from 'react'
import { Navigate, useLocation } from 'react-router-dom'

import { selectAuthLoading, selectAuthUser, useAppSelector } from '../app/store'
import { getPostLoginRedirectPath } from '../shared/utils/auth-redirect.js'

const PreventAuthRoute = ({ children }: PropsWithChildren) => {
  const location = useLocation()
  const user = useAppSelector(selectAuthUser)
  const isLoading = useAppSelector(selectAuthLoading)

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

  return <>{children}</>
}

export default PreventAuthRoute
