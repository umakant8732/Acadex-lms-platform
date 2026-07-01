export const createEmptyLesson = order => ({
  title: '',
  order
})

export const createEmptySection = order => ({
  sectionTitle: '',
  order,
  lessons: [createEmptyLesson(1)]
})

const getDefaultSyllabus = () => [createEmptySection(1)]

const mapLessonToFormValue = (lesson, lessonIndex) => ({
  ...(lesson._id ? { _id: lesson._id } : {}),
  title: lesson.title,
  order: lesson.order ?? lessonIndex + 1
})

const mapSectionToFormValue = (section, sectionIndex) => ({
  ...(section._id ? { _id: section._id } : {}),
  sectionTitle: section.sectionTitle,
  order: section.order ?? sectionIndex + 1,
  lessons:
    section.lessons.length > 0
      ? section.lessons.map(mapLessonToFormValue)
      : [createEmptyLesson(1)]
})

const normalizeCourseLevel = level => {
  if (level === 'advance') {
    return 'advanced'
  }

  return level || 'beginner'
}

export const getDefaultCourseValues = () => ({
  title: '',
  subtitle: '',
  description: '',
  category: '',
  level: 'beginner',
  price: 0,
  originalPrice: 0,
  lectures: 0,
  projects: 0,
  syllabus: getDefaultSyllabus()
})

export const mapCourseToFormValues = course => ({
  title: course.title ?? '',
  subtitle: course.subtitle ?? '',
  description: course.description ?? '',
  category: course.category ?? '',
  level: normalizeCourseLevel(course.level),
  price: course.price ?? 0,
  originalPrice: course.originalPrice ?? 0,
  lectures: course.lectures ?? 0,
  projects: course.projects ?? 0,
  syllabus:
    course.syllabus?.length > 0
      ? course.syllabus.map(mapSectionToFormValue)
      : getDefaultSyllabus()
})

export const getInitialCourseValues = ({ mode, initialCourse }) => {
  if (mode !== 'update' || !initialCourse) {
    return getDefaultCourseValues()
  }

  return mapCourseToFormValues(initialCourse)
}

export const normalizeCourseFormPayload = values => ({
  ...values,
  syllabus: values.syllabus.map((section, sectionIndex) => ({
    ...(section._id ? { _id: section._id } : {}),
    sectionTitle: section.sectionTitle,
    order: sectionIndex + 1,
    lessons: section.lessons.map((lesson, lessonIndex) => ({
      ...(lesson._id ? { _id: lesson._id } : {}),
      title: lesson.title,
      order: lessonIndex + 1
    }))
  }))
})
