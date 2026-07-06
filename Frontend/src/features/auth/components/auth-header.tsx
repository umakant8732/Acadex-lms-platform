interface AuthHeaderProps {
  eyebrow: string
  title: string
  description: string
}

// Renders common heading block used across auth pages.
const AuthHeader = ({
  eyebrow,
  title,
  description
}: AuthHeaderProps) => {
  return (
    <>
      <p className='text-sm uppercase tracking-[0.3em] text-black/40'>
        {eyebrow}
      </p>

      <h1 className='mt-4 text-5xl font-semibold tracking-tight'>{title}</h1>

      <p className='mt-5 leading-7 text-black/60'>{description}</p>
    </>
  )
}

export default AuthHeader
