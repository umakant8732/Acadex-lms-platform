const SocialLinks = ({
  links,
  className = '',
  itemClassName = '',
  openInNewTab = false
}) => {
  return (
    <div className={className}>
      {links.map(link => {
        const {
          label,
          href,
          icon: Icon
        } = link

        return (
          <a
            key={label}
            href={href}
            aria-label={label}
            target={openInNewTab ? '_blank' : undefined}
            rel={openInNewTab ? 'noreferrer' : undefined}
            className={itemClassName}
          >
            <Icon />
          </a>
        )
      })}
    </div>
  )
}

export default SocialLinks
