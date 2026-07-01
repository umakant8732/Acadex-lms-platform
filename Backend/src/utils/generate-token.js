import jwt from 'jsonwebtoken'

import { env } from '../config/env.js'

//generate access token
export const generateAccessToken = (userId, role) => {
  return jwt.sign(
    {
      userId,
      role
    },

    env.JWT_ACCESS_SECRET,
    {
      expiresIn: env.ACCESS_TOKEN_EXPIRES_IN
    }
  )
}

export const generateRefreshToken = userId => {
  return jwt.sign(
    {
      userId
    },

    env.JWT_REFRESH_SECRET,

    {
      expiresIn: env.REFRESH_TOKEN_EXPIRES_IN
    }
  )
}
