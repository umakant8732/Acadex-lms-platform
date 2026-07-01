/*
1.take domain/key id/private key path fro .env
2.read private key file
3.convert expiry seconds of signed url into numbers
4.clean export for other services and helper files 
*/

//to read private key file -> backend/secure/private key of cloudfront
import {readFileSync} from 'node:fs'

import path from 'node:path'
import { env } from './env.js'

const cloudFrontPrivateKeyPath = path.resolve(
    process.cwd(),
    env.CLOUDFRONT_PRIVATE_KEY_PATH
)

const cloudFrontPrivateKey = readFileSync(
    cloudFrontPrivateKeyPath,
    'utf-8'
)

// Central CloudFront config used for signed playback URLs.
export const cloudFrontConfig = {
    domain : env.CLOUDFRONT_DOMAIN,
    keyPairId : env.CLOUDFRONT_KEY_PAIR_ID,
    privateKey : cloudFrontPrivateKey,
    urlExpiresIn : Number(env.CLOUDFRONT_URL_EXPIRES_IN)
}