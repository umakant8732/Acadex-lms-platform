import mongoose from 'mongoose'

import { LECTURE_STATUS } from '../constants/lecture-constants.js'

const lectureSchema = new mongoose.Schema(
  {
    // Links this lecture to its parent course.
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Course',
      required: true,
      index: true
    },

    // reference to the embedded section _id from Course.syllabus.
    sectionId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true
    },

    // reference to the embedded lesson _id from Course.syllabus.lessons.
    lessonId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true
    },

    // Points to the uploaded and processed video metadata.
    videoAssetId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'VideoAsset',
      default: null
    },

    // Allows this lecture to be playable before purchase/enrollment.
    //student can watch this video without purchase the course
    isPreview: {
      type: Boolean,
      default: false
    },

    // Tracks where this lecture is in the upload/processing lifecycle.
    status: {
      type: String,
      enum: Object.values(LECTURE_STATUS),
      default: LECTURE_STATUS.UPLOAD_PENDING
    },

    // Soft delete flag so we can hide lectures without losing history.
    delete: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  }
)

// Prevents creating multiple lecture records for the same course lesson.
lectureSchema.index(
  {
    courseId: 1,
    lessonId: 1
  },
  {
    unique: true
  }
)

const Lecture = mongoose.model('Lecture', lectureSchema)

export default Lecture
