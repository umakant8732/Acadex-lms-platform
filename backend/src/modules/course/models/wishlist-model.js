import mongoose from 'mongoose'

const wishlistSchema = mongoose.Schema({

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },

  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: true
  }


}, {
  timestamps: true
})


//ensure a user can wishlist a course only once
wishlistSchema.index(
  { userId: 1, courseId: 1 },
  { unique: true }
)

const Wishlist = mongoose.model('Wishlist', wishlistSchema)
export default Wishlist