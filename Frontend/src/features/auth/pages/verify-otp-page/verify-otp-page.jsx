import { useVerifyOtpPage } from '../../hooks/use-verify-otp-page.js'

const VerifyOtpPage = () => {
  const {
    otp,
    errors,
    isSubmitting,
    handleOtpChange,
    handleSubmit
  } = useVerifyOtpPage()

  return (
    <div>
      <p className='text-sm uppercase tracking-[0.3em] text-black/40'>
        OTP Verification
      </p>

      <h1 className='mt-4 text-5xl font-semibold tracking-tight'>Verify OTP</h1>

      <p className='mt-5 text-black/60 leading-7'>
        Enter the verification code sent to your email address.
      </p>

      <form onSubmit={handleSubmit} className='mt-10 space-y-5'>
        <div>
          <input
            type='text'
            value={otp}
            onChange={handleOtpChange}
            placeholder='Enter OTP'
            maxLength={6}
            className='input input-bordered w-full rounded-none h-14 bg-white tracking-[0.5em]'
          />

          {errors.otp && <p className='text-red-500 text-sm'>{errors.otp}</p>}
        </div>

        <button
          type='submit'
          disabled={isSubmitting}
          className='btn btn-neutral rounded-none w-full h-14 mt-2'
        >
          {isSubmitting ? 'Verifying...' : 'Verify OTP'}
        </button>
      </form>
    </div>
  )
}

export default VerifyOtpPage
