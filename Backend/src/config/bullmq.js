
import {env} from './env.js'

export const bullMQConnection = {
    host : env.REDIS_HOST,
    port : env.REDIS_PORT
}