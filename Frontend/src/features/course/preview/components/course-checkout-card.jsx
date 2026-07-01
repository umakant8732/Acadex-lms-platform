import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiCreditCard, FiLock } from 'react-icons/fi'

import {
  getCourseDiscount,
  getCourseSavings
} from '../../../../shared/utils/course/calculate-course-pricing.js'
import { formatCoursePrice } from '../../../../shared/utils/course/format-course-price.js'

const CourseCheckoutCard = ({ course, checkoutAction, checkoutIdentity }) => {
  const discount = getCourseDiscount(course.price, course.originalPrice)
  const savings = getCourseSavings(course.price, course.originalPrice)

  const actionButtonClasses =
    'mt-6 flex h-14 w-full items-center justify-center gap-2 px-4 text-sm font-medium transition'

  const disabledButtonClasses =
    'mt-6 flex h-14 w-full items-center justify-center gap-2 bg-black/15 px-4 text-sm font-medium text-black/45'

  return (
    <motion.aside
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: 0.08 }}
      className='sticky top-24 border border-black/10 bg-white p-6 shadow-sm'
    >
      <div className='border-b border-black/10 pb-6'>
        <p className='text-sm text-black/45'>Final Amount</p>

        <div className='mt-3 flex flex-wrap items-end gap-3'>
          <h2 className='text-4xl font-semibold tracking-tight text-black'>
            {formatCoursePrice(course.price)}
          </h2>

          {course.originalPrice > course.price && (
            <p className='pb-1 text-lg text-black/35 line-through'>
              {formatCoursePrice(course.originalPrice)}
            </p>
          )}
        </div>

        {discount > 0 && (
          <p className='mt-3 inline-flex border border-black px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] text-black'>
            {discount}% Off
          </p>
        )}
      </div>

      {checkoutIdentity && (
        <div className='mt-6 space-y-4'>
          <label className='block'>
            <span className='text-sm font-medium text-black'>Full Name</span>
            <input
              type='text'
              value={checkoutIdentity.fullName}
              readOnly
              className='mt-2 h-12 w-full border border-black/10 bg-black/[0.03] px-4 text-sm outline-none'
            />
          </label>

          <label className='block'>
            <span className='text-sm font-medium text-black'>Email Address</span>
            <input
              type='email'
              value={checkoutIdentity.email}
              readOnly
              className='mt-2 h-12 w-full border border-black/10 bg-black/[0.03] px-4 text-sm outline-none'
            />
          </label>
        </div>
      )}

      <div className='mt-6 space-y-3 border-y border-black/10 py-5 text-sm'>
        <div className='flex items-center justify-between'>
          <span className='text-black/50'>Original Price</span>
          <span>{formatCoursePrice(course.originalPrice || course.price)}</span>
        </div>

        <div className='flex items-center justify-between'>
          <span className='text-black/50'>Discount</span>
          <span>- {formatCoursePrice(savings)}</span>
        </div>

        <div className='flex items-center justify-between text-base font-semibold'>
          <span>Total</span>
          <span>{formatCoursePrice(course.price)}</span>
        </div>
      </div>

      {checkoutAction.onClick ? (
        <button
          type='button'
          onClick={checkoutAction.onClick}
          disabled={checkoutAction.disabled}
          className={`${actionButtonClasses} ${
            checkoutAction.disabled
              ? 'bg-black/15 text-black/45'
              : 'bg-black text-white hover:bg-black/90'
          }`}
        >
          <FiCreditCard />
          {checkoutAction.label}
        </button>
      ) : checkoutAction.to && !checkoutAction.disabled ? (
        <Link
          to={checkoutAction.to}
          className={`${actionButtonClasses} bg-black text-white hover:bg-black/90`}
        >
          <FiCreditCard />
          {checkoutAction.label}
        </Link>
      ) : (
        <button type='button' disabled className={disabledButtonClasses}>
          <FiCreditCard />
          {checkoutAction.label}
        </button>
      )}

      <div className='mt-4 flex items-start gap-2 text-xs leading-5 text-black/45'>
        <FiLock className='mt-0.5 shrink-0' />
        <span>{checkoutAction.helperText}</span>
      </div>
    </motion.aside>
  )
}

export default CourseCheckoutCard
