import Lecture from '../models/lecture-model.js'

//updates an active lecture and returns the latest document

export const updateLectureById = async (lectureId, updateData) => {
  return await Lecture.findOneAndUpdate(
    {
      _id: lectureId,
      delete: { $ne: true }
    },

    updateData,
    {
      new: true,
      runValidators: true
    }
  )
}
