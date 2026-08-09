import {z} from 'zod'


export const changePublishStatusSchema = z.object({
    isPublished : z.boolean()
})