import type { PropsWithChildren } from 'react'
import { Navigate } from 'react-router-dom'

import { selectAuthLoading, selectAuthUser, useAppSelector } from '../app/store'
import PageLoader from '../shared/ui/feedback/page-loader'

const ProtectedRoute = ({ children }: PropsWithChildren) => {
  const user = useAppSelector(selectAuthUser)
  const isLoading = useAppSelector(selectAuthLoading)

  if (isLoading) {
    return <PageLoader />
  }

  if (!user) {
    return <Navigate to='/auth' replace />
  }

  return <>{children}</>
}

export default ProtectedRoute
