import cors from 'cors'
import { isAllowedClientOrigin } from './client-origins.js'

export const corsOptions = {
  origin: (origin, callback) => {
    // Allows local testing tools (Postman/curl) and whitelisted frontend domains
    if (!origin || isAllowedClientOrigin(origin)) {
      return callback(null, true)
    }

    return callback(new Error(`CORS blocked for origin: ${origin}`))
  },
  credentials: true
}

export const corsMiddleware = cors(corsOptions)
