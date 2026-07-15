import express from 'express'

import cors from 'cors'

import helmet from 'helmet'

import morgan from 'morgan'

import cookieParser from 'cookie-parser'

import mongoSanitize from 'express-mongo-sanitize'

import compression from 'compression'

import hpp from 'hpp'

import rateLimit from 'express-rate-limit'

import routes from '../routes/app-routes.js'

import errorMiddleware from '../middlewares/error-middleware.js'

import { env } from '../config/env.js'
import { isAllowedClientOrigin } from '../config/client-origins.js'
import { globalLimiter } from '../middlewares/rate-limit-middleware.js'

const app = express()

// Trust one reverse proxy layer when app runs behind Nginx in production.
if (env.NODE_ENV === 'production') {
  app.set('trust proxy', 1)
}

// Allows local tools without origin and trusted frontend apps with cookies.
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || isAllowedClientOrigin(origin)) {
        return callback(null, true)
      }

      return callback(new Error(`CORS blocked for origin: ${origin}`))
    },
    credentials: true
  })
)

// SECURITY HEADERS
app.use(helmet())

// RESPONSE COMPRESSION
app.use(compression())

// HTTP REQUEST LOGGER
app.use(morgan('dev'))

// BODY PARSER
// app.use(express.json())
app.use(
  express.json({
    verify: (req, res, buf) => {
      req.rawBody = buf
    }
  })
)

app.use(
  express.urlencoded({
    extended: true
  })
)

// COOKIE PARSER
app.use(cookieParser())

// MONGO SANITIZE
// app.use(mongoSanitize())

// HTTP PARAMETER POLLUTION
app.use(hpp())

// RATE LIMITER
app.use(globalLimiter)

app.use('/api/v1', routes)

app.use(errorMiddleware)

export default app

