import { z } from 'zod'

const mongoIdSchema = z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid id')

const lessonSchema = z.object({
  _id: mongoIdSchema.optional(),

  title: z.string().trim().min(2, 'Lesson title is required'),

  order: z.coerce.number().int().positive().optional()
})

const syllabusSectionSchema = z.object({
  _id: mongoIdSchema.optional(),

  sectionTitle: z.string().trim().min(3, 'Section title is required'),

  order: z.coerce.number().int().positive().optional(),

  lessons: z.array(lessonSchema).min(1, 'At least one lesson is required')
})

const courseSchema = z.object({
  title: z.string().trim().min(3, 'Title must be at least 3 characters'),

  subtitle: z.string().trim().optional(),

  description: z
    .string()
    .trim()
    .min(10, 'Description must be atleast 10 characters'),

  category: z.string().trim().min(2, 'Category is required'),

  level: z.enum(['beginner', 'intermediate', 'advanced']),

  price: z.coerce.number().min(0, 'Price cannot be negative'),

  originalPrice: z.coerce.number().min(0, 'Original price cannot be negative'),

  lectures: z.coerce.number().min(0).optional(),

  projects: z.coerce.number().min(0).optional(),

  syllabus: z
    .array(syllabusSectionSchema)
    .min(1, 'At least one syllabus section is required')
})

export const createCourseSchema = courseSchema

export const updateCourseSchema = courseSchema
