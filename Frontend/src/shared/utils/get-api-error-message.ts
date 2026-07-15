interface ErrorResponseShape {
  response?: {
    data?: {
      message?: string | Record<string, unknown> | Array<{ message?: string } & Record<string, unknown>>
    }
  }
  message?: string
}

const isErrorResponseShape = (value: unknown): value is ErrorResponseShape => {
  return typeof value === 'object' && value !== null
}

// Picks readable message from api/browser errors.
// This keeps page hooks smaller and toast text clean.
export const getApiErrorMessage = (
  error: unknown,
  fallbackMessage?: string
): string => {
  if (isErrorResponseShape(error)) {
    const apiMessage = error.response?.data?.message

    if (apiMessage) {
      if (typeof apiMessage === 'string') {
        return apiMessage
      }
      if (Array.isArray(apiMessage)) {
        // Extract validation messages from Zod / Express validator array
        return apiMessage.map(err => err.message || JSON.stringify(err)).join(', ')
      }
      if (typeof apiMessage === 'object') {
        // Extract first error message from key-value pair object
        const values = Object.values(apiMessage)
        if (values.length > 0) {
          const firstVal = values[0]
          return typeof firstVal === 'string' ? firstVal : JSON.stringify(firstVal)
        }
        return JSON.stringify(apiMessage)
      }
    }

    return (
      error.message ||
      fallbackMessage ||
      'Something went wrong'
    )
  }

  return fallbackMessage || 'Something went wrong'
}
