export const getStatusClass = isPublished => {
  return isPublished
    ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
    : 'bg-orange-50 text-orange-700 border-orange-200'
}
