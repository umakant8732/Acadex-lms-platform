import { Link } from 'react-router-dom'

import AuthHeader from '../../components/auth-header'
import AuthWrapper from '../../components/auth-wrapper'
import { useLoginPage } from '../../hooks/use-login-page'

const LoginPage = () => {
  const {
    formData,
    errors,
    isSubmitting,
    handleChange,
    handleSubmit
  } = useLoginPage()

  return (
    <AuthWrapper>
      <AuthHeader
        eyebrow='Welcome Back'
        title='Login'
        description='Access your account and continue learning.'
      />

      <form onSubmit={handleSubmit} className='mt-10 space-y-5'>
        <div>
          <input
            type='email'
            name='email'
            value={formData.email}
            onChange={handleChange}
            placeholder='Enter email'
            className='input input-bordered h-14 w-full rounded-none bg-white'
          />
          {errors.email && (
            <p className='mt-1 text-sm text-red-500'>{errors.email}</p>
          )}
        </div>

        <div>
          <input
            type='password'
            name='password'
            value={formData.password}
            onChange={handleChange}
            placeholder='Enter password'
            className='input input-bordered h-14 w-full rounded-none bg-white'
          />

          {errors.password && (
            <p className='mt-1 text-sm text-red-500'>{errors.password}</p>
          )}
        </div>

        <div className='flex justify-end'>
          <Link
            to='/auth/forgot-password'
            className='text-sm text-black/50 transition hover:text-black'
          >
            Forgot Password?
          </Link>
        </div>

        <button
          type='submit'
          disabled={isSubmitting}
          className='btn btn-neutral mt-2 h-14 w-full rounded-none'
        >
          {isSubmitting ? 'Logging in...' : 'Login'}
        </button>
      </form>

      <p className='mt-8 text-center text-black/60'>
        Don&apos;t have an account?{' '}
        <Link
          to='/auth/register'
          className='font-medium text-black transition hover:opacity-60'
        >
          Create Account
        </Link>
      </p>
    </AuthWrapper>
  )
}

export default LoginPage


