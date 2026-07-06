interface ErrorResponseShape {
  response?: {
    data?: {
      message?: string
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
    return (
      error.response?.data?.message ||
      error.message ||
      fallbackMessage ||
      'Something went wrong'
    )
  }

  return fallbackMessage || 'Something went wrong'
}
