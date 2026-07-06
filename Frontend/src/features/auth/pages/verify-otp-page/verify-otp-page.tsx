import AuthHeader from '../../components/auth-header'
import AuthWrapper from '../../components/auth-wrapper'
import { useVerifyOtpPage } from '../../hooks/use-verify-otp-page'

const VerifyOtpPage = () => {
  const {
    otp,
    errors,
    isSubmitting,
    handleOtpChange,
    handleSubmit
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

        <button
          type='submit'
          disabled={isSubmitting}
          className='btn btn-neutral mt-2 h-14 w-full rounded-none'
        >
          {isSubmitting ? 'Verifying...' : 'Verify OTP'}
        </button>
      </form>
    </AuthWrapper>
  )
}

export default VerifyOtpPage


