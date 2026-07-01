export const redirectToHomeScreen = role => {
  switch (role) {
    case 'teacher':
      return '/teacher'

    case 'student':
      return '/student'

    default:
      return '/'
  }
}

// Keeps redirect target inside app routes only.
export const getSafeRedirectPath = redirectPath => {
  if (typeof redirectPath !== 'string') {
    return ''
  }

  const normalizedPath = redirectPath.trim()

  if (!normalizedPath.startsWith('/') || normalizedPath.startsWith('//')) {
    return ''
  }

  return normalizedPath
}

// Uses redirect path only when it matches current user role.
export const getPostLoginRedirectPath = ({ role, redirectPath }) => {
  const safeRedirectPath = getSafeRedirectPath(redirectPath)

  if (!safeRedirectPath) {
    return redirectToHomeScreen(role)
  }

  if (safeRedirectPath.startsWith('/student') && role !== 'student') {
    return redirectToHomeScreen(role)
  }

  if (safeRedirectPath.startsWith('/teacher') && role !== 'teacher') {
    return redirectToHomeScreen(role)
  }

  return safeRedirectPath
}
