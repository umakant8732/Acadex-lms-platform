const VERIFICATION_EMAIL_KEY = 'verificationEmail'

// Stores verification email between register and otp screens.
export const saveVerificationEmail = (email: string): void => {
  localStorage.setItem(VERIFICATION_EMAIL_KEY, email)
}

// Reads saved verification email when otp page opens.
export const getVerificationEmail = (): string | null => {
  return localStorage.getItem(VERIFICATION_EMAIL_KEY)
}

// Clears saved verification email after flow ends.
export const clearVerificationEmail = (): void => {
  localStorage.removeItem(VERIFICATION_EMAIL_KEY)
}
