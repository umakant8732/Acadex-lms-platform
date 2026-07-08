import AuthHeader from '../../components/auth-header'
import AuthWrapper from '../../components/auth-wrapper'
import { useRegisterPage } from '../../hooks/use-register-page'

const RegisterPage = () => {
  const {
    formData,
    errors,
    isSubmitting,
    handleChange,
    handleSubmit
  } = useRegisterPage()

  return (
    <AuthWrapper>
      <AuthHeader
        eyebrow='Create Account'
        title='Register'
        description='Start your learning journey with modern development courses.'
      />

      <form onSubmit={handleSubmit} className='mt-10 space-y-5'>
        <div>
          <input
            type='text'
            name='fullName'
            value={formData.fullName}
            onChange={handleChange}
            placeholder='Enter full name'
            className='input input-bordered h-14 w-full rounded-none bg-white'
          />

          {errors.fullName && (
            <p className='mt-1 text-sm text-red-500'>{errors.fullName}</p>
          )}
        </div>

        <div>
          <input
            type='email'
            name='email'
            value={formData.email}
            onChange={handleChange}
            placeholder='Enter email'
            autoComplete='username'
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
            placeholder='Create password'
            autoComplete='new-password'
            className='input input-bordered h-14 w-full rounded-none bg-white'
          />

          {errors.password && (
            <p className='mt-1 text-sm text-red-500'>{errors.password}</p>
          )}
        </div>

        <button
          type='submit'
          disabled={isSubmitting}
          className='btn btn-neutral mt-2 h-14 w-full rounded-none'
        >
          {isSubmitting ? 'Creating Account...' : 'Create Account'}
        </button>
      </form>
    </AuthWrapper>
  )
}

export default RegisterPage


