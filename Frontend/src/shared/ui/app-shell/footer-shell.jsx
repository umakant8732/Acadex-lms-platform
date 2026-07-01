import ShellContainer from './shell-container.jsx'

const FooterShell = ({
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
