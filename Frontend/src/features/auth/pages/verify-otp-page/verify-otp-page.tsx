import AuthHeader from '../../components/auth-header'
import AuthWrapper from '../../components/auth-wrapper'
import { useVerifyOtpPage } from '../../hooks/use-verify-otp-page'


const formatTime = (seconds: number) => {
  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60

  return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`
}

const VerifyOtpPage = () => {
  const {
    otp,
    errors,
    isSubmitting,
    timeLeft,
    isResending,
    handleOtpChange,
    handleSubmit,
    handleResendOtp
  } = useVerifyOtpPage()

  return (
    <AuthWrapper>
      <AuthHeader
        eyebrow='OTP Verification'
        title='Verify OTP'
        description='Enter the verification code sent to your email address.'
      />

      <form onSubmit={handleSubmit} className='mt-10 space-y-5'>
        <div>
          <input
            type='text'
            value={otp}
            onChange={handleOtpChange}
            placeholder='Enter OTP'
            maxLength={6}
            className='input input-bordered h-14 w-full rounded-none bg-white tracking-[0.5em]'
          />

          {errors.otp && <p className='text-sm text-red-500'>{errors.otp}</p>}
        </div>

         {timeLeft > 0 ? (
            <p className='text-sm text-black/55 mt-2'>
              OTP expires in:{' '}
              <span className='font-mono font-medium text-black'>
                {formatTime(timeLeft)}
              </span>
            </p>
          ) : (
            <p className='text-sm text-red-500 mt-2 font-medium'>
              OTP has expired. Please request a new one.
            </p>
          )}
        

        <button
          type='submit'
          disabled={isSubmitting}
          className='btn btn-neutral mt-2 h-14 w-full rounded-none'
        >
          {isSubmitting ? 'Verifying...' : 'Verify OTP'}
        </button>

        <div className='text-center mt-4'>
          <button
            type='button'
            onClick={handleResendOtp}
            disabled={timeLeft > 0 || isResending}
            className='text-sm font-semibold text-neutral hover:underline disabled:opacity-40 disabled:no-underline'
          >
            {isResending ? 'Resending OTP...' : 'Resend OTP'}
          </button>
        </div>
      </form>
    </AuthWrapper>
  )
}

export default VerifyOtpPage


