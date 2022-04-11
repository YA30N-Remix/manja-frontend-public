export const GetValidationResult = (detect, responseMessages, name) => {
  return detect
    ? responseMessages.some((item) => item.name === name)
      ? "is-invalid"
      : "is-valid"
    : "";
};
