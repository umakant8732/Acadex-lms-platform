import mongoose from 'mongoose'

import { ENROLLMENT_STATUS } from '../constants/enrollment-constants.js'

const enrollmentSchema = new mongoose.Schema(
  {
    // Tells which student owns this course access.
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true
    },

    // Tells which course was unlocked for the student.
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Course',
      required: true,
      index: true
    },

    // Points to the payment attempt that unlocked this course.
    paymentAttemptId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'PaymentAttempt',
      required: true
    },

    // Tracks whether course access is active or later changed.
    status: {
      type: String,
      enum: Object.values(ENROLLMENT_STATUS),
      default: ENROLLMENT_STATUS.ACTIVE
    },

    enrolledAt: {
      type: Date,
      default: Date.now
    },

    refundedAt: {
      type: Date,
      default: null
    },

    revokedAt: {
      type: Date,
      default: null
    },

    // Keeps extra access related info for future use.
    metadata: {
      type: mongoose.Schema.Types.Mixed,
      default: {}
    }
  },
  {
    timestamps: true
  }
)

// Prevents duplicate course ownership for same student.
enrollmentSchema.index(
  {
    userId: 1,
    courseId: 1
  },
  {
    unique: true
  }
)

// Prevents one payment attempt from creating multiple enrollments.
enrollmentSchema.index(
  {
    paymentAttemptId: 1
  },
  {
    unique: true
  }
)

const Enrollment = mongoose.model('Enrollment', enrollmentSchema)

export default Enrollment
