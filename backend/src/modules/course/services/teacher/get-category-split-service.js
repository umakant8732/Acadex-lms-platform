import { findCategorySplit } from '../../repositories/find-category-split-repository.js'

const COLOR_PALETTE = [
  'bg-blue-600',
  'bg-purple-600',
  'bg-emerald-600',
  'bg-amber-600',
  'bg-rose-600',
  'bg-indigo-600',
  'bg-cyan-600'
]

export const getCategorySplitService = async () => {
  const rawCategories = await findCategorySplit()

  const totalCount = rawCategories.reduce((acc, curr) => acc + curr.count, 0)

  const categorySplit = rawCategories.map((item, index) => {
    const percentage =
      totalCount > 0 ? Math.round((item.count / totalCount) * 100) : 0

    return {
      name: item._id || 'Uncategorized',
      count: item.count,
      percentage,
      color: COLOR_PALETTE[index % COLOR_PALETTE.length]
    }
  })

  return { categorySplit, totalCount }
}
