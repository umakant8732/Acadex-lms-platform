import {
  FaGithub,
  FaInstagram,
  FaLinkedin,
  FaXTwitter
} from 'react-icons/fa6'

export const siteFooterNavigationLinks = [
  {
    label: 'Home',
    to: '/'
  },
  {
    label: 'Get Started',
    to: '/auth'
  },
  {
    label: 'My Courses',
    to: '/student'
  }
]

// Keep social urls in one place so real brand links can be added later.
export const siteFooterSocialLinks = [
  {
    label: 'GitHub',
    href: '/',
    icon: FaGithub
  },
  {
    label: 'LinkedIn',
    href: '/',
    icon: FaLinkedin
  },
  {
    label: 'Instagram',
    href: '/',
    icon: FaInstagram
  },
  {
    label: 'X',
    href: '/',
    icon: FaXTwitter
  }
]
