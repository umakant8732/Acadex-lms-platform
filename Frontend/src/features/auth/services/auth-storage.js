export const saveVerificationEmail =
  email => {
    localStorage.setItem(
      'verificationEmail',
      email
    )
  }

export const getVerificationEmail =
  () => {
    return localStorage.getItem(
      'verificationEmail'
    )
  }

export const clearVerificationEmail =
  () => {
    localStorage.removeItem(
      'verificationEmail'
    )
  }