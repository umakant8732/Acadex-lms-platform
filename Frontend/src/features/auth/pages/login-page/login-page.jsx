import { Link } from 'react-router-dom'
import { useLoginPage } from '../../hooks/use-login-page.js'

const LoginPage = () => {
  const {
    formData,
    errors,
    isSubmitting,
    handleChange,
    handleSubmit
  } = useLoginPage()

  return (
    <div>
      <p className='text-sm uppercase tracking-[0.3em] text-black/40'>
        Welcome Back
      </p>

      <h1 className='mt-4 text-5xl font-semibold tracking-tight'>Login</h1>

      <p className='mt-5 text-black/60 leading-7'>
        Access your account and continue learning.
      </p>

      <form onSubmit={handleSubmit} className='mt-10 space-y-5'>
        <div>
          <input
            type='email'
            name='email'
            value={formData.email}
            onChange={handleChange}
            placeholder='Enter email'
            className='input input-bordered w-full rounded-none h-14 bg-white'
          />
          {errors.email && (
            <p className='text-red-500 text-sm mt-1'>{errors.email}</p>
          )}
        </div>

        <div>
          <input
            type='password'
            name='password'
            value={formData.password}
            onChange={handleChange}
            placeholder='Enter password'
            className='input input-bordered w-full rounded-none h-14 bg-white'
          />

          {errors.password && (
            <p className='text-red-500 text-sm mt-1'>{errors.password}</p>
          )}
        </div>

        {/* FORGOT PASSWORD */}
        <div className='flex justify-end'>
          <Link
            to='/auth/forgot-password'
            className='text-sm text-black/50 hover:text-black transition'
          >
            Forgot Password?
          </Link>
        </div>

        <button
          type='submit'
          disabled={isSubmitting}
          className='btn btn-neutral rounded-none w-full h-14 mt-2'
        >
          {isSubmitting ? 'Logging in...' : 'Login'}
        </button>
      </form>

      {/* REGISTER LINK */}
      <p className='mt-8 text-center text-black/60'>
        Don&apos;t have an account?{' '}
        <Link
          to='/auth/register'
          className='font-medium text-black hover:opacity-60 transition'
        >
          Create Account
        </Link>
      </p>
    </div>
  )
}

export default LoginPage
