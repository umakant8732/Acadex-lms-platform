import { useForgotPasswordPage } from '../../hooks/use-forgot-password-page.js'

const ForgotPasswordPage = () => {
  const {
    email,
    errors,
    handleEmailChange,
    handleSubmit
  } = useForgotPasswordPage()

  return (
    <div>
      <p className='text-sm uppercase tracking-[0.3em] text-black/40'>
        Password Recovery
      </p>

      <h1 className='mt-4 text-5xl font-semibold tracking-tight'>
        Forgot Password
      </h1>

      <p className='mt-5 text-black/60 leading-7'>
        Enter your registered email to receive verification code.
      </p>

      <form onSubmit={handleSubmit} className='mt-10 space-y-5'>
        <div>
          <input
            type='email'
            value={email}
            onChange={handleEmailChange}
            placeholder='Enter registered email'
            className='input input-bordered w-full rounded-none h-14 bg-white'
          />

          {errors.email && (
            <p className='text-red-500 text-sm mt-1'>{errors.email}</p>
          )}
        </div>

        <button
          type='submit'
          className='btn btn-neutral rounded-none w-full h-14 mt-2'
        >
          Send OTP
        </button>
      </form>
    </div>
  )
}

export default ForgotPasswordPage
