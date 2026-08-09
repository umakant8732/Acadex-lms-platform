import { z } from 'zod'

//all values come from query string , we convert them into the  number
export const manageCourseQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(50).default(10),
  search: z.string().trim().default(''),
  category: z.string().trim().default('')
})
