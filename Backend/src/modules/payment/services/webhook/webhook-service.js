import crypto from 'node:crypto'
import { env } from '../../../../config/env.js'
import { logger } from '../../../../utils/logger.js'
import PaymentAttempt from '../../models/payment-attempt-model.js'
import { PAYMENT_ATTEMPT_STATUS } from '../../constants/payment-constants.js'
import { createEnrollment } from '../../../enrollment/repositories/create-enrollment-repository.js'
import { findEnrollmentByPaymentAttemptId } from '../../../enrollment/repositories/find-enrollment-by-payment-attempt-id-repository.js'
import { markPaymentAttemptVerified } from '../../repositories/mark-payment-attempt-verified-repository.js'
import { markPaymentAttemptFulfilled } from '../../repositories/mark-payment-attempt-fulfilled-repository.js'
import User from '../../../auth/models/user-model.js'
import Course from '../../../course/models/course-model.js'
import { sendInvoiceEmailJob } from '../../../auth/jobs/auth-email-job.js'

// signature validation helper
const isValidWebhookSignature = (rawBody, signature, secret) => {
    if (!rawBody || !signature || !secret) return false

    const expectedSignature = crypto
        .createHmac('sha256', secret)
        .update(rawBody)
        .digest('hex')

    const expectedBuffer = Buffer.from(expectedSignature, 'hex')
    const actualBuffer = Buffer.from(signature, 'hex')

    if (expectedBuffer.length !== actualBuffer.length) {
        return false
    }

    return crypto.timingSafeEqual(expectedBuffer, actualBuffer)
}

// main webhook handler service
export const handleRazorpayWebhookService = async ({ rawBody, signature, payload }) => {
    // verify signature
    if (!isValidWebhookSignature(rawBody, signature, env.RAZORPAY_WEBHOOK_SECRET)) {
        logger.warn('Razorpay Webhook: Invalid Signature detected')
        throw new Error('Invalid signature')
    }

    const { event, payload: data } = payload
    logger.info(`Razorpay Webhook: Received event "${event}"`)

    // process only success event
    if (event === 'payment.captured' || event === 'order.paid') {
        const paymentEntity = data.payment?.entity
        const razorpayOrderId = paymentEntity?.order_id
        const razorpayPaymentId = paymentEntity?.id

        if (!razorpayOrderId || !razorpayPaymentId) {
            logger.warn('Razorpay webhook: Missing order_id or payment_id')
            return { success: false, message: 'Missing fields' }
        }

        // get existing attempt from the database
        const paymentAttempt = await PaymentAttempt.findOne({ providerOrderId: razorpayOrderId })
        if (!paymentAttempt) {
            logger.warn(`Razorpay Webhook: No local PaymentAttempt found for orderId=${razorpayOrderId}`)
            return { success: false, message: 'Payment attempt not found' }
        }

        // idempotency : if already fulfilled from client side
        if (paymentAttempt.status === PAYMENT_ATTEMPT_STATUS.VERIFIED || paymentAttempt.status === PAYMENT_ATTEMPT_STATUS.FULFILLED) {
            logger.info(`Razorpay Webhook: Order ${razorpayOrderId} is already processed. Skipping...`)
            return { success: true, message: 'Already processed' }
        }

        // mark verified
        const verifiedAttempt = await markPaymentAttemptVerified({
            paymentAttemptId: paymentAttempt._id,
            providerPaymentId: razorpayPaymentId,
            providerSignature: signature,
            metadata: {
                verifiedBy: 'razorpay-webhook',
                rawWebhookEvent: event
            }
        })

        // enrollment check
        const existingEnrollment = await findEnrollmentByPaymentAttemptId(paymentAttempt._id)
        if (existingEnrollment) {
            logger.info(`Razorpay Webhook: Enrollment already exists for paymentAttemptId=${paymentAttempt._id}`)
            return { success: true, message: 'Enrollment already exists' }
        }

        // create enrollment (unlock course)
        const enrollment = await createEnrollment({
            userId: verifiedAttempt.userId,
            courseId: verifiedAttempt.courseId,
            paymentAttemptId: verifiedAttempt._id
        })

        // mark attempt fulfilled
        const fulfilledAttempt = await markPaymentAttemptFulfilled({
            paymentAttemptId: verifiedAttempt._id,
            enrollmentId: enrollment._id
        })

        logger.info(`Razorpay Webhook: Order ${razorpayOrderId} successfully fulfilled! Course unlocked for User ${verifiedAttempt.userId}`)

        // send invoice email via BullMQ queue
        try {
            const user = await User.findById(verifiedAttempt.userId)
            const course = await Course.findById(verifiedAttempt.courseId)

            if (user && course) {
                await sendInvoiceEmailJob({
                    email: user.email,
                    fullName: user.fullName,
                    courseTitle: course.title,
                    price: fulfilledAttempt.amount,
                    providerPaymentId: fulfilledAttempt.providerPaymentId,
                    receipt: fulfilledAttempt.receipt,
                    paidAt: fulfilledAttempt.paidAt || new Date()
                })
                logger.info(`Razorpay Webhook: Enqueued purchase receipt email to ${user.email}`)
            }
        } catch (error) {
            logger.error(`Razorpay Webhook Email Queue Error: ${error.message}`)
        }

        return { success: true, message: 'Fulfillment completed' }
    }

    return { success: true, message: 'Ignored event' }
}
