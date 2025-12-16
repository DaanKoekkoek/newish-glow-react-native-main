export const sanitizeString = (value?: string): string =>
  value?.trim().replace(/\s+/g, "-").toLocaleLowerCase() ?? "";
