export interface PaymentOrder {
  paymentAttemptId: string
  orderId: string
  amount: number
  currency: string
  keyId: string
  course: {
    title: string
  }
}

export interface PaymentVerificationResult {
  isAlreadyFulfilled?: boolean
}

export interface VerifyPaymentPayload {
  paymentAttemptId: string
  razorpayOrderId: string
  razorpayPaymentId: string
  razorpaySignature: string
}

export interface ReportPaymentFailurePayload {
  paymentAttemptId: string
  razorpayOrderId: string
  razorpayPaymentId: string
  failureReason: string
  failureCode: string
  failureSource: string
  failureStep: string
  failureField: string
}
