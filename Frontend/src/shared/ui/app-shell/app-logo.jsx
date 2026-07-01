import { Link } from 'react-router-dom'

const AppLogo = ({
  to = '/',
  label = 'Acadex',
  className = ''
}) => {
  const classes = ['text-3xl font-semibold tracking-tight', className]
    .filter(Boolean)
    .join(' ')

  return (
    <Link to={to} className={classes}>
      {label}
    </Link>
  )
}

export default AppLogo
