import AuthHeader from '../../components/auth-header'
import AuthWrapper from '../../components/auth-wrapper'
import { useForgotPasswordPage } from '../../hooks/use-forgot-password-page'

const ForgotPasswordPage = () => {
  const {
    email,
    errors,
    handleEmailChange,
    handleSubmit
  } = useForgotPasswordPage()

  return (
    <AuthWrapper>
      <AuthHeader
        eyebrow='Password Recovery'
        title='Forgot Password'
        description='Enter your registered email to receive verification code.'
      />

      <form onSubmit={handleSubmit} className='mt-10 space-y-5'>
        <div>
          <input
            type='email'
            value={email}
            onChange={handleEmailChange}
            placeholder='Enter registered email'
            className='input input-bordered h-14 w-full rounded-none bg-white'
          />

          {errors.email && (
            <p className='mt-1 text-sm text-red-500'>{errors.email}</p>
          )}
        </div>

        <button
          type='submit'
          className='btn btn-neutral mt-2 h-14 w-full rounded-none'
        >
          Send OTP
        </button>
      </form>
    </AuthWrapper>
  )
}

export default ForgotPasswordPage


