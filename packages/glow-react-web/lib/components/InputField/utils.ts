import type { SupportedInputIconTypes } from "_internals/Form";

/**
 * Type guard to ensure only supported input types are passed to the InputIcon component.
 *
 * InputIcon only supports rendering icons for a limited set of input types.
 * Since `type` is passed as `React.HTMLInputTypeAttribute`, it could include many
 * unsupported values (e.g., "email", "number", "tel", etc.).
 *
 * This guard ensures we only forward explicitly supported types—"password", "search",
 * "date", and "text"—to avoid runtime errors or unexpected icon behavior.
 *
 * @param type - the input type to validate
 * @returns whether the type is one of the supported icon types
 */
export const isSupportedInputIconType = (
  type: React.HTMLInputTypeAttribute,
): type is SupportedInputIconTypes => {
  return ["password", "search", "date", "text", "file"].includes(type);
};

/**
 * returns the proper input field variant based on validation and inactive field.
 *
 * @param inactive - input inactive prop
 * @param validationValid - input validation result
 *
 * @internal
 */
export const getInputFieldState = (
  inactive?: boolean,
  validationValid?: boolean,
) => {
  if (inactive) return "inactive";
  if (validationValid) return "valid";
  if (validationValid === false) return "error";
  return "default";
};
