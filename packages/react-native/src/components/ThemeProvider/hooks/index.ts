import { breakpoints, APP_THEMES, selectTheme } from "_theming/index";
import { useContext, useEffect } from "react";
import { UnistylesRegistry } from "react-native-unistyles";

import type {
  BrandContextProps,
  BrandName,
  Theme,
} from "../ThemeProvider.types";
import { BrandContext } from "../ThemeProviderContext";

export const useThemeProviderContext = (): BrandContextProps =>
  useContext(BrandContext);

const registerTheme = (brand: BrandName, theme: Theme) =>
  UnistylesRegistry.addBreakpoints(breakpoints)
    .addThemes(APP_THEMES)
    .addConfig({ initialTheme: selectTheme(brand, theme) });

// Prevent unistyles from re-rendering components.
// Ensures it only applies themes when either brand or theme changes.
export const useUnistylesSetup = (brand: BrandName, theme: Theme) => {
  useEffect(() => {
    // Dont run registerTheme from within an useEffect hook when in test env.
    if (process.env.NODE_ENV === "test") return;
    registerTheme(brand, theme);
  }, [brand, theme]);

  if (process.env.NODE_ENV === "test") {
    registerTheme(brand, theme);
  }
};
