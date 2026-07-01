import { NavLink } from 'react-router-dom'

const navItems = [
  {
    label: 'Courses',
    to: '/student',
    end: true,
    disabled: false
  },
  {
    label: 'My Learning',
    disabled: true
  },
  {
    label: 'Wishlist',
    disabled: true
  }
]

const NavLinks = ({
  mobile = false,
  className = ''
}) => {
  const wrapperClasses = mobile
    ? 'flex flex-col gap-4'
    : 'hidden items-center gap-8 lg:flex xl:gap-12'

  return (
    <nav className={[wrapperClasses, className].filter(Boolean).join(' ')}>
      {navItems.map(item => {
        if (item.disabled) {
          return (
            <span
              key={item.label}
              className={mobile ? 'text-sm font-medium text-black/35' : 'text-sm font-medium text-black/35'}
            >
              {item.label}
            </span>
          )
        }

        return (
          <NavLink
            key={item.label}
            to={item.to}
            end={item.end}
            className={({ isActive }) =>
              `text-sm font-medium transition ${
                isActive ? 'text-black' : 'text-black/50 hover:text-black'
              }`
            }
          >
            {item.label}
          </NavLink>
        )
      })}
    </nav>
  )
}

export default NavLinks
