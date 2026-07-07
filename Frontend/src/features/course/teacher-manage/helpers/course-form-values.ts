import type {
  LessonFormInput,
  SectionFormInput,
  CourseFormValues,
  CourseDetails,
  CourseLevelType
} from '../types/teacher-course-types'

export const createEmptyLesson = (order: number): LessonFormInput => ({
  title: '',
  order
})

export const createEmptySection = (order: number): SectionFormInput => ({
  sectionTitle: '',
  order,
  lessons: [createEmptyLesson(1)]
})

const getDefaultSyllabus = (): SectionFormInput[] => [createEmptySection(1)]

const mapLessonToFormValue = (lesson: any, lessonIndex: number): LessonFormInput => ({
  ...(lesson._id ? { _id: lesson._id } : {}),
  title: lesson.title,
  order: lesson.order ?? lessonIndex + 1
})

const mapSectionToFormValue = (section: any, sectionIndex: number): SectionFormInput => ({
  ...(section._id ? { _id: section._id } : {}),
  sectionTitle: section.sectionTitle,
  order: section.order ?? sectionIndex + 1,
  lessons:
    section.lessons && section.lessons.length > 0
      ? section.lessons.map(mapLessonToFormValue)
      : [createEmptyLesson(1)]
})

const normalizeCourseLevel = (level?: string | null): CourseLevelType => {
  if (level === 'advance') {
    return 'advanced'
  }

  return (level as CourseLevelType) || 'beginner'
}

export const getDefaultCourseValues = (): CourseFormValues => ({
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

export const mapCourseToFormValues = (course: CourseDetails): CourseFormValues => ({
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
    course.syllabus && course.syllabus.length > 0
      ? course.syllabus.map(mapSectionToFormValue)
      : getDefaultSyllabus()
})

export interface GetInitialCourseValuesArgs {
  mode: 'create' | 'update' | string
  initialCourse?: CourseDetails | null
}

export const getInitialCourseValues = ({ mode, initialCourse }: GetInitialCourseValuesArgs): CourseFormValues => {
  if (mode !== 'update' || !initialCourse) {
    return getDefaultCourseValues()
  }

  return mapCourseToFormValues(initialCourse)
}

export const normalizeCourseFormPayload = (values: CourseFormValues): CourseFormValues => ({
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
