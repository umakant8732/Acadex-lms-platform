export const getZodErrors = (error) => {
  const fieldErrors = {};

  error.issues.forEach((issue) => {
    const field = issue.path[0];
    if (field !== undefined) {
      fieldErrors[field.toString()] = issue.message;
    }
  });

  return fieldErrors;
};
