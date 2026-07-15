import React from 'react'
import LegalPageLayout from '../components/legal-page-layout'

const PrivacyPolicyPage: React.FC = () => {
  return (
    <LegalPageLayout
      title='Privacy Policy'
      subtitle='Last updated: July 15, 2026'
    >
      <div className='space-y-6 text-sm text-black/70'>
        <section className='space-y-2'>
          <h2 className='text-lg font-bold text-black uppercase tracking-wider'>1. Information We Collect</h2>
          <p>
            When you register, signup, or purchase on Acadex Learning, we collect personal information including:
          </p>
          <ul className='list-disc pl-5 space-y-1'>
            <li>Full Name</li>
            <li>Email Address</li>
            <li>Purchase history and course progress logs</li>
          </ul>
        </section>

        <section className='space-y-2'>
          <h2 className='text-lg font-bold text-black uppercase tracking-wider'>2. How We Use Your Information</h2>
          <p>
            We use your data strictly to operate, maintain, and optimize your educational experience:
          </p>
          <ul className='list-disc pl-5 space-y-1'>
            <li>To manage your credentials and authorize access to purchased courses.</li>
            <li>To dispatch invoices, receipts, or OTP codes via background email queues.</li>
            <li>To resolve customer support tickets and analyze platform errors.</li>
          </ul>
        </section>

        <section className='space-y-2'>
          <h2 className='text-lg font-bold text-black uppercase tracking-wider'>3. Security & Payments</h2>
          <p>
            We prioritize your security. We never store credit card or bank credentials directly on our servers. All monetary transactions are processed securely by Razorpay compliance networks, protecting details under payment gateway security standards.
          </p>
        </section>

        <section className='space-y-2'>
          <h2 className='text-lg font-bold text-black uppercase tracking-wider'>4. Cookies & Caching</h2>
          <p>
            We use local session cookies to track login authorization. These cookies are stored on your device temporarily to prevent you from having to sign in repeatedly. No tracking or marketing cookies are sold to third parties.
          </p>
        </section>

        <section className='space-y-2'>
          <h2 className='text-lg font-bold text-black uppercase tracking-wider'>5. Disclosure of Data</h2>
          <p>
            We do not rent, trade, or sell your personal information. We may disclose data only if required to do so by legal orders, compliance regulations, or to defend platform safety.
          </p>
        </section>

        <section className='space-y-2'>
          <h2 className='text-lg font-bold text-black uppercase tracking-wider'>6. Contact Information</h2>
          <p>
            If you have questions regarding this Privacy Policy, you may contact us at support@acadexlearning.xyz or umakantbhendarkar94@gmail.com.
          </p>
        </section>
      </div>
    </LegalPageLayout>
  )
}

export default PrivacyPolicyPage
