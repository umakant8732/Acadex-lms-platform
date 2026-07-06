import type { ReactNode } from 'react'

interface AuthWrapperProps {
  children: ReactNode
  className?: string
}

// Keeps page body wrapped in one shared auth shell.
const AuthWrapper = ({
  children,
  className = ''
}: AuthWrapperProps) => {
  return <div className={className}>{children}</div>
}

export default AuthWrapper
