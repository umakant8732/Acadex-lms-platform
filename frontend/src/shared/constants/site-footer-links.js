import { FaGithub, FaInstagram, FaLinkedin, FaXTwitter } from "react-icons/fa6";

export const siteFooterNavigationLinks = [
  {
    label: "Home",
    to: "/",
  },
  {
    label: "Get Started",
    to: "/auth",
  },
  {
    label: "My Courses",
    to: "/student",
  },
  {
    label: "Terms of Service",
    to: "/terms-of-service",
  },
  {
    label: "Privacy Policy",
    to: "/privacy-policy",
  },
  {
    label: "Refund Policy",
    to: "/refund-policy",
  },
  {
    label: "Contact Us",
    to: "/contact-us",
  },
];

// Keep social urls in one place so real brand links can be added later.
export const siteFooterSocialLinks = [
  {
    label: "GitHub",
    href: "/",
    icon: FaGithub,
  },
  {
    label: "LinkedIn",
    href: "/",
    icon: FaLinkedin,
  },
  {
    label: "Instagram",
    href: "/",
    icon: FaInstagram,
  },
  {
    label: "X",
    href: "/",
    icon: FaXTwitter,
  },
];
