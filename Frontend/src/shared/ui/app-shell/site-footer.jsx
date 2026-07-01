import { Link } from 'react-router-dom'

import {
  siteFooterNavigationLinks,
  siteFooterSocialLinks
} from '../../constants/site-footer-links.js'
import AppLogo from './app-logo.jsx'
import FooterShell from './footer-shell.jsx'
import SocialLinks from './social-links.jsx'

const SiteFooter = () => {
  return (
    <FooterShell
      className='mt-16 border-black/5 bg-white'
      containerClassName='grid gap-8 py-10 text-center md:grid-cols-[minmax(0,1.4fr)_minmax(0,0.9fr)_auto] md:items-start md:text-left'
    >
      <div className='md:max-w-sm'>
        <AppLogo to='/' className='text-2xl' />

        <p className='mt-3 text-sm leading-7 text-black/50'>
          Build practical IT skills with Acadex courses, previews, and guided learning paths designed for real-world growth.
        </p>

        <p className='mt-4 text-xs uppercase tracking-[0.18em] text-black/35'>
          Copyright 2026 Acadex. All rights reserved.
        </p>
      </div>

      <div>
        <p className='text-xs uppercase tracking-[0.22em] text-black/35'>
          Explore
        </p>

        <div className='mt-4 flex flex-col gap-3'>
          {siteFooterNavigationLinks.map(link => (
            <Link
              key={link.label}
              to={link.to}
              className='text-sm text-black/60 transition hover:text-black'
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>

      <div className='md:justify-self-end'>
        <p className='text-xs uppercase tracking-[0.22em] text-black/35'>
          Follow
        </p>

        <SocialLinks
          links={siteFooterSocialLinks}
          className='mt-4 flex items-center justify-center gap-4 text-lg md:justify-start'
          itemClassName='text-black/60 transition hover:text-black'
        />
      </div>
    </FooterShell>
  )
}

export default SiteFooter
