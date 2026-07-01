import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import PageLoader from '../shared/ui/feedback/page-loader'
const ProtectedRoute = ({ children }) => {
  const { user, isLoading } = useSelector(state => state.auth)

  if (isLoading) {
    return <PageLoader />
  }

  if (!user) {
    return <Navigate to='/auth' replace />
  }

  return children
}

export default ProtectedRoute

