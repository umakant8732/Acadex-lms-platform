
import {z} from 'zod'

const mongoIdSchema = z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid id')

export const toggleLecturePreviewSchema = z.object({
    lectureId: mongoIdSchema,
    isPreview: z.boolean({
        required_error: 'isPreview status is required'
    })
})