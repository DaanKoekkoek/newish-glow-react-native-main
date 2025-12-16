const PRICE_PATTERN = /^(-)?\s?(€)?\s?(\d{1,3}(?:\.\d{3})*|\d+)(,\d{1,2})?$/;

const UNICODE_DIGITS = [
  "\u2070", // 0
  "\u00B9", // 1
  "\u00B2", // 2
  "\u00B3", // 3
  "\u2074", // 4
  "\u2075", // 5
  "\u2076", // 6
  "\u2077", // 7
  "\u2078", // 8
  "\u2079", // 9
];

export type ParsedPrice = {
  currency: string | null;
  whole: string | null;
  decimal: string | null;
};

export type FormatPriceOptions = {
  showCurrency?: boolean;
  useUnicode?: boolean;
};

export function parsePrice(input: string): ParsedPrice {
  const match = input.trim().match(PRICE_PATTERN);

  const currency = match?.[2] ? "€" : null;
  const whole = match?.[3] || null;
  const decimal = match?.[4]?.replace(/,/, "") || null;

  return { currency, whole, decimal };
}

export function toUnicodeDecimals(value: string): string {
  return value
    .split("")
    .map((digit) => {
      const n = Number(digit);
      return Number.isNaN(n) ? digit : UNICODE_DIGITS[n];
    })
    .join("");
}

export function normalizeDecimals(decimal: string | null, asUnicode = false) {
  if (!decimal) {
    return asUnicode ? `${UNICODE_DIGITS[0]}${UNICODE_DIGITS[0]}` : "00";
  }

  // If only one digit ("5" → "50")
  if (decimal.length === 1) {
    const first = Number(decimal);

    return asUnicode
      ? `${UNICODE_DIGITS[first]}${UNICODE_DIGITS[0]}`
      : `${decimal}0`;
  }

  // Already two digits, e.g. "56"
  return asUnicode ? toUnicodeDecimals(decimal) : decimal;
}

export function formatPriceDisplay(
  rawValue?: string,
  { showCurrency = true, useUnicode = false }: FormatPriceOptions = {},
): string | undefined {
  if (!rawValue) return;
  const parsed = parsePrice(rawValue);

  if (!parsed.whole) return rawValue; // fallback for non-numeric input

  const isNegative = rawValue.trim().startsWith("-");
  const sign = isNegative ? "-" : "";
  const decimals = normalizeDecimals(parsed.decimal, useUnicode);
  const currency = showCurrency ? (parsed.currency ?? "€") : "";

  return `${sign}${currency} ${parsed.whole},${decimals}`
    .replace(/\s+/g, " ")
    .trim();
}
