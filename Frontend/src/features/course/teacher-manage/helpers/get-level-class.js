export const getLevelClass = level => {
  if (level === 'beginner') return 'bg-blue-50 text-blue-700'
  if (level === 'intermediate') return 'bg-violet-50 text-violet-700'

  return 'bg-black text-white'
}
