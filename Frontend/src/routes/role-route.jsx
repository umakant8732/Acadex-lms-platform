import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const RoleRoute = ({ children, allowedRole }) => {
  const { user } = useSelector(state => state.auth)

  if (!user) {
    return <Navigate to='/auth' replace />
  }

  if (user.role !== allowedRole) {
    return <Navigate to='/' replace />
  }

  return children
}

export default RoleRoute
