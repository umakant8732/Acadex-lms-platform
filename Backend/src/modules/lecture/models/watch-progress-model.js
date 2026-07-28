import mongoose from 'mongoose'

const watchProgressSchema = new mongoose.Schema(
  {
    // The student who is watching this course
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true
    },

    // The course to which this lesson belongs
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Course',
      required: true,
      index: true
    },

    // The sub-document lesson ID inside the course syllabus
    lessonId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true
    },

    // Reference to the main video Lecture collection
    lectureId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Lecture',
      required: true
    },

    // How many seconds of this video has the student watched (e.g. 150 seconds)
    watchTime: {
      type: Number,
      default: 0,
      min: 0
    },

    // Marks true if student has completed watching this video
    isCompleted: {
      type: Boolean,
      default: false
    },

    // Tracks the exact date/time this lesson was last active (used to resume)
    lastWatchedAt: {
      type: Date,
      default: Date.now
    }
  },
  {
    timestamps: true // Auto-creates createdAt and updatedAt timestamps
  }
)

// Compound Index: Restricts database from creating duplicate progress records for same student, course, and lesson
watchProgressSchema.index(
  {
    userId: 1,
    courseId: 1,
    lessonId: 1
  },
  {
    unique: true
  }
)

const WatchProgress = mongoose.model('WatchProgress', watchProgressSchema)

export default WatchProgress
