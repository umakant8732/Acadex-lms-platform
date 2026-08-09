import mongoose from 'mongoose'

import bcrypt from 'bcryptjs'

import { ROLES } from '../constants/auth-constants.js'

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true
    },

    email: {
      type: String,
      required: true,
      trim: true
    },

    password: {
      type: String,
      required: true,
      minlength: 8
    },

    role: {
      type: String,
      enum: Object.values(ROLES),
      default: ROLES.STUDENT
    },

    avatar: {
      type: String,
      default: ''
    },

    refreshToken: {
      type: String,
      default: null
    },

    isEmailVerified: {
      type: Boolean,
      default: false
    },

    lastLogin: {
      type: Date,
      default: null
    },

    passwordChangedAt: {
      type: Date,
      default: null
    }
  },

  {
    timestamps: true
  }
)

userSchema.pre('save', async function () {
  if (!this.isModified('password')) {
    return
  }

  this.password = await bcrypt.hash(this.password, 10)
})

userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password)
}

const User = mongoose.model('User', userSchema)

export default User
