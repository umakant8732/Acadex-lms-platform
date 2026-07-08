import {useMutation} from '@tanstack/react-query'

import { resendOtpService } from '../services/service-resend-otp'

import { type ResendOtpPayload, type RefreshTokenResponse, ResendOtpResponse } from '../types/auth-query-types'

//mutation hook to trigger otp request

export const useResendOtp = () => {
    return useMutation<ResendOtpResponse, Error, ResendOtpPayload>({
        mutationFn : resendOtpService
    })
}