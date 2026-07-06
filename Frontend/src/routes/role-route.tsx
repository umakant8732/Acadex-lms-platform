import type { PropsWithChildren } from 'react'
import { Navigate } from 'react-router-dom'

import { selectAuthUser, useAppSelector } from '../app/store'

interface RoleRouteProps extends PropsWithChildren {
  allowedRole: string
}

const RoleRoute = ({ children, allowedRole }: RoleRouteProps) => {
  const user = useAppSelector(selectAuthUser)

  if (!user) {
    return <Navigate to='/auth' replace />
  }

  if (user.role !== allowedRole) {
    return <Navigate to='/' replace />
  }

  return <>{children}</>
}

export default RoleRoute
