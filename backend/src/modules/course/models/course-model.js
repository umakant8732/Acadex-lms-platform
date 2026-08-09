import mongoose from 'mongoose'
import syllabusSectionSchema from './syllabus-model.js'

const courseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },

    subtitle: {
      type: String,
      trim: true,
      default: ''
    },

    description: {
      type: String,
      required: true,
      trim: true
    },

    category: {
      type: String,
      required: true,
      trim: true
    },

    level: {
      type: String,
      enum: ['beginner', 'intermediate', 'advanced'],
      default: 'beginner'
    },

    price: {
      type: Number,
      required: true,
      min: 0
    },

    originalPrice: {
      type: Number,
      required: true,
      min: 0
    },

    duration: {
      type: Number,
      default: 0,
      min: 0
    },

    lectures: {
      type: Number,
      default: 0,
      min: 0
    },

    projects: {
      type: Number,
      default: 0,
      min: 0
    },

    // Stores only asset key. Public url will be built in response layer.
    thumbnailKey: {
      type: String,
      default: ''
    },

    instructorName: {
      type: String,
      default: 'Umakant Bhendarkar'
    },

    syllabus: {
      type: [syllabusSectionSchema],
      default: []
    },

    isPublished: {
      type: Boolean,
      default: false
    },

    delete: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  }
)

const Course = mongoose.model('Course', courseSchema)

export default Course
