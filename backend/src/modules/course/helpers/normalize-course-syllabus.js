const normalizeLesson = (lesson, lessonIndex) => {
  const normalizedLesson = {
    title: lesson.title,
    order: lessonIndex + 1
  }

  if (lesson._id) {
    normalizedLesson._id = lesson._id
  }

  return normalizedLesson
}

const normalizeSection = (section, sectionIndex) => {
  const normalizedSection = {
    sectionTitle: section.sectionTitle,
    order: sectionIndex + 1,
    lessons: section.lessons.map(normalizeLesson)
  }

  if (section._id) {
    normalizedSection._id = section._id
  }

  return normalizedSection
}

export const normalizeCourseSyllabus = (syllabus = []) => {
  return syllabus.map(normalizeSection)
}

export const normalizeCoursePayload = payload => {
  return {
    ...payload,
    syllabus: normalizeCourseSyllabus(payload.syllabus)
  }
}