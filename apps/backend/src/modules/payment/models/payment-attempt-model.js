import mongoose from 'mongoose'

import {
  PAYMENT_ATTEMPT_STATUS,
  PAYMENT_PROVIDER
} from '../constants/payment-constants.js'

const paymentAttemptSchema = new mongoose.Schema(
  {
    // Tells who started this purchase attempt.
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true
    },

    // Tells which course this payment belongs to.
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Course',
      required: true,
      index: true
    },

    // Amount is stored in smallest currency unit.
    // Example: 49900 means Rs. 499.00
    amount: {
      type: Number,
      required: true,
      min: 1
    },

    currency: {
      type: String,
      required: true,
      trim: true,
      uppercase: true,
      default: 'INR'
    },

    // Our internal receipt id for tracking this attempt.
    receipt: {
      type: String,
      required: true,
      trim: true
    },

    provider: {
      type: String,
      enum: Object.values(PAYMENT_PROVIDER),
      required: true,
      default: PAYMENT_PROVIDER.RAZORPAY
    },

    // Saved after Razorpay order create api success.
    providerOrderId: {
      type: String,
      trim: true
    },

    // Saved after successful payment verification.
    providerPaymentId: {
      type: String,
      trim: true
    },

    // Saved after successful payment verification.
    providerSignature: {
      type: String,
      trim: true
    },

    // Tracks payment attempt lifecycle.
    status: {
      type: String,
      enum: Object.values(PAYMENT_ATTEMPT_STATUS),
      default: PAYMENT_ATTEMPT_STATUS.CREATED
    },

    paidAt: {
      type: Date,
      default: null
    },

    fulfilledAt: {
      type: Date,
      default: null
    },

    failedAt: {
      type: Date,
      default: null
    },

    failureReason: {
      type: String,
      trim: true,
      default: ''
    },

    // Keeps extra provider data for audit/debug later.
    metadata: {
      type: mongoose.Schema.Types.Mixed,
      default: {}
    }
  },
  {
    timestamps: true
  }
)

// Keeps our internal receipt unique for each attempt.
paymentAttemptSchema.index(
  {
    receipt: 1
  },
  {
    unique: true
  }
)

// Same provider order should never map to multiple attempts.
paymentAttemptSchema.index(
  {
    providerOrderId: 1
  },
  {
    unique: true,
    sparse: true
  }
)

// Same payment should never be processed twice.
paymentAttemptSchema.index(
  {
    providerPaymentId: 1
  },
  {
    unique: true,
    sparse: true
  }
)

// Blocks multiple active attempts for same user and same course.
paymentAttemptSchema.index(
  {
    userId: 1,
    courseId: 1
  },
  {
    unique: true,
    partialFilterExpression: {
      status: {
        $in: [
          PAYMENT_ATTEMPT_STATUS.CREATED,
          PAYMENT_ATTEMPT_STATUS.VERIFIED
        ]
      }
    }
  }
)

const PaymentAttempt = mongoose.model('PaymentAttempt', paymentAttemptSchema)

export default PaymentAttempt
