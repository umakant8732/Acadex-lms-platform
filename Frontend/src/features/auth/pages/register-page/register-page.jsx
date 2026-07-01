import { useRegisterPage } from '../../hooks/use-register-page.js'

const RegisterPage = () => {
  const {
    formData,
    errors,
    isSubmitting,
    handleChange,
    handleSubmit
  } = useRegisterPage()

  return (
    <div>
      <p className='text-sm uppercase tracking-[0.3em] text-black/40'>
        Create Account
      </p>

      <h1 className='mt-4 text-5xl font-semibold tracking-tight'>Register</h1>

      <p className='mt-5 text-black/60 leading-7'>
        Start your learning journey with modern development courses.
      </p>

      <form onSubmit={handleSubmit} className='mt-10 space-y-5'>
        <div>
          <input
            type='text'
            name='fullName'
            value={formData.fullName}
            onChange={handleChange}
            placeholder='Enter full name'
            className='input input-bordered w-full rounded-none h-14 bg-white'
          />

          {errors.fullName && (
            <p className='text-red-500 text-sm mt-1'>{errors.fullName}</p>
          )}
        </div>

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
            placeholder='Create password'
            className='input input-bordered w-full rounded-none h-14 bg-white'
          />

          {errors.password && (
            <p className='text-red-500 text-sm mt-1'>{errors.password}</p>
          )}
        </div>

        <button
          type='submit'
          disabled={isSubmitting}
          className='btn btn-neutral rounded-none w-full h-14 mt-2'
        >
          {isSubmitting ? 'Creating Account...' : 'Create Account'}
        </button>
      </form>
    </div>
  )
}

export default RegisterPage
