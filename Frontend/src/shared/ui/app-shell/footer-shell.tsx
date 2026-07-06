import React from 'react'
import ShellContainer from './shell-container.js'

export interface FooterShellProps {
  className?: string
  containerClassName?: string
  children: React.ReactNode
}

const FooterShell: React.FC<FooterShellProps> = ({
  className = '',
  containerClassName = 'py-10',
  children
}) => {
  const classes = ['mt-24 border-t border-black/10', className]
    .filter(Boolean)
    .join(' ')

  return (
    <footer className={classes}>
      <ShellContainer className={containerClassName}>
        {children}
      </ShellContainer>
    </footer>
  )
}

export default FooterShell
