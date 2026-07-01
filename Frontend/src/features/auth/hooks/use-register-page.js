import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { useRegisterUser } from '../queries/use-register-user.js'
import { saveVerificationEmail } from '../services/auth-storage.js'
import { registerSchema } from '../validations/register-schema.js'
import { showError, showSuccess } from '../../../shared/utils/toast.js'
import { getZodErrors } from '../../../shared/utils/zod.js'

const initialRegisterValues = {
  fullName: '',
  email: '',
  password: ''
}

export const useRegisterPage = () => {
  const navigate = useNavigate()
  const registerMutation = useRegisterUser()

  const [formData, setFormData] = useState(initialRegisterValues)
  const [errors, setErrors] = useState({})

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

    const result = registerSchema.safeParse(formData)

    if (!result.success) {
      setErrors(getZodErrors(result.error))
      return
    }

    try {
      setErrors({})

      const response = await registerMutation.mutateAsync(result.data)

      saveVerificationEmail(response.data.email)
      showSuccess(response.message)
      navigate('/auth/verify-otp')
    } catch (error) {
      showError(error?.response?.data?.message || 'Registration failed')
    }
  }

  return {
    formData,
    errors,
    isSubmitting: registerMutation.isPending,
    handleChange,
    handleSubmit
  }
}
