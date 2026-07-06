import type { RootState } from '../store'

// Central auth selectors keep store reads consistent in every screen.
export const selectAuthState = (state: RootState) => state.auth

export const selectAuthUser = (state: RootState) => state.auth.user

export const selectAuthLoading = (state: RootState) => state.auth.isLoading
