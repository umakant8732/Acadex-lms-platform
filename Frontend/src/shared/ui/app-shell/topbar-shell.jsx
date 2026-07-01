import ShellContainer from './shell-container.jsx'

const TopbarShell = ({
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
