import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import { useLogoutUser } from '../queries/use-logout-user'
import { clearUser } from '../store/auth-slice'

import { showError, showSuccess } from '../../../shared/utils/toast'

export const useAuthLogout = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const logoutMutation = useLogoutUser()
  const handleLogout = async () => {
    try {
      const response = await logoutMutation.mutateAsync()
      dispatch(clearUser())
      showSuccess(response.message)
      navigate('/auth')
    } catch (error) {
      showError(error.response?.data?.message)
    }
  }
  return { handleLogout, isPending: logoutMutation.isPending }
}
