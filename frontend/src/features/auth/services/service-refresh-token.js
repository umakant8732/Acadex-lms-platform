import { refreshTokenApi } from "../api/api-refresh-token";

// Requests refreshed auth cookies from api layer.
export const refreshTokenService = () => {
  return refreshTokenApi();
};
