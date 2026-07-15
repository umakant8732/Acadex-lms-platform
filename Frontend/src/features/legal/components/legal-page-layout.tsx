import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { FiShield, FiFileText, FiRefreshCw, FiMail } from 'react-icons/fi'

interface LegalPageLayoutProps {
  title: string
  subtitle: string
  children: React.ReactNode
}

const LegalPageLayout: React.FC<LegalPageLayoutProps> = ({ title, subtitle, children }) => {
  const location = useLocation()

  const links = [
    { label: 'Terms of Service', to: '/terms-of-service', icon: FiFileText },
    { label: 'Privacy Policy', to: '/privacy-policy', icon: FiShield },
    { label: 'Refund Policy', to: '/refund-policy', icon: FiRefreshCw },
    { label: 'Contact Us', to: '/contact-us', icon: FiMail }
  ]

  return (
    <div className='max-w-6xl mx-auto py-10 sm:py-16 px-4 sm:px-6'>
      {/* Top Banner Header */}
      <div className='border-b border-black/10 pb-8 mb-10'>
        <h1 className='text-3xl sm:text-4xl font-extrabold tracking-tight text-black uppercase'>
          {title}
        </h1>
        <p className='text-sm text-black/60 mt-2 font-medium tracking-wide'>{subtitle}</p>
      </div>

      <div className='flex flex-col lg:flex-row gap-10 items-start'>
        {/* Navigation Sidebar */}
        <aside className='w-full lg:w-64 shrink-0 bg-white border border-black/10 p-4 space-y-1.5'>
          <h3 className='text-[10px] tracking-[0.2em] uppercase font-bold text-black/40 px-3 mb-3'>
            Legal Documents
          </h3>
          {links.map((link) => {
            const Icon = link.icon
            const isActive = location.pathname === link.to
            return (
              <Link
                key={link.to}
                to={link.to}
                className={`flex items-center gap-3 px-3 py-2.5 text-xs font-bold uppercase tracking-wider transition-all rounded-sm ${
                  isActive
                    ? 'bg-black text-white'
                    : 'text-black/70 hover:bg-black/5 hover:text-black'
                }`}
              >
                <Icon className='text-sm shrink-0' />
                {link.label}
              </Link>
            )
          })}
        </aside>

        {/* Content Container */}
        <article className='flex-1 w-full bg-white border border-black/10 p-8 sm:p-12 leading-relaxed text-black/75'>
          {children}
        </article>
      </div>
    </div>
  )
}

export default LegalPageLayout
