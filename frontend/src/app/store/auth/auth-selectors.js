// Central auth selectors keep store reads consistent in every screen.
export const selectAuthState = (state) => state.auth;

export const selectAuthUser = (state) => state.auth.user;

export const selectAuthLoading = (state) => state.auth.isLoading;
