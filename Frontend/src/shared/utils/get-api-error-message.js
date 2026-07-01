// Picks clean message from api/browser error.
// This keeps hooks small and teacher gets readable toast.
export const getApiErrorMessage = (error, fallbackMessage) => {
  return (
    error?.response?.data?.message ||
    error?.message ||
    fallbackMessage ||
    'Something went wrong'
  )
}
