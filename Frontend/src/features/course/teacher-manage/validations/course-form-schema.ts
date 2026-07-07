import { z } from 'zod'

const mongoIdSchema = z
  .string()
  .regex(/^[0-9a-fA-F]{24}$/, 'Invalid id')

const lessonSchema = z.object({
  _id: mongoIdSchema.optional(),
  title: z
    .string()
    .trim()
    .min(2, 'Lesson title must be at least 2 characters'),
  order: z.coerce.number().int().positive().optional()
})

const syllabusSectionSchema = z.object({
  _id: mongoIdSchema.optional(),
  sectionTitle: z
    .string()
    .trim()
    .min(3, 'Section title must be at least 3 characters'),
  order: z.coerce.number().int().positive().optional(),
  lessons: z.array(lessonSchema).min(1, 'At least one lesson is required')
})

export const courseFormSchema = z.object({
  title: z.string().trim().min(3, 'Title must be at least 3 characters'),
  subtitle: z.string().trim(),
  description: z
    .string()
    .trim()
    .min(10, 'Description must be at least 10 characters'),
  category: z.string().trim().min(2, 'Category must be at least 2 characters'),
  level: z.enum(['beginner', 'intermediate', 'advanced'], {
    message: 'Please select a valid level'
  }),
  price: z.coerce.number().min(0, 'Price cannot be negative'),
  originalPrice: z.coerce.number().min(0, 'Original price cannot be negative'),
  lectures: z.coerce.number().min(0, 'Lectures cannot be negative'),
  projects: z.coerce.number().min(0, 'Projects cannot be negative'),
  syllabus: z.array(syllabusSectionSchema).min(1, 'At least one section is required')
})

const setNestedError = (target: any, path: (string | number | symbol)[], message: string): void => {
  if (path.length === 0) {
    return
  }

  const [current, ...rest] = path

  if (rest.length === 0) {
    target[current] = message
    return
  }

  const nextKey = rest[0]
  const shouldCreateArray = typeof nextKey === 'number'

  if (target[current] === undefined) {
    target[current] = shouldCreateArray ? [] : {}
  }

  setNestedError(target[current], rest, message)
}

export const getCourseFormErrors = (error: z.ZodError): any => {
  const fieldErrors: any = {}

  error.issues.forEach(issue => {
    setNestedError(fieldErrors, issue.path, issue.message)
  })

  return fieldErrors
}

export interface ValidationSuccessResult<T> {
  success: true
  data: T
  errors: Record<string, never>
}

export interface ValidationFailureResult {
  success: false
  data: null
  errors: any
}

export type ValidationResult<T> = ValidationSuccessResult<T> | ValidationFailureResult

export const validateCourseForm = (values: any): ValidationResult<z.infer<typeof courseFormSchema>> => {
  const result = courseFormSchema.safeParse(values)

  if (result.success) {
    return {
      success: true,
      data: result.data,
      errors: {}
    }
  }

  return {
    success: false,
    data: null,
    errors: getCourseFormErrors(result.error)
  }
}
