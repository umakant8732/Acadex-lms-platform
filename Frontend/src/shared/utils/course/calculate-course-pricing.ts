export const getCourseDiscount = (price?: number, originalPrice?: number): number => {
  if (!originalPrice || !price || originalPrice <= price) {
    return 0
  }

  return Math.round(((originalPrice - price) / originalPrice) * 100)
}

export const getCourseSavings = (price?: number, originalPrice?: number): number => {
  if (!originalPrice || !price || originalPrice <= price) {
    return 0
  }

  return originalPrice - price
}

export interface SyllabusSection {
  lessons?: any[]
  [key: string]: any
}

export const getTotalLessons = (syllabus?: SyllabusSection[] | null): number => {
  return (syllabus ?? []).reduce((count, section) => {
    return count + (section.lessons?.length ?? 0)
  }, 0)
}
