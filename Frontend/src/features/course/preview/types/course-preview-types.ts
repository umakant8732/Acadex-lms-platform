import type { PublicCourse } from '../../shared/types/public-course-types'

// Shared preview UI types keep page, hook, and components in sync.
export interface CheckoutAction {
  label: string
  helperText: string
  disabled: boolean
  to: string
  onClick?: () => void | Promise<void>
}

export interface CheckoutIdentity {
  fullName: string
  email: string
}

export interface CourseHeroSummaryProps {
  course: PublicCourse
}

export interface CourseCheckoutCardProps {
  course: PublicCourse
  checkoutAction: CheckoutAction
  checkoutIdentity: CheckoutIdentity | null
}

export interface CoursePreviewContentProps {
  course: PublicCourse
  checkoutAction: CheckoutAction
  checkoutIdentity: CheckoutIdentity | null
}
