import React from 'react'
import { Link } from 'react-router-dom'

import {
  siteFooterNavigationLinks,
  siteFooterSocialLinks
} from '../../constants/site-footer-links.js'
import AppLogo from './app-logo.js'
import FooterShell from './footer-shell.js'
import SocialLinks from './social-links.js'

const SiteFooter: React.FC = () => {
  // Split navigation links into two columns for clean UX
  const exploreLinks = siteFooterNavigationLinks.slice(0, 3)
  const legalLinks = siteFooterNavigationLinks.slice(3)

  return (
    <FooterShell
      className='mt-16 border-t border-black/5 bg-white'
      containerClassName='grid gap-10 py-12 text-center md:grid-cols-[minmax(0,1.6fr)_minmax(0,0.8fr)_minmax(0,1.2fr)_auto] md:items-start md:text-left'
    >
      {/* Brand & Copyright */}
      <div className='md:max-w-xs'>
        <AppLogo to='/' className='text-2xl font-black tracking-wider uppercase' />
        <p className='mt-3 text-xs leading-6 text-black/55'>
          Build practical IT skills with Acadex courses, previews, and guided learning paths designed for real-world growth.
        </p>
        <p className='mt-4 text-[10px] uppercase tracking-[0.18em] font-semibold text-black/35'>
          © 2026 Acadex. All rights reserved.
        </p>
      </div>

      {/* Explore Links */}
      <div>
        <p className='text-[10px] uppercase tracking-[0.22em] font-bold text-black/40'>
          Explore
        </p>
        <div className='mt-4 flex flex-col gap-2.5'>
          {exploreLinks.map(link => (
            <Link
              key={link.label}
              to={link.to}
              className='text-xs font-semibold text-black/60 transition hover:text-black'
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>

      {/* Legal & Compliance Links */}
      <div>
        <p className='text-[10px] uppercase tracking-[0.22em] font-bold text-black/40'>
          Legal & Support
        </p>
        <div className='mt-4 flex flex-col gap-2.5'>
          {legalLinks.map(link => (
            <Link
              key={link.label}
              to={link.to}
              className='text-xs font-semibold text-black/60 transition hover:text-black'
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>

      {/* Follow / Social */}
      <div className='md:justify-self-end'>
        <p className='text-[10px] uppercase tracking-[0.22em] font-bold text-black/40'>
          Follow
        </p>
        <SocialLinks
          links={siteFooterSocialLinks}
          className='mt-4 flex items-center justify-center gap-4 text-base md:justify-start'
          itemClassName='text-black/60 transition hover:text-black hover:scale-105'
        />
      </div>
    </FooterShell>
  )
}

export default SiteFooter
