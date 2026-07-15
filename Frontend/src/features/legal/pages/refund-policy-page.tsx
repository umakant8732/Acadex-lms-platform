import React from 'react'
import LegalPageLayout from '../components/legal-page-layout'

const RefundPolicyPage: React.FC = () => {
  return (
    <LegalPageLayout
      title='Refund & Cancellation'
      subtitle='Last updated: July 15, 2026'
    >
      <div className='space-y-6 text-sm text-black/70'>
        <section className='space-y-2'>
          <h2 className='text-lg font-bold text-black uppercase tracking-wider'>1. Standard Refund Policy</h2>
          <p>
            We offer a **7-Day Money-Back Guarantee** on course purchases. If you are unsatisfied with your course, you can request a refund within 7 days of purchase.
          </p>
          <p className='font-semibold text-black'>
            Condition: To prevent system abuse, refund requests are only valid if your course watch progress is less than 50%.
          </p>
        </section>

        <section className='space-y-2'>
          <h2 className='text-lg font-bold text-black uppercase tracking-wider'>2. How to Request a Refund</h2>
          <p>
            To initiate a refund, please send an email to **umakantbhendarkar94@gmail.com** or **support@acadexlearning.xyz** with:
          </p>
          <ul className='list-disc pl-5 space-y-1 font-mono'>
            <li>Your Account Name & Registered Email</li>
            <li>Course Title purchased</li>
            <li>Receipt ID or Razorpay Payment ID</li>
          </ul>
        </section>

        <section className='space-y-2'>
          <h2 className='text-lg font-bold text-black uppercase tracking-wider'>3. Processing Times</h2>
          <p>
            Once a refund is approved by our billing team, the course access will be revoked from your library. The refunded amount will be processed back to the original payment source (Credit Card, UPI, Netbanking) within **5 to 7 working days** (subject to standard banking processing speeds).
          </p>
        </section>

        <section className='space-y-2'>
          <h2 className='text-lg font-bold text-black uppercase tracking-wider'>4. Refusal of Refund</h2>
          <p>
            We reserve the right to deny a refund request if we detect malicious activity, account sharing, download attempts, or if the refund timeframe has expired.
          </p>
        </section>
      </div>
    </LegalPageLayout>
  )
}

export default RefundPolicyPage
