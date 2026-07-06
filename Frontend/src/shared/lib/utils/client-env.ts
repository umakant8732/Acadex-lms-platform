const trimTrailingSlash = (value: string) => value.replace(/\/+$/, '')

const getRequiredClientEnv = (key: 'VITE_API_URL'): string => {
  const value = import.meta.env[key]

  if (!value) {
    throw new Error(`${key} is missing from the current Vite environment.`)
  }

  return value
}

const resolveSocketUrl = (apiUrl: string, socketUrl?: string): string => {
  if (socketUrl) {
    return trimTrailingSlash(socketUrl)
  }

  return new URL(apiUrl, window.location.origin).origin
}

const apiUrl = trimTrailingSlash(getRequiredClientEnv('VITE_API_URL'))

// We keep socket on same server by default unless env gives a custom socket host.
const socketUrl = resolveSocketUrl(apiUrl, import.meta.env.VITE_SOCKET_URL)

export const clientEnv = {
  apiUrl,
  socketUrl
} as const
