import React from 'react'

export interface DropdownPanelProps {
  className?: string
  children: React.ReactNode
}

const DropdownPanel: React.FC<DropdownPanelProps> = ({
  className = '',
  children
}) => {
  const classes = [
    'absolute right-0 z-50 mt-3 w-44 border border-black/10 bg-white shadow-xl',
    className
  ]
    .filter(Boolean)
    .join(' ')

  return <div className={classes}>{children}</div>
}

export default DropdownPanel
