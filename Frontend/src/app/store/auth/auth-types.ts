// Shared auth shapes used across store, routes, and auth API types.
export interface AuthUser {
  _id?: string
  fullName?: string
  email?: string
  role?: string
  avatar?: string
  [key: string]: unknown
}

export interface AuthState {
  user: AuthUser | null
  isLoading: boolean
}
