import React from 'react'
import LegalPageLayout from '../components/legal-page-layout'

const TermsOfServicePage: React.FC = () => {
  return (
    <LegalPageLayout
      title='Terms of Service'
      subtitle='Last updated: July 15, 2026'
    >
      <div className='space-y-6 text-sm text-black/70'>
        <section className='space-y-2'>
          <h2 className='text-lg font-bold text-black uppercase tracking-wider'>1. Agreement to Terms</h2>
          <p>
            By accessing or using the Acadex Learning platform (the "Site", "Service"), you agree to be bound by these Terms of Service. If you do not agree to all these terms, do not access or use the Service.
          </p>
        </section>

        <section className='space-y-2'>
          <h2 className='text-lg font-bold text-black uppercase tracking-wider'>2. Account Enrollment & Security</h2>
          <p>
            To enroll in courses and access content, you must create a verified account. You agree to safeguard your account credentials and take full responsibility for all activities occurring under your account. Sharing credentials with third parties is strictly prohibited.
          </p>
        </section>

        <section className='space-y-2'>
          <h2 className='text-lg font-bold text-black uppercase tracking-wider'>3. Intellectual Property Rights</h2>
          <p>
            All course curriculum, videos, HLS streams, code files, design layouts, and texts served on Acadex Learning are the exclusive property of Acadex Learning and protected by copyright laws. You are granted a limited, personal, non-exclusive, non-transferable license to watch content for personal, non-commercial education.
          </p>
          <p className='font-semibold text-black'>
            Downloading, distributing, screen-recording, or reselling Acadex Learning materials is strictly illegal and will result in permanent account termination and legal action.
          </p>
        </section>

        <section className='space-y-2'>
          <h2 className='text-lg font-bold text-black uppercase tracking-wider'>4. Payments & Transactions</h2>
          <p>
            Payments on Acadex Learning are securely processed via Razorpay. By purchasing a course, you authorize us to charge the specified transaction fee. You represent that all payment information provided is accurate and you are authorized to use the payment instrument.
          </p>
        </section>

        <section className='space-y-2'>
          <h2 className='text-lg font-bold text-black uppercase tracking-wider'>5. Limitation of Liability</h2>
          <p>
            Acadex Learning and its instructors shall not be liable for any indirect, incidental, special, or consequential damages arising out of your use or inability to use the learning platform.
          </p>
        </section>

        <section className='space-y-2'>
          <h2 className='text-lg font-bold text-black uppercase tracking-wider'>6. Changes to Terms</h2>
          <p>
            We reserve the right to modify these Terms of Service at any time. Changes will be posted on this page with an updated revision date.
          </p>
        </section>
      </div>
    </LegalPageLayout>
  )
}

export default TermsOfServicePage
