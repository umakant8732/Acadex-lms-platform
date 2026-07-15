import React from 'react'
import LegalPageLayout from '../components/legal-page-layout'
import { FiMail, FiPhone, FiMapPin, FiClock } from 'react-icons/fi'

const ContactUsPage: React.FC = () => {
  return (
    <LegalPageLayout
      title='Contact Us'
      subtitle='Reach out to Acadex support'
    >
      <div className='space-y-8 text-sm text-black/70'>
        <p className='text-base text-black/80 font-medium leading-relaxed'>
          Have questions about a course, payment, or institutional access? Get in touch with us using the channels below. We try to respond to all inquiries within 24 hours.
        </p>

        <div className='grid grid-cols-1 sm:grid-cols-2 gap-8 pt-4'>
          {/* Email Support */}
          <div className='border border-black/10 p-6 flex flex-col justify-between hover:border-black/20 transition-all rounded-sm'>
            <div className='flex items-center gap-3 text-black mb-3'>
              <FiMail className='text-lg text-black/60' />
              <h3 className='font-bold uppercase tracking-wider text-xs'>Support Email</h3>
            </div>
            <p className='text-black font-semibold text-sm'>
              umakantbhendarkar94@gmail.com
            </p>
            <p className='text-xs text-black/50 mt-1'>
              Alternative: support@acadexlearning.xyz
            </p>
          </div>

          {/* Hotline Phone */}
          <div className='border border-black/10 p-6 flex flex-col justify-between hover:border-black/20 transition-all rounded-sm'>
            <div className='flex items-center gap-3 text-black mb-3'>
              <FiPhone className='text-lg text-black/60' />
              <h3 className='font-bold uppercase tracking-wider text-xs'>Contact Hotline</h3>
            </div>
            <p className='text-black font-semibold text-sm'>
              +91 9588418970
            </p>
            <p className='text-xs text-black/50 mt-1'>
              Available: 10:00 AM - 7:00 PM IST
            </p>
          </div>

          {/* Head Office Address */}
          <div className='border border-black/10 p-6 flex flex-col justify-between hover:border-black/20 transition-all rounded-sm'>
            <div className='flex items-center gap-3 text-black mb-3'>
              <FiMapPin className='text-lg text-black/60' />
              <h3 className='font-bold uppercase tracking-wider text-xs'>Operational Office</h3>
            </div>
            <p className='text-black font-semibold text-sm leading-tight'>
              Nagpur, Maharashtra, 440001, India
            </p>
            <p className='text-xs text-black/50 mt-1'>
              Corporate HQ & Billing Center
            </p>
          </div>

          {/* Service Hours */}
          <div className='border border-black/10 p-6 flex flex-col justify-between hover:border-black/20 transition-all rounded-sm'>
            <div className='flex items-center gap-3 text-black mb-3'>
              <FiClock className='text-lg text-black/60' />
              <h3 className='font-bold uppercase tracking-wider text-xs'>Operational Hours</h3>
            </div>
            <p className='text-black font-semibold text-sm'>
              Monday - Saturday
            </p>
            <p className='text-xs text-black/50 mt-1'>
              Closed on Sundays and National Holidays
            </p>
          </div>
        </div>
      </div>
    </LegalPageLayout>
  )
}

export default ContactUsPage
