import React from 'react'
import ShellContainer from './shell-container.js'

export interface TopbarShellProps extends React.HTMLAttributes<HTMLElement> {
  as?: React.ElementType
  sticky?: boolean
  containerClassName?: string
  children: React.ReactNode
  [key: string]: any
}

const TopbarShell: React.FC<TopbarShellProps> = ({
  as: Tag = 'header',
  sticky = true,
  className = '',
  containerClassName = 'flex h-20 items-center justify-between',
  children,
  ...props
}) => {
  const classes = [
    sticky && 'sticky top-0 z-50',
    'border-b border-black/5 bg-white/80 backdrop-blur-xl',
    className
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <Tag {...props} className={classes}>
      <ShellContainer className={containerClassName}>
        {children}
      </ShellContainer>
    </Tag>
  )
}

export default TopbarShell
