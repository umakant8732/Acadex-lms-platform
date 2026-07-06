import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { AuthState, AuthUser } from './auth-types'

const initialState: AuthState = {
  user: null,
  isLoading: true
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<AuthUser>) => {
      state.user = action.payload
      state.isLoading = false
    },

    clearUser: state => {
      state.user = null
      state.isLoading = false
    }
  }
})

export const {
  setUser,
  clearUser
} = authSlice.actions

export default authSlice.reducer
