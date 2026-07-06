import {
  FiAlertTriangle,
  FiBookOpen,
  FiRefreshCcw
} from 'react-icons/fi'

type SectionQueryErrorVariant = 'error' | 'empty'

interface SectionQueryErrorProps {
  variant?: SectionQueryErrorVariant
  eyebrow?: string
  title?: string
  message?: string
  actionLabel?: string
  onAction?: (() => void) | undefined
}

const SectionQueryError = ({
  variant = 'error',
  eyebrow,
  title = 'Unable to load this section',
  message = 'Something went wrong while fetching data.',
  actionLabel = 'Try Again',
  onAction
}: SectionQueryErrorProps) => {
  const isError = variant === 'error'
  const Icon = isError ? FiAlertTriangle : FiBookOpen

  const wrapperClass = isError
    ? 'mt-6 border border-red-200 bg-red-50/70 p-6 text-center'
    : 'mt-6 border border-black/10 bg-white p-6 text-center'

  const iconWrapperClass = isError
    ? 'mx-auto flex h-12 w-12 items-center justify-center border border-red-200 bg-white text-red-600'
    : 'mx-auto flex h-12 w-12 items-center justify-center border border-black/10 bg-[#f5f5f5] text-black'

  const eyebrowText =
    eyebrow || (isError ? 'Request Error' : 'Course Library')

  const eyebrowClass = isError
    ? 'mt-5 text-xs uppercase tracking-[0.3em] text-red-500/80'
    : 'mt-5 text-xs uppercase tracking-[0.3em] text-black/35'

  return (
    <div role='alert' className={wrapperClass}>
      <div className={iconWrapperClass}>
        <Icon size={20} />
      </div>

      <p className={eyebrowClass}>
        {eyebrowText}
      </p>

      <h3 className='mt-3 text-2xl font-semibold tracking-tight text-black'>
        {title}
      </h3>

      <p className='mx-auto mt-3 max-w-xl text-sm leading-7 text-black/60'>
        {message}
      </p>

      {onAction && (
        <button
          type='button'
          onClick={onAction}
          className='btn btn-neutral rounded-none mt-6'
        >
          <FiRefreshCcw />
          {actionLabel}
        </button>
      )}
    </div>
  )
}

export default SectionQueryError
