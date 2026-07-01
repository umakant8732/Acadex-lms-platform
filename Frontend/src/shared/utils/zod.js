export const getZodErrors =
  error => {
    const fieldErrors = {}

    error.issues.forEach(issue => {
      fieldErrors[
        issue.path[0]
      ] = issue.message
    })

    return fieldErrors
  }