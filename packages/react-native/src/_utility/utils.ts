export const mergeTestIds = (...testIDs: (string | undefined)[]) => {
  return testIDs.filter(Boolean).join("_");
};

export const numericStringDigitCount = (num: string) => {
  if (typeof num !== "string") return 0;
  return num.length;
};

export const isNumericString = (value: string) => {
  if (typeof value !== "string") return false;
  return !isNaN(Number(value));
};

export const hexToRGB = (value: string): string => {
  if (typeof value !== "string" || !value.startsWith("#")) return "";
  const hex = value.replace("#", "");

  // If 6-character hex, assume no alpha; if 8-character, extract alpha
  const hasAlpha = hex.length === 8;

  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  if (hasAlpha) {
    const a = parseInt(hex.substring(6, 8), 16) / 255; // Convert alpha to a decimal
    return `rgba(${r}, ${g}, ${b}, ${a})`;
  }

  return `rgb(${r}, ${g}, ${b})`;
};

/**
 *
 * helper to make sure switchcases are exhaustive
 */
export function ensureExhaustive(_x: never): never {
  throw new Error("Reached a branch with non-exhaustive checks");
}

/**
 * Mask text input based on date format
 *
 * @param text current text
 * @param pos  caret position
 * @param pattern date format
 *
 * @internal
 */
export function maskDate(text: string, pos: number, pattern: string) {
  const prefix = text.slice(0, pos);
  const suffix = text.slice(pos, text.length);

  const isValue = (ch?: string) => /y|m|d/g.test((ch ?? "").toLowerCase());

  const isDigit = (ch?: string) => /\d/g.test(ch ?? "");

  const mask = (buffer: string, start = 0) => {
    let index = start;
    let result = "";
    for (const char of buffer) {
      if (isValue(pattern[index]) && isDigit(char)) {
        index++;
        result += char;
      }

      if (index < pattern.length && !isValue(pattern[index])) {
        result += pattern[index];
        index++;
      }
    }
    return result;
  };

  const unmask = (buffer: string) => {
    let result = "";
    for (const char of buffer) {
      if (!isDigit(char)) {
        continue;
      }
      result += char;
    }
    return result;
  };

  const suffixMask = mask(prefix);

  return suffixMask + mask(unmask(suffix), suffixMask.length);
}
