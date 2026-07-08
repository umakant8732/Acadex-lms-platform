import AuthHeader from '../../components/auth-header'
import AuthWrapper from '../../components/auth-wrapper'
import { useResetPasswordPage } from '../../hooks/use-reset-password-page'

const ResetPasswordPage = () => {
  const {
    formData,
    errors,
    isSubmitting,
    handleChange,
    handleSubmit
  } = useResetPasswordPage()

  return (
    <AuthWrapper>
      <AuthHeader
        eyebrow='Password Recovery'
        title='Reset Password'
        description='Please enter the OTP sent to your email and your new password.'
      />

      <form onSubmit={handleSubmit} className='mt-10 space-y-5'>
        <div>
          <input
            type='text'
            name='otp'
            value={formData.otp}
            onChange={handleChange}
            placeholder='Enter OTP'
            maxLength={6}
            className='input input-bordered h-14 w-full rounded-none bg-white tracking-[0.5em]'
          />
          {errors.otp && <p className='mt-1 text-sm text-red-500'>{errors.otp}</p>}
        </div>

        <div>
          <input
            type='password'
            name='newPassword'
            value={formData.newPassword}
            onChange={handleChange}
            placeholder='New Password'
            autoComplete='new-password'
            className='input input-bordered h-14 w-full rounded-none bg-white'
          />
          {errors.newPassword && (
            <p className='mt-1 text-sm text-red-500'>{errors.newPassword}</p>
          )}
        </div>

        <div>
          <input
            type='password'
            name='confirmPassword'
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder='Confirm New Password'
            autoComplete='new-password'
            className='input input-bordered h-14 w-full rounded-none bg-white'
          />
          {errors.confirmPassword && (
            <p className='mt-1 text-sm text-red-500'>{errors.confirmPassword}</p>
          )}
        </div>

        <button
          type='submit'
          disabled={isSubmitting}
          className='btn btn-neutral mt-2 h-14 w-full rounded-none'
        >
          {isSubmitting ? 'Resetting...' : 'Reset Password'}
        </button>
      </form>
    </AuthWrapper>
  )
}

export default ResetPasswordPage
