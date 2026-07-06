import React from 'react'

export interface ShellContainerProps {
  as?: React.ElementType
  className?: string
  children: React.ReactNode
}

const ShellContainer: React.FC<ShellContainerProps> = ({
  as: Tag = 'div',
  className = '',
  children
}) => {
  const classes = ['mx-auto w-full max-w-7xl px-6', className]
    .filter(Boolean)
    .join(' ')

  return <Tag className={classes}>{children}</Tag>
}

export default ShellContainer
