import mongoose from 'mongoose'

export const lessonSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },

    order: {
      type: Number,
      required: true,
      min: 1
    }
  },
  { _id: true }
)

export const syllabusSectionSchema = new mongoose.Schema(
  {
    sectionTitle: {
      type: String,
      required: true,
      trim: true
    },

    order: {
      type: Number,
      required: true,
      min: 1
    },

    lessons: {
      type: [lessonSchema],
      default: []
    }
  },
  { _id: true }
)

export default syllabusSectionSchema
