import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'

import { useLoginUser } from '../queries/use-login-user.js'
import { setUser } from '../store/auth-slice.js'
import { loginSchema } from '../validations/login-schema.js'
import { getPostLoginRedirectPath } from '../../../shared/utils/auth-redirect.js'
import { showError, showSuccess } from '../../../shared/utils/toast.js'
import { getZodErrors } from '../../../shared/utils/zod.js'

const initialLoginValues = {
  email: '',
  password: ''
}

export const useLoginPage = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const loginMutation = useLoginUser()

  const [formData, setFormData] = useState(initialLoginValues)
  const [errors, setErrors] = useState({})

  const redirectPath = new URLSearchParams(location.search).get('redirect')

  const handleChange = event => {
    const { name, value } = event.target

    setFormData(prev => ({ ...prev, [name]: value }))

    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const handleSubmit = async event => {
    event.preventDefault()

    const result = loginSchema.safeParse(formData)

    if (!result.success) {
      setErrors(getZodErrors(result.error))
      return
    }

    try {
      const response = await loginMutation.mutateAsync(result.data)

      dispatch(setUser(response.data))

      navigate(
        getPostLoginRedirectPath({
          role: response.data.role,
          redirectPath
        })
      )

      showSuccess(response.message)
    } catch (error) {
      if (error.response?.status === 403) {
        navigate(`/auth/verify-otp${location.search}`)
      }

      showError(error?.response?.data?.message || 'Login failed')
    }
  }

  return {
    formData,
    errors,
    isSubmitting: loginMutation.isPending,
    handleChange,
    handleSubmit
  }
}
