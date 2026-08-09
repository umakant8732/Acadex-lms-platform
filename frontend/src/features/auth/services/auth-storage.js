const VERIFICATION_EMAIL_KEY = "verificationEmail";
const VERIFICATION_OTP_EXPIRY_KEY = "verificationOtpExpiry";

// Stores verification email between register and otp screens.
export const saveVerificationEmail = (email) => {
  localStorage.setItem(VERIFICATION_EMAIL_KEY, email);
};

// Reads saved verification email when otp page opens.
export const getVerificationEmail = () => {
  return localStorage.getItem(VERIFICATION_EMAIL_KEY);
};

// Clears saved verification email after flow ends.
export const clearVerificationEmail = () => {
  localStorage.removeItem(VERIFICATION_EMAIL_KEY);
};

//stores absolute expiry timestamp
export const saveVerificationOtpExpiry = (expiresInSeconds) => {
  const absoluteExpiryTime = Date.now() + expiresInSeconds * 1000;
  localStorage.setItem(VERIFICATION_OTP_EXPIRY_KEY, String(absoluteExpiryTime));
};

//reads saved expiry timestamp
export const getVerificationOtpExpiry = () => {
  const expiry = localStorage.getItem(VERIFICATION_OTP_EXPIRY_KEY);
  return expiry ? Number(expiry) : null;
};

//clears  saved expiry timestamp
export const clearVerificationOtpExpiry = () => {
  localStorage.removeItem(VERIFICATION_OTP_EXPIRY_KEY);
};
