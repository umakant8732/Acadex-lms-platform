import { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { useQueryClient } from '@tanstack/react-query'

import {
  selectAuthUser,
  useAppSelector
} from '../../../../app/store'
import type { AuthUser } from '../../../../app/store/auth/auth-types'
import type { CourseDetails } from '../../shared/types/public-course-types'
import type {
  CheckoutAction,
  CheckoutIdentity
} from '../types/course-preview-types'
import { useGetCourseDetails } from '../queries/use-get-course-details.js'
import { useCreatePaymentOrder } from '../../../payment/student-checkout/queries/use-create-payment-order.js'
import { useVerifyPayment } from '../../../payment/student-checkout/queries/use-verify-payment.js'
import { useReportPaymentFailure } from '../../../payment/student-checkout/queries/use-report-payment-failure.js'
import { loadRazorpaySdk } from '../../../payment/student-checkout/helpers/load-razorpay-sdk.js'
import { studentLibraryQueryKeys } from '../../student-library/helpers/student-library-query-keys.js'
import { studentOverviewQueryKeys } from '../../student-overview/helpers/student-overview-query-keys.js'
import { studentWatchQueryKeys } from '../../../lecture/student-watch/helpers/student-watch-query-keys.js'
import { getApiErrorMessage } from '../../../../shared/utils/get-api-error-message'
import { showError, showSuccess } from '../../../../shared/utils/toast'

interface PaymentOrder {
  paymentAttemptId: string
  orderId: string
  amount: number
  currency: string
  keyId: string
  course: {
    title: string
  }
}

interface PaymentVerificationResult {
  isAlreadyFulfilled?: boolean
}

interface BuildCheckoutActionArgs {
  user: AuthUser | null
  courseId: string | undefined
  isStudentCheckoutPage: boolean
  isPaymentBusy: boolean
  onStartPayment: () => Promise<void>
}

interface RazorpaySuccessResponse {
  razorpay_order_id: string
  razorpay_payment_id: string
  razorpay_signature: string
}

interface RazorpayFailureResponse {
  error?: {
    description?: string
    code?: string
    source?: string
    step?: string
    field?: string
    metadata?: {
      order_id?: string
      payment_id?: string
    }
  }
}

interface RazorpayOptions {
  key: string
  amount: number
  currency: string
  name: string
  description: string
  order_id: string
  prefill: {
    name: string
    email: string
  }
  notes: {
    courseId: string
    paymentAttemptId: string
  }
  theme: {
    color: string
  }
  modal?: {
    ondismiss?: () => void
  }
  handler: (response: RazorpaySuccessResponse) => void | Promise<void>
}

interface RazorpayInstance {
  open: () => void
  on: (
    event: 'payment.failed',
    handler: (response: RazorpayFailureResponse) => void | Promise<void>
  ) => void
}

interface CoursePreviewPageState {
  courseId: string | undefined
  course: CourseDetails | null
  isLoading: boolean
  isError: boolean
  error: unknown
  refetchCourse: () => unknown
  isStudentCheckoutPage: boolean
  checkoutIdentity: CheckoutIdentity | null
  checkoutAction: CheckoutAction
}

declare global {
  interface Window {
    Razorpay?: new (options: RazorpayOptions) => RazorpayInstance
  }
}

const buildCheckoutAction = ({
  user,
  courseId,
  isStudentCheckoutPage,
  isPaymentBusy,
  onStartPayment
}: BuildCheckoutActionArgs): CheckoutAction => {
  const checkoutPath = courseId ? `/student/checkout/${courseId}` : '/student'
  const authPath = `/auth?redirect=${encodeURIComponent(checkoutPath)}`

  if (isStudentCheckoutPage) {
    return {
      label: isPaymentBusy
        ? 'Opening Secure Checkout...'
        : 'Proceed To Payment',
      helperText: 'Your secure Razorpay checkout will open from this page.',
      disabled: isPaymentBusy,
      to: '',
      onClick: onStartPayment
    }
  }

  if (!user) {
    return {
      label: 'Login To Buy',
      helperText: 'Login with a student account to continue to secure checkout.',
      disabled: false,
      to: authPath
    }
  }

  if (user.role === 'student') {
    return {
      label: 'Proceed To Checkout',
      helperText: 'Continue to secure checkout with your student account.',
      disabled: false,
      to: checkoutPath
    }
  }

  return {
    label: 'Student Checkout Only',
    helperText: 'Purchase is available only for student accounts.',
    disabled: true,
    to: ''
  }
}

export const useCoursePreviewPage = (): CoursePreviewPageState => {
  const location = useLocation()
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const { courseId } = useParams()
  const user = useAppSelector(selectAuthUser)

  const [isOpeningCheckout, setIsOpeningCheckout] = useState(false)

  const courseDetailsQuery = useGetCourseDetails(courseId)
  const createPaymentOrderMutation = useCreatePaymentOrder()
  const verifyPaymentMutation = useVerifyPayment()
  const reportPaymentFailureMutation = useReportPaymentFailure()

  const isStudentCheckoutPage = location.pathname.startsWith('/student/checkout/')
  const isPaymentBusy =
    isOpeningCheckout ||
    createPaymentOrderMutation.isPending ||
    verifyPaymentMutation.isPending ||
    reportPaymentFailureMutation.isPending

  useEffect(() => {
    if (courseDetailsQuery.isError) {
      showError(
        getApiErrorMessage(
          courseDetailsQuery.error,
          'Failed to load course details'
        )
      )
    }
  }, [courseDetailsQuery.isError, courseDetailsQuery.error])

  // Starts Razorpay checkout only from student checkout page.
  const handleStartPayment = async () => {
    if (isPaymentBusy || !courseId) {
      return
    }

    if (!user || user.role !== 'student') {
      showError('Login with a student account to continue payment.')
      return
    }

    if (!isStudentCheckoutPage) {
      navigate(`/student/checkout/${courseId}`)
      return
    }

    setIsOpeningCheckout(true)

    try {
      const sdkLoaded = await loadRazorpaySdk()
      const Razorpay = window.Razorpay

      if (!sdkLoaded || !Razorpay) {
        throw new Error('Razorpay checkout failed to load')
      }

      // Backend gives one safe order for this course purchase.
      const order = (await createPaymentOrderMutation.mutateAsync(
        courseId
      )) as PaymentOrder

      const razorpayCheckout = new Razorpay({
        key: order.keyId,
        amount: order.amount,
        currency: order.currency,
        name: 'Acadex',
        description: `Purchase ${order.course.title}`,
        order_id: order.orderId,
        prefill: {
          name: user.fullName || '',
          email: user.email || ''
        },
        notes: {
          courseId,
          paymentAttemptId: order.paymentAttemptId
        },
        theme: {
          color: '#000000'
        },
        modal: {
          // Resets local loading when user closes checkout popup.
          ondismiss: () => {
            setIsOpeningCheckout(false)
          }
        },
        handler: async response => {
          try {
            // Verifies signature and creates enrollment only after success.
            const verification = (await verifyPaymentMutation.mutateAsync({
              paymentAttemptId: order.paymentAttemptId,
              razorpayOrderId: response.razorpay_order_id,
              razorpayPaymentId: response.razorpay_payment_id,
              razorpaySignature: response.razorpay_signature
            })) as PaymentVerificationResult

            await Promise.all([
              queryClient.invalidateQueries({
                queryKey: studentLibraryQueryKeys.root
              }),
              queryClient.invalidateQueries({
                queryKey: studentOverviewQueryKeys.course(courseId)
              }),
              queryClient.invalidateQueries({
                queryKey: studentWatchQueryKeys.courseCurriculum(courseId)
              })
            ])

            showSuccess(
              verification.isAlreadyFulfilled
                ? 'Course is already unlocked for this account.'
                : 'Payment verified and course unlocked successfully.'
            )

            navigate(`/student/courses/${courseId}`)
          } catch (error) {
            showError(
              getApiErrorMessage(
                error,
                'Payment was captured but final verification failed.'
              )
            )
          } finally {
            setIsOpeningCheckout(false)
          }
        }
      })

      // Saves gateway failure in DB so retry flow has exact reason later.
      razorpayCheckout.on('payment.failed', async response => {
        try {
          await reportPaymentFailureMutation.mutateAsync({
            paymentAttemptId: order.paymentAttemptId,
            razorpayOrderId: response?.error?.metadata?.order_id || order.orderId,
            razorpayPaymentId: response?.error?.metadata?.payment_id || '',
            failureReason:
              response?.error?.description ||
              'Payment failed. Please try again.',
            failureCode: response?.error?.code || '',
            failureSource: response?.error?.source || '',
            failureStep: response?.error?.step || '',
            failureField: response?.error?.field || ''
          })
        } catch {
          // If save fails, keep checkout UX stable and still show gateway fail.
        } finally {
          setIsOpeningCheckout(false)

          showError(
            response?.error?.description || 'Payment failed. Please try again.'
          )
        }
      })

      razorpayCheckout.open()
    } catch (error) {
      setIsOpeningCheckout(false)
      showError(getApiErrorMessage(error, 'Unable to start secure checkout.'))
    }
  }

  return {
    courseId,
    course: (courseDetailsQuery.data ?? null) as CourseDetails | null,
    isLoading: courseDetailsQuery.isLoading,
    isError: courseDetailsQuery.isError,
    error: courseDetailsQuery.error,
    refetchCourse: courseDetailsQuery.refetch,
    isStudentCheckoutPage,
    checkoutIdentity:
      isStudentCheckoutPage && user?.role === 'student'
        ? {
            fullName: user.fullName || '',
            email: user.email || ''
          }
        : null,
    checkoutAction: buildCheckoutAction({
      user,
      courseId,
      isStudentCheckoutPage,
      isPaymentBusy,
      onStartPayment: handleStartPayment
    })
  }
}



