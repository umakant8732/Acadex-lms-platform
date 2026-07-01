import jwt from 'jsonwebtoken'

import User from '../modules/auth/models/user-model.js'


import ApiError from '../utils/api-error.js'

import {env} from '../config/env.js'


const authMiddleware = async (req, res, next) => {


    try {
        const token = req.cookies?.accessToken

        if(!token) {
            throw new ApiError(401, 'Unauthorized')
        }

        const decoded = jwt.verify(token, env.JWT_ACCESS_SECRET)

        const user = await User.findById(decoded.userId).select('-password -refreshToken')


        if(!user) {
            throw new ApiError(401, 'User not found')
        }

        req.user = user

        next()
    } catch (error) {
        next(error)
    }

}

    export default authMiddleware
