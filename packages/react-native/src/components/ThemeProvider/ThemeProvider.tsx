import { useFonts } from "expo-font";
import React from "react";

import type { ThemeProviderProps } from "./ThemeProvider.types";
import { BrandContext } from "./ThemeProviderContext";
import { BRAND_FONTS, BRAND_ICONS } from "./constants";
import { flattenFonts } from "./helpers";
import { useUnistylesSetup } from "./hooks";

export const ThemeProvider = ({
  brand,
  theme = "light",
  children,
  dynamic = false,
}: ThemeProviderProps) => {
  const [fontsLoaded] = useFonts({
    ...(dynamic
      ? { ...flattenFonts(BRAND_FONTS), ...flattenFonts(BRAND_ICONS) }
      : { ...BRAND_FONTS[brand], ...BRAND_ICONS[brand] }),
  });

  useUnistylesSetup(brand, theme);

  if (!fontsLoaded) return null;

  return (
    <BrandContext.Provider value={{ fontLoaded: fontsLoaded, brand, theme }}>
      {children}
    </BrandContext.Provider>
  );
};
