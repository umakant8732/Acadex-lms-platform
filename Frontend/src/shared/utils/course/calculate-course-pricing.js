export const getCourseDiscount = (price, originalPrice) => {
  if (!originalPrice || !price || originalPrice <= price) {
    return 0
  }

  return Math.round(((originalPrice - price) / originalPrice) * 100)
}

export const getCourseSavings = (price, originalPrice) => {
  if (!originalPrice || !price || originalPrice <= price) {
    return 0
  }

  return originalPrice - price
}

export const getTotalLessons = syllabus => {
  return (syllabus ?? []).reduce((count, section) => {
    return count + (section.lessons?.length ?? 0)
  }, 0)
}
