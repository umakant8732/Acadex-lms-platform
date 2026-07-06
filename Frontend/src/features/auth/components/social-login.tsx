interface SocialLoginProps {
  isDisabled?: boolean
}

// Keeps optional social auth actions in one reusable UI block.
const SocialLogin = ({ isDisabled = false }: SocialLoginProps) => {
  return (
    <div className='mt-8 space-y-4'>
      <div className='flex items-center gap-4 text-xs uppercase tracking-[0.3em] text-black/30'>
        <span className='h-px flex-1 bg-black/10' />
        <span>Or continue with</span>
        <span className='h-px flex-1 bg-black/10' />
      </div>

      <div className='grid grid-cols-2 gap-3'>
        <button
          type='button'
          disabled={isDisabled}
          className='btn h-12 rounded-none border border-black/10 bg-white text-black shadow-none hover:bg-black hover:text-white'
        >
          Google
        </button>

        <button
          type='button'
          disabled={isDisabled}
          className='btn h-12 rounded-none border border-black/10 bg-white text-black shadow-none hover:bg-black hover:text-white'
        >
          GitHub
        </button>
      </div>
    </div>
  )
}

export default SocialLogin
