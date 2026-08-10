const isErrorResponseShape = (value) => {
  return typeof value === "object" && value !== null;
};

const getReadableErrors = (errors) => {
  if (!Array.isArray(errors)) {
    return "";
  }

  return errors
    .map((error) =>
      typeof error === "string" ? error : error?.message || "",
    )
    .filter(Boolean)
    .join(", ");
};

const getReadableMessage = (message) => {
  if (typeof message !== "string") {
    return "";
  }

  // Older API responses can contain a Zod issue array serialized as a string.
  if (message.startsWith("[")) {
    try {
      return getReadableErrors(JSON.parse(message));
    } catch {
      // Use the original message when it is not JSON.
    }
  }

  return message;
};

// Picks readable message from api/browser errors.
// This keeps page hooks smaller and toast text clean.
export const getApiErrorMessage = (error, fallbackMessage) => {
  if (isErrorResponseShape(error)) {
    const responseData = error.response?.data;
    const validationMessage = getReadableErrors(responseData?.errors);

    if (validationMessage) {
      return validationMessage;
    }

    const apiMessage = responseData?.message;

    if (apiMessage) {
      if (typeof apiMessage === "string") {
        return getReadableMessage(apiMessage) || fallbackMessage;
      }
      if (Array.isArray(apiMessage)) {
        // Extract validation messages from Zod / Express validator array
        return apiMessage
          .map((err) => err.message || JSON.stringify(err))
          .join(", ");
      }
      if (typeof apiMessage === "object") {
        // Extract first error message from key-value pair object
        const values = Object.values(apiMessage);
        if (values.length > 0) {
          const firstVal = values[0];
          return typeof firstVal === "string"
            ? firstVal
            : JSON.stringify(firstVal);
        }
        return JSON.stringify(apiMessage);
      }
    }

    return error.message || fallbackMessage || "Something went wrong";
  }

  return fallbackMessage || "Something went wrong";
};
