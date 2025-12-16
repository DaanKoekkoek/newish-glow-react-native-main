import type { BrandName } from "../ThemeProvider.types";
import { BRAND_FONTS } from "../constants";

// Helper to flatten objects containing a collection of fonts into one array
export const flattenFonts = (fonts: Record<string, Record<string, string>>) =>
  Object.values(fonts).reduce(
    (acc, brandFonts) => ({ ...acc, ...brandFonts }),
    {} as Record<string, string>,
  );

// Find font match and prefix font name with brand to create an unique font.
export const resolveFontFamily = (fontKey: string, brand: BrandName) => {
  const brandFonts = BRAND_FONTS[brand];
  const fontFamilyKey = `${brand}_${fontKey}`;

  if (brandFonts && brandFonts[fontFamilyKey]) {
    return fontFamilyKey;
  }

  console.warn(`Font ${fontFamilyKey} not found for brand ${brand}`);
  return fontKey;
};
