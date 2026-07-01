import Lecture from '../models/lecture-model.js'

// Creates a new lecture record for a course lesson.
// The actual video metadata is stored separately in VideoAsset.

export const createLecture = async payload => {
  return await Lecture.create(payload)
}
