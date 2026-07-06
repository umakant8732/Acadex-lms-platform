export interface ZodErrorLike {
  issues: Array<{
    path: Array<any>
    message: string
  }>
}

export const getZodErrors = (error: ZodErrorLike): Record<string, string> => {
  const fieldErrors: Record<string, string> = {}

  error.issues.forEach(issue => {
    const field = issue.path[0]
    if (field !== undefined) {
      fieldErrors[field.toString()] = issue.message
    }
  })

  return fieldErrors
}
