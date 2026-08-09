//query to get values for pagination and filterations

const validateQuery = schema => {
  return async (req, res, next) => {
    try {
      req.validatedQuery = await schema.parseAsync(req.query)
      next()
    } catch (error) {
      next(error)
    }
  }
}

export default validateQuery